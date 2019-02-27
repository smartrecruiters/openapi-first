const {pickBy, keys, values, flatten} = require('lodash')

const oauthScopes = require('../../lib/middlewares/oauth/oauth-scopes')

/**
 * Verifies scope access to operation by comparing granted OAuth scopes and required scopes to perform that operation.
 *
 * Uses required OAuth scopes assigned to given operation or global security definition
 * if the first one is not specified.
 * Granted scopes are retrieved from `options.grantedScopesLocation`.
 *
 * In situation when there is more than one OAuth strategy assigned to operation the first one is taken for the check.
 *
 * To successfully pass through the middleware the request must have at least one of the required scopes.
 * It is also possible to successfully pass through when request has undefined `options.grantedScopesLocation` property.
 * On error `MissingRequiredScopes` error is created.
 *
 * @param {Object} options options
 * @param {object} options.grantedScopesLocation request property to retrieve granted scopes
 * @returns {Function} middleware
 */
module.exports = ({grantedScopesLocation = 'headers.x-oauth-scopes'} = {}) => (operation, {spec}) => {
    const security = operation.security ? operation.security : spec.security

    if (!security) {
        return
    }

    const oauthSchemes = pickBy(spec.components.securitySchemes, scheme => scheme.type === 'oauth2')
    const oauthNames = keys(oauthSchemes)
    const oauthStrategy = security.find(strategy => oauthNames.includes(keys(strategy).toString()))

    if (oauthStrategy) {
        return oauthScopes(flatten(values(oauthStrategy)), grantedScopesLocation)
    }
}
