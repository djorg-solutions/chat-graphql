import Joi from 'joi'

const username = Joi.string().alphanum().min(4).max(10).required().label("Invalid username")
const name = Joi.string().max(254).required().label("Invalid name")
const password = Joi.string().required().label("The password is required")

const email = Joi.string().email()
const country = Joi.string().max(254)
const avatar = Joi.string().max(254)
const phone = Joi.number()

export const signUp = Joi.object().keys({
    username, name, password, email, country, avatar, phone
})
