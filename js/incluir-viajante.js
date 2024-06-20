//Processar formulário
$('#form-incluir-viajante').submit(function (event) {


    event.preventDefault();

    nascimento = new Date($('#input-nascimento').val());


    //Criar formData
    var formData = {
        'nome': $('#input-nome').val(),
        'sobrenome': $('#input-sobrenome').val(),
        'email': $('#input-email').val(),
        'telefone': $('#input-telefone').val(),
        'dataNascimento': nascimento.toISOString(),
        'nivelExperiencia': $('#input-nivelExperiencia').val()
    };

    console.log(JSON.stringify(formData));

    $.ajax({
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        type: 'POST',
        url: 'http://localhost:8080/api/viajante',
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