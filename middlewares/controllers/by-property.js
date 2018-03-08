const path = require('path')

module.exports = ({dir, propertyName = 'x-swagger-router-controller', delimiter} = {}) => operation => {
    const relativePath = delimiter ? operation[propertyName].replace(delimiter, path.sep) : operation[propertyName]
    return require(path.join(dir, relativePath))
}
