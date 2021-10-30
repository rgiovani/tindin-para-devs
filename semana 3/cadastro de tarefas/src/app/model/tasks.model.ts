export interface iTasksCreate {
  name: string
}

export interface iTasksEdit {
  id: string,
  name: string,
  isChecked?: boolean
}

export interface iTasksInfo {
  id: string,
  name: string
}

export interface iTasksDelete {
  id: string
}
