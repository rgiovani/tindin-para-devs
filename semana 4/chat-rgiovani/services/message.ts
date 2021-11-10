import { IMessage } from "../types/IMessage"
import { connect } from '../libs/mongodb'

import { Message } from '../models/messageModel'
import { User } from '../models/userModel'

import * as socket from '../libs/socket'

const list = async (page: number, perPage: number, userId?: string) => {
    await connect()
    page = (page) ? page : 1
    perPage = (perPage) ? perPage : 20

    const maxPages = Math.min(perPage, 100)
    const skip = (+page - 1) * (+maxPages)
    const messages = await Message.find().skip(skip).limit(maxPages)

    const result: any[] = []
    messages.find((message) => {
        result.push({ user: message.username, msg: message.text })
    })

    return result
}

const create = async (message: IMessage, socketId: string, userId?: string) => {
    await connect()

    if (!message.text) {
        throw new Error("Informe o campo text!")
    }

    const userFounded = await User.findOne({ _id: userId })
    message.user = userId

    await Message.create({ ...message, username: userFounded.name })
    socket.emitEvent('message', socketId, { user: userFounded.name, msg: message.text })

    return true
}

export {
    list,
    create
}
