const bodyDefaults = require('../../../middlewares/body/defaults')()
const reqBuilder = require('../../builders/req')

describe('body defaults middleware', () => {

    it('should not be created when operation has no request body', () => {
        expect(bodyDefaults({}, {})).to.be.undefined
    })

    const operation = {
        requestBody: {
            content: {
                'application/json': {schema: {$ref: '#/components/schemas/TestSchema'}}
            }
        }
    }

    const operation2 = {
        requestBody: {
            content: {
                'application/json': {schema: {$ref: '#/components/schemas/NoDefaults'}}
            }
        }
    }

    const spec = {
        components: {
            schemas: {
                TestSchema: {
                    type: 'object',
                    properties: {
                        a: {
                            type: 'string',
                            default: 'defaultA'
                        },
                        b: {
                            type: 'string',
                            default: 'defaultB'
                        },
                        c: {
                            type: 'string'
                        }
                    }
                },
                NoDefaults: {
                    type: 'object',
                    properties: {
                        a: {
                            type: 'string'
                        }
                    }
                }
            }
        }
    }

    it('should not set defaults when no no defaults', () => {
        // given

        const req = reqBuilder().withContentType('application/json').build()
        req.body = {b: 'b', c: 'c'}
        const next = sinon.spy()

        // when
        const middleware = bodyDefaults(operation2, {spec})

        middleware(req, undefined, next)
        expect(req.body).to.eql({b: 'b', c: 'c'})
    })

    it('should set defaults', () => {
        // given
        const req = reqBuilder().withContentType('application/json').build()
        req.body = {b: 'b', c: 'c'}
        const next = sinon.spy()

        // when
        const middleware = bodyDefaults(operation, {spec})

        //then
        middleware(req, undefined, next)

        expect(req.body).to.eql({a: 'defaultA', b: 'b', c: 'c'})
    })

    it('should not set defaults for different media type', () => {
        // given
        const req = reqBuilder().withContentType('multipart/form-data').build()

        req.body = {b: 'b', c: 'c'}
        const next = sinon.spy()

        // when
        const middleware = bodyDefaults(operation, {spec})

        //then
        middleware(req, undefined, next)

        expect(req.body).to.eql({b: 'b', c: 'c'})
    })
})
