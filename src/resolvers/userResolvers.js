import Joi from 'joi'
import mongoose from 'mongoose'
import { UserInputError } from 'apollo-server-express'
import { signUp } from '../schemas'
import { User } from '../models'
import * as Auth from '../auth'

export default {
    Query:{
        me: (root, args, { req }, info) => {

            return User.findOne({'username': req.user.username})                
        },
        users: async (root, args, { req }) => {
           return User.find({})
        },
        user: async (root, { id }, { req }) => {
           
            return User.findById(id)
           
        },
       
    },
    Mutation:{
        signUp: async (root, args, {res} ) => {

          const result = Joi.validate(args, signUp);
            if( result.error ) {
                return new UserInputError(result.error.details[0].context.label)
                }

            const user = await User.create(args)
            return user

        },
        signIn: async (root, args) => {
            const user = await Auth.attemptSignIn(args.username, args.password)
            const token = Auth.getToken(user)
            return token
        },
    },
    User: {
        chats: async (user, args, context, info) => {
            return (await user.populate('chats').execPopulate()).chats
        },
    }
}