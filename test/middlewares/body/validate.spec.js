const bodyValidation = require('../../../middlewares/body/validate')
const InvalidBodyError = require('../../../errors/InvalidBodyError')
const reqBuilder = require('../../builders/req')

describe('body validation', () => {

    const spec = {resolveRef: obj => obj}

    it('should pass when no request body', () => {
        // given
        const middleware = bodyValidation({})({}, {spec})

        // when
        expect(middleware).to.be.undefined
    })

    it('should return undefined when operation with different content', () => {
        // given
        const contentType = 'application/json'
        const operation = {requestBody: {content: {[contentType]: {schema: {}}}}}
        const middleware = bodyValidation({
            schemaValidator: {validate: sinon.stub()}, mediaTypes: ['multipart/form-data']
        })(operation, {spec})

        // when
        expect(middleware).to.be.undefined
    })

    it('should pass valid body', done => {
        // given
        const contentType = 'application/json'
        const operation = {requestBody: {content: {[contentType]: {schema: {}}}}}
        const middleware = bodyValidation({schemaValidator: {validate: sinon.stub()}})(operation, {spec})

        const req = reqBuilder().withContentType(contentType).build()

        // when
        middleware(req, {}, done)
    })

    it('should pass body with not specified content', done => {
        // given
        const contentType = 'application/json'
        const operation = {requestBody: {content: {[contentType]: {schema: {}}}}}
        const middleware = bodyValidation({schemaValidator: {validate: sinon.stub()}})(operation, {spec})

        const req = reqBuilder().withContentType('multipart/form-data').build()

        // when
        middleware(req, {}, done)
    })

    it('should indicate invalid body', () => {
        // given
        const contentType = 'application/json'
        const operation = {requestBody: {content: {[contentType]: {schema: {}}}}}
        const middleware = bodyValidation({schemaValidator: {validate: sinon.stub().returns(1)}})(operation, {spec})
        const next = sinon.spy()
        const req = reqBuilder().withContentType(contentType).build()

        // when
        middleware(req, undefined, next)

        // then
        sinon.assert.calledWithMatch(next, sinon.match.instanceOf(InvalidBodyError)
            .and(sinon.match.has('errors', 1)))
    })
})
