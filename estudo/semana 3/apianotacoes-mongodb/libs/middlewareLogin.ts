import { NextFunction, Request, Response } from "express";
import { isValidObjectId } from "mongoose";

import * as user from '../services/user'

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

    next()
}

export {
    isLogged
}