const FORM_STYLE = 'form'
const STYLE_TO_DELIMITER = {
    form: ',',
    spaceDelimited: ' ',
    pipeDelimited: '|'
}

module.exports.uniquenessCriterion = parameter => ({name: parameter.name, in: parameter.in})

module.exports.defaults = parameter => {
    parameter.style = parameter.style || FORM_STYLE
    parameter.explode = parameter.explode === false ? parameter.explode : parameter.style === FORM_STYLE
}

module.exports.isMulti = parameter => parameter.style === FORM_STYLE && parameter.explode

module.exports.getDelimiter = parameter => STYLE_TO_DELIMITER[parameter.style]
