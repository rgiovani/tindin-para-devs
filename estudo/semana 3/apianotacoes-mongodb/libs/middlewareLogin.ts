import { NextFunction, Request, Response } from "express";
import { isValidObjectId } from "mongoose";

import * as user from '../services/user'
import { IUser } from "../types/IUser";

declare global { //de forma global, permite que dentro de request seja adicionado a propriedade user.
    namespace Express {
        interface Request {
            user: IUser;
        }
    }
}

const isLogged = async (req: Request<any>, res: Response<any>, next: NextFunction) => {
    if (!req.headers.token) {
        return res.status(401).json({ message: "Voce nao esta logado!!!" })
    }

    let userLogged

    if (isValidObjectId(req.headers.token.toString())) {
        userLogged = await user.getById(req.headers.token.toString())
    }

    if (!userLogged) {
        return res.status(401).json({ message: "Token invalido!!!" })
    }

    req.user = userLogged

    next()
}

export {
    isLogged
}