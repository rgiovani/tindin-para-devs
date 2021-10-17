import * as pet from '../controllers/pet'

export default function petsRoutes(app: any) {
    app.get('/pets', pet.list)
    app.get('/pets/:id', pet.get)
    app.post('/pets', pet.create)
    app.put('/pets', pet.update)
    app.delete('/pets', pet.remove)
}