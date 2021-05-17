import mongoose from 'mongoose';

const CommentSchema = new mongoose.Schema({
    content: {type: String, required: true},
    createdOn: {type: Date, required: false },
    blog:{  
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Blog'
    }

});

export default mongoose.model("Comment",CommentSchema);