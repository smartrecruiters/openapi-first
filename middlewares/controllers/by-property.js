const otel = require('../../lib/utils/otel')
const path = require('path')

module.exports = ({dir, propertyName = 'x-swagger-router-controller', delimiter}) => operation => {
    const relativePath = delimiter ? operation[propertyName].replace(delimiter, path.sep) : operation[propertyName]
    const controller = require(path.join(dir, relativePath))

    return (req, res, next) =>
        otel.runWithBaggage(
            'source.http.route', `${operation.method.toUpperCase()} ${req.baseUrl}${operation.path}`,
            () => Promise.resolve(controller(req, res, next)).catch(next)
        )
}
