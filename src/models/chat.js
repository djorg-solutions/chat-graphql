import mongoose, { Schema } from 'mongoose';

const { ObjectId } = Schema.Types

const chatSchema = Schema({
    type: String,
    name: String,
    comments: [{
        type: ObjectId,
        ref: 'Comment'
    }],
    owner: {
        type: ObjectId,
        ref: 'User'
    },
    guests: [{
        type: ObjectId,
        ref: 'User'
    }]
}, { timestamps: true })

export default mongoose.model('Chat', chatSchema) 