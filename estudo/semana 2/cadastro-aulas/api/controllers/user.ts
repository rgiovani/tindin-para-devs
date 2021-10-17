import { Request, Response } from 'express';

import { validateResponse } from '../libs/validators';
import * as userService from '../services/user';

const login = async (req: Request<any>, res: Response<any>) => {
    const { email, password } = req.body
    validateResponse(res, userService.login, { email, password });
}

const logout = async (req: Request<any>, res: Response<any>) => {
    const { email, password } = req.body
    validateResponse(res, userService.logout, { email, password });
}

const list = async (req: Request<any>, res: Response<any>) => {
    return res.json(await userService.list())
}

const get = async (req: Request<any>, res: Response<any>) => {
    const id = req.params.id
    if (!id) return res.status(400).json({ message: 'Informe o campo id!' })

    validateResponse(res, userService.get, id);
}

const create = async (req: Request<any>, res: Response<any>) => {
    const { email, password } = req.body
    validateResponse(res, userService.create, { email, password });
}

const update = async (req: Request<any>, res: Response<any>) => {
    const { id, email, password } = req.body
    if (!id) {
        return res.status(400).json({ message: 'Informe o campo id!' })
    }
    validateResponse(res, userService.update, { id, email, password })
}

const remove = async (req: Request<any>, res: Response<any>) => {
    const { id } = req.body
    if (!id) {
        return res.status(400).json({ message: 'Informe o campo id!' })
    }
    validateResponse(res, userService.remove, id)
}

export {
    login,
    logout,
    list,
    get,
    create,
    update,
    remove
}