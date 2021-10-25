
import { crudController } from "./controller";
import * as lessonService from '../services/lesson';

const list = crudController(lessonService).list;
const get = crudController(lessonService).get;
const create = crudController(lessonService, ["title", "description"]).create;
const update = crudController(lessonService, ["id", "title", "description"]).update;
const remove = crudController(lessonService).remove;

export {
    list,
    get,
    create,
    update,
    remove
}