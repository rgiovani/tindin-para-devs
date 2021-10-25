import { Request, Response } from 'express';
import { validateResponse } from '../libs/validators';

export function crudController(service: any, attributes?: Array<string>) {

    const objectValidator = (req: Request<any>) => {
        const newObj: any = {};

        attributes?.find(attr => {
            if (req.body[attr]) {
                newObj[attr] = req.body[attr];
            }
        })

        return newObj;
    }

    const list = async (req: Request<any>, res: Response<any>) => {
        return res.json(await service.list())
    }

    const get = async (req: Request<any>, res: Response<any>) => {
        const id = req.params.id
        if (!id) return res.status(400).json({ message: 'Informe o campo id!' })

        validateResponse(res, service.get, id);
    }

    const create = async (req: Request<any>, res: Response<any>) => {
        const newObj: any = objectValidator(req)

        validateResponse(res, service.create, newObj);
    }

    const update = async (req: Request<any>, res: Response<any>) => {
        const newObj: any = objectValidator(req)
        if (!newObj.id) {
            return res.status(400).json({ message: 'Informe o campo id!' })
        }

        validateResponse(res, service.update, newObj)
    }

    const remove = async (req: Request<any>, res: Response<any>) => {
        const { id } = req.body
        if (!id) {
            return res.status(400).json({ message: 'Informe o campo id!' })
        }
        validateResponse(res, service.remove, id)
    }

    return {
        list,
        get,
        create,
        update,
        remove
    }
}