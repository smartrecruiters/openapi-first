module.exports = function(req, res) {
    res.json({greeting: `Hello, ${req.query.name}!`})
}
