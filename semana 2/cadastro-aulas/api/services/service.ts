import * as db from '../libs/mysql'

import { queryInsert, queryRemove, queryUpdate } from '../libs/queries';
import { convertDataToObject } from '../libs/utils';

export function crudService(table: string, type: string = "registro") {
    const list = async () => {
        const result = await db.execute(`select * from ${table}`)
        return result.rowns;
    }

    const get = async (id: string) => {
        if (!id)
            throw new Error("Informe o campo do id!");

        const item = convertDataToObject((await db.execute(`select * from ${table} where id=?`, [id])).rowns)

        if (item.length === 0)
            throw new Error(`Nenhum ${type} encontrado com o id ${id}`);

        return item[0];
    }

    const create = async (obj: any) => {
        return queryInsert(table, obj, true)
    }

    const update = async (obj: any) => {
        const dataFounded = convertDataToObject((await db.execute(`select * from ${table} where id=?`, [obj.id])).rowns)

        if (dataFounded.length === 0)
            throw new Error(`Nenhum ${type} encontrado com o id ${obj.id}`);

        return queryUpdate(table, obj)
    }

    const remove = async (id: number) => {
        if (!id)
            throw new Error("Informe o campo id!");

        const obj = convertDataToObject((await db.execute(`select * from ${table} where id=?`, [id])).rowns)

        if (obj.length === 0)
            throw new Error(`Nenhum ${type} encontrado com o id ${id}`)

        return queryRemove(table, id)
    }

    return {
        list,
        get,
        create,
        update,
        remove
    }
}