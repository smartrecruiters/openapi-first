const queryDefaults = require('../../../middlewares/query/defaults')()

describe('query param defaults', () => {

    it('should not create middleware when no defaults for query params', () => {
        // given
        const operation = {parameters: [{in: 'query', name: 'test2'}]}

        // when
        const middleware = queryDefaults(operation)

        // then
        expect(middleware).to.be.undefined
    })

    it('should be set on query', () => {
        // given
        const operation = {
            parameters: [
                {in: 'query', name: 'test', schema: {type: 'string', default: 'abc'}},
                {in: 'query', name: 'test2', schema: {type: 'string'}}
            ]
        }
        const middleware = queryDefaults(operation)

        const req = {query: {}}
        const next = sinon.spy()

        // when
        middleware(req, {}, next)

        // then
        sinon.assert.called(next)
        expect(req.query).to.eql({test: 'abc'})
    })
})
