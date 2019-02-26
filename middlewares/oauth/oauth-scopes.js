const oauthScopes = require('../../lib/middlewares/oauth/oauth-scopes')

module.exports = ({grantedScopesLocation = 'headers.x-oauth-scopes'} = {}) => operation => {
    if (!operation.security) {
        return
    }

    const [{oauth: requiredScopes}] = operation.security
    return oauthScopes(requiredScopes, grantedScopesLocation)
}
