import * as lesson from '../controllers/lesson'

export default function lessonsRoutes(app: any) {
    app.get('/lessons', lesson.list)
    app.get('/lesson/:id', lesson.get)
    app.post('/lesson', lesson.create)
    app.put('/lesson/edit', lesson.update)
    app.delete('/lesson', lesson.remove)
}