const oauthScopes = require('../../lib/middlewares/oauth/oauth-scopes')

module.exports = ({grantedScopesLocation = 'headers[\'X-Oauth-Scopes\']'} = {}) => operation => {
    const [{oauth: requiredScopes}] = operation.security
    return oauthScopes(requiredScopes, grantedScopesLocation)
}
