export default (err,req,res,next)=>{

    res.status(err.statusCode || 500).send({
        error: {
            status: err.status || 'error',
            message: err.message
        }
    });
}