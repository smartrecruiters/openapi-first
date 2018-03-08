const bodyParamParser = require('../../../middlewares/body/parse')
const reqBuilder = require('../../builders/req')

describe('form param parser middleware', () => {

    it('should not create middleware when no request body', () => {
        // given
        const middleware = bodyParamParser()({})

        // when
        expect(middleware).to.be.undefined
    })

    it('should not create middleware when no form params', () => {
        // given
        const middleware = bodyParamParser()({requestBody: {content: {}}})

        // when
        expect(middleware).to.be.undefined
    })

    it('should return undefined when no params of specified media types', () => {
        // given
        const contentType = 'multipart/form-data'
        const operation = {
            operationId: 'id',
            requestBody: {content: {[contentType]: {schema: {properties: {test: {type: 'number'}}}}}}
        }
        const middleware = bodyParamParser({mediaTypes: ['application/x-www-form-urlencoded']})(operation)

        expect(middleware).to.be.undefined
    })

    it('should leave unspecifed form param untouched', () => {
        // given
        const contentType = 'multipart/form-data'
        const operation = {
            operationId: 'id',
            requestBody: {content: {[contentType]: {schema: {properties: {test: {type: 'number'}}}}}}
        }
        const middleware = bodyParamParser()(operation)

        const req = reqBuilder().withContentType(contentType).withBody({unspecified: '123'}).build()
        const next = sinon.spy()

        // when
        middleware(req, undefined, next)

        // then
        sinon.assert.called(next)
        expect(req.body.unspecified).to.equal('123')
    })

    it('should do not parse when schema does not match unspecifed form param untouched', () => {
        // given
        const contentType = 'multipart/form-data'
        const operation = {
            operationId: 'id',
            requestBody: {content: {[contentType]: {schema: {properties: {test: {type: 'number'}}}}}}
        }
        const middleware = bodyParamParser()(operation)

        const req = reqBuilder().withContentType('application/json').withBody({test: '123'}).build()
        const next = sinon.spy()

        // when
        middleware(req, undefined, next)

        // then
        sinon.assert.called(next)
        expect(req.body.test).to.equal('123')
    })

    it('should convert integer form param to integer', () => {
        // given
        const contentType = 'application/x-www-form-urlencoded'
        const operation = {
            operationId: 'id',
            requestBody: {content: {[contentType]: {schema: {properties: {test: {type: 'integer'}}}}}}
        }
        const middleware = bodyParamParser({mediaTypes: ['application/x-www-form-urlencoded']})(operation)

        const req = reqBuilder().withContentType(contentType).withBody({test: '123'}).build()
        const next = sinon.spy()

        // when
        middleware(req, {}, next)

        // then
        sinon.assert.called(next)
        expect(req.body.test).to.equal(123)
    })

    it('should convert number form param to float', () => {
        // given
        const contentType = 'multipart/form-data'
        const operation = {
            operationId: 'id',
            requestBody: {content: {[contentType]: {schema: {properties: {test: {type: 'number'}}}}}}
        }
        const middleware = bodyParamParser()(operation)

        const req = reqBuilder().withContentType(contentType).withBody({test: '123.3'}).build()
        const next = sinon.spy()

        // when
        middleware(req, {}, next)

        // then
        sinon.assert.called(next)
        expect(req.body.test).to.equal(123.3)
    })

    it('should convert true form param to boolean', () => {
        // given
        const contentType = 'multipart/form-data'
        const operation = {
            operationId: 'id',
            requestBody: {content: {[contentType]: {schema: {properties: {test: {type: 'boolean'}}}}}}
        }
        const middleware = bodyParamParser()(operation)

        const req = reqBuilder().withContentType(contentType).withBody({test: 'true'}).build()
        req.body = {test: 'true'}
        const next = sinon.spy()

        // when
        middleware(req, {}, next)

        // then
        sinon.assert.called(next)
        expect(req.body.test).to.equal(true)
    })

    it('should convert false form param to boolean', () => {
        // given
        const contentType = 'multipart/form-data'
        const operation = {
            operationId: 'id',
            requestBody: {content: {[contentType]: {schema: {properties: {test: {type: 'boolean'}}}}}}
        }
        const middleware = bodyParamParser()(operation)

        const req = reqBuilder().withContentType(contentType).withBody({test: 'false'}).build()
        const next = sinon.spy()

        // when
        middleware(req, {}, next)

        // then
        sinon.assert.called(next)
        expect(req.body.test).to.equal(false)
    })

    it('should not convert not boolean form param that should be boolean', () => {
        // given
        const contentType = 'multipart/form-data'
        const operation = {
            operationId: 'id',
            requestBody: {content: {[contentType]: {schema: {properties: {test: {type: 'boolean'}}}}}}
        }
        const middleware = bodyParamParser()(operation)

        const req = reqBuilder().withContentType(contentType).withBody({test: 'abc'}).build()

        const next = sinon.spy()

        // when
        middleware(req, {}, next)

        // then
        sinon.assert.called(next)
        expect(req.body.test).to.equal('abc')
    })
})
