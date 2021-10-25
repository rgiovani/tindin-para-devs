import { IPet } from "../types/IPet"
import * as db from '../libs/mysql'

const list = async (age: number = 0) => {
    const result = await db.execute('select * from pets where age >= ?', [age])
    return result.rowns;
}

const get = async (id: string) => {
    if (!id) {
        throw new Error("Informe o campo do id!");
    }

    const pet = await db.execute('select * from pets where id=?', [id])

    if (!pet.rowns.toString()) {
        throw new Error(`Nenhuma anotação encontrada com o id ${id}`);
    }

    return pet.rowns;
}

const create = async (pet: IPet) => {
    if (!pet.name) {
        throw new Error("Informe o campo name");
    }

    if (!pet.owner) {
        throw new Error("Informe o campo owner!");
    }

    if (!pet.age) {
        throw new Error("Informe o campo age!");
    }

    await db.execute(
        'insert into pets (name, age, owner, createdAt, updatedAt) values (?, ?, ?, ?, ?)',
        [pet.name, pet.age, pet.owner, new Date(), new Date()]
    )

    return true;
}

const update = async (pet: IPet) => {
    if (!pet.id) {
        throw new Error("Informe o campo id!");
    }

    const petFounded = await db.execute('select * from pets where id=?', [pet.id])

    if (!petFounded.rowns.toString()) {
        throw new Error(`Nenhum pet encontrado com o id ${pet.id}`);
    }

    if (!pet.name) {
        throw new Error("Informe o campo name");
    }

    if (!pet.owner) {
        throw new Error("Informe o campo owner!");
    }

    if (!pet.age) {
        throw new Error("Informe o campo age!");
    }

    await db.execute(
        'update pets set name=?, age=?, owner=?, updatedAt=? where id=?',
        [pet.name, pet.age, pet.owner, new Date(), pet.id]
    )

    return true;
}

const remove = async (id: string) => {
    if (!id) {
        throw new Error("Informe o campo id!");
    }

    const pet = await db.execute('select * from pets where id=?', [id])

    if (!pet.rowns.toString()) {
        throw new Error(`Nenhuma anotação encontrada com o id ${id}`)
    }

    await db.execute('delete from pets where id=?', [id])

    return true;
}

export {
    list,
    get,
    create,
    update,
    remove
}