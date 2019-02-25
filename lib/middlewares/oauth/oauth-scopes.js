const {get} = require('lodash')
const MissingRequiredScopes = require('../../../errors/MissingRequiredScopes')

module.exports = (requiredScopes, grantedScopesLocation) => (req, res, next) => {
    const grantedScopes = get(req, grantedScopesLocation)
    if (grantedScopes) {
        return grantedScopes.some(scope => requiredScopes.includes(scope))
            ? next()
            : next(new MissingRequiredScopes(requiredScopes))
    }
    return next()
}
