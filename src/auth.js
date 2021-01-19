import { AuthenticationError } from 'apollo-server-express';
import jwt from 'jsonwebtoken'
import _ from 'lodash'
import { User } from './models'
import { SECRET } from './config'

export const attemptSignIn = async (username, password) => {

    const message = 'Usuario o contraseña incorrectos. Intente nuevamente.'
    const user = await User.findOne({ username })
    if (!user) {
        throw new AuthenticationError(message)
    }
    if (!await user.matchesPassword(password)) {
        throw new AuthenticationError(message)
    }
    return user
}

export const ensureSignedIn = req => {

    try {
        const id = req.user.id
    } catch (e) {
        throw new AuthenticationError('Usted debe estar autenticado.')
    }
}

export const getToken = async (user) => {

    const token = jwt.sign({
            user: _.pick(user, ['_id','username']),
        },
        SECRET, {
            expiresIn: '1y',
        })
    return token
}
