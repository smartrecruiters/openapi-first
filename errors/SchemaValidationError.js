module.exports = class SchemaValidationError extends Error {
    constructor(errors) {
        super()
        this.name = this.constructor.name
        this.errors = errors
    }
}
