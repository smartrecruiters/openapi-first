const pick = require('../../lib/middlewares/query/pick')

module.exports = () => function ({parameters = []}) {
    const queryParameters = parameters.filter(p => p.in === 'query')

    if (queryParameters.length === 0) {
        return
    }

    return pick(queryParameters.map(p => p.name))
}
