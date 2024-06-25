$(document).ready(listarDicas);

function listarDicas() {
    $.ajax({
        url: 'http://localhost:8080/api/dicas',
        type: 'GET',
        dataType: 'json',
        success: function (result) {
            console.log(result);
            var html = '';
            $.each(result, function (i, data) {
                html += '<td>' + data.destino + '</td>';
                html += '<td>' + data.categorias + '</td>';
                html += '<td>' + data.descricao + '</td>';
                html += '<td>' + data.custoMedioDia + '</td>'; // Corrigido para custoMedioDia
                html += '<td>' + data.avaliacao + '</td>'; // Corrigido para avaliacao
                html += '<td><a href="editar-dicas.html?id=' + data.id + '"><i class="bi bi-pencil-fill"></i></a>';
                html += ' <a href="visualizar-dicas.html?id=' + data.id + '"><i class="bi bi-search"></i></a>';
                html += ' <a href="#" onclick="removerDica(' + data.id + ')"><i class="bi bi-archive-fill"></i></a></td></tr>';
                
            });

            $("#tbListarDicasBody").html(html);
        },
        error: function (xhr, status, error) {
            console.error('Erro ao carregar as dicas:', status, error);
            alert('Erro ao carregar as dicas. Por favor, tente novamente.');
        }
    });
}

function removerDica(id) {
    var respostaPergunta = confirm("Confirma a exclusão?");
    if (respostaPergunta == true) {
        $.ajax({
            type: 'DELETE',
            url: 'http://localhost:8080/api/dicas/' + id,
            dataType: 'json',
            success: function (result) {
                location.reload();
            },
            error: function (xhr, status, error) {
                console.error('Erro ao remover a dica:', status, error);
                alert('Erro ao remover a dica. Por favor, tente novamente.');
            }
        });
    }
}