import { NextFunction, Request, Response } from "express"
import { verify } from 'jsonwebtoken'

import { IUser } from "../types/IUser"

declare global { //de forma global, permite que dentro de request seja adicionado a propriedade user.
    namespace Express {
        interface Request {
            user: IUser
        }
    }
}

const isLogged = async (req: Request<any>, res: Response<any>, next: NextFunction) => {
    if (!req.headers.token) {
        return res.status(401).json({ message: "Voce nao esta logado!!!" })
    }

    try {
        const payload = verify(req.headers.token?.toString(), process.env.JWT_SECRET ?? 'emptyjwt') as any
        req.user = payload
        next()
    } catch (error: any) {
        return res.status(401).json({ message: error.message })
    }
}

export {
    isLogged
}