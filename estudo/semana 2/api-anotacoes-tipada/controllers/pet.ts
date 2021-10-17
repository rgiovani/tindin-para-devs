import { Request, Response } from 'express';

import { validateResponse } from '../libs/validators';
import * as petService from '../services/pet';

const list = async (req: Request<any>, res: Response<any>) => {
    const age = Number(req.query.age)
    const pets = await petService.list(age)
    return res.json(pets)
}

const get = async (req: Request<any>, res: Response<any>) => {
    const id = req.params.id
    if (!id) return res.status(400).json({ message: 'Informe o campo id!' })

    validateResponse(res, petService.get, id);
}

const create = async (req: Request<any>, res: Response<any>) => {
    const { name, age, owner } = req.body

    validateResponse(res, petService.create, { name, age, owner });
}

const update = async (req: Request<any>, res: Response<any>) => {
    const { id, name, age, owner } = req.body

    if (!id) {
        return res.status(400).json({ message: 'Informe o campo id!' })
    }
    validateResponse(res, petService.update, { id, name, age, owner })
}

const remove = async (req: Request<any>, res: Response<any>) => {
    const { id } = req.body

    if (!id) {
        return res.status(400).json({ message: 'Informe o campo id!' })
    }

    validateResponse(res, petService.remove, id)
}

export {
    list,
    get,
    create,
    update,
    remove
}