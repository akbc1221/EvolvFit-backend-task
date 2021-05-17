import express from 'express';

const router = express.Router();

//set routes

//get all posts
router.get('/',(req,res)=>{
    res.send("get all posts");
});

//add a new blog
router.post('/create',(req,res)=>{
    res.send("created a new post");
});

export default router;