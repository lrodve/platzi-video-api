const boom = require("@hapi/boom")
const config = require("../../config")


function withErrorStack(error, stack) {
    if (config.dev) {
        return { ...error, stack }
    } else {
        return error
    }
}

function logErrors(err, req, res, next) {
    next(err)
}

function wrapError(err, req, next) {
    if (!err.isBoom) {
        next(boom.badImplementation)
    }

    next(err) // eslint-disable-line
}

function errorHandler(err, req, res, next) {    // eslint-disable-line

    const { output: { statusCode, payload } } = err

    res.status(statusCode)
    res.json(withErrorStack(payload, err.stack))
}

module.exports = { logErrors, wrapError, errorHandler }