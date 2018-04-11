/*
 * Create a list that holds all of your cards
 */
"use strict";
const c1 = "<i class='far fa-paper-plane'></i>";
const c2 = "<i class='fa fa-anchor'></i>";
const c3 = "<i class='fa fa-bolt'></i>";
const c4 = "<i class='far fa-gem'></i>";
const c5 = "<i class='fa fa-bicycle'></i>";
const c6 = "<i class='fa fa-bomb'></i>";
const c7 = "<i class='fa fa-leaf'></i>";
const c8 = "<i class='fa fa-cube'></i>";
const restartBtn = document.querySelector('.restart');
const movesBtn = document.querySelector('.moves');
const stars = document.querySelectorAll('.stars li i');
let count = 0;
let click = 0;
let oclArr = [];
let prevCard;

makeDeck(makeCardsArray());
addClickListeners();
starRating();

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

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


/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */

function makeCardsArray() {
	let i = 0;
	let cardholder = [];
	while (i < 2) {
		cardholder.push(c1, c2, c3, c4, c5, c6, c7, c8);
	i++;
	};
	shuffle(cardholder);
	return cardholder;
}

function makeDeck(array) {
	const fragment = document.createDocumentFragment();
	let deck = document.querySelector('.deck');
	while (deck.firstChild) {
    deck.removeChild(deck.firstChild);
	};
	for ( let value of array) {
		const listel = document.createElement('li');
		listel.classList.add('card', 'init');
		listel.innerHTML = value;
		fragment.appendChild(listel);
	};
	deck.appendChild(fragment);
}

// display the card's symbol and other actions
function showCard (event) {
	click += 1;
	 if (click >= 2) {
		blockClicks();
		setTimeout(allowClicks, 500);
		click = 0;
	 } else {
		allowClicks();
	 }
	event.preventDefault();
	event.target.classList.toggle('open');
	event.target.classList.toggle('show');
	event.target.removeEventListener('click', showCard);
	if (!(event.target.classList.contains('init'))) {
		event.target.classList.toggle('close');
	} else {
		event.target.classList.remove('init');
	}
	addtoOpenCardList(event.target);
	if (oclArr.length === 16) {
		$("#win-window").modal({
			fadeDuration: 300
		});
	}
	clicksCount();
	starRating();
	// if (count === 1) {
	//   startTimer();
	// }
	if (count % 2 === 0) {
		if (!cardsMatch(event.target)) {
			setTimeout(function(){
				prevCard.classList.toggle('show');
				event.target.classList.toggle('show');
				prevCard.classList.toggle('open');
				event.target.classList.toggle('open');
				prevCard.classList.toggle('close');
				event.target.classList.toggle('close');
				prevCard.addEventListener('click', showCard);
				event.target.addEventListener('click', showCard);
				oclArr.pop();
				oclArr.pop();
				prevCard = "";
			}, 500);
		}
	} else {
		prevCard = event.target;
	}
}

// add 'click' event listener to the cards
function addClickListeners () {
	let cards = document.querySelectorAll('.card');
	for (let i = 0; i < cards.length; i++) {
		cards[i].addEventListener('click', showCard);
	};
}
// rebuilding the deck with new cards after clicking restart
restartBtn.addEventListener('click', function () {
	makeDeck(makeCardsArray());
	addClickListeners();
	oclArr = [];
	count = 0;
	movesBtn.innerHTML = 0;
});

function addtoOpenCardList (card) {
	oclArr.push(card.firstElementChild);
}

function clicksCount () {
	count += 1;
	movesBtn.innerHTML = count;
	return count;
}

function cardsMatch (card) {
	if (!(card.innerHTML === prevCard.innerHTML)) {
		return false;
	} else {
	return true;
	}
}

function blockClicks () {
	let cards = document.querySelectorAll('.card');
	for (let i = 0; i < cards.length; i++) {
		cards[i].classList.add('noclicks');
	};
}

function allowClicks () {
	let cards = document.querySelectorAll('.card');
	for (let i = 0; i < cards.length; i++) {
		cards[i].classList.remove('noclicks');
	};
}

function starRating () {
	if (count === 24) {
		stars[2].classList.remove('fas', 'fa-star');
		stars[2].classList.add('far', 'fa-star');
	}
	else if (count === 30) {
		stars[1].classList.remove('fas', 'fa-star');
		stars[1].classList.add('far', 'fa-star');
	}
	else if (count === 36) {
		stars[0].classList.remove('fas', 'fa-star');
		stars[0].classList.add('far', 'fa-star');
	}
}

// function startTimer () {	
// 	let startTime = Date.now();
// 	let intvl = setInterval(function () {
// 		let elapsedTime = Date.now() - startTime;
// 		document.querySelector(".timer").innerHTML = (elapsedTime / 1000).toFixed(3);
// 	}, 100);
// }	