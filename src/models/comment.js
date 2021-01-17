import mongoose, { Schema } from 'mongoose';

const { ObjectId } = Schema.Types

const commentSchema = Schema({
    description: String,
    user: {
        type: ObjectId,
        ref: 'User'
    },
    chat: {
        type: ObjectId,
        ref: 'Chat'
    }
}, { timestamps: true })

export default mongoose.model('Comment', commentSchema) 