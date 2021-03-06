const socket = io("");
var userSocketId = ''
let token
let userLogged = false
let warningUserMsg = 'Bem vindo,'

function handleSockets() {
    socket.on('connection:sid', function (data) {
        userSocketId = data.socketId
        verifyToken(token, data.socketsOnline)

        socket.on('message', (data) => {
            renderMessages([data])
        })

        socket.on('user_connected', (data) => {
            renderUserList(data)
        })

        socket.on('user_disconnected', (data) => {
            socket.emit('user_left', data)
        })

        socket.on('list_users', (data) => {
            renderUserList(data)
        })
    });
}

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
        success: function (res) {
            $('#username').html('')
            $('#username').append(`<span>${warningUserMsg} ${res.username}</span>`)
            sessionStorage.setItem('token', res.token)
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

function verifyToken(token, socketsOnline) {
    if (token && !userLogged) {
        $.ajax({
            type: 'post',
            url: '/auth/validate',
            headers: { 'token': token },
            data: JSON.stringify({ socketId: userSocketId, socketsOnline: socketsOnline }),
            contentType: "application/json; charset=utf-8",
            success: function (res) {
                if (!!res.isValid) {
                    userLogged = res
                    $('#username').html('')
                    $('#username').append(`<span>${warningUserMsg} ${res.username}</span>`)

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
    if (userData) {
        userData = JSON.parse(userData)
        const { usersOnChat } = userData

        let users = usersOnChat.filter((user, index, self) =>
            index === self.findIndex((u) => (
                u.name === user.name && u.email === user.email
            ))
        )

        $('#users').html('')

        users.find(otherUser => {
            document.getElementById('users').innerHTML += `<div class="user-name"><span>${otherUser.name}</span></div>`
        })
    }
}

function getDateTime(date) {
    let today = new Date()
    let currentUserDay = today.getDate();
    let currentUserMonth = today.getMonth() + 1;
    let currentUserYear = today.getFullYear();

    date = new Date(date)
    let userDay = date.getDate();
    let userMonth = date.getMonth() + 1;
    let userYear = date.getFullYear();

    let message

    if (userDay == currentUserDay && userMonth == currentUserMonth && userYear == currentUserYear) {
        message = 'hoje'
    } else if (userDay == currentUserDay - 1 && userMonth == currentUserMonth && userYear == currentUserYear) {
        message = 'ontem'
    } else {
        message = 'antigo'
    }

    let time = {
        hour: date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds(),
        msg: message
    }

    return time
}

function renderMessages(data) {
    let msg
    data.find(message => {
        const time = getDateTime(message.createdAt)


        msg = '<div class="user-message">'
        msg += `${message.user}: ${message.msg}`
        msg += `<div class="user-message-date">${time.msg} - ${time.hour}</div>`
        msg += '</div>'


        document.getElementById('list').innerHTML += msg
    })
}

function chat() {
    handleSockets()

    $('#msg').html('')

    token = sessionStorage.getItem('token')

    if (!userLogged) {
        $('#chat').hide()
    } else {
        $('#login').hide()
        $('#chat').show()

        $.ajax({
            type: 'get',
            url: `/chat/messages?perPage=20`,
            headers: { 'token': token },
            contentType: "application/json; charset=utf-8",
            success: function (res) {
                $('#list').html('')
                if (res.length > 0) {
                    renderMessages(res)
                }
            },
            error: function (res) {
                alert(res.responseJSON.message);
            }
        })
    }
}

chat()