class CustomError extends Error{
    constructor(option=false,message,code){
        super(message);
        this.code = code;
        this.isOperational = option
        Error.captureStackTrace(this,this.constructor)
    }
}

module.exports = CustomError;