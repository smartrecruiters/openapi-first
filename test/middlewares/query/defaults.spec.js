const queryDefaults = require('../../../middlewares/query/defaults')()

describe('query param defaults', () => {

    it('should not create middleware when no params', () => {
        // given
        const operation = {}

        // when
        const middleware = queryDefaults(operation)

        // then
        expect(middleware).to.be.undefined
    })

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

    it('should override default value if query param set', () => {
        // given
        const operation = {
            parameters: [
                {in: 'query', name: 'arrayParam', schema: {type: 'array', default: ['a1', 'a2']}},
                {in: 'query', name: 'stringParam', schema: {type: 'string', default: 'def'}},
                {in: 'query', name: 'intParam', schema: {type: 'integer', default: 1}}
            ]
        }
        const middleware = queryDefaults(operation)

        const req = {query: {arrayParam: ['b1'], stringParam: 'xyz', intParam: 0}}
        const next = sinon.spy()

        // when
        middleware(req, {}, next)

        // then
        sinon.assert.called(next)
        expect(req.query).to.eql({arrayParam: ['b1'], stringParam: 'xyz', intParam: 0})
    })
})
