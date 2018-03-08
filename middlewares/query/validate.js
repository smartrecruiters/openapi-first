const validate = require('../../lib/middlewares/query/validate')

module.exports = ({schemaValidator}) => function ({parameters = []}) {

    const queryParameters = parameters.filter(p => p.in === 'query')

    if (queryParameters.length === 0) {
        return
    }

    const queryModel = {
        type: 'object',
        properties: queryParameters.reduce((schemasByName, {name, schema}) => {
            schemasByName[name] = schema
            return schemasByName
        }, {}),
        required: queryParameters.filter(p => p.required).map(p => p.name)
    }

    return validate(schemaValidator, queryModel)
}
