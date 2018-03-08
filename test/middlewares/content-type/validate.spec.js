const contentTypeValidation = require('../../../middlewares/content-type/validate')()
const InvalidContentTypeError = require('../../../errors/InvalidContentTypeError')

describe('content type filter', () => {

    const spec = {resolveRef: obj => obj}

    it('should pass request when body is not excepted', () => {
        expect(contentTypeValidation({}, {spec})).to.be.undefined
    })

    it('should pass request with valid content type', done => {
        // given
        const contentType = 'application/json'
        const operation = {
            requestBody: {
                content: {[contentType]: {}}
            }
        }
        const middleware = contentTypeValidation(operation, {spec})
        const req = {headers: {'content-type': contentType, 'content-length': 1}}

        // when
        middleware(req, undefined, done)
    })

    it('should indicate invalid content type error', () => {
        // given
        const contentType = 'application/json'
        const operation = {
            requestBody: {
                content: {[contentType]: {}}
            }
        }
        const middleware = contentTypeValidation(operation, {spec})
        const req = {headers: {'content-type': 'abc', 'content-length': 1}}
        const next = sinon.spy()

        // when
        middleware(req, undefined, next)

        // then
        sinon.assert.calledWithMatch(next, sinon.match.instanceOf(InvalidContentTypeError)
            .and(sinon.match.has('validContentTypes', [contentType])))
    })
})
