import { v4 as uuidv4 } from 'uuid'

import { IBook } from './../types/IBook';

const books: Array<IBook> = [];

const findFavorites = () => {
    const favBooks: Array<IBook> = [];
    books.find(book => {
        if (!!book.isFav) {
            favBooks.push(book);
        }
    })

    return favBooks
}

const list = () => {
    return books;
}

const get = (id: string) => {
    if (!id) {
        throw new Error("Informe o campo do id!");
    }

    const book = books.find((n) => n.id === id)

    if (!book) {
        throw new Error(`Nenhum livro encontrado com o id ${id}`);
    }

    return book;
}

const create = (book: IBook) => {
    if (!book.title) {
        throw new Error("Informe o campo title");
    }

    if (!book.author) {
        throw new Error("Informe o campo author!");
    }

    if (!book.genre) {
        throw new Error("Informe o campo genre!");
    }

    book.createdAt = new Date();
    book.updatedAt = new Date();
    book.isFav = false;
    book.id = uuidv4();

    books.push(book)

    return book;
}

const update = (book: IBook) => {

    if (!book.id) {
        throw new Error("Informe o campo id!");
    }

    const bookFounded = books.find((n) => n.id === book.id)

    if (!bookFounded) {
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

    books.find(bookObject => {
        if (bookObject.id === book.id) {
            bookObject.title = book.title
            bookObject.author = book.author
            bookObject.genre = book.genre
            bookObject.isFav = book.isFav !== undefined ? book.isFav : bookObject.isFav
            bookObject.updatedAt = new Date()
        }
    })

    return book;
}

const remove = (id: string) => {

    if (!id) {
        throw new Error("Informe o campo id!");
    }

    const book = books.find((n) => n.id === id)

    if (!book) {
        throw new Error(`Nenhum livro encontrado com o id ${id}`)
    }

    books.find((book, index) => {
        if (book?.id === id) {
            books.splice(index, 1)
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