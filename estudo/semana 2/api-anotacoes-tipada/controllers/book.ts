import { Request, Response } from 'express';

import { validateResponse } from '../libs/validators';
import * as bookService from '../services/book';

const listFavorites = (req: Request<any>, res: Response<any>) => {
    const books = bookService.findFavorites()
    return res.json(books)
}

const list = (req: Request<any>, res: Response<any>) => {
    const books = bookService.list()
    return res.json(books)
}

const get = (req: Request<any>, res: Response<any>) => {
    const id = req.params.id
    if (!id) return res.status(400).json({ message: 'Informe o campo id!' })

    validateResponse(res, bookService.get, id);
}

const create = (req: Request<any>, res: Response<any>) => {
    const { title, author, genre } = req.body

    validateResponse(res, bookService.create, { title, author, genre });
}

const update = (req: Request<any>, res: Response<any>) => {
    const { id, title, author, genre, isFav } = req.body

    if (!id) {
        return res.status(400).json({ message: 'Informe o campo id!' })
    }

    validateResponse(res, bookService.update, { id, title, author, genre, isFav })
}

const remove = (req: Request<any>, res: Response<any>) => {
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