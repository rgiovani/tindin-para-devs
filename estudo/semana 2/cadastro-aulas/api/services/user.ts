import { IUser } from './../types/IUser';
import * as db from '../libs/mysql'
import { convertDataToObject } from '../libs/utils';

const usersOnline: Array<string> = [] //Em memória

const login = async (user: IUser) => {
    const { email, password } = user

    if (!email) {
        throw new Error("Informe o campo do email");
    }

    if (!password) {
        throw new Error("Informe o campo do password");
    }

    const userInDatabase = convertDataToObject((await db.execute('select * from users where email=? and password=?', [email, password])).rowns)
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

    const userInDatabase = convertDataToObject((await db.execute('select * from users where email=? and password=?', [email, password])).rowns)
    const isOnline = convertDataToObject((await db.execute('select * from users_online where email=?', [email])).rowns)

    if (userInDatabase.length === 0)
        throw new Error(`O usuário não está cadastrado no sistema`);

    if (isOnline.length === 0)
        throw new Error(`O usuário não esta logado no sistema`);

    await db.execute('delete from users_online where email=?', [email])

    return { success: true }
}

const list = async () => {
    const result = await db.execute('select * from users')
    return result.rowns;
}

const get = async (id: string) => {
    if (!id) {
        throw new Error("Informe o campo do id!");
    }

    const user = convertDataToObject((await db.execute('select * from users where id=?', [id])).rowns)

    if (user.length === 0) {
        throw new Error(`Nenhum usuário encontrado com o id ${id}`);
    }

    return user[0];
}

const create = async (user: IUser) => {
    if (!user.email) {
        throw new Error("Informe o campo email");
    }

    if (!user.password) {
        throw new Error("Informe o campo password");
    }

    await db.execute(
        'insert into users (email, password, createdAt, updatedAt) values (?, ?, ?, ?)',
        [user.email, user.password, new Date(), new Date()]
    )

    return true;
}

const update = async (user: IUser) => {
    if (!user.id) {
        throw new Error("Informe o campo id!");
    }

    const userFounded = convertDataToObject((await db.execute('select * from users where id=?', [user.id])).rowns)

    if (userFounded.length === 0) {
        throw new Error(`Nenhum usuário encontrado com o id ${user.id}`);
    }

    if (!user.email) {
        throw new Error("Informe o campo email");
    }

    if (!user.password) {
        throw new Error("Informe o campo password!");
    }

    await db.execute(
        'update users set email=?, password=?, updatedAt=? where id=?',
        [user.email, user.password, new Date(), user.id]
    )

    return true;
}

const remove = async (id: string) => {
    if (!id) {
        throw new Error("Informe o campo id!");
    }

    const user = convertDataToObject((await db.execute('select * from users where id=?', [id])).rowns)

    if (user.length === 0) {
        throw new Error(`Nenhum usuário encontrado com o id ${id}`)
    }

    await db.execute('delete from users where id=?', [id])

    return true;
}

export {
    login,
    logout,
    list,
    get,
    create,
    update,
    remove
}