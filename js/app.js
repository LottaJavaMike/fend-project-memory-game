/*
 * Create a list that holds all of your cards
 */
const deck = document.querySelector(".deck");
let cards = document.querySelectorAll(".card");
let cardList = [...cards];
let openCards = [];
let matchedCards = [];

/*
 * setup counter
 */
let counter = 0;
let moves = document.querySelector(".moves");
moves.innerText = counter;

/*
 * event listener added to cards
 */
for (var i = 0; i < cardList.length; i++){
  cardList[i].addEventListener("click", displayCard);
};

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */
var displayCard = function() {
  this.classList.toggle("open");
  this.classList.toggle("show");
  this.classList.toggle("disabled");
}
// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}
cardList = shuffle(cardList);

/*
 * initialize the Game
 */
function newGame() {
  for (let i = 0; i <cardList.length; i++) {
    let card = cardList[i];
    deck.appendChild(card);
  }
  shuffle(cardList);
}
newGame;

/*
 * eventListener for the cards
 */
cardList.forEach(function(card) {
  card.addEventListener("click", function() {
    countMoves();
    if (!card.classList.contains("open") && !card.classList.contains("show") && !card.classList.contains("disabled")) {
      openCards.push(card);
    if (openCards.length <= 2) {
      this.classList.add("open", "show", "disabled");
      if (openCards.length === 2){
        if (openCards[0].innerHTML === openCards[1].innerHTML){
          match();
        } else {
          noMatch();
        }
      }
      if (matchedCards.length == 8) {
        finalTime = timer.innerHTML;
        showModal();
      }
    }
    }
  })
})

/*
 * cards match up
 */
function match() {
  openCards[0].classList.add("match");
  openCards[1].classList.add("match");
  matchedCards.push(this);
  openCards = [];
}

/*
 * cards do not match up
 */
function noMatch(){
  openCards[0].classList.add("no-match", "disabled");
  openCards[1].classList.add("no-match", "disabled");
  setTimeout(function() {
    openCards[0].classList.remove("open", "show", "no-match", "disabled");
    openCards[1].classList.remote("open", "show", "no-match", "disabled");
    openCards = [];
  }, 800);
}
 /*
  * we count the moves
  */
function countMoves(){
  counter++;
  moves.innerText = counter;
  starRating(counter);
  if (counter == 1) {
    sec = 0;
    min = 0;
    startTimer();
  }
}

/*
 * star rating
 */
let starList = document.querySelectorAll("ul.stars");
function starRating(counter){
  if (counter === 24) {
    starList[0].removeChild(starList[0].children[0]);
  } else if (counter === 30) {
    starList[0].removeChild(starList[0].children[0])
  } else if (counter === 36) {
    starList[0].removeChild(starList[0].children[0])
  } else if (counter === 42) {
    starList[0].removeChild(starList[0].children[0])
  }
}

/*
 * ending the game
 */
function endGame() {
  if (matchedCards.length == 8){
    clearInterval(interval);
    finalTime = timer.innerHTML;
    showModal();
  }
}

/*
 * modal buttons
 */
const closeButton = document.querySelector(".modal_close");
const replayButton = document.querySelector(".modal_replay");
closeButton.addEventListener("click", showModal);
replayButton.addEventListener("click", function() {
  showModal();
  resetGame();
})

/*
 * modal variables
 */
const modalTime = document.querySelector(".modal_time");
const modalStars = document.querySelector(".modal_stars");
const modalMoves = document.querySelector(".modal_moves");
const modalTimerValue = document.querySelectorAll(".timer");

/*
 * showModal function
 */
function showModal() {
  stopTimer();
  const modal = document.querySelector(".modal_popup");
  modalMoves.innerText = "Moves = " + counter;
  modalStarts.innerText = "Stars = " + starList[0].childElementCount;
  modalTime.innerText = "Time = " + modalTimerValue[0].innerText;
  modal.classList.toggle("hide");
}

/*
 * reset the stars
 */
function resetStars () {
  if (starList[0].childElementCount === 4) {
    starList[0].insertAdjancentHTML("beforeend", '<li><i class="fa fa-star"></i></li>');
  } else if (starList[0].childElementCount === 3) {
    starList[0].insertAdjancentHTML("beforeend", '<li><i class="fa fa-star"></i></li>');
    starList[0].insertAdjancentHTML("beforeend", '<li><i class="fa fa-star"></i></li>');
  } else if (starList[0].childElementCount === 2) {
    starList[0].insertAdjancentHTML("beforeend", '<li><i class="fa fa-star"></i></li>');
    starList[0].insertAdjancentHTML("beforeend", '<li><i class="fa fa-star"></i></li>');
    starList[0].insertAdjancentHTML("beforeend", '<li><i class="fa fa-star"></i></li>');
  } else if (starList[0].childElementCount === 1) {
    starList[0].insertAdjancentHTML("beforeend", '<li><i class="fa fa-star"></i></li>');
    starList[0].insertAdjancentHTML("beforeend", '<li><i class="fa fa-star"></i></li>');
    starList[0].insertAdjancentHTML("beforeend", '<li><i class="fa fa-star"></i></li>');
    starList[0].insertAdjancentHTML("beforeend", '<li><i class="fa fa-star"></i></li>');
  } else if (starList[0].childElementCount === 0) {
    starList[0].insertAdjancentHTML("beforeend", '<li><i class="fa fa-star"></i></li>');
    starList[0].insertAdjancentHTML("beforeend", '<li><i class="fa fa-star"></i></li>');
    starList[0].insertAdjancentHTML("beforeend", '<li><i class="fa fa-star"></i></li>');
    starList[0].insertAdjancentHTML("beforeend", '<li><i class="fa fa-star"></i></li>');
    starList[0].insertAdjancentHTML("beforeend", '<li><i class="fa fa-star"></i></li>');
  }
}

/*
 * reset the buttons
 */
let resetButton = document.querySelectorAll(".restart");
resetButton[0].addEventListener("click", resetGame);

/*
 * reset function
 */
function resetGame() {
  counter = 0;
  moves.innerText = counter;
  sec = 0;
  min = 0;
  timeClock.innerHTML = "0" + min + ":" + "0" + sec;
  clearInterval(timer);
  stopTimer();
  openCards = [];
  matchedCards = [];
  resetStars();
  allCards.forEach(function(card) {
    card.classList.remove("open", "show", "disabled", "match");
  })
  var newCardList = Array.from(allCards);
  shuffle(newCardList);
  var deck = document.querySelector(".deck");
  for (card of newCardList){
    deck.appendChild(card);
  }
} 
