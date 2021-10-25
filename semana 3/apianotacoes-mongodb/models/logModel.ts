import mongoose, { Schema } from 'mongoose'
import { User } from './UserModel'

const logSchema = new mongoose.Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'users',
        required: true
    },
    description: {
        type: String,
        require: true
    }
}, {
    timestamps: true //o mongoose coloca a data que o registro foi criado por padrão
}) //define os campos do registro/tabela

const Log = mongoose.model('logs', logSchema) //(nome da coleção, os campos que ela vai ter)

export { Log }