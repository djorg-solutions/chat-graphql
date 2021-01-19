import mongoose, { Schema } from 'mongoose';
import { hash, compare } from 'bcryptjs'

const { ObjectId } = Schema.Types

const userSchema = Schema({
    username: {
        type: String,
        validate:{
            validator: async username => await User.where({username}).countDocuments() === 0,
            message: ({ value }) => `El nombre de usuario ${value} ya existe.`
        }
    },
    password: String,
    name: String,
    email: String,
    country: String,
    avatar: String,
    phone: String,
    chats: [{
        type: ObjectId,
        ref: 'Chat'
    }],
    comments: [{
        type: ObjectId,
        ref: 'Comment'
    }]
}, { timestamps: true })

userSchema.pre('save', async function(next) {
    if(this.isModified('password')){
        try {
            this.password =  await hash(this.password, 10) 
            next()
        } catch (err) {
            next(err)
        }   
    }    
  })

userSchema.methods.matchesPassword = function (password) {
    return compare(password, this.password)
}

const User =  mongoose.model('User', userSchema) 
export default User