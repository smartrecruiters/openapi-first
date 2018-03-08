const SchemaValidationError = require('./SchemaValidationError')

module.exports = class InvalidBodyError extends SchemaValidationError {
    constructor(errors) {
        super(errors)
        this.name = this.constructor.name
    }
}
