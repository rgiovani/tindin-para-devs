import { connect } from '../libs/mongodb'
import { sign } from 'jsonwebtoken'
import bcrypt from 'bcrypt';

import { IUser } from "../types/IUser"

import { User } from '../models/userModel'
import * as socket from '../libs/socket';

const usersConnected: any[] = []

const login = async (user: IUser, socketId: string) => {
    await connect()

    if (!user.email)
        throw new Error("Informe o campo email!")

    if (!user.password)
        throw new Error("Informe o campo password!")

    const userFounded = await User.findOne({ email: user.email })

    if (!userFounded)
        throw new Error("Usuario não cadastrado")

    let isPassValid = await bcrypt.compare(user.password, userFounded.password);

    if (!isPassValid) {
        throw new Error("Senha incorreta!")
    }

    const token = sign({
        _id: userFounded._id,
        name: userFounded.name,
        email: userFounded.email
    }, process.env.JWT_SECRET ?? 'emptyjwt', {})

    usersConnected.push({ name: userFounded.name, email: userFounded.email, userSocketId: socketId })
    const data = JSON.stringify({ usersOnChat: usersConnected })

    socket.emitEvent('user_connected', socketId, data)

    return { token }
}

const register = async (user: IUser) => {
    if (!user.name)
        throw new Error("Informe o campo name!")

    if (!user.email)
        throw new Error("Informe o campo email!")

    if (!user.password)
        throw new Error("Informe o campo password!")

    await connect()

    const userFounded = await User.findOne({ email: user.email })
    if (userFounded)
        throw new Error("Usuario já cadastrado")


    const saltRounds = 10
    bcrypt.hash(user.password, saltRounds).then(async function (hash) {
        user.password = hash
        return await User.create(user)
    });

    return true
}

const isTokenValid = async (id: string, socketId: string) => {
    await connect()
    const userFounded = await User.findById(id)
    let isOnList = false

    usersConnected.find((user) => {
        if (user.email == userFounded.email) {
            isOnList = true
            user.userSocketId = socketId
        }
    })

    if (!isOnList)
        usersConnected.push({ name: userFounded.name, email: userFounded.email, userSocketId: socketId })

    const data = JSON.stringify({ usersOnChat: usersConnected })

    socket.emitEvent('user_connected', socketId, data)

    return userFounded
}

const userLeft = async (socketId: string) => {
    return { usersOnChat: usersConnected }
}

export {
    login,
    register,
    isTokenValid,
    userLeft
}
