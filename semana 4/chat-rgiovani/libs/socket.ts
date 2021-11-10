const socketsConnected: any[] = []
let io: any

const initIo = (ioInstance: any) => {
    io = ioInstance
    stabilishConnection()
}

const stabilishConnection = () => {
    if (io) {
        io.on('connection', (socket: any) => {
            socketsConnected.push(socket)

            socket.emit('connection:sid', socket.client.id)

            socket.on('disconnect', () => {
                io.emit('user_disconnected', socket.client.id)

                const position = socketsConnected.findIndex(socketConnected => socket.client.id === socketConnected.client.id)
                socketsConnected.splice(position, 1)
            })

            socket.on('message', (data: any) => {
                io.emit('message', data)
            })


        })


    }
}

const emitEvent = (event: string, socketId: string, data: any) => {
    socketsConnected.find(socket => {
        if (socket.client.id === socketId) {
            io.emit(event, data)
        }
    })
}


export {
    initIo,
    stabilishConnection,
    emitEvent,
    io
}