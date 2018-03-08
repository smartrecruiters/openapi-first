const {pickBy, some, mapValues, sortBy, filter} = require('lodash')
const typeIs = require('type-is')

module.exports.groupSchemasByMediaRange = (requestBody, mediaTypes) => {

    const mediaTypeObjectByMediaRange = mediaTypes
        ? pickBy(requestBody.content, (v, mediaRange) =>
            some(mediaTypes, mediaType => typeIs.is(mediaType, mediaRange)))
        : requestBody.content

    return mapValues(mediaTypeObjectByMediaRange, 'schema')
}

module.exports.getBestMatchingMediaRange = (mediaRanges, contentType) => {

    const reqMediaRanges = filter(mediaRanges, mediaRange => typeIs.is(contentType, mediaRange))

    if (reqMediaRanges.length !== 0) {
        return sortBy(reqMediaRanges, (mr1, mr2) => typeIs.is(mr1, mr2))
    }
}
