export interface IBook {
    id?: string,
    title: string,
    author: string,
    genre: string,
    isFav?: boolean,
    createdAt?: Date,
    updatedAt?: Date
}