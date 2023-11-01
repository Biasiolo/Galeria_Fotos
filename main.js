$(document).ready(function() {
    // Inicializa o plugin e tenta carregar imagens a partir de cookies
    $('body').imageGalleryPlugin({
        loadImagesFromCookies: true
    });
});

(function($) {
    $.fn.imageGalleryPlugin = function(options) {
        var defaults = {
            animationDuration: 500,
            loadImagesFromCookies: false
        };

        var settings = $.extend({}, defaults, options);

        this.each(function() {
            var $this = $(this);
            var $form = $this.find('form');
            var $imageList = $this.find('ul');
            var $addButton = $this.find('header button');
            var $cancelButton = $this.find('#botao-cancelar');
            var $saveButton = $this.find('#salvar-enderecos');
            var $addressInput = $this.find('#end-imagem');
            var addresses = [];

            $addButton.click(function() {
                $form.slideToggle(settings.animationDuration);
            });

            $cancelButton.click(function() {
                hideForm();
            });

            $form.on('submit', function(e) {
                e.preventDefault();
                var newImageAddress = $addressInput.val();
                addImage(newImageAddress);
                addresses.push(newImageAddress);
                $addressInput.val('');

                // Salva as imagens em cookies
                if (settings.loadImagesFromCookies === true) {
                    saveImagesToCookies(addresses);
                }
            });

            $saveButton.click(function() {
                if (addresses.length === 0) {
                    alert('Nenhum endereço para salvar.');
                } else {
                    saveAddresses(addresses);
                }
            });

            // Função para esconder o formulário
            function hideForm() {
                $form.slideUp(settings.animationDuration);
            }

            // Função para adicionar imagens
            function addImage(url) {
                var $newItem = $('<li style="display: none;"></li>');
                $('<img src="' + url + '" alt="Nova Imagem" />').appendTo($newItem);
                $('<div class="overlay-imagem"><a href="' + url + '" target="_blank" title="Ver imagem ampliada">Ver imagem ampliada</a></div>').appendTo($newItem);
                $imageList.append($newItem);
                $newItem.fadeIn(1000);
            }

            // Função para salvar imagens em cookies
            function saveImagesToCookies(addresses) {
                var serializedAddresses = JSON.stringify(addresses);
                document.cookie = 'imageAddresses=' + serializedAddresses;
            }

            // Função para carregar imagens de cookies
            function loadImagesFromCookies() {
                var cookieValue = document.cookie.replace(/(?:(?:^|.*;\s*)imageAddresses\s*=\s*([^;]*).*$)|^.*$/, '$1');
                if (cookieValue) {
                    var addressesFromCookies = JSON.parse(cookieValue);
                    addressesFromCookies.forEach(function(address) {
                        addImage(address);
                        addresses.push(address);
                    });
                }
            }

            // Função para salvar endereços em um arquivo
            function saveAddresses(addresses) {
                var text = addresses.join('\n');
                var blob = new Blob([text], { type: 'text/plain' });
                var url = URL.createObjectURL(blob);
                var a = document.createElement('a');
                a.href = url;
                a.download = 'enderecos.txt';
                a.style.display = 'none';
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
                URL.revokeObjectURL(url);
                showSuccessAlert();
            }

            // Função para exibir um alerta de sucesso
            function showSuccessAlert() {
                var alertDiv = $('<div></div>');
                alertDiv.css({
                    position: 'fixed',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    background: '#007ACC',
                    color: '#FFFFFF',
                    padding: '10px',
                    borderRadius: '8px',
                });
                alertDiv.text('URLs salvas com sucesso!');
                document.body.appendChild(alertDiv[0]);
                setTimeout(function() {
                    alertDiv.remove();
                }, 3000);
            }

            // Carrega imagens a partir de cookies, se necessário
            if (settings.loadImagesFromCookies === true) {
                loadImagesFromCookies();
            }
        });
    };
})(jQuery);