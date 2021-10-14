import { Request, Response } from 'express';
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
    try {
        const id = req.params.id
        if (!id) return res.status(400).json({ message: 'Informe o campo id!' })

        const note = noteService.get(id)
        res.json(note)
    } catch (error) {
        console.log(error)
        return res.status(400).json({ message: error })
    }
}

const create = (req: Request<any>, res: Response<any>) => {
    try {
        const { title, description } = req.body

        const note = noteService.create({ title, description })

        res.json(note)
    } catch (error) {
        return res.status(400).json({ message: error })
    }
}

const update = (req: Request<any>, res: Response<any>) => {
    try {
        const { id, title, description, isFav } = req.body
        if (!id) {
            return res.status(400).json({ message: 'Informe o campo id!' })
        }

        const noteUpdated = noteService.update({ id, title, description, isFav })
        res.json(noteUpdated)
    } catch (error) {
        return res.status(400).json({ message: error })
    }
}

const remove = (req: Request<any>, res: Response<any>) => {
    try {
        const { id } = req.body

        if (!id) {
            return res.status(400).json({ message: 'Informe o campo id!' })
        }
        noteService.remove(id)

        res.json({ success: true })
    } catch (error) {
        return res.status(400).json({ message: error })
    }
}

export {
    listFavorites,
    list,
    get,
    create,
    update,
    remove
}