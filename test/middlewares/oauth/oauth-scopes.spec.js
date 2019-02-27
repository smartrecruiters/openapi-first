const oauthScopes = require('../../../middlewares/oauth/oauth-scopes')
const MissingRequiredScopes = require('../../../errors/MissingRequiredScopes')

describe('oauth scopes middleware', () => {

    const spec = {
        paths: {
            '/hello': {
                get: {
                    security: [
                        {
                            oauth: [
                                'write',
                                'execute'
                            ]
                        }
                    ]
                }
            }
        },
        components: {
            securitySchemes: {
                oauth: {
                    type: 'oauth2'
                },
                key: {
                    type: 'apiKey'
                }
            }
        }
    }

    const operation = spec.paths['/hello'].get

    it('should pass request containing required scopes in user', done => {
        // given
        const middleware = oauthScopes({grantedScopesLocation: 'user.grantedScopes'})(operation, {spec})
        const req = {user: {grantedScopes: ['write']}}

        // when
        middleware(req, undefined, done)
    })

    it('should pass request containing required scopes in header', done => {
        // given
        const middleware = oauthScopes()(operation, {spec})
        const req = {headers: {'x-oauth-scopes': ['read', 'write']}}

        // when
        middleware(req, undefined, done)
    })

    it('should indicate missing required scopes', () => {
        //given
        const middleware = oauthScopes({grantedScopesLocation: 'user.grantedScopes'})(operation, {spec})
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
        const middleware = oauthScopes({grantedScopesLocation: 'user.grantedScopes'})(operation, {spec})
        const req = {user: {}}

        // when
        middleware(req, undefined, done)
    })

    it('should pass request when security property not set anywhere', () => {
        // given
        const spec = {
            paths: {
                '/hello': {
                    get: {}
                }
            },
            components: {
                securitySchemes: {
                    oauth: {
                        type: 'oauth2'
                    }
                }
            }
        }
        const operation = spec.paths['/hello'].get
        const middleware = oauthScopes()(operation, {spec})

        // when
        expect(middleware).to.be.undefined
    })

    it('should pass request when security property does not contain oauth', () => {
        // given
        const operation = {
            security: [
                {
                    key: []
                }
            ]
        }
        const middleware = oauthScopes()(operation, {spec})

        // when
        expect(middleware).to.be.undefined
    })

    it('should use global security property', () => {
        // given
        const spec = {
            security: [
                {
                    oauth: [
                        'write',
                        'execute'
                    ]
                }
            ],
            paths: {
                '/hello': {
                    get: {}
                }
            },
            components: {
                securitySchemes: {
                    oauth: {
                        type: 'oauth2'
                    }
                }
            }
        }
        const operation = spec.paths['/hello'].get
        const middleware = oauthScopes({grantedScopesLocation: 'user.grantedScopes'})(operation, {spec})
        const req = {user: {grantedScopes: ['read']}}
        const next = sinon.spy()

        // when
        middleware(req, undefined, next)

        // then
        sinon.assert.calledWithMatch(next, sinon.match.instanceOf(MissingRequiredScopes)
            .and(sinon.match.has('requiredScopes', spec.security.find(strategy => strategy.oauth).oauth)))
    })

    it('should use first oauth security definition when more than one', () => {
        // given
        const spec = {
            paths: {
                '/hello': {
                    get: {
                        security: [
                            {
                                oauth1: [
                                    'write',
                                    'execute'
                                ]
                            },
                            {
                                oauth2: [
                                    'read'
                                ]
                            }
                        ]
                    }
                }
            },
            components: {
                securitySchemes: {
                    oauth1: {
                        type: 'oauth2'
                    },
                    oauth2: {
                        type: 'oauth2'
                    },
                    key: {
                        type: 'apiKey'
                    }
                }
            }
        }
        const operation = spec.paths['/hello'].get
        const middleware = oauthScopes({grantedScopesLocation: 'user.grantedScopes'})(operation, {spec})
        const req = {user: {grantedScopes: ['read']}}
        const next = sinon.spy()

        // when
        middleware(req, undefined, next)

        // then
        sinon.assert.calledWithMatch(next, sinon.match.instanceOf(MissingRequiredScopes)
            .and(sinon.match.has('requiredScopes', operation.security.find(strategy => strategy.oauth1).oauth1)))
    })
})
