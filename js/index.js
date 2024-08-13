document.addEventListener("DOMContentLoaded", function() {
    // Seleccionar los elementos del DOM
    const inputText = document.getElementById('inputText');
    const encryptBtn = document.getElementById('encryptBtn');
    const decryptBtn = document.getElementById('decryptBtn');
    const outputSection = document.querySelector('.output-section p');
    const copyBtn = document.createElement('button');

    // Crear y estilizar el botón de copiar
    copyBtn.textContent = "Copiar";
    copyBtn.style.backgroundColor = "#fff";
    copyBtn.style.color = "#0A3871";
    copyBtn.style.border = "2px solid #0A3871";
    copyBtn.style.padding = "10px 20px";
    copyBtn.style.borderRadius = "15px";
    copyBtn.style.cursor = "pointer";
    copyBtn.style.marginTop = "20px";

    // Función para encriptar el texto
    function encrypt(text) {
        const rules = { "e": "enter", "i": "imes", "a": "ai", "o": "ober", "u": "ufat" };
        return text.replace(/[eioua]/g, function(match) {
            return rules[match];
        });
    }

    // Función para desencriptar el texto
    function decrypt(text) {
        const rules = { "enter": "e", "imes": "i", "ai": "a", "ober": "o", "ufat": "u" };
        return text.replace(/enter|imes|ai|ober|ufat/g, function(match) {
            return rules[match];
        });
    }

    // Evento para el botón de encriptar
    encryptBtn.addEventListener('click', function() {
        const text = inputText.value;
        if (text) {
            outputSection.textContent = encrypt(text);
            document.querySelector('.output-section img').setAttribute('hidden', '');
            document.querySelector('.output-section small').setAttribute('hidden', '');
            outputSection.parentNode.appendChild(copyBtn);
            inputText.value = '';
        } else {
            document.querySelector('.output-section img').removeAttribute('hidden');
            document.querySelector('.output-section small').removeAttribute('hidden');
            outputSection.parentNode.removeChild(copyBtn);
            outputSection.textContent = 'Ningún mensaje fue encontrado';
        }
    });

    // Evento para el botón de desencriptar
    decryptBtn.addEventListener('click', function() {
        const text = inputText.value;
        if (text) {
            const decryptedText = decrypt(text);
            document.querySelector('.output-section img').setAttribute('hidden', '');
            document.querySelector('.output-section small').setAttribute('hidden', '');
            outputSection.parentNode.appendChild(copyBtn);
            outputSection.textContent = decryptedText;
            inputText.value = '';
        } else {
            document.querySelector('.output-section img').removeAttribute('hidden');
            document.querySelector('.output-section small').removeAttribute('hidden');
            outputSection.parentNode.removeChild(copyBtn);
            outputSection.textContent = 'Ningún mensaje fue encontrado';
        }
    });

    // Evento para el botón de copiar
    copyBtn.addEventListener('click', function() {
        const text = outputSection.textContent;
        if (text) {
            navigator.clipboard.writeText(text).then(() => {
                inputText.value = text;
            }).catch(err => {
                console.error("Error al copiar el texto: ", err);
            });
        }
    });
});
