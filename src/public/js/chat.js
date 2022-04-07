const socket = io();

let email = 'anonimo@mail.com'

let conectadoChat = false

socket.on('newMessage', dato => {
    console.log(dato)
    agregarLineaEnElChat(dato.from + ': ' + dato.message.msg)
})

socket.on('joinok', dato => {
    console.log("Usuario conectado al servidor de chat")
    agregarVerdeEnElChat("Usuario "+email+" conectado al servidor de chat")
    conectadoChat = true
    console.log(dato)
});

/* catch  clientSocket.emit('deliveryError', { "error": "No se encontro el destinatario" }) */

socket.on('deliveryError', dato => {
    console.log(dato);
    agregarErrorEnElChat(dato.error)
});


function agregarLineaEnElChat(texto) {
    const li = document.createElement('li')
    const span = document.createElement('span')
    span.innerText = texto
    li.appendChild(span)
    document.getElementById('ulChat').appendChild(li)
}

function agregarErrorEnElChat(texto) {
    const li = document.createElement('li')
    const span = document.createElement('span')
    span.innerText = texto
    span.style.color = 'red'
    li.appendChild(span)
    document.getElementById('ulChat').appendChild(li)
}
function agregarVerdeEnElChat(texto) {
    const li = document.createElement('li')
    const span = document.createElement('span')
    span.innerText = texto
    span.style.color = 'green'
    li.appendChild(span)
    document.getElementById('ulChat').appendChild(li)
}


function EnviarMensaje() {
    if (!conectadoChat)
        {
            JoinChatRoom()
            agregarErrorEnElChat("No estás conectado al chat, intentando conectar...")
            return
        }
    const form = document.getElementById('formChat')
    const emailto = form.emailto.value
    const txtMensaje = form.txtMensaje.value

    socket.emit('sendMessage', {
        to: emailto,
        from: email,
        msg: txtMensaje
    })
    agregarLineaEnElChat(email + ': ' + txtMensaje)

}

function JoinChatRoom() {

    fetch(ApiHost + '/auth/info', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(res => res.json())
        
        .then(res => {
            if (res.error) {
                console.log(res.error)
                agregarErrorEnElChat(res.message)
                return
            }
            console.log(res)
            email = res.email
            socket.emit('join', {
                email: email
            })
        })
}

/* 
   <form id="formChat">
        <input type="text" name="JWT" placeholder="JWT">
        <br>
*/
function JoinChat() {
    fetch(ApiHost + '/auth/loginJWT', {
        method: 'get',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + document.getElementById('JWT').value
        }
    }).then(() => {
        JoinChatRoom()
    })
        .catch(err => console.log(err))
}


