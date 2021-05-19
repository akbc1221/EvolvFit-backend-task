/* eslint-disable no-unused-vars */
import express from 'express';
import Blog from '../models/Blogs.js';
import Comment from '../models/Comments.js';
import catchAsync from '../util/catchAsync.js';
import CustomError from '../util/CustomError.js';

const router = express.Router();


//set routes for blogs
//get all blogs
router.get('/', catchAsync(async(req,res,next) => {
    const allBlogs = await Blog.find();
    res.status(200).send(allBlogs);
}));

//add a new blog
router.post('/create', catchAsync(async(req,res,next) => {
    const newBlog = new Blog(req.body);
    const savedBlog = await newBlog.save();
    res.status(201).send(savedBlog);
}));

//get blog by id
router.get('/get/:id', catchAsync(async(req,res,next) => {
    const blogSpecific = await Blog.findById({_id: req.params.id});
    res.status(200).send(blogSpecific);
}));

// ,(err,blog) => {

//     if(!blog){
//         return next(new CustomError(`No document with id: ${req.params.id}`,404));
//     }

//     if(err){
//         return next(new CustomError("Some error occurred",400));
//     }
// }

//update a blog by id
router.patch('/update/:id', catchAsync(async(req, res, next) => {
	const updatedBlog = await Blog.updateOne({_id: req.params.id}, {$set: req.body});
	res.status(200).send(updatedBlog);
}));


//delete a blog by id
router.delete('/delete/:id', catchAsync(async(req, res, next) => {
	const deletedBlog = await Blog.findByIdAndDelete({ _id: req.params.id });
	res.status(202).send(deletedBlog);
}));



//set routes for comments
//get all comments for a blog
router.get('/get/:id/comment', catchAsync(async(req, res, next) => {
    const blogSpecific = await Blog.findById({_id: req.params.id});
    const allCommentId = blogSpecific.toJSON().comments;
    const allComments = [];

    await Promise.all(allCommentId.map( async(comment_id) => {
        const comment = await Comment.findById({_id: comment_id});
        allComments.push(comment);
    })).then(()=> res.status(200).send(allComments))

}));

//post a comment
router.post('/create/:id/comment', catchAsync(async(req, res, next) => {
    const id = req.params.id;
    const blogSpecific = await Blog.findById({_id: id});
    
    const comment = new Comment({
        content: req.body.comment,
        blog: id
    });

    const savedComment = await comment.save();
    blogSpecific.comments.push(comment);

    await blogSpecific.save((err) => {
        if(!err) {
            res.status(201).send(savedComment);
        }
    });

}));

export default router;