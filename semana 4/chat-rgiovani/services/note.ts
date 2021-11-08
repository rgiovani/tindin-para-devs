import { INote } from "../types/INote"
import { connect } from '../libs/mongodb'
import { Note } from '../models/noteModel'

const list = async () => {
    await connect()
    const result = await Note.find()
    return result
}

const get = async (id: string) => {
    await connect()

    if (!id) {
        throw new Error("Informe o campo id!")
    }

    const note = await Note.findById(id)

    if (!note) {
        throw new Error("Nenhuma anotação encontrada para o id informado!")
    }

    return note
}

const create = async (note: INote) => {
    await connect()

    if (!note.title) {
        throw new Error("Informe o campo title!")
    }

    if (!note.description) {
        throw new Error("Informe o campo description!")
    }

    await Note.create(note)

    return true

}

const update = async (note: INote) => {
    await connect()

    if (!note.id) {
        throw new Error("Informe o campo id!")
    }

    if (!note.title) {
        throw new Error("Informe o campo title!")
    }

    if (!note.description) {
        throw new Error("Informe o campo description!")
    }

    const noteFound = await Note.findByIdAndUpdate(note.id, note)

    if (!noteFound) {
        throw new Error("Nenhuma anotação encontrada para o id informado!")
    }

    return true
}

const remove = async (id: string) => {
    await connect()

    if (!id) {
        throw new Error("Informe o campo id!")
    }

    const note = await Note.findByIdAndRemove(id)
    if (!note) {
        throw new Error("Nenhuma anotação encontrada para o id informado!")
    }

    return true
}

export {
    list,
    get,
    create,
    update,
    remove
}
