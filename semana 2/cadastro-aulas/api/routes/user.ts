import * as user from '../controllers/user'

export default function usersRoutes(app: any) {
    app.post('/user/login', user.login)
    app.delete('/user/logout', user.logout)
    app.get('/users', user.list)
    app.get('/user/:id', user.get)
    app.post('/user/register', user.create)
    app.put('/user/edit', user.update)
    app.delete('/user', user.remove)
}