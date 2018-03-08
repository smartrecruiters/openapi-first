const InvalidQueryParamsErrors = require('../../../errors/InvalidQueryParamsError')

module.exports = (schemaValidator, queryModel) => (req, res, next) => {
    const errors = schemaValidator.validate(req.query, queryModel)
    return errors ? next(new InvalidQueryParamsErrors(errors)) : next()
}
