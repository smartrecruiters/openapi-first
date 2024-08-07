const validatePathParams = require('../../../middlewares/path/validate')
const InvalidPathParamsError = require('../../../errors/InvalidPathParamsError')

describe('path param validation', () => {

    const spec = {
        resolveRef: obj => obj
    }

    it('should return undefined when no path params', () => {
        // given
        const operation = {}
        const middleware = validatePathParams({})(operation, {spec})

        // when
        expect(middleware).to.be.undefined
    })

    it('should pass when params are valid', done => {
        // given
        const operation = {parameters: [{in: 'path', name: 'test', schema: {type: 'string', format: 'uuid'}}]}
        const params = {test: '6817c11b-d789-4d03-84d1-562b7012d072'}
        const expectedPathModel = {
            type: 'object',
            properties: {test: {type: 'string', format: 'uuid'}},
            required: []
        }

        const validateStub = sinon.stub()
        validateStub.returns('error')
        validateStub.withArgs(sinon.match(params), sinon.match(expectedPathModel)).returns(undefined)

        const middleware = validatePathParams({schemaValidator: {validate: validateStub}})(operation, {spec})

        const req = {params}

        // when
        middleware(req, {}, done)
    })

    it('should indicate invalid params error', () => {
        // given
        const operation = {parameters: [{in: 'path', name: 'test', required: true}]}
        const params = {some: 'abc'}
        const expectedPathModel = {
            type: 'object',
            properties: {test: undefined},
            required: ['test']
        }

        const validateStub = sinon.stub()
        validateStub.returns(undefined)
        validateStub.withArgs(sinon.match(params), sinon.match(expectedPathModel)).returns(123)

        const middleware = validatePathParams({schemaValidator: {validate: validateStub}})(operation, {spec})

        const req = {params}
        const next = sinon.spy()

        // when
        middleware(req, {}, next)

        // then
        sinon.assert.calledWithMatch(next, sinon.match.instanceOf(InvalidPathParamsError)
            .and(sinon.match.has('errors', 123)))
    })
})
