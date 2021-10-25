import { crudController } from "./controller";
import * as userService from '../services/user';
import { Request, Response } from "express";
import { validateResponse } from "../libs/validators";

const login = async (req: Request<any>, res: Response<any>) => {
    const { email, password } = req.body
    validateResponse(res, userService.login, { email, password });
}

const logout = async (req: Request<any>, res: Response<any>) => {
    const { email, password } = req.body
    validateResponse(res, userService.logout, { email, password });
}

const list = crudController(userService).list;
const get = crudController(userService).get;
const create = crudController(userService, ["email", "password"]).create;
const update = crudController(userService, ["id", "email", "password"]).update;
const remove = crudController(userService).remove;

export {
    login,
    logout,
    list,
    get,
    create,
    update,
    remove,
}