import { convertStringInArray } from "./utils";
import * as db from './mysql'

async function queryInsert(table: string, obj: any, date: boolean) {
    let query = `insert into ${table} (`
    let properties = ""
    const values = []

    Object.keys(obj).forEach((property) => {
        properties = properties.concat(property + ",")
        values.push(obj[property])
    });

    properties = properties.slice(0, -1)

    if (!!date) {
        properties = properties.concat(",createdAt,updatedAt")
    }
    query = query.concat(`${properties}) values(`)

    convertStringInArray(properties).find((prop, index) => {
        query = query.concat('?,')
    })
    query = query.slice(0, -1)

    query = query.concat(')')

    if (!!date) {
        values.push(new Date())
        values.push(new Date())
    }

    await db.execute(query, values)

    return true;
}

async function queryUpdate(table: string, obj: any) {
    let query = `update ${table} set `
    let properties = ""
    const values: any[] = []
    Object.keys(obj).forEach((property) => {

        if (property != "id") {
            properties = properties.concat(`${property}=?,`)
            values.push(obj[property])
        }
    });

    properties = properties.slice(0, -1)

    query = query.concat(`${properties}, updatedAt=? where id=?`)

    values.push(new Date())
    values.push(obj.id)

    await db.execute(query, values)

    return true
}

async function queryRemove(table: string, id: number) {
    await db.execute(`delete from ${table} where id=?`, [id])

    return true
}

export {
    queryInsert,
    queryUpdate,
    queryRemove
}