const MiddlewareOncePerReq = require('../../lib/middleware-once-per-req')

describe('openapi middleware', () => {

    it('should be run once for the same request', () => {
        // given
        const middleware = sinon.spy()
        const next = sinon.spy()
        const req = {}

        // when
        const wrappedMiddleware = MiddlewareOncePerReq()(middleware)
        wrappedMiddleware(req, undefined, next)
        wrappedMiddleware(req, undefined, next)

        // then
        sinon.assert.callOrder(middleware, next)
        sinon.assert.calledOnce(middleware)
        sinon.assert.calledOnce(next)
    })
})
