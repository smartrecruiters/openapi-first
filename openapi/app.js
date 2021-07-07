const {forOwn, cloneDeep, unionBy} = require('lodash')

const pathUtils = require('./path')
const {uniquenessCriterion} = require('./parameters')

const middlewareOncePerReq = require('../lib/middleware-once-per-req')
const refResolver = require('../lib/utils/ref-resolver')

module.exports = function (app, spec) {

    const resolveRef = refResolver(spec)

    return {
        use: openApiMiddleware => {
            const oncePerReq = middlewareOncePerReq()

            forOwn(spec.paths, (pathItem, path) => {

                const defaultParams = pathItem.parameters && pathItem.parameters.map(resolveRef)

                forOwn(pathItem, (value, key) => {
                    if (!value.operationId) {
                        return
                    }

                    const operation = cloneDeep(value)

                    operation.path = path
                    operation.method = key
                    operation.parameters = operation.parameters && operation.parameters.map(resolveRef)
                    operation.parameters = unionBy(operation.parameters, defaultParams, uniquenessCriterion)
                    operation.requestBody = operation.requestBody && resolveRef(operation.requestBody)

                    const middleware = openApiMiddleware(operation, {spec})
                    if (middleware) {
                        app[key](pathUtils.toRoutePath(path), oncePerReq(middleware))
                    }
                })
            })
        }
    }
}

