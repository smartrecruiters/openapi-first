const {isEmpty} = require('lodash')
const validate = require('../../lib/middlewares/body/validate')
const {groupSchemasByMediaRange} = require('../../openapi/request-body')

module.exports = ({schemaValidator, mediaTypes}) =>
    function ({requestBody}) {
        if (!requestBody) {
            return
        }

        const schemasByMediaRange = groupSchemasByMediaRange(requestBody, mediaTypes)

        if (isEmpty(schemasByMediaRange)) {
            return
        }

        return validate(schemaValidator, schemasByMediaRange)
    }
