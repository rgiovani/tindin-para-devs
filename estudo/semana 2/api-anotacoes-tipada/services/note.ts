import { INote } from "../types/INote"
import * as db from '../libs/mysql'

const findFavorites = async () => {
    const result = await db.execute('select * from notes where isFav=true')
    return result.rowns;
}

const list = async () => {
    const result = await db.execute('select * from notes')
    return result.rowns;
}

const get = async (id: string) => {
    if (!id) {
        throw new Error("Informe o campo do id!");
    }

    const note = await db.execute('select * from notes where id=?', [id])

    if (!note.rowns.toString()) {
        throw new Error(`Nenhuma anotação encontrada com o id ${id}`);
    }

    return note.rowns;
}

const create = async (note: INote) => {
    if (!note.title) {
        throw new Error("Informe o campo title");
    }

    if (!note.description) {
        throw new Error("Informe o campo description!");
    }

    await db.execute(
        'insert into notes (title, description, isFav, createdAt, updatedAt) values (?, ?, ?, ?, ?)',
        [note.title, note.description, false, new Date(), new Date()]
    )

    return true;
}

const update = async (note: INote) => {
    if (!note.id) {
        throw new Error("Informe o campo id!");
    }

    const noteFounded = await db.execute('select * from notes where id=?', [note.id])

    if (!noteFounded.rowns.toString()) {
        throw new Error(`Nenhuma anotação encontrada com o id ${note.id}`);
    }

    if (!note.title) {
        throw new Error("Informe o campo title!");
    }

    if (!note.description) {
        throw new Error("Informe o campo description");
    }

    note.isFav = (note.isFav == undefined) ? false : note.isFav

    await db.execute(
        'update notes set title=?, description=?, isFav=?, updatedAt=? where id=?',
        [note.title, note.description, note.isFav, new Date(), note.id]
    )

    return true;
}

const remove = async (id: string) => {
    if (!id) {
        throw new Error("Informe o campo id!");
    }

    const note = await db.execute('select * from notes where id=?', [id])

    if (!note.rowns.toString()) {
        throw new Error(`Nenhuma anotação encontrada com o id ${id}`)
    }

    await db.execute('delete from notes where id=?', [id])

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