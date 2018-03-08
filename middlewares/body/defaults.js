const {mapValues} = require('lodash')
const defaults = require('../../lib/middlewares/body/defaults')
const schemaDefaults = require('../../lib/utils/schema-defaults')

module.exports = () => ({requestBody}, {spec}) => {
    if (!requestBody) {
        return
    }

    const defaultsByMediaRange = mapValues(requestBody.content, mediaTypeObject =>
        schemaDefaults(mediaTypeObject.schema, spec))

    return defaults(defaultsByMediaRange)
}
