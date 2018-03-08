const parsers = require('./index')

const {getDelimiter, isMulti, defaults} = require('../../openapi/parameters')

function parseArray(value, parameter) {
    if (isMulti(parameter)) {
        return Array.isArray(value) ? value : [value]
    }
    return value.split(getDelimiter(parameter))
}

module.exports.parse = (v, parameter) => {
    defaults(parameter)
    const array = parseArray(v, parameter)
    return array.map(v => parsers.parse(parameter.schema.items.type, v, parameter))
}

module.exports.is = Array.isArray
