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

function formatDate(date) {
    var d = new Date(date),
        month = '' + (d.getUTCMonth() + 1),
        day = '' + d.getUTCDate(),
        year = d.getUTCFullYear();

    if (month.length < 2)
        month = '0' + month;
    if (day.length < 2)
        day = '0' + day;

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
            $("#input-custo-por-dia").val(data.custoMedioDia);
            $("#input-avaliacao").val(data.avaliacao);
        },
        error: function (xhr, status, error) {
            console.error('Erro ao carregar dica:', status, error);
            $('#div-alert-message').prepend("Erro ao carregar dica. Por favor, tente novamente.");
            $('#div-alert-message').fadeIn();
        }
    });
});