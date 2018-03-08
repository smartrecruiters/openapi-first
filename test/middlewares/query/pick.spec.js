const queryPick = require('../../../middlewares/query/pick')()

describe('query param pick', () => {

    it('should not create middleware when no query params', () => {
        // given
        const operation = {parameters: []}
        const middleware = queryPick(operation)

        expect(middleware).to.be.undefined
    })

    it('should pick only specified params', () => {
        // given
        const operation = {parameters: [{in: 'query', name: 'test'}]}
        const middleware = queryPick(operation)

        const req = {query: {test: 'abc', unspecified: 'def'}}
        const next = sinon.spy()

        // when
        middleware(req, {}, next)

        // then
        sinon.assert.called(next)
        expect(req.query).to.eql({test: 'abc'})
    })
})
