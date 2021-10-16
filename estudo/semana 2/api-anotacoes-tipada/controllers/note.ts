import { Request, Response } from 'express';

import { validateResponse } from '../libs/validators';
import * as noteService from '../services/note';

const listFavorites = (req: Request<any>, res: Response<any>) => {
    const notes = noteService.findFavorites()
    return res.json(notes)
}

const list = (req: Request<any>, res: Response<any>) => {
    const notes = noteService.list()
    return res.json(notes)
}

const get = (req: Request<any>, res: Response<any>) => {
    const id = req.params.id
    if (!id) return res.status(400).json({ message: 'Informe o campo id!' })

    validateResponse(res, noteService.get, id);
}

const create = (req: Request<any>, res: Response<any>) => {
    const { title, description } = req.body

    validateResponse(res, noteService.create, { title, description });
}

const update = (req: Request<any>, res: Response<any>) => {
    const { id, title, description, isFav } = req.body

    if (!id) {
        return res.status(400).json({ message: 'Informe o campo id!' })
    }

    validateResponse(res, noteService.update, { id, title, description, isFav })
}

const remove = (req: Request<any>, res: Response<any>) => {
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