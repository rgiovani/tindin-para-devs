import { v4 as uuidv4 } from 'uuid';
import { throwInvalidField, findItemIn, throwMessage } from './utils';

const books = [];

function bookRoutes(app) {
    app.get('/books', (req, res) => {
        res.json(books);
    });

    app.get('/books/fav', (req, res) => {
        const favBooks = [];
        books.find(book => {
            if (book?.isFav) {
                favBooks.push(book);
            }
        })
        res.json(favBooks)
    });

    app.get('/books/:id', (req, res) => {
        const book = findItemIn(books).where("id").equal(req.params.id)
        if (!book) {
            return throwMessage(res.status(400), `Nenhum livro encontrado com o id: ${req.params.id}`);
        }
        res.json(book);
    });

    app.post('/books', (req, res) => {
        const { title, author, genre } = req.body;
        if (!title) return throwInvalidField(res, 'title');

        if (!author) return throwInvalidField(res, 'author');

        if (!genre) return throwInvalidField(res, 'genre');

        const book = findItemIn(books).where("title").equal(title);
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

    app.put('/books', (req, res) => {
        const { id, title, author, genre, isFav } = req.body;
        if (!id) return throwInvalidField(res, 'id');

        if (!title) return throwInvalidField(res, 'title');

        if (!author) return throwInvalidField(res, 'author');

        if (!genre) return throwInvalidField(res, 'genre');

        const book = findItemIn(books).where("id").equal(id);
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

    app.delete('/books', (req, res) => {
        const { id } = req.body;

        if (!id) return throwInvalidField(res, 'id');

        const book = findItemIn(books).where("id").equal(id);

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

const _bookRoutes = bookRoutes;
export { _bookRoutes as bookRoutes };