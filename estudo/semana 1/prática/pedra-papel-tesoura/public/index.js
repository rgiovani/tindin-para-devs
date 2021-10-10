let startGame = false;
let reload = true;


function menu(start) {
    if (!!start) {
        startGame = start;
        reload = false;
        $('.menu').fadeOut('fast');
        $('.display').fadeIn(4000);
        $('.options').fadeIn(4000);
        play()
    }
}

function renderPlayAgain(computerPoints, userPoints) {
    let menu = `<img class="control_logo" 
    src="./assets/img/menu/`;
    let textPlay = 'PLAY';

    $('.menu').html('');

    if (computerPoints > 2 || userPoints > 2) {
        startGame = false;
        reload = true;
        $('.menu').fadeIn('fast');
        $('.display').hide();
        $('.options').hide();

        if (computerPoints > 2) {
            menu = menu.concat(`broken_control.png" alt="control_logo"></img>`);
            textPlay = "PLAY AGAIN";
        } else {
            menu = menu.concat(`control.png" alt="control_logo"></img>`);
        }

    } else {
        menu = menu.concat(`control.png" alt="control_logo"></img>`);
    }

    menu = menu.concat(`<button class="menu_buttons" onclick="menu(true)">
                <h1>${textPlay}</h1>
            </button>`);

    $('.menu').append(menu);
}

function renderDisplay(computerPoints, userPoints) {
    $('.display').append(`
    <div class="user_points">
        <img src="./assets/img/me.png" alt="user"></img>
        <p> ${(userPoints) ? userPoints : 0}</p>
    </div>

    <div class="computer_points">
        <img src="./assets/img/robot.png" alt="user"></img>
        <p> ${(computerPoints) ? computerPoints : 0}</p>
    </div>`);
}

function renderBallonHands(userChoose, computerChoose) {
    let userHand = `<div class="user_choose">`;
    let computerHand = `<div class="computer_choose">`;

    if (userChoose) {
        userHand = userHand.concat(`
            <img src="./assets/img/hands/${userChoose}.png" alt="${userChoose}"></img>
        `);

        computerHand = computerHand.concat(`
        <img src="./assets/img/hands/${computerChoose}.png" alt="${computerChoose}"></img>
        
        `);
        //$('.options').fadeOut("fast");
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
}

function play(userChoose) {
    if (!!reload) {
        $('.display').hide();
        $('.options').hide();
        renderPlayAgain(0, 0)
    }

    if (!!startGame) {
        $('.user_points').html('');
        $('.computer_points').html('');
        $('.ballons_container').html('');
        $('.rounds').html('');

        $.ajax({
            type: 'get',
            url: '/game/' + userChoose,
            contentType: "application/json; charset=utf-8",
            success: function (data) {
                renderDisplay(data.computerPoints, data.userPoints)

                let computerChoose;

                data.rounds?.find(item => {
                    computerChoose = item.computerChoose.toLowerCase();
                });

                renderBallonHands(userChoose, computerChoose);
                //$('.options').fadeIn("fast");

                if (userChoose) {
                    renderPlayAgain(data.computerPoints, data.userPoints);
                }

            },
            error: function (res) {
                alert(res);

            }
        });

    }
}

play();