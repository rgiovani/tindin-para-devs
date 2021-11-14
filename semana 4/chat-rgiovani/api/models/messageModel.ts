import mongoose, { Schema } from 'mongoose'

const messageSchema = new mongoose.Schema({
    fileName: {
        type: String,
    },
    text: {
        type: String,
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'users',
        required: true
    },
    username: {
        type: String,
        required: true
    },
}, {
    timestamps: true
})

const Message = mongoose.model('messages', messageSchema)

export { Message }