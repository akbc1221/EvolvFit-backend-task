import mongoose from 'mongoose';

const CommentSchema = new mongoose.Schema({
    content: {type: String, required: true, trim:true},
    createdOn: {type: Date, default: Date.now },
    blog:{  
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Blog'
    }

});

export default mongoose.model("Comment",CommentSchema);