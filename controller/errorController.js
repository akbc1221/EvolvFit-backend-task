import CustomError from '../util/CustomError.js';

const handleCastErrorDB = err => {
    const val = err.value._id || err.value;
    const message = `Invalid ${err.path}: ${val}`;
    return new CustomError(message, 400);
}

const handleDuplicatesFieldsDB = err => {
    const message = `The value ${err.keyValue.title} already exists. Please use another name`;
    return new CustomError(message, 400);
}

const handleValidationDB = err => {
    const message = `${err.message}`;
    // console.log(message)
    return new CustomError(message, 400);
}

const sendDevError = (err, res) => {
    res.status(err.statusCode || 500).send({
        error: {
            status: err.status || 'error',
            error: err,
            message: err.message,
            stack: err.stack
        }
    });
}

const sendProdError = (err, res) => {
    //if error is operational client is notified
    if(err.isOperational){
        res.status(err.statusCode || 500).send({
            error: {
                status: err.status || 'error',
                message: err.message
            }
        });
    //client is not notified by internal package errors
    }else{
        //log error
        console.error("ERROR :( ", err);

        res.status(500).send({
            error: {
                status: 'error',
                message: "Something went wrong"
            }
        });
    }
}

export default (err,req,res,next) => {
    // console.log(process.env.NODE_ENV);

    if(process.env.NODE_ENV === 'development'){
        sendDevError(err, res);

    }else if(process.env.NODE_ENV === 'production'){
        let error = {...err};
        
        if(err.name === "CastError") {
            error = handleCastErrorDB(err);
        }

        if(err.code === 11000){
            error = handleDuplicatesFieldsDB(err);
        }
        if(err.name === "ValidationError"){
            error = handleValidationDB(err);
        }
        sendProdError(error, res);
    }

}