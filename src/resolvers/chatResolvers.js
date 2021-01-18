import mongoose from 'mongoose'
import { UserInputError, AuthenticationError } from 'apollo-server-express'
import { Chat, User } from '../models'
import * as Auth from '../auth'

export default {
    Query: {
        chat: (root, {id}) => {
            return Chat.findById(id)
        },
        chats: (root, args) => {
            return Chat.find({})
        }
    },
    Mutation: {
        newChat: async (root, args, { req }) => {
                const chat = await Chat.create(args)
                if(args.owner){
                    await User.findByIdAndUpdate(args.owner, { $push: { chats: chat } })
                    args.guests.forEach(async item => {
                    await User.findByIdAndUpdate(item, { $push: { chats: chat } })
                });    
                }
                return chat
        },
    },
    Chat: {
        guests: async (chat, args, context, info) => {
            return (await chat.populate('guests').execPopulate()).guests
        },
        owner: async (chat, args, context, info) => {
            return (await chat.populate('owner').execPopulate()).owner
        },
        comments:  async (chat, args, context, info) => {
            return (await chat.populate('comments').execPopulate()).comments
        },
    }
}