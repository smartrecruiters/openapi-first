const {get, has} = require('lodash')

const isRef = obj => typeof obj.$ref === 'string'

const ptrToPath = ptr => {
    const path = ptr.split('/')
    path.shift()
    return path
}

function resolve(spec, obj) {
    if (isRef(obj)) {
        return resolve(spec, get(spec, ptrToPath(obj.$ref)))
    }

    // Check for {schema: {$ref: ...}}
    if (has(obj, 'schema') && isRef(obj.schema)) {
        obj.schema = resolve(spec, get(spec, ptrToPath(obj.schema.$ref)))
        return obj
    }

    return obj
}

module.exports = spec => obj => resolve(spec, obj)
