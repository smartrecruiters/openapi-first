const validateQueryParams = require('../../../middlewares/query/validate')

const InvalidQueryParamsError = require('../../../errors/InvalidQueryParamsError')

describe('query param required validation', () => {

    const spec = {
        resolveRef: obj => obj
    }

    it('should return undefined when no query params', () => {
        // given
        const operation = {}
        const middleware = validateQueryParams({})(operation, {spec})

        // when
        expect(middleware).to.be.undefined
    })

    it('should pass when params are valid', done => {
        // given
        const operation = {parameters: [{in: 'query', name: 'test'}]}
        const query = {test: 'abc'}
        const middleware = validateQueryParams({
            schemaValidator: {validate: sinon.stub().withArgs(query, sinon.match.any).returns()}
        })(operation, {spec})

        const req = {query}

        // when
        middleware(req, {}, done)
    })

    it('should indicate invalid params error', () => {
        // given
        const operation = {parameters: [{in: 'query', name: 'test', required: true}]}
        const query = {test: 'abc'}

        const middleware = validateQueryParams({
            schemaValidator: {validate: sinon.stub().withArgs(query, sinon.match.any).returns(123)}
        })(operation, {spec})

        const req = {query}
        const next = sinon.spy()

        // when
        middleware(req, {}, next)

        // then
        sinon.assert.calledWithMatch(next, sinon.match.instanceOf(InvalidQueryParamsError)
            .and(sinon.match.has('errors', 123)))
    })
})
