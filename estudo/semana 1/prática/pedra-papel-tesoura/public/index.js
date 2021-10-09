function play() {
    $.ajax({
        type: 'get',
        url: '/game',
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            $('.title').append(data)
        },
        error: function (res) {
            alert(res.responseJSON.message);
        }
    });
}

play();