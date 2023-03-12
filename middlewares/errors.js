import ErrorHandler from '../utils/errorHandler';

const errorHandlerMiddleware = (err, req, res, next) => {
    let error = { ...err };
    error.statusCode = err.statusCode || 500;
    error.message = err.message;

    // Wrong Mongoose Object ID Error
    if (err.name === 'CastError') {
        const message = `Resource not found. Invalid: ${err.path}`;
        error = new ErrorHandler(message);
        error.statusCode = 400;
    }

    // Handling Mongoose validation error
    if (err.name === 'ValidationError') {
        const message = Object.values(err.errors).map((value) => value.message);
        error = new ErrorHandler(message);
        error.statusCode = 400;
    }

    res.status(error.statusCode).json({
        success: false,
        error,
        message: error.message,
        stack: error.stack,
    });
};

export default errorHandlerMiddleware;
