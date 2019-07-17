const uuid = require('uuid')

module.exports = () => {
    const middlewareId = uuid()

    return middleware => (req, res, next) => {
        req._openApiFirst = req._openApiFirst || {usedMiddlewares: []}
        if (req._openApiFirst.usedMiddlewares.includes(middlewareId)) {
            return next()
        }
        req._openApiFirst.usedMiddlewares.push(middlewareId)
        middleware(req, res, next)
    }
}
