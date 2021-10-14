import { v4 as uuidv4 } from 'uuid'

import { INote } from "../types/INote"

const notes: Array<INote> = []

const findFavorites = () => {
    const favNotes: Array<INote> = [];
    notes.find(note => {
        if (!!note.isFav) {
            favNotes.push(note);
        }
    })

    return favNotes
}

const list = () => {
    return notes;
}

const get = (id: string) => {
    if (!id) {
        throw new Error("Informe o campo do id!");
    }

    const note = notes.find((n) => n.id === id)

    if (!note) {
        throw new Error(`Nenhuma anotação encontrada com o id ${id}`);
    }

    return note;
}

const create = (note: INote) => {
    if (!note.title) {
        throw new Error("Informe o campo title");
    }

    if (!note.description) {
        throw new Error("Informe o campo description!");
    }

    note.createdAt = new Date();
    note.updatedAt = new Date();
    note.isFav = false;
    note.id = uuidv4();

    notes.push(note)

    return note;
}

const update = (note: INote) => {

    if (!note.id) {
        throw new Error("Informe o campo id!");
    }

    const noteFounded = notes.find((n) => n.id === note.id)

    if (!noteFounded) {
        throw new Error(`Nenhuma anotação encontrada com o id ${note.id}`);
    }

    if (!note.title) {
        throw new Error("Informe o campo title!");
    }

    if (!note.description) {
        throw new Error("Informe o campo description");
    }

    notes.find(noteObject => {
        if (noteObject.id === note.id) {
            noteObject.title = note.title
            noteObject.description = note.description
            noteObject.isFav = note.isFav !== undefined ? note.isFav : noteObject.isFav
            noteObject.updatedAt = new Date()
        }
    })

    return note;
}

const remove = (id: string) => {

    if (!id) {
        throw new Error("Informe o campo id!");
    }

    const note = notes.find((n) => n.id === id)

    if (!note) {
        throw new Error(`Nenhuma anotação encontrada com o id ${id}`)
    }

    notes.find((note, index) => {
        if (note?.id === id) {
            notes.splice(index, 1)
        }
    })

    return true;
}

export {
    findFavorites,
    list,
    get,
    create,
    update,
    remove
}