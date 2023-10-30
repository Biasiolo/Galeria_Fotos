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

    // Array para armazenar endereços
    const enderecos = [];

    $('form').on('submit', function(e) {
        e.preventDefault();
        const endNovaImagem = $('#end-imagem').val();
        const novoItem = $('<li style="display: none;"></li>'); // Defina o estilo 'display: none;'
        $(`<img src="${endNovaImagem}" alt="Nova Imagem" />`).appendTo(novoItem);
        $(`<div class="overlay-imagem"><a href="${endNovaImagem}" target="_blank" title="Ver imagem ampliada">Ver imagem ampliada</a></div>`).appendTo(novoItem);
        $('ul').append(novoItem);
        novoItem.fadeIn(1000); // Aplicar fadeIn para o novo item com 1000 milissegundos (1 segundo)
        $('form')[0].reset(); // Limpa o formulário

        // Adicione o endereço à lista de endereços
        enderecos.push(endNovaImagem);
    });

    // Quando o botão "Salvar Endereços" é clicado, exibe os endereços no console (você pode personalizar esta parte)
    $('#salvar-enderecos').click(function() {
        if (enderecos.length === 0) {
            alert('Nenhum endereço para salvar.');
            return;
        }

        const texto = enderecos.join('\n'); // Converte o array de endereços em uma string com quebras de linha
        const blob = new Blob([texto], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);

        const a = document.createElement('a');
        a.href = url;
        a.download = 'enderecos.txt'; // Nome do arquivo a ser baixado
        a.style.display = 'none';
        document.body.appendChild(a);

        a.click();

        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    });
});