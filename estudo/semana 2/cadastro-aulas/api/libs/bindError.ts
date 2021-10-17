import { Response } from "express"

const statusError = (res: Response<any>, error: any) => {
    return res.status(400).json({ message: error.message })
}

export {
    statusError
}
