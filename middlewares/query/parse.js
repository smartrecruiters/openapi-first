const parse = require('../../lib/middlewares/query/parse')

module.exports = () => function ({parameters = []}) {
    const queryParameters = parameters.filter(p => p.in === 'query')

    if (queryParameters.length === 0) {
        return
    }
    return parse(queryParameters)
}
