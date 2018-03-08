const {keys} = require('lodash')
const InvalidBodyError = require('../../../errors/InvalidBodyError')
const {getBestMatchingMediaRange} = require('../../../openapi/request-body')

module.exports = (schemaValidator, schemasByMediaRange) => (req, res, next) => {

    const bestMatchingMediaRange = getBestMatchingMediaRange(keys(schemasByMediaRange), req.headers['content-type'])

    if (!bestMatchingMediaRange) {
        return next()
    }

    const schema = schemasByMediaRange[bestMatchingMediaRange]

    const errors = schemaValidator.validate(req.body, schema)

    if (errors) {
        return next(new InvalidBodyError(errors))
    }
    return next()
}
