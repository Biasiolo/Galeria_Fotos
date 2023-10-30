$(document).ready(function() {
    // Espera até que o documento esteja totalmente carregado

    // Quando o botão "ADICIONAR IMAGEM" no cabeçalho é clicado, o formulário desliza para cima ou para baixo
    $('header button').click(function() {
        toggleForm();
    });

    // Quando o botão de cancelar é clicado, o formulário desliza para cima
    $('#botao-cancelar').click(function() {
        hideForm();
    });

    // Array para armazenar endereços
    const enderecos = [];

    $('form').on('submit', function(e) {
        e.preventDefault();
        const endNovaImagem = $('#end-imagem').val();
        addImage(endNovaImagem);
        // Adicione o endereço à lista de endereços
        enderecos.push(endNovaImagem);
    });

    // Quando o botão "Salvar Endereços" é clicado, exibe os endereços no console (você pode personalizar esta parte)
    $('#salvar-enderecos').click(function() {
        if (enderecos.length === 0) {
            alert('Nenhum endereço para salvar.');
            return;
        }

        saveAddresses(enderecos);
    });

    function toggleForm() {
        $('form').slideToggle(500); // Animação de deslizamento de 500 milissegundos (0,5 segundos)
    }

    function hideForm() {
        $('form').slideUp(500); // Animação de deslizamento de 500 milissegundos (0,5 segundos)
    }

    function addImage(url) {
        const novoItem = $('<li style="display: none;"></li>'); // Define o estilo 'display: none;'
        $(`<img src="${url}" alt="Nova Imagem" />`).appendTo(novoItem);
        $(`<div class="overlay-imagem"><a href="${url}" target="_blank" title="Ver imagem ampliada">Ver imagem ampliada</a></div>`).appendTo(novoItem);
        $('ul').append(novoItem);
        novoItem.fadeIn(1000); // Aplicar fadeIn para o novo item com 1000 milissegundos (1 segundo)
        $('form')[0].reset(); // Limpa o formulário
    }

    function saveAddresses(addresses) {
        const texto = addresses.join('\n'); // Converte o array de endereços em uma string com quebras de linha
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

        showSuccessAlert();
    }

    function showSuccessAlert() {
        // Crie um elemento para o alerta e defina o estilo para centralizá-lo
        const alertDiv = document.createElement('div');
        alertDiv.style.position = 'fixed';
        alertDiv.style.top = '50%';
        alertDiv.style.left = '50%';
        alertDiv.style.transform = 'translate(-50%, -50%)';
        alertDiv.style.background = '#007ACC';
        alertDiv.style.color = '#FFFFFF';
        alertDiv.style.padding = '10px';
        alertDiv.style.borderRadius = '8px';

        // Texto do alerta
        alertDiv.innerHTML = 'URLs salvas com sucesso!';

        // Adicione o alerta ao corpo do documento
        document.body.appendChild(alertDiv);

        // Remova o alerta após alguns segundos (por exemplo, 3 segundos)
        setTimeout(function() {
            document.body.removeChild(alertDiv);
        }, 3000); // 3000 milissegundos (3 segundos)
    }
});