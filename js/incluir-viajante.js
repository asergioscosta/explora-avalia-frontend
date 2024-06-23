$('#form-incluir-viajante').submit(function (event) {

    event.preventDefault();

    var nascimentoVal = $('#input-nascimento').val();
    if (!nascimentoVal) {
        $('#div-alert-message').prepend('Data de nascimento é obrigatória.');
        $('#div-alert-message').fadeIn();
        return;
    }

    var nascimento = new Date(nascimentoVal + 'T00:00:00'); // Adicionando hora para evitar problemas de timezone

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
