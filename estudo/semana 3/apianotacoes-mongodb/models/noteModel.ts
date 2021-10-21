import mongoose from 'mongoose'

const noteSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: String
})

const Note = mongoose.model('notes', noteSchema)

export { Note }