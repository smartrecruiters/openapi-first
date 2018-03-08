const parsers = require('../../parsers')

module.exports = queryParameters => (req, res, next) => {
    queryParameters.forEach(p => {
        const value = req.query[p.name]
        if (value) {
            req.query[p.name] = parsers.parse(p.schema.type, value, p)
        }
    })
    return next()
}
