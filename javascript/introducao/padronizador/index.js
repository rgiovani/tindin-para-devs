const { padronizar } = require("./padronizarMeuArray");

let clientesDoBanco = [
    {
        nome: "Ronaldo", sobrenome: "Giovani", telefone: 888888, clienteAntigo: false
    },
    {
        nome: "Leonardo", sobrenome: "Oliveira", telefone: 444444, clienteAntigo: true
    },
    {
        nome: "Ana", sobrenome: "Clara", telefone: 22222, clienteAntigo: true
    },
]

clientesDoBanco = padronizar(clientesDoBanco);

console.log(clientesDoBanco);