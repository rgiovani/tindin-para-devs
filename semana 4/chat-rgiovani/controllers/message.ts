import { Request, Response } from 'express'
import * as message from '../services/message'
import { error } from '../libs/bindError'

const list = async (req: Request<any>, res: Response<any>) => {
    try {
        const { _id: userId } = req.user
        const { page, perPage } = req.query
        const messages = await message.list(Number(page), Number(perPage), userId)
        return res.json(messages)
    } catch (err: any) {
        return error(res, err)
    }
}

const create = async (req: Request<any>, res: Response<any>) => {
    try {
        const { _id: userId } = req.user
        const text = req.body.text
        const socketId = req.body.socketId
        const name = (req.user.name) ? req.user.name : 'unknown'

        const messageCreated = await message.create({ text }, socketId, name, userId)
        return res.json(messageCreated)
    } catch (err: any) {
        return error(res, err)
    }
}

export {
    list,
    create
}