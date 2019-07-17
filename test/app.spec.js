const openApi = require('../openapi/app')

describe('api', () => {

    const spec = {
        paths: {
            '/a': {
                parameters: [
                    {in: 'query', name: 'p'}
                ],
                get: {
                    operationId: 'a',
                    requestBody: {},
                    parameters: [{in: 'query', name: 'p'}]
                }
            },
            '/b': {
                parameters: [],
                get: {
                    operationId: 'b1'
                },
                post: {
                    operationId: 'b2'
                }
            },
            requestBody: {}
        },
        components: {}
    }
    it('should add middleware to app', () => {
        // given
        const app = {get: sinon.spy(), post: sinon.spy()}
        const middlewareA = sinon.fake.returns('A')
        const middlewareB = sinon.fake()

        // when
        openApi(app, spec).use(middlewareA)
        openApi(app, spec).use(middlewareB)

        // then
        sinon.assert.calledThrice(middlewareA)
        sinon.assert.calledWithMatch(app.get, '/a', sinon.match.func)
        sinon.assert.called(middlewareA)
        sinon.assert.calledWithMatch(app.get, '/b', sinon.match.func)
        sinon.assert.called(middlewareA)
        sinon.assert.calledWithMatch(app.post, '/b', sinon.match.func)
        sinon.assert.called(middlewareA)
    })
})
