/*
 * Create a list that holds all of your cards
 */


/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Shuffle function from http://stackoverflow.com/a/2450976



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

$('.card').click(function (e) {
	  $(this).toggleClass('show');
	});

var cardLists = ["fa-diamond", "fa-paper-plane-o", "fa-anchor", "fa-bolt", "fa-cube", "fa-leaf", "fa-bicycle", "fa-bomb"];
var moves = 0;
var matchFound = 0;
var gameStarted = false;

$('#reset-button').click(resetGame);

function createCard(card){
	$('#deck').append('<li class = "card animated"><i class = "fa ${card}"></i></li>');
}

function generateCards(){
	for (var i = 0; i < 2; i++){
		cardLists = shuffle(cardLists);
		cardLists.forEach(createCard);
	}
}

openCards = [ ];

function toggleCard(){
	if(gameStarted == false){
		gameStarted == true;
		timer.start();
	}
	if(openCard.length === 0){
		$(this).toggleClass("show open").animateCss('flipInY');
		openCard.push($(this));
		disableClick();
	}
	else if(openCards.length === 1){
		updateMoves();
		$(this).toggleClass("show open").animateCss('flipInY');
		openCard.push($(this));
		setTimeout(matchOpenCards, 1200);
	}
}

function disableClick(){
	openCards.forEach( function (card){
		card.off('click');
	});
}

function enableClick(){
	openCards[0].click(toggleCard);
}

function matchOpenCards() {
    if (openCards[0][0].firstChild.className == openCards[1][0].firstChild.className) {
        console.log("matchCard");
        openCards[0].addClass("match");
        openCards[1].addClass("match");
        disableCLick();
        removeOpenCards();
        setTimeout(checkWin, 1000);
    }
    else {
        openCards[0].toggleClass("show open");
        openCards[1].toggleClass("show open");
        enableClick();
        removeOpenCards();
    }
}

function removeOpenCards() {
    openCards = [];
}

function updateMoves() {
    moves += 1;
    $('#moves').html('${moves} Moves');
    if (moves == 26) {
        addBlankStar();
    }
    else if (moves == 15) {
        addBlankStar();
    }
}

function checkWin() {
    match_found += 1;
    if (match_found == 8) {
        showResults();
    }
}

function addBlankStar() {
    $('#stars').children()[0].remove();
    $('#stars').append('<li><i class="fa fa-star-o"></i></li>');
}

function addStars() {
    for (var i = 0; i < 3; i++) {
        $('#stars').append('<li><i class="fa fa-star"></i></li>');
    }
}

function resetGame() {
    moves = 0;
    match_found = 0;
    $('#deck').empty();
    $('#stars').empty();
    $('#game-deck')[0].style.display = "";
    $('#sucess-result')[0].style.display = "none";
    game_started=false;
    playGame();
}

function playGame() {
    generateCards();
    $('.card').click(toggleCard);
    $('#moves').html("0 Moves");
    addStars(3);
}

function showResults() {
    $('#sucess-result').empty();
    timer.pause();
    var scoreBoard = 
        <p class="success"> Congrats !!! </p>
        <p>
            <span class="score-titles">Moves:</span>
            <span class="score-values">${moves}</span>
            </p>
        <div class="text-center margin-top-2">
             <div class="star">
                <i class="fa fa-star fa-3x"></i>    
             </div>
             <div class="star">
                <i class="fa ${ (moves > 23) ? "fa-star-o" : "fa-star"}  fa-3x"></i>    
             </div>
            <div class="star">
                <i class="fa ${ (moves > 14) ? "fa-star-o" : "fa-star"} fa-3x"></i>    
             </div>
        </div>
        <div class="text-center margin-top-2" id="restart">
            <i class="fa fa-repeat fa-2x"></i>
          </div>
    `;
    $('#game-deck')[0].style.display = "none";
    $('#sucess-result')[0].style.display = "block";
    $('#sucess-result').append($(scoreBoard));
    $('#restart').click(resetGame);
}

playGame();




