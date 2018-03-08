module.exports.toRoutePath = path => path.replace(/\{(\w+)}/g, ':$1')
