var numeroAleatorio;
var tentativasRestantes;

// Função para reiniciar o jogo
function reiniciarJogo() {
    numeroAleatorio = Math.floor(Math.random() * 50) + 1; // Gera um novo número aleatório
    tentativasRestantes = 20; // Define o número de tentativas
    document.getElementById('resultado').innerText = '';
    document.getElementById('tentativas').innerText = 'Tentativas restantes: ' + tentativasRestantes;
    document.getElementById('palpite').value = '';
    document.getElementById('reiniciar').style.display = 'none'; // Esconde o botão de reiniciar
    const palpiteInput = document.getElementById('palpite');
    palpiteInput.focus();
    palpiteInput.disabled = false;
}

// Função que verifica o palpite do usuário
function verificarPalpite() {
    var palpite = document.getElementById('palpite').value; // Pega o valor do input

    const inputEl = document.getElementById('palpite');

    // Valida se o palpite está dentro do intervalo permitido
    if (palpite < 1 || palpite > 50) {
        document.getElementById('resultado').innerText = 'insira um número entre 1 e 50.';
        return; // Sai da função se o palpite for inválido
    }

    // Diminui o número de tentativas
    tentativasRestantes--;

    // Atualiza imediatamente o contador na tela
    document.getElementById('tentativas').innerText = 'Tentativas restantes: ' + tentativasRestantes;


    // Verifica se o palpite está correto
    if (palpite == numeroAleatorio) {
        document.getElementById('resultado').style.color = '#00ff00'; // Muda a cor da fonte para branca
        document.getElementById('resultado').innerText = 'Oloko,você acertou Parabéns!: ' + numeroAleatorio;
        document.getElementById('next-level').style.display = 'block'; // Mostra o botão de próximo nível
        inputEl.disabled = true;
    }
    else if (tentativasRestantes > 0) {
        document.getElementById('resultado').style.color = '#ff0000'; // Muda a cor da fonte para branca
        document.getElementById('resultado').innerText = 'Sei que é difícil,Não desista!';
        document.getElementById('tentativas').innerText = 'Tentativas restantes: ' + tentativasRestantes;

    } else {
        document.getElementById('resultado').innerText = 'Fim de Jogo!O número era: ' + numeroAleatorio;
        document.getElementById('reiniciar').style.display = 'block'; // Mostra o botão de reiniciar
        inputEl.disabled = true;
    }

    // Limpa o campo de input
    document.getElementById('palpite').value = '';
}

// Adiciona um evento para verificar o palpite quando "Enter" é pressionado
document.getElementById('palpite').addEventListener('keypress', function (event) {
    if (event.key === 'Enter') { // Verifica se a tecla pressionada é "Enter"
        verificarPalpite(); // Chama a função para verificar o palpite
    }
});

// Adiciona um evento para reiniciar o jogo quando o botão for clicado
document.getElementById('reiniciar').addEventListener('click', reiniciarJogo);

// Inicia o jogo pela primeira vez
reiniciarJogo();