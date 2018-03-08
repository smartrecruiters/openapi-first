const {pick} = require('lodash')

module.exports = names => function (req, res, next) {
    req.query = pick(req.query, names)
    return next()
}
