const socketsConnected: any[] = []

let io: any


const initIo = (ioInstance: any) => {
    io = ioInstance
    stabilishConnection()
}


const getSocketById = (socketId: any) => {
    let index = socketsConnected.findIndex(socket => socket.client.id === socketId)
    return socketsConnected[index]
}

const stabilishConnection = () => {
    if (io) {
        io.on('connection', (socket: any) => {
            socketsConnected.push(socket)
            socket.emit('connection:sid', socket.client.id)

            socket.on('disconnect', () => {
                let position = -1
                socketsConnected.find((socketConnected, index) => {
                    if (socket.client.id === socketConnected.client.id) {
                        position = index
                    }
                })

                if (position > -1) {
                    socketsConnected.splice(position, 1)
                }

                io.emit('user_disconnected', socket.client.id)
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
    getSocketById,
    io
}
