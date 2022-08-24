class AppError extends Error {
    constructor(message, statusCode) {
        super(message);
        // this.message = message;
        this.statusCode = statusCode;
        this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
        this.isOperational = true;
        this.stack = new Error().stack; // do this, if you need a custom getter
        Error.captureStackTrace(this, this.constructor);
    }
}

export default AppError;
