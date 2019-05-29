const MissingRequiredScopesError = require('../../errors/MissingRequiredScopes')

/**
 * Sends response with `403` status code and message with required scopes
 * when `err` is an instance of `MissingRequiredScopes`
 *
 * @returns {function(err, req, res, next)} error handler
 */
module.exports = () => (err, req, res, next) => {
    if (err instanceof MissingRequiredScopesError) {
        const scope = err.requiredScopes.join(' ')
        res.setHeader('WWW-Authenticate',
            `Bearer scope="${scope}" error="insufficient_scope" `
            + 'error_description="Insufficient scope for this resource"')
        res.status(403).end()
    } else {
        return next(err)
    }
}
