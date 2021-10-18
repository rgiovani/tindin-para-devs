const convertDataToObject = (data: any) => {
    return JSON.parse(JSON.stringify(data))
}

const convertStringInArray = (str: string) => {
    return str.split(',').filter(n => n != ',')
}

export {
    convertDataToObject,
    convertStringInArray
}