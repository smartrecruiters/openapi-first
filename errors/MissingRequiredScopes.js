module.exports = class MissingRequiredScopes extends Error {
    constructor(requiredScopes) {
        super()
        this.name = this.constructor.name
        this.requiredScopes = requiredScopes ? requiredScopes : []
    }
}
