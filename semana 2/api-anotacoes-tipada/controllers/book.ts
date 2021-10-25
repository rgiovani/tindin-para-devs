import { Request, Response } from 'express';

import { validateResponse } from '../libs/validators';
import * as bookService from '../services/book';

const listFavorites = async (req: Request<any>, res: Response<any>) => {
    const books = await bookService.findFavorites()
    return res.json(books)
}

const list = async (req: Request<any>, res: Response<any>) => {
    const books = await bookService.list()
    return res.json(books)
}

const get = async (req: Request<any>, res: Response<any>) => {
    const id = req.params.id
    if (!id) return res.status(400).json({ message: 'Informe o campo id!' })

    validateResponse(res, bookService.get, id);
}

const create = async (req: Request<any>, res: Response<any>) => {
    const { title, author, genre } = req.body

    validateResponse(res, bookService.create, { title, author, genre });
}

const update = async (req: Request<any>, res: Response<any>) => {
    const { id, title, author, genre, isFav } = req.body

    if (!id) {
        return res.status(400).json({ message: 'Informe o campo id!' })
    }

    validateResponse(res, bookService.update, { id, title, author, genre, isFav })
}

const remove = async (req: Request<any>, res: Response<any>) => {
    const { id } = req.body

    if (!id) {
        return res.status(400).json({ message: 'Informe o campo id!' })
    }

    validateResponse(res, bookService.remove, id)
}

export {
    listFavorites,
    list,
    get,
    create,
    update,
    remove
}