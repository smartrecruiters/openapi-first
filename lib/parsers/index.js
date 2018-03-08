const parsers = {
    boolean: require('./boolean'),
    integer: require('./integer'),
    number: require('./number'),
    array: require('./array')
}

module.exports.parse = (type, value, parameter) => {
    const parser = parsers[type]
    if (!parser) {
        return value
    }
    const parsed = parser.parse(value, parameter)
    return parser.is(parsed) ? parsed : value
}
