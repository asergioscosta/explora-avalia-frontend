function GetURLParameter(sParam) {
    var sPageURL = window.location.search.substring(1);
    var sURLVariables = sPageURL.split('&');
    for (var i = 0; i < sURLVariables.length; i++) {
        var sParameterName = sURLVariables[i].split('=');
        if (sParameterName[0] == sParam) {
            return sParameterName[1];
        }
    }
}

var id_dicas = GetURLParameter("id");

// Processar formulário
$('#form-editar-dicas').submit(function (event) {
    event.preventDefault();

    // Criar formData
    var formData = {
        'destino': $('#input-destino').val(),
        'categorias': $('#input-categorias').val(),
        'descricao': $('#input-descricao').val(),
        'custoMedioDia': $('#input-custo-medio-dia').val(),
        'avaliacao': $('#input-avaliacao').val()
    };

    console.log(JSON.stringify(formData));

    $.ajax({
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        type: 'PUT',
        url: 'http://localhost:8080/api/dicas/' + id_dicas,
        data: JSON.stringify(formData),
        dataType: 'json',
        success: function (data) {
            location.href = 'listar-viajante.html';
        },
        error: function (data) {
            $('#div-alert-message').prepend(data.responseText);
            $('#div-alert-message').fadeIn();
        }
    });
});

function esconderAlert() {
    $('#div-alert-message').html("<a class='close' onclick='esconderAlert()'>×</a>");
    $('#div-alert-message').hide();
}

function formatDate(date) {
    var d = new Date(date),
        month = '' + (d.getUTCMonth() + 1),
        day = '' + d.getUTCDate(),
        year = d.getUTCFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [year, month, day].join('-');
}

$(document).ready(function () {
    $.ajax({
        url: 'http://localhost:8080/api/dicas/' + id_dicas,
        type: 'GET',
        dataType: 'json',
        success: function (data) {
            $("#input-destino").val(data.destino);
            $("#input-categorias").val(data.categorias);
            $("#input-descricao").val(data.descricao);
            $("#input-custoMedioDia").val(data.custo_medio_dia);
            $("#input-avaliacao").val(data.avaliacao);
        },
        error: function (data) {
            $('#div-alert-message').prepend(data.responseText);
            $('#div-alert-message').fadeIn();
        }
    });
});