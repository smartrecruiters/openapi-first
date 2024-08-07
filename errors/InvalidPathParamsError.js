const SchemaValidationError = require('./SchemaValidationError')

module.exports = class InvalidPathParamsError extends SchemaValidationError {
    constructor(errors) {
        super(errors)
        this.name = this.constructor.name
    }
}
