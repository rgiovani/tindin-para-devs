const TAB = {
    NOTES: 'ANOTACOES',
    BOOK: 'LIVROS',
    FAVORITOS: 'FAVORITOS'
}

const page = {
    notes: {
        pageTitle: '<h3>Nova anotação</h3>',
        name: TAB.NOTES,
        routes: ['/notes'],
        placeHolders: ['Titulo da anotação', 'Descrição da anotação'],
        ids: ['titulo', 'descricao']
    },
    books: {
        pageTitle: '<h3>Novo livro</h3>',
        name: TAB.BOOK,
        routes: ['/books'],
        placeHolders: ['Titulo do livro', "Autor do livro", "Gênero do livro"],
        ids: ['titulo', 'autor', 'genero']
    },
    favorites: {
        pageTitle: '<h1>Nenhum item encontrado</h1>',
        name: TAB.FAVORITOS,
        routes: ['/notes/fav', '/books/fav']
    }
};

let currentPage = page.notes;
let resetFavTitle = true;
const arrayTmp = [];

const heartIcon = {
    empty: '<i class="far fa-heart" aria-hidden></i>',
    full: '<i class="fa fa-heart"></i>'
}


function salvar() {
    const id = $('#id').val()
    const titulo = $('#titulo').val()
    let descricao, autor, genero;

    if (!titulo) return alert('Campo titulo é obrigatório!');

    if (currentPage.name === TAB.NOTES) {
        descricao = $('#descricao').val()
        if (!descricao) return alert('Campo descricao é obrigatório!');
    } else if (currentPage.name === TAB.BOOK) {
        autor = $('#autor').val()
        genero = $('#genero').val()
        if (!autor) return alert('Campo autor é obrigatório!');
        if (!genero) return alert('Campo genero é obrigatório!');
    }

    const type = !id ? 'post' : 'put'

    $.ajax({
        type: type,
        url: currentPage.routes[0],
        data: JSON.stringify(currentPage.name === TAB.NOTES
            ? { title: titulo, description: descricao, id: id }
            : { title: titulo, author: autor, genre: genero, id: id }
        ),
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            // alert(data.message);
            $('#id').val('');
            $('#titulo').val('');
            if (currentPage.name === TAB.NOTES) {
                $('#descricao').val('');
            } else if (currentPage.name === TAB.BOOK) {
                $('#autor').val('');
                $('#genero').val('');
            }
            listar();
        },
        error: function (res) {
            alert(res.responseJSON.message);
        }
    })


    listar();
}

function cardRender(page, obj) {
    let card = `<div class="card">`;

    if (page === TAB.NOTES) {
        card = card.concat(`
                    <h2>${obj.title}</h2>
                    <p>${obj.description}</p>
                `)
    } else if (page === TAB.BOOK) {
        card = card.concat(`
                <h2>${obj.title}</h2>
                <p>${obj.author}</p>
                <p>${obj.genre}</p>
            `)
    }

    if (currentPage.name !== TAB.FAVORITOS) {
        card = card.concat(`
                <div class="button-card-container">
                        <button class="delete-card-button" onclick="excluir('${obj.id}')">
                            <i class='fa fa-times-circle'></i>
                        </button>
                        <button class="edit-card-button" onclick="editar('${obj.id}')">
                            <i class='fa fa-pen'></i>
                        </button> 
                        <button class="button-fav"
                            onclick="favoritar('${obj.id}')">
                                ${obj.isFav ? heartIcon.full : heartIcon.empty}
                         </button>
                    </div>
                </div>
        `);
    } else {
        $('.content-title').html('');
        $('.content-title').append(`${'<h1>Meus favoritos</h1>'}`);
        resetFavTitle = false;
        card = card.concat(`</div>`)
    }

    return card;
}

function formRender() {
    let formBody = `
    <input id="id" type="text" hidden>
    
    <label for="">
        <input id="${currentPage.ids[0]}" type="text" 
            placeholder="${currentPage.placeHolders[0]}">
    </label>
    <br>
    <label for="">
        <textarea name="" id="${currentPage.ids[1]}" rows="5" 
            placeholder="${currentPage.placeHolders[1]}"></textarea>
    </label>`

    if (currentPage.name === TAB.BOOK) {
        formBody = formBody.concat(`<br>
            <label for="">
                <input id="${currentPage.ids[2]}" type="text" 
                    placeholder="${currentPage.placeHolders[2]}">
            </label>`
        );
    }

    formBody = formBody.concat(`
        <div> 
            <button class="delete-button"><i class='fa fa-times-circle'></i></button> 
            <button class="confirm-button" onclick="salvar()"><i class='fa fa-check-circle'></i></button>
        </div>`
    );

    return formBody;
}

function listar() {
    $('.form').show();
    $('.form').html('');
    $('.content-list').html('');

    if (arrayTmp.length == 0) {
        resetFavTitle = true;
    }

    if (!!resetFavTitle) {
        $('.content-title').html('');
        $('.content-title').append(`${'<h1>Nenhum item encontrado</h1>'}`)
    }

    let cardTypes = [currentPage.name];

    if (currentPage.name === TAB.FAVORITOS) {
        cardTypes = [TAB.NOTES, TAB.BOOK];
        $('.form').hide();
    } else {
        $('.content-title').html('');
        $('.content-title').append(`
            ${currentPage.pageTitle}
        `)
        $('.form').append(formRender());
    }

    currentPage.routes.find((route, index) => {
        $.ajax({
            type: 'get',
            url: route,
            contentType: "application/json; charset=utf-8",
            success: function (data) {
                for (const obj of data) {
                    if (obj) {
                        if (!arrayTmp.find(item => item.id === obj.id)) {
                            if (!!obj.isFav)
                                arrayTmp.push(obj);
                        } else {
                            if (!obj.isFav) {
                                arrayTmp.find((item, index) => {
                                    if (item?.id == obj.id) {
                                        arrayTmp.splice(index, 1);
                                    }
                                })
                            }
                        }
                        $('.content-list').append(cardRender(cardTypes[index], obj));
                    }
                }
            },
            error: function (res) {
                alert(res.responseJSON.message);
            }
        });

    });
}

function editar(id) {
    if (id) {
        $.ajax({
            type: 'get',
            url: currentPage.routes[0] + '/' + id,
            contentType: "application/json; charset=utf-8",
            success: function (data) {
                $('#id').val(data.id);
                $('#titulo').val(data.title);
                if (currentPage.name === TAB.NOTES) {
                    $('#descricao').val(data.description);
                } else if (currentPage.name === TAB.BOOK) {
                    $('#autor').val(data.author);
                    $('#genero').val(data.genre);
                }
            },
            error: function (res) {
                alert(res.responseJSON.message);
            }
        });
    }

    listar();

}

function excluir(id) {
    if (id) {
        $.ajax({
            type: 'delete',
            url: currentPage.routes[0],
            data: JSON.stringify({ id: id }),
            contentType: "application/json; charset=utf-8",
            success: function (data) {
                arrayTmp.find((item, index) => {
                    if (item?.id == id) {
                        arrayTmp.splice(index, 1)
                    }
                })
            },
            error: function (res) {
                alert(res.responseJSON.message);
            }
        })
    }

    listar();
}

function favoritar(id) {
    $.ajax({
        type: 'get',
        url: currentPage.routes + '/' + id,
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            if (data) {
                data[0].isFav = !data[0].isFav;
                $.ajax({
                    type: 'put',
                    url: currentPage.routes,
                    data: JSON.stringify(data[0]),
                    contentType: "application/json; charset=utf-8",
                    success: function (data) {
                        listar();
                    },
                    error: function (res) { }
                });
            }

        },
        error: function (res) { }
    });

    listar();
}

function setPage(pageName) {
    if (pageName.toUpperCase() === TAB.BOOK) {
        currentPage = page.books;
    } else if (pageName.toUpperCase() === TAB.NOTES) {
        currentPage = page.notes;
    } else if (pageName.toUpperCase() === TAB.FAVORITOS) {
        currentPage = page.favorites;
    }

    listar();
}

listar();