const oauthScopes = require('../../lib/middlewares/oauth/oauth-scopes')

module.exports = ({grantedScopesLocation = 'headers.x-oauth-scopes'} = {}) => operation => {
    const [{oauth: requiredScopes}] = operation.security
    return oauthScopes(requiredScopes, grantedScopesLocation)
}
