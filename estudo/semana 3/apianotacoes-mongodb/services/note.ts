import { connect } from '../libs/mongodb'

import { INote } from "../types/INote"
import { Note } from '../models/noteModel'
import { Log } from "../models/logModel"


const list = async (userId?: string) => {
    await connect()
    const result = await Note.find()
    await Log.create({ user: userId, description: 'listagem de anotacoes' })
    return result
}

const get = async (id: string, userId?: string) => {
    if (!id) {
        throw new Error("Informe o campo id!")
    }

    const note = await Note.findById(id)

    if (!note) {
        throw new Error("Nenhuma anotação encontrada para o id informado!")
    }

    await Log.create({ user: userId, description: 'listagem de anotacoes por id' })

    return note
}

const create = async (note: INote, userId?: string) => {
    if (!note.title) {
        throw new Error("Informe o campo title!")
    }

    if (!note.description) {
        throw new Error("Informe o campo description!")
    }

    await Note.create(note)


    await Log.create({ user: userId, description: 'criacao de anotacao' })

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

    const noteFound = await Note.findByIdAndUpdate(note.id, note)

    if (!noteFound) {
        throw new Error("Nenhuma anotação encontrada para o id informado!")
    }

    await Log.create({ user: userId, description: 'atualizacao de anotacao' })

    return true
}

const remove = async (id: string, userId?: string) => {
    if (!id) {
        throw new Error("Informe o campo id!")
    }

    const note = await Note.findByIdAndRemove(id)
    if (!note) {
        throw new Error("Nenhuma anotação encontrada para o id informado!")
    }

    await Log.create({ user: userId, description: 'remocao de anotacao' })

    return true
}

export {
    list,
    get,
    create,
    update,
    remove
}
