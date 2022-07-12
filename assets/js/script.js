const cards = document.querySelectorAll('.card');
let hasFlippedCard = false;
let firstCard, secondCard;
let blockBoard = false;
let contagem = parseInt(0);

function flipCard() {
    if (blockBoard) {
        return;
    }

    if (this === firstCard) {
        return;
    }

    this.classList.toggle('flip');
    if (!hasFlippedCard) {
        hasFlippedCard = true;
        firstCard = this;
        return;
    }

    secondCard = this;
    hasFlippedCard = false;
    checkForMatch();
}

function checkForMatch() {
    if (firstCard.dataset.card === secondCard.dataset.card) {
        disableCards();
        return;
    }

    unflipCards();
}

function disableCards() {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);
    contagem++;    
    
    resetBoard();
    victory();
}

function unflipCards() {
    blockBoard = true;

    setTimeout(() => {
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');
        resetBoard();
    }, 1500)
}

function resetBoard() {
    [hasFlippedCard, blockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
}

(function shuflle() {
    cards.forEach((card) => {
        let randomPosition = Math.floor(Math.random() * 12);
        card.style.order = randomPosition;
    });
})();

function victory() {
    if(contagem == 6) {      
        setTimeout(() => {
            alert ('Parabéns! Você acertou todas as cartas! Aguarde, será carregado uma nova partida!')            
        }, 500)

        setTimeout(() => {
            window.location.reload();         
        }, 4000) 
    }
};

cards.forEach((card) => {
    card.addEventListener('click', flipCard)
})