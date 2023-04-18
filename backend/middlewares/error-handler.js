// const { CustomAPIError } = require('../errors')
const { StatusCodes } = require('http-status-codes')
const errorHandlerMiddleware = (err, req, res, next) => {
    let customError = {
            statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
            msg: err.message || "something went wrong"
        }
        // if (err instanceof CustomAPIError) {
        //     return res.status(err.statusCode).json({ msg: err.message })
        // }
        //validation errors
    // if (err.name === 'CastError') {
    //     console.log(1234);
    //     customError.msg = `No item with id:${err.value}`
    //     customError.statusCode = 404;
    // }
    // if (err.name === 'ValidationError') {
    //     console.log(err.errors);
    //     customError.msg = Object.values(err.errors).map((item) => item.message).join(',')
    //     customError.statusCode = 400
    // }
    console.log(1111111);
    console.log(err.code);
    if (err.code && err.code === 11000) {
        customError.msg = `Duplicate value for ${Object.keys(err.keyValue)}`,
            customError.statusCode = 400
    }
    // return res.json({ err })
    return res.status(customError.statusCode).json({ msg: customError.msg })
}

module.exports = errorHandlerMiddleware