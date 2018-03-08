const queryParamParser = require('../../../middlewares/query/parse')()

describe('query param parser', () => {

    it('should return undefined when no query params', () => {
        expect(queryParamParser({})).to.be.undefined
    })

    it('should leave unspecifed query param untouched integer query param to integer', () => {
        // given
        const operation = {parameters: [{in: 'query', name: 'test'}]}
        const middleware = queryParamParser(operation)

        const req = {query: {unspecified: '123'}}
        const next = sinon.spy()

        // when
        middleware(req, {}, next)

        // then
        sinon.assert.called(next)
        expect(req.query.unspecified).to.equal('123')
    })

    it('should convert integer query param to integer', () => {
        // given
        const operation = {parameters: [{in: 'query', name: 'test', schema: {type: 'integer'}}]}
        const middleware = queryParamParser(operation)

        const req = {query: {test: '123'}}
        const next = sinon.spy()

        // when
        middleware(req, {}, next)

        // then
        sinon.assert.called(next)
        expect(req.query.test).to.equal(123)
    })

    it('should convert number query param to float', () => {
        // given
        const operation = {parameters: [{in: 'query', name: 'test', schema: {type: 'number'}}]}
        const middleware = queryParamParser(operation)

        const req = {query: {test: '123.3'}}
        const next = sinon.spy()

        // when
        middleware(req, {}, next)

        // then
        sinon.assert.called(next)
        expect(req.query.test).to.equal(123.3)
    })

    it('should convert true query param to boolean', () => {
        // given
        const operation = {parameters: [{in: 'query', name: 'test', schema: {type: 'boolean'}}]}

        const middleware = queryParamParser(operation)

        const req = {query: {test: 'true'}}
        const next = sinon.spy()

        // when
        middleware(req, {}, next)

        // then
        sinon.assert.called(next)
        expect(req.query.test).to.be.true
    })

    it('should convert false query param to boolean', () => {
        // given
        const operation = {parameters: [{in: 'query', name: 'test', schema: {type: 'boolean'}}]}

        const middleware = queryParamParser(operation)

        const req = {query: {test: 'false'}}
        const next = sinon.spy()

        // when
        middleware(req, {}, next)

        // then
        sinon.assert.called(next)
        expect(req.query.test).to.be.false
    })

    it('should not convert not boolean query param that should be boolean', () => {
        // given
        const operation = {parameters: [{in: 'query', name: 'test', schema: {type: 'boolean'}}]}

        const middleware = queryParamParser(operation)

        const req = {query: {test: 'abc'}}
        const next = sinon.spy()

        // when
        middleware(req, {}, next)

        // then
        sinon.assert.called(next)
        expect(req.query.test).to.equal('abc')
    })

    it('should convert single query param to array', () => {
        // given
        const operation = {parameters: [{in: 'query', name: 'test', schema: {type: 'array', items: {type: 'string'}}}]}
        const middleware = queryParamParser(operation)

        const req = {query: {test: 'abc'}}
        const next = sinon.spy()

        // when
        middleware(req, {}, next)

        // then
        sinon.assert.called(next)
        expect(req.query.test).to.have.lengthOf(1)
        expect(req.query.test).to.contain('abc')
    })

    it('should convert csv array query param to array', () => {
        // given
        const operation = {
            parameters: [{
                in: 'query',
                style: 'form',
                explode: false,
                name: 'test',
                schema: {type: 'array', items: {type: 'string'}}
            }]
        }

        const middleware = queryParamParser(operation)

        const req = {query: {test: 'a,b'}}
        const next = sinon.spy()

        // when
        middleware(req, {}, next)

        // then
        sinon.assert.called(next)
        expect(req.query.test).to.have.lengthOf(2)
        expect(req.query.test).to.eql(['a', 'b'])
    })

    it('should convert pipes array query param to array', () => {
        // given
        const operation = {
            parameters: [{
                in: 'query',
                style: 'pipeDelimited',
                name: 'test',
                schema: {type: 'array', items: {type: 'string'}}
            }]
        }

        const middleware = queryParamParser(operation)

        const req = {query: {test: 'a|b'}}
        const next = sinon.spy()

        // when
        middleware(req, {}, next)

        // then
        sinon.assert.called(next)
        expect(req.query.test).to.have.lengthOf(2)
        expect(req.query.test).to.eql(['a', 'b'])
    })

    it('should convert ssv array query param to array', () => {
        // given
        const operation = {
            parameters: [{
                in: 'query',
                style: 'spaceDelimited',
                name: 'test',
                schema: {type: 'array', items: {type: 'string'}}
            }]
        }

        const middleware = queryParamParser(operation)

        const req = {query: {test: 'a b'}}
        const next = sinon.spy()

        // when
        middleware(req, {}, next)

        // then
        sinon.assert.called(next)
        expect(req.query.test).to.have.lengthOf(2)
        expect(req.query.test).to.eql(['a', 'b'])
    })

    it('should convert integer array query param', () => {
        // given
        const operation = {parameters: [{in: 'query', name: 'test', schema: {type: 'array', items: {type: 'integer'}}}]}
        const middleware = queryParamParser(operation)

        const req = {query: {test: ['1', '2']}}
        const next = sinon.spy()

        // when
        middleware(req, {}, next)

        // then
        sinon.assert.called(next)
        expect(req.query.test).to.have.lengthOf(2)
        expect(req.query.test).to.eql([1, 2])
    })

    it('should convert boolean array query param', () => {
        // given
        const operation = {parameters: [{in: 'query', name: 'test', schema: {type: 'array', items: {type: 'boolean'}}}]}
        const middleware = queryParamParser(operation)

        const req = {query: {test: ['true', 'false']}}
        const next = sinon.spy()

        // when
        middleware(req, {}, next)

        // then
        sinon.assert.called(next)
        expect(req.query.test).to.have.lengthOf(2)
        expect(req.query.test).to.eql([true, false])
    })

    it('should convert float array query param', () => {
        // given
        const operation = {parameters: [{in: 'query', name: 'test', schema: {type: 'array', items: {type: 'number'}}}]}
        const middleware = queryParamParser(operation)

        const req = {query: {test: ['1.4', '2.1']}}
        const next = sinon.spy()

        // when
        middleware(req, {}, next)

        // then
        sinon.assert.called(next)
        expect(req.query.test).to.have.lengthOf(2)
        expect(req.query.test).to.eql([1.4, 2.1])
    })

})
