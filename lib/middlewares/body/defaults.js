const {defaultsDeep, keys} = require('lodash')
const {getBestMatchingMediaRange} = require('../../../openapi/request-body')

module.exports = defaultsByMediaRange => function (req, res, next) {

    const bestMatchingMediaRange = getBestMatchingMediaRange(keys(defaultsByMediaRange), req.headers['content-type'])

    if (!bestMatchingMediaRange) {
        return next()
    }

    const defaultBody = defaultsByMediaRange[bestMatchingMediaRange]

    defaultsDeep(req.body, defaultBody)

    return next()
}
