const {mergeWith, isUndefined} = require('lodash')

module.exports = defaultQueryParameters => (req, res, next) => {
    const customizer = objValue => objValue
    mergeWith(req.query, ...defaultQueryParameters, customizer)
    return next()
}
