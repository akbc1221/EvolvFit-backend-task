import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

import postRoute from './routes/Posts.js';
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

//body parser
app.use(express.json({extended: true}));
app.use(express.urlencoded({extended: true}));


//routes
app.get('/',(req,res)=>{
    res.send("Welcome to blogs site");
});

app.use('/blogs',postRoute);


