import mysql from 'mysql2/promise'

let db: mysql.Connection

const connection = async () => {
    if (!process.env.DB_HOST) throw new Error('As variáveis de ambiente em .env não foram definidas para a conexão com o banco de dados!')

    db = await mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE
    })
    return db
}

const execute = async (query: any, data?: any) => {
    await connection()
    const [rowns, fields] = await db.execute(query, data)
    await disconnection()
    return { rowns, fields }
}

const disconnection = async () => {
    return db.end()
}

export {
    connection,
    execute,
    disconnection
}