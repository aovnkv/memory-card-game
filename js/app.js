/*
 * Create a list that holds all of your cards
 */
"use strict";
const c1 = "<i class='fa fa-paper-plane-o'></i>";
const c2 = "<i class='fa fa-anchor'></i>";
const c3 = "<i class='fa fa-bolt'></i>";
const c4 = "<i class='fa fa-diamond'></i>";
const c5 = "<i class='fa fa-bicycle'></i>";
const c6 = "<i class='fa fa-bomb'></i>";
const c7 = "<i class='fa fa-leaf'></i>";
const c8 = "<i class='fa fa-cube'></i>";


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
		listel.classList.add('card');
		listel.innerHTML = value;
		fragment.appendChild(listel);
	};
	deck.appendChild(fragment);
}

makeDeck(makeCardsArray());
addClicks();
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


// display the card's symbol
function showCard (event) {
	event.preventDefault();
	event.target.classList.toggle('open');
	event.target.classList.toggle('show');
	event.target.removeEventListener('click', showCard);
	addtoOpenCardList(event.target);
	clicksCount(event.target);
}

// add 'click' event listener to the cards
function addClicks () {
let cards = document.querySelectorAll('.card');
for (let i = 0; i < cards.length; i++) {
	cards[i].addEventListener('click', showCard);
};
}
// rebuilding the deck with new cards after clicking restart
const restartBtn = document.querySelector('.restart');
restartBtn.addEventListener('click', function () {
	makeDeck(makeCardsArray());
	addClicks();
});

function addtoOpenCardList (card) {
	let oclArr = [];
	oclArr.push(card.firstElementChild);
}

function clicksCount (card) {
	let count = 0;
	count += 1;
	return count;
}


