const InvalidPathParamsErrors = require('../../../errors/InvalidPathParamsError')

module.exports = (schemaValidator, pathModel) => (req, res, next) => {
    const errors = schemaValidator.validate(req.params, pathModel)
    return errors ? next(new InvalidPathParamsErrors(errors)) : next()
}
