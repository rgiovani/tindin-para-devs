import { connect } from '../libs/mongodb'

import { IUser } from "../types/IUser"
import { User } from '../models/UserModel'

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

    return userLogged

}

export {
    login
}
