const stringToBoolean = {true: true, false: false}

module.exports.parse = value => stringToBoolean[value]

module.exports.is = v => typeof v === 'boolean'
