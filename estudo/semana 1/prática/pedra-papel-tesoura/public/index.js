function play(userChoose) {
    $('.user_points').html('');
    $('.computer_points').html('');

    $('.rounds').html('');
    $.ajax({
        type: 'get',
        url: '/game/' + userChoose,
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            $('.user_points').append(`
                <p class="user_points">USUARIO: ${(data.userPoints) ? data.userPoints : 0}
            </p>`);
            $('.computer_points').append(`<p class="computer_points">
                COMPUTADOR: ${(data.computerPoints) ? data.computerPoints : 0}
            </p>`)

            let log = `<div class="rounds">`;

            data.rounds?.find((item, index) => {
                log = log.concat(`
                        <p class="counter">
                                Jogada: ${item.play}
                        </p>
                        <p class="user_choose">
                                Usuario escolheu: ${item.userChoose}
                        </p>
                        <p class="computer_choose">
                            Computador escolheu: ${item.computerChoose}
                        </p>

                        <p class="winner">
                                Ganhador da rodada: ${item.winner}
                        </p>
                `);
            });

            log = log.concat('</div>');

            $('.rounds').append(log)
        },
        error: function (res) {
            alert(res);
        }
    });
}

play();