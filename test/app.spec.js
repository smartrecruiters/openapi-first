const openApi = require('../openapi/app')

describe('api', () => {

    const spec = {
        paths: {
            '/a': {
                parameters: [
                    {in: 'query', name: 'p'}
                ],
                get: {
                    requestBody: {},
                    parameters: [{in: 'query', name: 'p'}]
                }
            },
            '/b': {
                parameters: [],
                get: {},
                post: {}
            },
            requestBody: {}
        },
        components: {}
    }
    it('should add middleware to app', () => {
        // given
        const app = {get: sinon.spy(), post: sinon.spy()}
        const middlewareA = () => 'A'
        const middlewareB = () => undefined

        // when
        openApi(app, spec).use(middlewareA)
        openApi(app, spec).use(middlewareB)

        // then
        sinon.assert.calledWith(app.get, '/a', middlewareA())
        sinon.assert.calledWith(app.get, '/b', middlewareA())
        sinon.assert.calledWith(app.post, '/b', middlewareA())
    })
})
