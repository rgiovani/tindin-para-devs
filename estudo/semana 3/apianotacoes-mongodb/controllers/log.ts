import { Request, Response } from 'express'
import * as user from '../services/user'
import { error } from '../libs/bindError'

const list = async (req: Request<any>, res: Response<any>) => {
    try {
        const { _id: userId } = req.user
        const { page, perPage } = req.query
        const logs = await user.listLog(userId, Number(page), Number(perPage))
        return res.json(logs)
    } catch (err: any) {
        return error(res, err)
    }
}

export {
    list
}