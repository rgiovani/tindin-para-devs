import { connect } from '../libs/mongodb'

import { INote } from "../types/INote"
import { Note } from '../models/noteModel'
import { Log } from "../models/logModel"


const list = async (page: number, perPage: number, userId?: string) => {
    page = (page) ? page : 1
    perPage = (perPage) ? perPage : 50

    await connect()
    const maxPages = Math.min(perPage, 100)
    const skip = (+page - 1) * (+maxPages)
    const result = await Note.find({ user: userId }).skip(skip).limit(maxPages)
    await Log.create({ user: userId, description: 'Listagem de anotações' })
    return result
}

const get = async (id: string, userId?: string) => {
    if (!id) {
        throw new Error("Informe o campo id!")
    }

    await connect()

    const note = await Note.findById(id)
    if (!note) {
        throw new Error("Nenhuma anotação encontrada para o id informado!")
    }

    await Log.create({ user: userId, description: 'Detalhe de anotação' })

    return note
}

const create = async (note: INote, userId?: string) => {
    if (!note.title) {
        throw new Error("Informe o campo title!")
    }

    if (!note.description) {
        throw new Error("Informe o campo description!")
    }

    note.user = userId

    await connect()

    await Note.create(note)
    await Log.create({ user: userId, description: 'Criação de anotação' })

    return true
}

const update = async (note: INote, userId?: string) => {
    if (!note.id) {
        throw new Error("Informe o campo id!")
    }

    if (!note.title) {
        throw new Error("Informe o campo title!")
    }

    if (!note.description) {
        throw new Error("Informe o campo description!")
    }

    await connect()

    const noteFound = await Note.findByIdAndUpdate(note.id, note)
    if (!noteFound) {
        throw new Error("Nenhuma anotação encontrada para o id informado!")
    }

    await Log.create({ user: userId, description: 'Alteração de anotação' })

    return true
}

const remove = async (id: string, userId?: string) => {
    if (!id) {
        throw new Error("Informe o campo id!")
    }

    await connect()

    const note = await Note.findByIdAndRemove(id)
    if (!note) {
        throw new Error("Nenhuma anotação encontrada para o id informado!")
    }

    await Log.create({ user: userId, description: 'Exclusão de anotação' })

    return true
}

export {
    list,
    get,
    create,
    update,
    remove
}
