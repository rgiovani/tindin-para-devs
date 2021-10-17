import { Response } from "express"
import { statusError } from "./bindError"

export async function validateResponse(res: Response<any>, fn: any, param: any) {
    try {
        res.json(await fn(param))
    } catch (error: any) {
        return statusError(res, error)
    }
}


