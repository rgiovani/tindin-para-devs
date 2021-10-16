import { Response } from "express"
import { statusError } from "./bindError"

export function validateResponse(res: Response<any>, fn: any, param: any) {
    try {
        res.json(fn(param))
    } catch (error: any) {
        return statusError(res, error)
    }
}


