export interface iNotesCreate {
    title: string,
    description: string
}

export interface iNotesEdit {
    id: string,
    title: string,
    description: string
}

export interface iNotesInfo {
    id: string,
    title: string,
    description: string
}

export interface iNotesDelete {
    id: string
}