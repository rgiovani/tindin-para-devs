import mongoose, { Schema } from 'mongoose'

const noteSchema = new mongoose.Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'users',
        required: true
    },
    title: {
        type: String,
        required: true
    },
    description: String
}) //define os campos do registro/tabela

const Note = mongoose.model('notes', noteSchema) //(nome da coleção, os campos que ela vai ter)

export { Note }