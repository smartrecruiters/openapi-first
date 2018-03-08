const typeis = require('type-is')
const InvalidContentTypeError = require('../../../errors/InvalidContentTypeError')

module.exports = mediaRanges => (req, res, next) =>
    typeis(req, mediaRanges) ? next() : next(new InvalidContentTypeError(mediaRanges))
