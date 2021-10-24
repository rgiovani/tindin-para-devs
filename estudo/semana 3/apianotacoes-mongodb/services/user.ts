import { connect } from '../libs/mongodb'
import { sign } from 'jsonwebtoken'

import { IUser } from "../types/IUser"

import { User } from '../models/UserModel'
import { Log } from '../models/logModel'

const login = async (user: IUser) => {
    if (!user.email) {
        throw new Error("Informe o campo email!")
    }

    if (!user.password) {
        throw new Error("Informe o campo password!")
    }

    await connect()

    const userLogged = await User.findOne({ email: user.email, password: user.password })

    if (!userLogged) {
        throw new Error("Email ou senha não confere!")
    }

    const token = sign({
        _id: userLogged._id,
        name: userLogged.name,
        email: userLogged.email
    }, process.env.JWT_SECRET ?? 'emptyjwt', {})

    return { token }
}

const getById = async (_id: string) => {
    await connect()
    return User.findById(_id)
}

const listLog = async (page: number, perPage: number, userId?: string) => {
    page = (page) ? page : 1
    perPage = (perPage) ? perPage : 50

    await connect()
    const maxPages = Math.min(perPage, 100)
    const skip = (+page - 1) * (+maxPages)
    const result = await Log.find().populate('user', 'name email').skip(skip).limit(maxPages)
    await Log.create({ user: userId, description: 'listagem de logs' })
    return result
}

export {
    login,
    getById,
    listLog
}
