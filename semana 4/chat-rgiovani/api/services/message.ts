import { rename, readdirSync } from 'fs'
import { resolve } from 'path'
import { extname } from 'path/posix'

import { connect, generateId } from '../libs/mongodb'

import * as socket from '../libs/socket'

import { Message } from '../models/messageModel'
import { IFile } from '../types/IFile'
import { IMessage } from "../types/IMessage"

const list = async (page: number, perPage: number, userId?: string) => {
    await connect()
    page = (page) ? page : 1
    perPage = (perPage) ? perPage : 20

    const maxPages = Math.min(perPage, 100)
    const counter = await Message.countDocuments({})

    let skip = (counter - perPage)

    if (skip < 0)
        skip = 0

    const messages = await Message.find().skip(skip).limit(maxPages)

    const result: any[] = []
    messages.find((message) => {
        if (message.fileName) {
            result.push({ user: message.username, path: `/uploads/${message.fileName}`, createdAt: message.createdAt })
        } else {
            result.push({ user: message.username, msg: message.text, createdAt: message.createdAt })
        }
    })
    return result
}

const create = async (message: IMessage, socketId: string, name: string, userId?: string) => {
    await connect()

    if (!message.text) {
        throw new Error("Informe o campo text!")
    }

    message.user = userId

    const msg = await Message.create({ ...message, username: name })
    socket.emitEvent('message', socketId, { user: name, msg: message.text, createdAt: msg.createdAt })

    return true
}

const uploadImage = async (file: IFile, socketId: string = '', username?: string, userId?: string) => {
    await connect()

    const imageDirPath = resolve(__dirname, '../uploads');

    if (!file.fileName) {
        throw new Error("Informe o campo fileName!")
    }

    file.user = userId

    const oldFileName = file.fileName
    const fileType = extname(imageDirPath + file.fileName)
    const newFileName = (await generateId()).toString() + fileType

    file.fileName = newFileName
    const { createdAt } = await Message.create({ ...file, username })

    rename(
        imageDirPath + `/${oldFileName}`,
        imageDirPath + `/${newFileName}`,
        (err) => {
            if (err) throw err
        }
    )
    socket.emitEvent('message', socketId, { user: username, path: `/uploads/${newFileName}`, createdAt })
    return true
}

export {
    list,
    create,
    uploadImage
}
