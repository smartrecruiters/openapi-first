const MissingRequiredScopesError = require('../../errors/MissingRequiredScopes')

/**
 * Sends response with `403` status code and message with required scopes
 * when `err` is an instance of `MissingRequiredScopes`
 *
 * @returns {function(err, req, res, next)} error handler
 */
module.exports = () => (err, req, res, next) => {
    if (err instanceof MissingRequiredScopesError) {
        res.status(403).json({message: `Missing required scopes: ${err.requiredScopes}`})
    } else {
        return next(err)
    }
}
