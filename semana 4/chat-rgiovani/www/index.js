const socket = io("");
var userSocketId = ''
let token

let userLogged = false

function sendLogin() {
    const email = document.getElementById('email').value
    const password = document.getElementById('password').value

    if (!email) {
        alert('Digite seu email')
        return
    }

    if (!password) {
        alert('Digite sua senha')
        return
    }

    $.ajax({
        type: 'post',
        url: '/login',
        data: JSON.stringify({ email: email, password: password, socketId: userSocketId }),
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            sessionStorage.setItem('token', data.token)
            userLogged = true
            chat()
        },
        error: function (res) {
            alert(res.responseJSON.message);
        }
    })
}

function sendMsg() {
    const msg = document.getElementById('msg').value
    if (!msg) {
        alert('Digite uma mensagem')
        return
    }

    $.ajax({
        type: 'post',
        url: '/chat/messages',
        headers: { 'token': token },
        data: JSON.stringify({ text: msg, socketId: userSocketId }),
        contentType: "application/json; charset=utf-8",
        success: function (res) {
            $('#msg').val('');
        },
        error: function (res) {
            alert(res.responseJSON.message);
        }
    })
}

function verifyToken(token) {

    if (token && !userLogged) {
        $.ajax({
            type: 'post',
            url: '/auth/validate',
            headers: { 'token': token },
            data: JSON.stringify({ socketId: userSocketId }),
            contentType: "application/json; charset=utf-8",
            success: function (res) {
                if (!!res.isValid) {
                    userLogged = res
                    $('#username').html('')
                    $('#username').append(`<span>${res.username}</span>`)

                    chat()
                }
            },
            error: function (res) {
                alert(res.responseJSON.message);
            }
        })
    }
}

function renderUserList(userData) {
    const { username, usersOnChat } = JSON.parse(userData)

    $('#users').html('')

    usersOnChat.find(otherUser => {
        document.getElementById('users').innerHTML += `<div class="user-name"><span>${otherUser.name}</span></div>`
    })
}

function renderMessages(data) {
    data.find(message => {
        document.getElementById('list').innerHTML += `<div class="user-message">${message.user}: ${message.msg}</div>`
    })
}

function chat() {
    socket.on('connection:sid', function (socketId) {
        userSocketId = socketId
        verifyToken(token)
    });

    $('#msg').html('')

    token = sessionStorage.getItem('token')

    if (!userLogged) {
        $('#chat').hide()
    } else {
        $('#login').hide()
        $('#chat').show()
        $.ajax({
            type: 'get',
            url: '/chat/messages',
            headers: { 'token': token },
            contentType: "application/json; charset=utf-8",
            success: function (res) {

                if (res.length > 0) {
                    renderMessages(res)
                }
                socket.on('message', (data) => {
                    renderMessages([data])

                })
            },
            error: function (res) {
                alert(res.responseJSON.message);
            }
        })


    }

    socket.on('user_connected', (data) => {
        renderUserList(data)
        verifyToken(token)
    })

    socket.on('user_disconnected', (socketId) => {
        $.ajax({
            type: 'post',
            url: '/user/logout',
            data: JSON.stringify({ socketId: socketId }),
            contentType: "application/json; charset=utf-8",
            success: function (res) {

            },
            error: function (res) {
                alert(res.responseJSON.message);
            }
        })
    })

    socket.on('list_users', (data) => {
        renderUserList(data)
    })
}

chat()