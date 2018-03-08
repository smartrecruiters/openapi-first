const {defaultsDeep} = require('lodash')

module.exports = defaultQueryParameters => (req, res, next) => {
    defaultsDeep(req.query, ...defaultQueryParameters)
    return next()
}
