const {findById} = require('../../domain/users')
const {findToken} = require('../tokens')

module.exports = (req, res, next) => {
    const token = findToken(req.query.access_token)
    if (!token) {
        return res.status(401).send()
    }
    req.user = findById(token.userId)
    req.user.grantedScopes = token.grantedScopes
    next()
}
