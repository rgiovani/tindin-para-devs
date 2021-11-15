import { connect as dbConnect, disconnect as dbDisconnect, connection, Types } from 'mongoose'

const connect = async () => {
  if (!process.env.DATABASE_URL) throw new Error('As variáveis de ambiente em .env não foram definidas para a conexão com o banco de dados!')

  const isAlreadyConnected = connection.readyState === 1
  if (isAlreadyConnected) {
    return connection
  }

  const mongoConfig = {
    ignoreUndefined: true
  }

  return dbConnect(process.env.DATABASE_URL, mongoConfig)
}

const generateId = async () => {
  return new Types.ObjectId()
}

const disconnect = async () => {
  await dbDisconnect()
}

export {
  connect,
  disconnect,
  generateId
}
