const users = require('../../domain/users')

module.exports = function(req, res) {
    res.json(users.getAll())
}
