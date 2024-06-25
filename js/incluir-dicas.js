$('#form-incluir-dicas').submit(function (event) {

    event.preventDefault();

    var destino = $('#input-destino').val();
    var categorias = $('#input-categorias').val();
    var descricao = $('#input-descricao').val();
    var custoMedioDia = $('#input-custo-por-dia').val();
    var avaliacao = $('#input-avaliacao').val();

    if (!destino || !categorias || !descricao || !custoMedioDia || !avaliacao) {
        $('#div-alert-message').prepend('Todos os campos são obrigatórios.');
        $('#div-alert-message').fadeIn();
        return;
    }

    var formData = {
        'destino': $('#input-destino').val(),
        'categorias': $('#input-categorias').val(),
        'descricao': $('#input-descricao').val(),
        'custoMedioDia': $('#input-custo-por-dia').val(),
        'avaliacao': $('#input-avaliacao').val()
    };

    console.log(JSON.stringify(formData));

    $.ajax({
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        type: 'POST',
        url: 'http://localhost:8080/api/dicas',
        data: JSON.stringify(formData),
        dataType: 'json',
        success: function (data) {
            location.href = 'listar-dicas.html';
        },
        error: function (data) {
            $('#div-alert-message').prepend(data.responseText);
            $('#div-alert-message').fadeIn();
        }
    });
});
