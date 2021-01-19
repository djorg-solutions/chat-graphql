import mongoose from 'mongoose'
import { PubSub } from 'apollo-server-express'
import { Comment, Chat, User } from '../models'

const COMMENT_ADDED = 'COMMENT_ADDED';
const pubsub = new PubSub();

export default {
    Subscription: {
        commentAdded: {
          subscribe: () => pubsub.asyncIterator([COMMENT_ADDED]),
        },
      },
    Query: {
        comments: (root, args) => {
            return Comment.find({})
        }
    },
    Mutation: {
        newComment: async (root, args, { req }) => {
            const comment = await Comment.create(args)
            await Chat.findByIdAndUpdate(args.chat, { $push: { comments: comment } })
            await User.findByIdAndUpdate(args.user, { $push: { comments: comment } })
            
            const user = await User.findById(args.user);
            pubsub.publish(COMMENT_ADDED, { commentAdded: {
                id: comment._id,
                description: comment.description,
                createdAt: comment.createdAt,
                chat: comment.chat,
                username: user.username
            }});
            return comment
        },
    },
    Comment: {
        user: async (comment, args, context, info) => {
            return (await comment.populate('user').execPopulate()).user
        },
    }
}