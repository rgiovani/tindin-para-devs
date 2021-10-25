import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    }
}) //define os campos do registro/tabela

const User = mongoose.model('users', userSchema) //(nome da coleção, os campos que ela vai ter)

export { User }