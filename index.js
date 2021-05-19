import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

import postRoute from './routes/Routes.js';
import CustomError from './util/CustomError.js';
import errorHandler from './controller/errorController.js';

//uncaught exception
process.on('uncaughtException', err => {
    console.log("UNCAUGHT EXCEPTION => Shutting down application...\n");
    console.log(`${err.name}: ${err.message}`);
    process.exit(1);
});

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

//connect to database
//use own mongoDB url in place of process.env.CONNECTION_URL
mongoose.connect(process.env.CONNECTION_URL, 
    {   useNewUrlParser: true, 
        useUnifiedTopology: true })
    .then(() => console.log("database connected"))
    .catch((error) => console.log(`${error} could not connect`));

//server
const server = app.listen(PORT, () => console.log(`Server Running on port: ${PORT}`));

//middle ware
app.use(express.json({extended: true}));
app.use(express.urlencoded({extended: true}));


//routes
app.get('/',(req,res)=>{
    res.send("Welcome to blog homepage");
});

app.use('/blogs',postRoute);


//error invalid page urls
app.use((req,res,next) => {
    next(new CustomError("Page not found",404));
});

//universal handle error
app.use(errorHandler);

//unhandled Rejection Errors
process.on('unhandledRejection', err => {
    console.log("UNHANDLED REJECTION => Shutting down application...\n");
    console.log(`${err.name}: ${err.message}`);
    server.close(() => {
        process.exit(1);
    })
});

//mongoose warning suppressor
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);


