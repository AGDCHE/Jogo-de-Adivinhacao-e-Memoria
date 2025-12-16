const list = document.getElementById('list');
let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;
let attemptsLeft = 3;

function createCards() {
    // Embaralha o array de cartas
    fullCardDeck.sort(() => Math.random() - 0.5); // Randomiza a ordem

    document.querySelector('.button-start').style.display = 'none';
    document.querySelector('.button-restart').style.display = 'none';
    document.querySelector('.result').innerHTML = '';

    fullCardDeck.forEach(item => {
        const card = document.createElement('div');
        card.classList.add('flip-card');
        // Usamos um atributo de dados para identificar o par
        card.dataset.framework = item.name;

        card.innerHTML = `
        <img class="front-face" src="${item.img}" alt="${item.name}">
        <img class="back-face" src="./assents/8162761_25229.jpg">
    `;
        card.addEventListener('click', flipCard);
        list.appendChild(card);
    });
    updateAttemptsDisplay();
}

function flipCard() {
    if (lockBoard) return;
    if (this === firstCard) return; // Impede clicar na mesma carta duas vezes

    this.classList.add('flip');

    if (!hasFlippedCard) {
        // Primeiro clique
        hasFlippedCard = true;
        firstCard = this;
        return;
    }
    // Segundo clique
    secondCard = this;
    lockBoard = true; // Bloqueia o tabuleiro temporariamente

    checkForMatch();
}

function checkForMatch() {
    let isMatch = firstCard.dataset.framework === secondCard.dataset.framework;

    if (isMatch) {
        disableCards();
        checkAllCardsMatched()
    } else {
        attemptsLeft--;
        updateAttemptsDisplay()
        if (attemptsLeft <= 0) {
            document.querySelector('.result').innerHTML = 'Fim de jogo! Tente novamente.';
            document.querySelector('.button-restart').style.display = 'block';
            resetBoard();
        }
        unflipCards();
    }
}

function checkAllCardsMatched() {
    const matchedCards = document.querySelectorAll('.flip-card.flip');
    if (matchedCards.length === fullCardDeck.length) {
        document.querySelector('.result').innerHTML = 'Você conseguiu! Parabéns!';
        document.querySelector('.button-next-level').style.display = 'block';
    }
}

function disableCards() {
    // Pares encontrados, remove os listeners de clique
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);

    resetBoard();
}

function unflipCards() {
    setTimeout(() => {
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');
        resetBoard();
    }, 1000);
}

function resetBoard() {
    [hasFlippedCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
}

function restartGame() {
    // Limpa o tabuleiro
    list.innerHTML = '';
    // Reseta as variáveis do jogo
    hasFlippedCard = false;
    lockBoard = false;
    firstCard = null;
    secondCard = null;
    attemptsLeft = 3;
    // Cria novas cartas
    createCards();
}

function updateAttemptsDisplay() {
    // Atualiza o elemento HTML que mostra o número de tentativas
    document.querySelector('.remaining-attempt').textContent = 'Tentativas restantes: ' + attemptsLeft;
}

document.querySelector('.button-restart').addEventListener('click', restartGame);