const defaults = require('../../lib/middlewares/query/defaults')

module.exports = () => function ({parameters = []}) {

    const defaultQueryParameters = parameters
        .filter(p => p.in === 'query')
        .filter(p => p.schema && p.schema.default !== undefined)
        .map(p => ({[p.name]: p.schema.default}))

    if (defaultQueryParameters.length === 0) {
        return
    }

    return defaults(defaultQueryParameters)
}
