import { IUser } from './../types/IUser';
import * as db from '../libs/mysql'
import { convertDataToObject } from '../libs/utils';
import { crudService } from './service';

const tableName = 'users'

const login = async (user: IUser) => {
    const { email, password } = user

    if (!email) {
        throw new Error("Informe o campo do email");
    }

    if (!password) {
        throw new Error("Informe o campo do password");
    }

    const userInDatabase = convertDataToObject((await db.execute(`select * from ${tableName} where email=? and password=?`, [email, password])).rowns)
    const isOnline = convertDataToObject((await db.execute('select * from users_online where email=?', [email])).rowns)

    if (userInDatabase.length === 0)
        throw new Error(`Usuário não encontrado, certifique-se que o email ou a senha foi digitado corretamente`);

    if (isOnline.length > 0)
        throw new Error(`O usuário ja esta logado no sistema`);

    await db.execute(
        'insert into users_online (email) values (?)',
        [user.email]
    )

    return { success: true }
}

const logout = async (user: IUser) => {
    const { email, password } = user

    if (!email) {
        throw new Error("Informe o campo do email");
    }

    if (!password) {
        throw new Error("Informe o campo do password");
    }

    const userInDatabase = convertDataToObject((await db.execute(`select * from ${tableName} where email=? and password=?`, [email, password])).rowns)
    const isOnline = convertDataToObject((await db.execute('select * from users_online where email=?', [email])).rowns)

    if (userInDatabase.length === 0)
        throw new Error(`O usuário não está cadastrado no sistema`);

    if (isOnline.length === 0)
        throw new Error(`O usuário não esta logado no sistema`);

    await db.execute('delete from users_online where email=?', [email])

    return { success: true }
}

const list = crudService(tableName).list

const get = crudService(tableName).get

const create = async (user: IUser) => {
    if (!user.email) {
        throw new Error("Informe o campo email");
    }

    if (!user.password) {
        throw new Error("Informe o campo password");
    }

    return crudService(tableName).create(user)
}

const update = async (user: IUser) => {
    if (!user.id) {
        throw new Error("Informe o campo id!");
    }

    if (!user.email) {
        throw new Error("Informe o campo email");
    }

    if (!user.password) {
        throw new Error("Informe o campo password!");
    }

    return crudService(tableName).update(user)
}

const remove = crudService(tableName).remove

export {
    login,
    logout,
    list,
    get,
    create,
    update,
    remove
}