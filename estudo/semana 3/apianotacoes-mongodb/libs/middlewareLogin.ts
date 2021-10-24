import { NextFunction, Request, Response } from "express";

const isLogged = (req: Request<any>, res: Response<any>, next: NextFunction) => {
    if (!req.headers.token) {
        return res.status(401).json({ message: "Voce nao esta logado!!!" })
    }

    next()
}

export {
    isLogged
}