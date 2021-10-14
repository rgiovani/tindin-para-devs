import { Request, Response } from "express"
const { v4: uuidv4 } = require('uuid')

interface INotes {
    id: string,
    title: string,
    description: string,
    isFav: boolean,
    createdAt: Date,
    updatedAt: Date
}

const notes: Array<INotes> = []

export default function notesRoutes(app: any) {
    app.get('/notes', (req: Request, res: Response) => {
        res.send(notes)
    })

    app.post('/notes', (req: Request, res: Response) => {
        const { title, description } = req.body

        if (!title) {
            return res.status(400).json({ message: 'Informe o campo title!' })
        }

        if (!description) {
            return res.status(400).json({ message: 'Informe o campo description!' })
        }

        notes.push({
            id: uuidv4(),
            title,
            description,
            isFav: false,
            createdAt: new Date(),
            updatedAt: new Date()
        })

        res.send({ message: 'Anotação salva com sucesso!!!' })
    })

    app.get('/notes/:id', (req: Request, res: Response) => {
        const note = notes.find((n) => n.id === req.params.id)

        if (!note) {
            return res.status(400).json({ message: `Nenhuma anotação encontrada com o id ${req.params.id}` })
        }
        res.json(note)
    })

    app.put('/notes', (req: Request, res: Response) => {
        const { id, title, description, isFav } = req.body

        if (!id) {
            return res.status(400).json({ message: 'Informe o campo id!' })
        }

        const note = notes.find((n) => n.id === id)

        if (!note) {
            return res.status(400).json({ message: `Nenhuma anotação encontrada com o id ${id}` })
        }

        if (!title) {
            return res.status(400).json({ message: 'Informe o campo title!' })
        }

        if (!description) {
            return res.status(400).json({ message: 'Informe o campo description!' })
        }

        notes.find(note => {
            if (note.id === id) {
                note.title = title
                note.description = description
                note.isFav = isFav !== undefined ? isFav : note.isFav
                note.updatedAt = new Date()
            }
        })

        res.json({ message: 'Anotação alterada com sucesso' })
    })

    app.delete('/notes', (req: Request, res: Response) => {
        const { id } = req.body

        if (!id) {
            return res.status(400).json({ message: 'Informe o campo id!' })
        }

        const note = notes.find((n) => n.id === id)

        if (!note) {
            return res.status(400).json({ message: `Nenhuma anotação encontrada com o id ${id}` })
        }

        notes.find((note, index) => {
            if (note?.id === id) {
                notes.splice(index, 1)
            }
        })

        res.json({ message: 'Anotação excluida com sucesso' })
    })
}