$(document).ready(function() {
    // Espera até que o documento esteja totalmente carregado

    // Quando o botão no cabeçalho é clicado, o formulário desliza para cima ou para baixo
    $('header button').click(function() {
        $('form').slideToggle(500); // A animação levará 500 milissegundos (0,5 segundos)
    });

    // Quando o botão de cancelar é clicado, o formulário desliza para cima
    $('#botao-cancelar').click(function() {
        $('form').slideUp(500); // A animação levará 500 milissegundos (0,5 segundos)
    });

    // Previne o envio padrão do formulário
    $('form').on('submit', function(e) {
        e.preventDefault();
        const endNovaImagem = $('#end-imagem').val();
        const novoItem = $('<li style="display: none;"></li>'); // Defina o estilo 'display: none;'
        $(`<img src="${endNovaImagem}" alt="Nova Imagem" />`).appendTo(novoItem);
        $(`<div class="overlay-imagem"><a href="${endNovaImagem}" target="_blank" title="Ver imagem ampliada">Ver imagem ampliada</a></div>`).appendTo(novoItem);
        $('ul').append(novoItem);
        novoItem.fadeIn(1000); // Aplicar fadeIn para o novo item com 500 milissegundos
        $('form')[0].reset(); // Limpa o formulário
        $('form').slideUp(500); // Fecha o formulário mais lentamente
    });
});