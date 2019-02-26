const oauthScopes = require('../../../middlewares/oauth/oauth-scopes')
const MissingRequiredScopes = require('../../../errors/MissingRequiredScopes')

describe('oauth scopes middleware', () => {

    it('should pass request containing required scopes in user', done => {
        // given
        const operation = {
            security: [
                {
                    oauth: [
                        'write',
                        'read'
                    ]
                }
            ]
        }
        const middleware = oauthScopes({grantedScopesLocation: 'user.grantedScopes'})(operation)
        const req = {user: {grantedScopes: ['read']}}

        // when
        middleware(req, undefined, done)
    })

    it('should pass request containing required scopes in header', done => {
        // given
        const operation = {
            security: [
                {
                    oauth: [
                        'write',
                        'read'
                    ]
                }
            ]
        }
        const middleware = oauthScopes({grantedScopesLocation: 'headers.x-oauth-scopes'})(operation)
        const req = {headers: {'x-oauth-scopes': ['read', 'write']}}

        // when
        middleware(req, undefined, done)
    })

    it('should indicate missing required scopes', () => {
        const operation = {
            security: [
                {
                    oauth: [
                        'write',
                        'execute'
                    ]
                }
            ]
        }
        const middleware = oauthScopes({grantedScopesLocation: 'user.grantedScopes'})(operation)
        const req = {user: {grantedScopes: ['read']}}
        const next = sinon.spy()

        // when
        middleware(req, undefined, next)

        // then
        sinon.assert.calledWithMatch(next, sinon.match.instanceOf(MissingRequiredScopes)
            .and(sinon.match.has('requiredScopes', operation.security.find(strategy => strategy.oauth).oauth)))
    })

    it('should pass request when granted scopes not set', done => {
        // given
        const operation = {
            security: [
                {
                    oauth: [
                        'write',
                        'read'
                    ],
                    key: []
                }
            ]
        }
        const middleware = oauthScopes({grantedScopesLocation: 'user.grantedScopes'})(operation)
        const req = {user: {}}

        // when
        middleware(req, undefined, done)
    })
})
