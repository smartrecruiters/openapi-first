const {keys} = require('lodash')
const validate = require('../../lib/middlewares/content-type/validate')

module.exports = () => ({requestBody}) => {
    if (!requestBody) {
        return
    }

    const mediaRanges = keys(requestBody.content)

    return validate(mediaRanges)
}
