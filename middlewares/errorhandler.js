function errorHandler(err, req, res, next) {
    if (err.name === 'Forbidden') {
        res.status(403).json({
            statusCode: 403,
            error: {
                message: err.name
            }
        })
    } else if (err.name === "Email/Password not valid" || err.name === 'Please login first') {
        res.status(401).json({
            statusCode: 401,
            error: {
                message: err.name
            }
        })
    } else if (err.name === 'SequelizeUniqueConstraintError') {
        err = 'Email has been registered'
        res.status(400).json({
            statusCode: 400,
            error: {
                message: err
            }
        })
    } else if (err.name === 'SequelizeValidationError') {
        err = err.errors.map(el => el.message)
        res.status(400).json({
            statusCode: 400,
            error: {
                message: err
            }
        })
    } else if (err.name === 'Error not Found') {
        res.status(404).json({
            statusCode: 404,
            error: {
                message: "Error not found"
            }
        })
    } else {
        res.status(500).json({
            statusCode: 500,
            error: {
                message: "Internal Server Error"
            }
        })
    }

}

module.exports = errorHandler