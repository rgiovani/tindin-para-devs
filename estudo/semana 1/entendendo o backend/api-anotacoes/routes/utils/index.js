module.exports.throwMessage = (responseStatus, message) => {
    responseStatus.json({ message });
}

module.exports.throwInvalidField = (res, field) => {
    this.throwMessage(res.status(400), `O campo ${field} não foi encontrado ou não é valido!`)
}

module.exports.findItemIn = (array) => {
    return {
        where: (attributeName) => {
            return {
                equal: (value) => {
                    let hasItem;
                    array.find(obj => {
                        if (obj[attributeName] === value)
                            hasItem = obj;
                    });

                    return hasItem
                }
            }
        }
    }
}