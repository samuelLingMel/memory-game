let cards = [
	{
	rank: "queen",
	suit: "hearts",
	cardImage: "images/queen-of-hearts.png"
	},
	{
	rank: "queen",
	suit: "diamonds",
	cardImage: "images/queen-of-diamonds.png"
	},
	{
	rank: "king",
	suit: "hearts",
	cardImage: "images/king-of-hearts.png"
	},
	{
	rank: "king",
	suit: "diamonds",
	cardImage: "images/king-of-diamonds.png"
	}
];

let cardsInPlay = [];
let tally = 0;

function shuffle(array) {
	var currentIndex = array.length, temp, randomIndex;
	while (0 !== currentIndex) {
		randomIndex = Math.floor(Math.random() * currentIndex);
		currentIndex -= 1;
		temp = array[currentIndex];
		array[currentIndex] = array[randomIndex];
		array[randomIndex] = temp;
	} return array;
}

function checkForMatch() {
	let x = cardsInPlay.length-1;
	let y = cardsInPlay.length-2;
	if (cardsInPlay[x] === cardsInPlay[y]) {
		alert("You found a match!");
		tally = tally + 1
		document.getElementById('score').innerHTML = tally
	}	else {
		alert("Sorry, try again."); 
}}

function flipCard() {
	let cardId = this.getAttribute('data-id')
	cardsInPlay.push(cards[cardId].rank)
	this.setAttribute('src',cards[cardId].cardImage)
	let x = cardsInPlay.length-1
	if (x % 2 == 1) {
  	checkForMatch()
}}

function createBoard() {
	for (let i = 0; i < cards.length; i++) {
		shuffle(cards)
		let cardElement = document.createElement('img');
		cardElement.setAttribute('src', "images/back.png");
		cardElement.setAttribute('data-id', i);
		cardElement.addEventListener('click', flipCard);
		document.querySelector('#game-board').appendChild(cardElement);
}}

createBoard(cards);

function reset() {
		document.getElementById('game-board').innerHTML = "";
		cardsInPlay = []
		createBoard(cards);
}

document.getElementsByTagName('button')[0].addEventListener('click', reset);