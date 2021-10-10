function play(userChoose) {
    $('.user_points').html('');
    $('.computer_points').html('');
    $('.ballons_container').html('')

    $('.rounds').html('');
    $.ajax({
        type: 'get',
        url: '/game/' + userChoose,
        contentType: "application/json; charset=utf-8",
        success: function (data) {

            $('.display').append(`
                <div class="user_points">
                    <img src="./assets/img/me.png" alt="user"></img>
                    <p> ${(data.userPoints) ? data.userPoints : 0}</p>
                </div>

                <div class="computer_points">
                    <img src="./assets/img/robot.png" alt="user"></img>
                    <p> ${(data.computerPoints) ? data.computerPoints : 0}</p>
                </div>`);

            let computerChoose;

            data.rounds?.find(item => {
                computerChoose = item.computerChoose.toLowerCase();
            });

            let userHand = `<div class="user_choose">`;
            computerHand = `<div class="computer_choose">`;

            if (userChoose) {

                userHand = userHand.concat(`
                    <img src="./assets/img/hands/${userChoose}.png" alt="${userChoose}"></img>
                `);

                computerHand = computerHand.concat(`
                <img src="./assets/img/hands/${computerChoose}.png" alt="${computerChoose}"></img>
                
                `);

                $('.options').fadeOut("fast");

                opponentPlaying = true;
            }

            computerHand = computerHand.concat('</div>');

            userHand = userHand.concat('</div>');
            $('.ballons_container').append(userHand);
            $('.ballons_container').append(computerHand);
            $('.user_choose').hide();
            $('.computer_choose').hide();

            $('.user_choose').fadeIn(2000);
            $('.computer_choose').fadeIn(2000);

            $('.user_choose').fadeOut(8000);
            $('.computer_choose').fadeOut(8000);

            $('.options').fadeIn("fast");
        },
        error: function (res) {
            alert(res);

        }
    });
}

play();