
const clientes = {}

function chat(clientSocket) {


    clientSocket.on('join', function (userData) {
        clientSocket.email = userData.email
        clientes[userData.email] = clientSocket
        console.log(userData.email + ' se conecto al Servidor de chat')
        clientSocket.emit('joinok', { msg: 'Conectado Correctamente al servidor de CHAT' })
    })

    clientSocket.on('sendMessage', function (message) {
        let mensajeconFrom = {message}
        mensajeconFrom.from = clientSocket.email
        console.log(mensajeconFrom)
        if (clientes[message.to]) {
            clientes[message.to].emit('newMessage', mensajeconFrom)
        } else {
            clientSocket.emit('deliveryError', { "error": "No se encontro el destinatario" })
        }
    })

}

export default chat;