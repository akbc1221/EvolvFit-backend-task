import CustomError from '../util/CustomError.js';

const handleCastErrorDB = err => {
    const message = `Invalid ${err.path}: ${err.value._id}`;
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

    }else if(process.env.NODE_ENV == 'production'){
        let error = {...err};
        // console.log(err.name)

        if(err.name === "CastError") {
            // console.log('casterr');
            error = handleCastErrorDB(err);
        }
        sendProdError(error, res);
    }

}