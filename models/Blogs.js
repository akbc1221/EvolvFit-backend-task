import mongoose from 'mongoose';

const BlogSchema = new mongoose.Schema({

    title: {type: String, required: true, trim:true, unique:true},
    content: {type: String, required: true, trim:true},
    author: {type: String, required: true, trim:true},
    createdOn: {type: Date, default: Date.now},
    
    comments: {type: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment'
    }]}

});

export default mongoose.model("Blog",BlogSchema);