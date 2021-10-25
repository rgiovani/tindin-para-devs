import * as note from '../controllers/note'

export default function notesRoutes(app: any) {
    app.get('/notes', note.list)
    app.get('/notes/fav', note.listFavorites)
    app.get('/notes/:id', note.get)
    app.post('/notes', note.create)
    app.put('/notes', note.update)
    app.delete('/notes', note.remove)
}