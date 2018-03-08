const METHODS = ['get', 'put', 'post', 'delete', 'options', 'head', 'patch', 'trace']

module.exports.is = method => METHODS.includes(method.toLowerCase())
