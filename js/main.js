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
	rank: "ten",
	suit: "hearts",
	cardImage: "images/10H.png"
	},
	{
	rank: "ten",
	suit: "diamonds",
	cardImage: "images/10D.png"
	},
	{
	rank: "nine",
	suit: "hearts",
	cardImage: "images/9H.png"
	},
	{
	rank: "nine",
	suit: "diamonds",
	cardImage: "images/9D.png"
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

//function when you click the cards this changes the image and adding it to a array for comparison for pairs
function flipCard() {
	
	//when nextCounter = 0 it means that no pair has been currently selected it's value will change to 1 when a pair has been selected
	if (nextCounter == 0) {
	
	//checking if the clicked on card has been clicked before this turn(stops clicking the same card twice)
	if (this.getAttribute('src') === "images/back.png") {
		
		//putting a new cards number in the array into the variable cardId(in the case you get a pair this will be moved to the array for successful paris cardsPair)
		let cardId = Number(this.getAttribute('data-id'));

		//then adding that to idCardsInPlay array(this is for the next function to not reset it)
		idCardsInPlay.push(cardId);	

		//moving the cardId(rank) to an array for comparison
		cardsInPlay.push(cards[cardId].rank);

		//changing the image src from the card back to the face(set in ther array cards) giving the illusion of it flipping over
		this.setAttribute('src',cards[cardId].cardImage);

		//checking if two cards have been selected
		let x = cardsInPlay.length-1;
		
		//if there is an even number they have selected two cards so check if they match
		if (x % 2 === 1) {
  			checkForMatch();
	  
	//if they try to pick the same card twice alerting them stop
	}} 	else {
		alert("Pick a different card");
		  
	//if they have already chosen two cards and are trying to choose another
  	}}  else {

		//then run next to flip cards over and clear variables ready for the next choice
  		next();
	}
}

//function to createboard used to also reset board and flip incorrect guesses
function createBoard() {

	//checking if they are a successful pair 
	for (let i = 0; i < cards.length; i++) {

		//compare the idnumbers of successful pairs to the cards and not flipping them over
		if (cardPairs.indexOf(i) >= 0) {
			let cardElement = document.createElement('img');
			cardElement.setAttribute('src', cards[i].cardImage);
			cardElement.setAttribute('data-id', i);
			cardElement.addEventListener('click', flipCard);			
			document.querySelector('#game-board').appendChild(cardElement);
		
		//creates the board by showing the card back and giving it a data id value tying it to the cards arrayxs
		}	else {
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

//resets the game board back to beginning
function reset() {
	cardPairs = [];
	document.getElementById('game-board').innerHTML = "";
	cardsInPlay = [];
	shuffle(cards);
	createBoard(cards); 
}

//function to get the board ready in between turns
function next() {

	//the baord only needs to be readied when they have an unsuccessful turn
	if (document.getElementById('correct').innerHTML != "You found a match!") {

	//clearing the board and making it new in order to flip the cards which were unsuccessful and keep the cards that succeded
	document.getElementById('game-board').innerHTML = "";
	createBoard(cards);
	
	//reset the next counter to ready it for the next turn
	nextCounter = 0;
}}

//artifacts of a previous iterations
//document.getElementsByTagName('body')[0].addEventListener('keypress', next)
//document.getElementById('nextButton').addEventListener('click', next);

document.getElementById('resetButton').addEventListener('click', reset)