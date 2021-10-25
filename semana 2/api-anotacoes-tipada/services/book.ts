import * as db from '../libs/mysql'

import { IBook } from './../types/IBook';

const books: Array<IBook> = [];

const findFavorites = async () => {
    const result = await db.execute('select * from books where isFav=true')
    return result.rowns;
}

const list = async () => {
    const result = await db.execute('select * from books')
    return result.rowns;
}

const get = async (id: string) => {
    if (!id) {
        throw new Error("Informe o campo do id!");
    }

    const book = await db.execute('select * from books where id=?', [id])

    if (!book.rowns.toString()) {
        throw new Error(`Nenhum livro encontrado com o id ${id}`);
    }

    return book.rowns;
}

const create = async (book: IBook) => {
    if (!book.title) {
        throw new Error("Informe o campo title");
    }

    if (!book.author) {
        throw new Error("Informe o campo author!");
    }

    if (!book.genre) {
        throw new Error("Informe o campo genre!");
    }

    await db.execute(
        'insert into books (title, author, genre, isFav, createdAt, updatedAt) values (?, ?, ?, ?, ?, ?)',
        [book.title, book.author, book.genre, false, new Date(), new Date()]
    )

    return true;
}

const update = async (book: IBook) => {
    if (!book.id) {
        throw new Error("Informe o campo id!");
    }

    const bookFounded = await db.execute('select * from books where id=?', [book.id])

    if (!bookFounded.rowns.toString()) {
        throw new Error(`Nenhum livro encontrado com o id ${book.id}`);
    }

    if (!book.title) {
        throw new Error("Informe o campo title!");
    }

    if (!book.author) {
        throw new Error("Informe o campo author");
    }

    if (!book.genre) {
        throw new Error("Informe o campo genre");
    }

    book.isFav = (book.isFav == undefined) ? false : book.isFav

    await db.execute(
        'update books set title=?, author=?, genre=?, isFav=?, updatedAt=? where id=?',
        [book.title, book.author, book.genre, book.isFav, new Date(), book.id]
    )

    return true;
}

const remove = async (id: string) => {
    if (!id) {
        throw new Error("Informe o campo id!");
    }

    const book = await db.execute('select * from books where id=?', [id])

    if (!book.rowns.toString()) {
        throw new Error(`Nenhum livro encontrado com o id ${id}`)
    }

    await db.execute('delete from books where id=?', [id])

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