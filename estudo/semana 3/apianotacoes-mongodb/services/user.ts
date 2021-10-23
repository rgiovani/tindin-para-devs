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

    //await User.create(user)

    return true

}

export {
    login
}
