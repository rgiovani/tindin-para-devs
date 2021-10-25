module.exports.padronizar = (arrayDeObjetos) => {
    const arrayNovo = []
    let registro = 0

    for (const objeto of arrayDeObjetos) {
        if (typeof objeto === "object") {
            let novoObjeto = objeto;
            novoObjeto.id = registro
            novoObjeto.updatedAt = new Date();

            arrayNovo.push(novoObjeto)

            registro++
        }
    }

    return arrayNovo
}
