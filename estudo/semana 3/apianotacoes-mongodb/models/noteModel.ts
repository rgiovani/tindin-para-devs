import mongoose from 'mongoose'

const noteSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: String
}) //define os campos do registro/tabela

const Note = mongoose.model('notes', noteSchema) //(nome da coleção, os campos que ela vai ter)

export { Note }