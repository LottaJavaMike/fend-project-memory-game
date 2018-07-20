/*
 * Variables
 */
const restart = document.querySelector('.restart');
const starItem = document.querySelector('.stars').firstElementChild;
const moves = document.querySelector('.moves');
const deck = document.querySelector('.deck');
const endScreen = document.getElementById('won-game');
const playAgain = document.getElementById('playAgain');
let cards = document.querySelectorAll('.card');
let openCards = [];
let countMatching = 0;
let clickCount = 0;
let moveCount = 0;
let starCount = 3;
let time = 0;
let timerOn = false;
let timeCounter = "";
let prevTarget = "";

/*
 * list of cards
 */
const cardArray = ["fa-gem","fa-paper-plane","fa-anchor","fa-bolt","fa-cube","fa-anchor","fa-leaf", "fa-bicycle","fa-gem","fa-bomb","fa-leaf","fa-bomb","fa-bolt","fa-bicycle","fa-paper-plane","fa-cube"];


restart.addEventListener('click', setBoard);
playAgain.addEventListener('click', setBoard);

/*
 * Click card
 */
cards.forEach(function(card) {
  card.addEventListener('click', cardClick);
});

/*
 * Shuffle function from http://stackoverflow.com/a/2450976
 */
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

/*
 * timer
 */
function startTimer() {
  if(timerOn === false) {
    timerOn = true;
    timer();
  }
}

function timer() {
  timeCounter = setTimeout(timer, 1000);
  time = time + 1;
  document.getElementById('timeDisplay').innerHTML = time;
}

/*
 * new game
 */
function setBoard() {
  while(deck.firstChild) {
    deck.removeChild(deck.firstChild);
  }
  clickCount = 0;
  moveCount = 0;
  countMatching = 0;
  clearTimeout(timeCounter);
  time = 0;
  timerOn = false;
  openCards = [];
  if(starCount === 2) {
    let star = document.createElement("i");
    starItem.appendChild(star).setAttribute("class", "fas fa-star");
  }
  if(starCount === 1) {
    let star2 = document.createElement("i");
    starItem.appendChild(star2).setAttribute("class", "fas fa-star");
    let star3 = document.createElement("i");
    starItem.appendChild(star3).setAttribute("class", "fas fa-star");
  }
  starCount = 3;
  moves.innerHTML = 0;
  endScreen.style.display = "none";
  document.getElementById('timeDisplay').innerHTML = time;

  shuffle(cardArray);

  for(i = 0; i < cardArray.length; i++) {
    let li = document.createElement("li");
    let ico = document.createElement("i");
    deck.appendChild(li).setAttribute("class", "card");
    li.appendChild(ico).setAttribute("class",`fas ${cardArray[i]}`);
  }

  let cards = document.querySelectorAll('.card');
  cards.forEach(function(card) {
    card.addEventListener('click', cardClick);
  });
}

/*
 * event listener for card clicks
 */
function cardClick(evt) {
  if(openCards.length <= 1) {
    evt.target.classList.add('animated', 'flipInY');
    displaySymbol(evt.target);
    countMoves(evt.target);
    startTimer();
    testCard(evt.target);
    allMatched();
    console.log("timer on: " + timerOn);
  }
}

function displaySymbol(tile) {
  tile.classList.add('show', 'open');
}
function countMoves(tileName) {
  if(prevTarget != tileName) {
    clickCount = ++clickCount;
    moveCount = (clickCount / 2);
    if(Number.isInteger(moveCount)) {
      moves.innerHTML = moveCount;
    }
    if(moveCount === 10) {
      starItem.removeChild(starItem.firstElementChild);
      starCount = --starCount;
    }
    if(moveCount === 15) {
      document.querySelector('.stars').removeChild(document.querySelector('.stars').children[1]);
      starCount = --starCount;
    }
  }
  prevTarget = tileName;
}

function testCard(tile) {
  let matching = "";
  tileName = tile.firstElementChild.classList.item(1);
  openCards.push(tileName);
  console.log(openCards);
  if(openCards.length == 2) {
    if(openCards[0] === openCards[1]) {
      matching = true;
    } else {
      matching = false;
    }
  }
  if(openCards.length == 2 && !matching) {
    setTimeout(function() {
        openCards.forEach(function(item) {
          let shownIcon = document.getElementsByClassName(item);
          for(i=0; i < shownIcon.length; i++) {
            shownIcon[i].parentNode.classList.remove('show', 'open', 'animated', 'flipInY');
          }
        });
        openCards = [];
    }, 750);
  }
  if(openCards.length == 2 && matching) {
    openCards.forEach(function(item) {
      let shownIcon = document.getElementsByClassName(item);
      for(i=0; i < shownIcon.length; i++) {
        shownIcon[i].parentNode.classList.replace('open', 'match');
        shownIcon[i].parentNode.classList.replace('flipInY', 'rubberBand');
      }
    });
      openCards = [];
      matching = false;
      countMatching = ++countMatching;
  }

console.log(openCards);
console.log(matching);
console.log("match count:" + countMatching);
}

/*
 * end game
 */
function allMatched() {
  if (countMatching === 8) {
    clearTimeout(timeCounter);
    timerOn = false;
    endScreen.style.display = "block";
    document.getElementById('numberMoves').innerHTML = Math.round(moveCount);
    document.getElementById('starCount').innerHTML = starCount;
    document.getElementById('seconds').innerHTML = time;
  }
}
