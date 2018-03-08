const SchemaValidationError = require('./SchemaValidationError')

module.exports = class InvalidQueryParamsError extends SchemaValidationError {
    constructor(errors) {
        super(errors)
        this.name = this.constructor.name
    }
}
