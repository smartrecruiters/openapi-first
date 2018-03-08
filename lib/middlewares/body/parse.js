const {mapValues, keys} = require('lodash')

const {getBestMatchingMediaRange} = require('../../../openapi/request-body')
const parsers = require('../../parsers')

module.exports = schemasByMediaRange => function (req, res, next) {

    const bestMatchingMediaRange = getBestMatchingMediaRange(keys(schemasByMediaRange), req.headers['content-type'])

    if (!bestMatchingMediaRange) {
        return next()
    }

    const schema = schemasByMediaRange[bestMatchingMediaRange]

    req.body = mapValues(req.body, (value, name) => {
        const property = schema.properties[name]
        if (!property) {
            return value
        }
        return parsers.parse(property.type, value, property)
    })
    return next()
}
