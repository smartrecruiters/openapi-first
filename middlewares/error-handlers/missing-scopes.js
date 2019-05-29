const MissingRequiredScopesError = require('../../errors/MissingRequiredScopes')

const insufficientScope = (realm, scope) => {
    const scheme = 'Bearer '
    const properties = [realm ? `realm="${realm}"` : '',
        `scope="${scope}"`,
        'error="insufficient_scope"',
        'error_description="Insufficient scope for this resource"']
    return scheme + properties.filter(Boolean).join(', ')
}

/**
 * Sends response with `403` status code and message with required scopes
 * when `err` is an instance of `MissingRequiredScopes`
 *
 * The response includes `WWW-Authenticate` header with scope, error, error_description and optionally realm properties,
 * according to RFC6750 The OAuth 2.0 Authorization specification.
 *
 * @returns {function(err, req, res, next)} error handler
 */
module.exports = ({realm} = {}) => (err, req, res, next) => {
    if (err instanceof MissingRequiredScopesError) {
        const scope = err.requiredScopes.join(' ')
        res.setHeader('WWW-Authenticate', insufficientScope(realm, scope))
        res.status(403).json({message: `Missing required scopes: ${err.requiredScopes}`})
    } else {
        return next(err)
    }
}
