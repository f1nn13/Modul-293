const cards = document.querySelectorAll('.card');
let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;
let spielZaehler = 0;
let lastCard;
let counter = 0;


function flipCard() {
  if (lockBoard) return;
  if (this === firstCard) return;

  this.classList.add('flipped');

  if (!hasFlippedCard) {
    hasFlippedCard = true;
    firstCard = this;
    return;
  }


  secondCard = this;
  checkForMatch();
}

function checkForMatch() {
  let isMatch = firstCard.dataset.framework === secondCard.dataset.framework;

  isMatch ? disableCards() : unflipCards();
}

function disableCards() {
  firstCard.removeEventListener('click', flipCard);
  secondCard.removeEventListener('click', flipCard);

  resetBoard();
}

function unflipCards() {
  lockBoard = true;

  setTimeout(() => {
    firstCard.classList.remove('flipped');
    secondCard.classList.remove('flipped');

    resetBoard();
  }, 1500);
}

function resetBoard() {
  [hasFlippedCard, lockBoard] = [false, false];
  [firstCard, secondCard] = [null, null];
}

(function shuffle() {
  cards.forEach(card => {
    let randomPos = Math.floor(Math.random() * 16);
    card.style.order = randomPos;
  });
})();

cards.forEach(card => card.addEventListener('click', event => {
  console.log(event.currentTarget.firstChild);
  spielZaehler++;
  // event.currentTarget.firstChild.style.display="block";
  if (spielZaehler == 1) {
    lastCard = event.currentTarget.firstChild;
    $(event.currentTarget.firstChild).fadeToggle(1000);
  }
  if (spielZaehler == 2) {
    $(event.currentTarget.firstChild).fadeToggle(1000);
    if (lastCard.src == event.currentTarget.firstChild.src) {
      console.log("stimmt");
      lastCard.parentNode.removeEventListener("click", event);
      event.currentTarget.parentNode.removeEventListener("click",event);
      counter++;
      setTimeout(1000 )
      if(counter >= 8){
        alert("glück")
        location.reload();
      }

      
      

    } else {
      $(event.currentTarget.firstChild).fadeToggle(1000);
      $(lastCard).fadeToggle(1000);
      
    }
    spielZaehler=0;
    
    
  }

}));
