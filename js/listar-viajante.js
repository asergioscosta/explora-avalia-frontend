$(document).ready(listarViajante);

function listarViajante() {
    $.ajax({
        url: 'http://localhost:8080/api/viajante',
        type: 'GET',
        dataType: 'json',
        success: function(result) {
            console.log(result);
            var html = '';
            $.each(result, function(i, data) {
                html += '<tr>';
                html += '<td>' + data.nome + '</td>';
                html += '<td>' + data.sobrenome + '</td>';
                html += '<td>' + data.email + '</td>';
                html += '<td>' + data.telefone + '</td>';

                // Verifica se nivelexperiencia está definido e se é um número válido
                if (data.nivelexperiencia !== undefined && data.nivelexperiencia >= 1 && data.nivelexperiencia <= 5) {
                    html += '<td>' + data.nivelexperiencia + '</td>';
                } else {
                    html += '<td>Valor inválido</td>';
                }
                html += '<td><a href="editar-viajante.html?id=' + data.id + '"><i class="bi bi-pencil-fill"></i></a>';
                html += ' <a href="visualizar-viajante.html?id=' + data.id + '"><i class="bi bi-search"></i></a>';
                html += ' <a href="#" onclick="removerViajante(' + data.id + ')"><i class="bi bi-archive-fill"></i></a></td></tr>';
            });

            $("#tbListarViajanteBody").html(html);
        }
    })

    function removerViajante(id) {

        var respostaPergunta = confirm("Confirma a exclusão?");
        if (respostaPergunta == true) {

            $.ajax({
                type: 'DELETE',
                url: 'http://localhost:8080/api/viajante' + id,
                dataType: 'json',
                success: function (result) {
                    location.reload();
                },
                error: function (result) {
                    alert(result);
                }
            })

        }
    }
}