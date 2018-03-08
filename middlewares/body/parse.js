const {isEmpty} = require('lodash')

const {groupSchemasByMediaRange} = require('../../openapi/request-body')
const parse = require('../../lib/middlewares/body/parse')

module.exports = ({mediaTypes} = {}) => function ({requestBody}) {
    if (!requestBody) {
        return
    }

    const schemasByMediaRange = groupSchemasByMediaRange(requestBody, mediaTypes)

    if (isEmpty(schemasByMediaRange)) {
        return
    }

    return parse(schemasByMediaRange)
}
