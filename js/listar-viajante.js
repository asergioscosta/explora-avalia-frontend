$(document).ready(listarViajante);

function listarViajante() {
    $.ajax({
        url: 'http://localhost:8080/api/viajante',
        type: 'GET',
        dataType: 'json',
        success: function (result) {
            console.log(result);
            var html = '';
            $.each(result, function (i, data) {
                html += '<tr>';
                html += '<td>' + data.nome + '</td>';
                html += '<td>' + data.sobrenome + '</td>';
                html += '<td>' + data.email + '</td>';
                html += '<td>' + data.telefone + '</td>';

                // Verifica se o nivelExperiencia está definido e dentro do intervalo esperado
                if (data.nivelExperiencia !== undefined && data.nivelExperiencia >= 1 && data.nivelExperiencia <= 5) {
                    html += '<td>' + data.nivelExperiencia + '</td>';
                } else {
                    html += '<td>Valor inválido</td>';
                }
                html += '<td><a href="editar-viajante.html?id=' + data.id + '"><i class="bi bi-pencil-fill"></i></a>';
                html += ' <a href="visualizar-viajante.html?id=' + data.id + '"><i class="bi bi-search"></i></a>';
                html += ' <a href="#" onclick="removerViajante(' + data.id + ')"><i class="bi bi-archive-fill"></i></a></td></tr>';
            });

            $("#tbListarViajanteBody").html(html);
        },
        error: function (xhr, status, error) {
            console.error('Erro ao carregar os viajantes:', status, error);
            alert('Erro ao carregar os viajantes. Por favor, tente novamente.');
        }
    });
}

function removerViajante(id) {
    var respostaPergunta = confirm("Confirma a exclusão?");
    if (respostaPergunta == true) {
        $.ajax({
            type: 'DELETE',
            url: 'http://localhost:8080/api/viajante/' + id,
            dataType: 'json',
            success: function (result) {
                location.reload();
            },
            error: function (xhr, status, error) {
                console.error('Erro ao remover o viajante:', status, error);
                alert('Erro ao remover o viajante. Por favor, tente novamente.');
            }
        });
    }
}