import { Request, Response } from 'express';

import { validateResponse } from '../libs/validators';
import * as noteService from '../services/note';

const listFavorites = async (req: Request<any>, res: Response<any>) => {
    const notes = await noteService.findFavorites()
    return res.json(notes)
}

const list = async (req: Request<any>, res: Response<any>) => {
    const notes = await noteService.list()
    return res.json(notes)
}

const get = async (req: Request<any>, res: Response<any>) => {
    const id = req.params.id
    if (!id) return res.status(400).json({ message: 'Informe o campo id!' })

    validateResponse(res, noteService.get, id);
}

const create = async (req: Request<any>, res: Response<any>) => {
    const { title, description } = req.body

    validateResponse(res, noteService.create, { title, description });
}

const update = async (req: Request<any>, res: Response<any>) => {
    const { id, title, description, isFav } = req.body

    if (!id) {
        return res.status(400).json({ message: 'Informe o campo id!' })
    }
    validateResponse(res, noteService.update, { id, title, description, isFav })
}

const remove = async (req: Request<any>, res: Response<any>) => {
    const { id } = req.body

    if (!id) {
        return res.status(400).json({ message: 'Informe o campo id!' })
    }

    validateResponse(res, noteService.remove, id)
}

export {
    listFavorites,
    list,
    get,
    create,
    update,
    remove
}