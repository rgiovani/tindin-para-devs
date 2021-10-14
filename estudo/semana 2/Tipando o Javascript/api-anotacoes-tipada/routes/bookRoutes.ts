import { Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';

import { findBookById, throwInvalidField, throwMessage } from './utils';

export interface IBook {
    id: string,
    title: string,
    author: string,
    genre: string,
    isFav: boolean,
    createdAt: Date,
    updatedAt: Date
}

const books: Array<IBook> = [];

export default function bookRoutes(app: any) {
    app.get('/books', (req: Request, res: Response) => {
        res.json(books);
    });

    app.get('/books/fav', (req: Request, res: Response) => {
        const favBooks: Array<IBook> = [];
        books.find(book => {
            if (book?.isFav) {
                favBooks.push(book);
            }
        })
        res.json(favBooks)
    });

    app.get('/books/:id', (req: Request, res: Response) => {
        const book = findBookById(books, req.params.id)
        if (!book) {
            return throwMessage(res.status(400), `Nenhum livro encontrado com o id: ${req.params.id}`);
        }
        res.json(book);
    });

    app.post('/books', (req: Request, res: Response) => {
        const { title, author, genre } = req.body;
        if (!title) return throwInvalidField(res, 'title');

        if (!author) return throwInvalidField(res, 'author');

        if (!genre) return throwInvalidField(res, 'genre');

        const book = books.find(book => book.title === title);

        if (!book) {
            const id = uuidv4();
            books.push(
                {
                    id: id,
                    title,
                    author,
                    genre,
                    isFav: false,
                    createdAt: new Date(),
                    updatedAt: new Date()
                }
            );
            res.json({ message: `Livro criado com o id: ${id}` });
        } else {
            return throwMessage(res.status(400), 'Um livro ja existe com esse titulo');
        }
    })

    app.put('/books', (req: Request, res: Response) => {
        const { id, title, author, genre, isFav } = req.body;
        if (!id) return throwInvalidField(res, 'id');

        if (!title) return throwInvalidField(res, 'title');

        if (!author) return throwInvalidField(res, 'author');

        if (!genre) return throwInvalidField(res, 'genre');

        const book = findBookById(books, id);
        if (book) {
            book.title = title;
            book.author = author;
            book.genre = genre;
            book.isFav = isFav !== undefined ? isFav : book.isFav;
            book.updatedAt = new Date();
        } else {
            return throwMessage(res.status(400), 'Nenhum livro foi encontrado com esse id');
        }

        res.json({ message: 'Livro editado com sucesso!' });
    })

    app.delete('/books', (req: Request, res: Response) => {
        const { id } = req.body;

        if (!id) return throwInvalidField(res, 'id');

        const book = findBookById(books, id);

        if (!book) {
            return throwMessage(res.status(400), 'Nenhum livro foi encontrado com esse id');
        }

        books.find((book, index) => {
            if (book?.id === id) {
                books.splice(index, 1);
            }
        });

        res.json({ message: 'Livro deletado com sucesso!' });
    })
}