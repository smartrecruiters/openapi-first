const {mapValues, pickBy, isEmpty} = require('lodash')

const refResolver = require('./ref-resolver')

module.exports = (schema, spec) => defaults(schema, refResolver(spec))

function defaults(schema, resolveRef) {
    const resolvedSchema = resolveRef(schema)
    if (schema.default !== undefined) {
        return schema.default
    }
    if (resolvedSchema.type === 'object') {
        const object = pickBy(mapValues(resolvedSchema.properties, p => defaults(p, resolveRef)), v => v !== undefined)
        if (!isEmpty(object)) {
            return object
        }
    }
}
