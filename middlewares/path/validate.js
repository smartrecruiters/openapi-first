const validate = require('../../lib/middlewares/path/validate')

module.exports = ({schemaValidator}) => function ({parameters = []}) {

    const pathParameters = parameters.filter(p => p.in === 'path')

    if (pathParameters.length === 0) {
        return
    }

    const pathModel = {
        type: 'object',
        properties: pathParameters.reduce((schemasByName, {name, schema}) => {
            schemasByName[name] = schema
            return schemasByName
        }, {}),
        required: pathParameters.filter(p => p.required).map(p => p.name)
    }

    return validate(schemaValidator, pathModel)
}
