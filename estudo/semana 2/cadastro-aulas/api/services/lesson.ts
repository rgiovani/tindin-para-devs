import { ILesson } from './../types/ILesson';
import { crudService } from "./service"

const tableName = "lessons";

const list = crudService(tableName).list

const get = crudService(tableName).get

const create = async (lesson: ILesson) => {
    if (!lesson.title) {
        throw new Error("Informe o campo title");
    }

    if (!lesson.description) {
        throw new Error("Informe o campo description");
    }

    return crudService(tableName).create(lesson)
}

const update = async (lesson: ILesson) => {
    if (!lesson.id) {
        throw new Error("Informe o campo id!");
    }

    if (!lesson.title) {
        throw new Error("Informe o campo title");
    }

    if (!lesson.description) {
        throw new Error("Informe o campo description");
    }

    return crudService(tableName).update(lesson)
}

const remove = crudService(tableName).remove

export {
    list,
    get,
    create,
    update,
    remove
}