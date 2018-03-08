module.exports = class InvalidContentTypeError extends Error {
    constructor(validContentTypes) {
        super()
        this.name = this.constructor.name
        this.validContentTypes = validContentTypes
    }
}
