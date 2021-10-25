import * as book from '../controllers/book'

export default function booksRoutes(app: any) {
    app.get('/books', book.list)
    app.get('/books/fav', book.listFavorites)
    app.get('/books/:id', book.get)
    app.post('/books', book.create)
    app.put('/books', book.update)
    app.delete('/books', book.remove)
}