let cards = [
	{
	rank: "queen",
	suit: "hearts",
	cardImage: "images/QH.png"
	},
	{
	rank: "queen",
	suit: "diamonds",
	cardImage: "images/QD.png"
	},
	{
	rank: "ace",
	suit: "hearts",
	cardImage: "images/AH.png"
	},
	{
	rank: "ace",
	suit: "diamonds",
	cardImage: "images/AD.png"
	},	
	{
	rank: "king",
	suit: "hearts",
	cardImage: "images/KH.png"
	},
	{
	rank: "king",
	suit: "diamonds",
	cardImage: "images/KD.png"
	},
	{
	rank: "jack",
	suit: "hearts",
	cardImage: "images/JH.png"
	},
	{
	rank: "jack",
	suit: "diamonds",
	cardImage: "images/JD.png"
	},
	{
	rank: "queen",
	suit: "clubs",
	cardImage: "images/QC.png"
	},
	{
	rank: "queen",
	suit: "spades",
	cardImage: "images/QS.png"
	},
	{
	rank: "ace",
	suit: "clubs",
	cardImage: "images/AC.png"
	},
	{
	rank: "ace",
	suit: "spades",
	cardImage: "images/AS.png"
	},	
	{
	rank: "king",
	suit: "clubs",
	cardImage: "images/KC.png"
	},
	{
	rank: "king",
	suit: "spades",
	cardImage: "images/KS.png"
	},
	{
	rank: "jack",
	suit: "clubs",
	cardImage: "images/JC.png"
	},
	{
	rank: "jack",
	suit: "spades",
	cardImage: "images/JS.png"
	}
];

//setting up a counter for the next button so it cannot be pressed when the user is correct
let nextCounter = 0;

//array for the all the id number of card pairs that have been successfully selected so that they can be not effected by the next button(work in progress)
let cardPairs = [];

//array which keeps the id number of the currently selected cards to be transferred to cardPairs if it a successful pair 
let idCardsInPlay = [];

//array to put the picked cards rank (flipCard) to compare(in checkForMatch) for a pair
let cardsInPlay = [];

//variable to keep the score
let tally = 0;

//function to randomly change the order of an array, to shuffle the cards array
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

//function to compare the last two ranks of the cardsInPlay array 
function checkForMatch() {
	
	//variables to get the list number of last and second last elements in cardsInPlay
	let x = cardsInPlay.length-1;
	let y = cardsInPlay.length-2;
	
	//checking if the rank of the pair is the same
	if (cardsInPlay[x] === cardsInPlay[y]) {
		document.getElementById('correct').innerHTML = "You found a match!";
		
		//increases tally and therefore score by 1
		tally += 1;
		document.getElementById('score').innerHTML = tally;
		
		//adding the data-id values from idCardsInPlay to the cardPairs array for the next button to not reset it
		for (i = 0; i < idCardsInPlay.length; i++) {
		cardPairs.push(idCardsInPlay[i]);
	}}	else {
		
		//if it is not a pair chainging the text to reflect that and next counter makes it so you cant click on another card till you press the next button 
		document.getElementById('correct').innerHTML = "Sorry, press the next button to try again."; 
		nextCounter += 1;
	}
	//clearing the idCardsInPlay for the next choices
	idCardsInPlay = [];
}

function flipCard() {
	if (nextCounter !== 1) {
	if (this.getAttribute('src') === "images/back.png") {
		let cardId = Number(this.getAttribute('data-id'));
		idCardsInPlay.push(cardId);	
		cardsInPlay.push(cards[cardId].rank);
		this.setAttribute('src',cards[cardId].cardImage);
		let x = cardsInPlay.length-1;
	if (x % 2 === 1) {
  		checkForMatch();
  	}}	else {
  		alert("Pick a different card");
  	}}  else {
  		alert("Press the next button");
  	}
}

function createBoard() {
	for (let i = 0; i < cards.length; i++) {
		if (cardPairs.indexOf(i) >= 0) {
			let cardElement = document.createElement('img');
			cardElement.setAttribute('src', cards[i].cardImage);
			cardElement.setAttribute('data-id', i);
			cardElement.addEventListener('click', flipCard);			
			document.querySelector('#game-board').appendChild(cardElement);
		}
	 	else {
			let cardElement = document.createElement('img');
			cardElement.setAttribute('src', "images/back.png");
			cardElement.setAttribute('data-id', i);
			cardElement.addEventListener('click', flipCard);
			document.querySelector('#game-board').appendChild(cardElement);
		}
	}
}

shuffle(cards);

createBoard(cards);

function reset() {
	cardPairs = [];
	document.getElementById('game-board').innerHTML = "";
	cardsInPlay = [];
	shuffle(cards);
	createBoard(cards); 
}

function next() {
	if (document.getElementById('correct').innerHTML != "You found a match!") {
	document.getElementById('game-board').innerHTML = "";
	createBoard(cards);
	nextCounter = 0;
}}
addEventListener('return', next)

document.getElementById('nextButton').addEventListener('click', next);

document.getElementById('resetButton').addEventListener('click', reset)