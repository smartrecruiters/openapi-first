const {get} = require('lodash')

module.exports = spec => obj => resolve(spec, obj)

function resolve(spec, obj) {
    return isRef(obj) ? resolve(spec, get(spec, ptrToPath(obj.$ref))) : obj
}

const isRef = obj => typeof obj.$ref === 'string'

const ptrToPath = ptr => {
    const path = ptr.split('/')
    path.shift()
    return path
}
