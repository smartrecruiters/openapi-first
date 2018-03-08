module.exports = function(req, res) {
    res.status(200).json({greeting: `Hello, ${req.query.name}!`})
}
