const convertDataToObject = (data: any) => {
    return JSON.parse(JSON.stringify(data))
}

export {
    convertDataToObject
}