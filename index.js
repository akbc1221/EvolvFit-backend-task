import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

import postRoute from './routes/Routes.js';
dotenv.config();

const app = express();

//connect to database
const PORT = process.env.PORT || 5000;

//use own mongoDB url in place of process.env.CONNECTION_URL
mongoose.connect(process.env.CONNECTION_URL, 
    {   useNewUrlParser: true, 
        useUnifiedTopology: true })
    .then(() => app.listen(PORT, () => console.log(`Server Running on port: ${PORT}`)))
    .catch((error) => console.log(`${error} could not connect`));

//to prevent warnings deprecated
mongoose.set('useFindAndModify', false);

//middle ware
app.use(express.json({extended: true}));
app.use(express.urlencoded({extended: true}));

//routes
app.get('/',(req,res)=>{
    res.send("Welcome to blogs site");
});

app.use('/blogs',postRoute);

//error
app.use((req,res,next)=>{
    const err = new Error("page not found");
    err.status = 404;
    next(err);
});

//handle error
app.use((err,req,res,next)=>{
    res.status(err.status || 500);
    res.send({
        error: {
            status: err.status || 500,
            message: err.message
        }
    })
});

