import { Response } from "express";

import { IBook } from './../bookRoutes';

export const throwMessage = (responseStatus: Response, message: string) => {
    responseStatus.json({ message });
}

export const throwInvalidField = (res: Response, field: string) => {
    throwMessage(res.status(400), `O campo ${field} não foi encontrado ou não é valido!`)
}

export function findBookById(books: Array<IBook>, id: string): IBook | undefined {
    return books.find(book => book.id === id);
}
