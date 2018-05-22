const {mergeWith, isUndefined} = require('lodash')

module.exports = defaultQueryParameters => (req, res, next) => {
    const customizer = objValue => isUndefined(objValue) ? undefined : objValue
    mergeWith(req.query, ...defaultQueryParameters, customizer)
    return next()
}
