import express from 'express';
import Blog from '../models/Blogs.js';
import Comment from '../models/Comments.js';

const router = express.Router();

//set routes for blogs

//get all blogs
router.get('/', async (req,res)=>{
    const allBlogs = await Blog.find();
    res.send(allBlogs);
});

//add a new blog
router.post('/create', async (req,res)=>{
    const newBlog = new Blog(req.body);
    const savedBlog = await newBlog.save();
    res.send(savedBlog);
});

//get blog by id
router.get('/get/:id', async (req,res)=>{
    const blogSpecific = await Blog.findById({_id: req.params.id});
    res.send(blogSpecific);
});

//update a blog by id
router.patch('/update/:id', async (req, res) => {
	const updatedBlog = await Blog.updateOne({_id: req.params.id}, {$set: req.body});
	res.send(updatedBlog);
});

//delete a blog by id
router.delete('/delete/:id', async (req, res) => {
	const deletedBlog = await Blog.findByIdAndDelete({ _id: req.params.id });
	res.send(deletedBlog);
});

//set routes for comments

//get all comments for a blog

//post a comment

export default router;