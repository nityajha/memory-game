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

var card_array = ["#1", "#2", "#3", "#4", "#5", "#6", "#7", "#8"];
var clicked_cards = [];
var counter = 0;
var moves = 0;
var clicked_card_id = 0;
var firstId = 0;
var secondId = 0;
var score = 0;

function clicked(this){
	$('.card').click(function (e) {
	  $(this).toggleClass('show');
	});
	moves = moves + 1;
}

function store_id(){
	first_id = $(this).attr("id") ;
}

function store_in_array(first_id){
	for(counter = 0; counter<2; counter++){
		clicked_cards.push(first_id);
	}
}

function check(){
	if (clicked_cards[0] == clicked_cards[1]){
		clicked_cards[0].addClass('match');
		clicked_cards[1].addClass('match');
		score = score + 5;
		pairs = pairs + 1;
		check_win();
	}else{
		clicked_cards.pop();
		clicked_cards.pop();
		score = score - 1;
	}
}

function check_win(pairs){
	if (pairs === 8){
		alert("You have won the game with" +moves+" moves. Press restart symbol to play again.");
	}
}
function reset_game(game){
	pairs = 0;
	clicked_cards = [];
	moves = 0;
	clicked_card_id = 0;
	score = 0;
	firstId = 0;
	secondId = 0;
	shuffle(card_array);
};
	

/*function check(){
	for (counter = 0; counter < 2; counter++){
		counter = counter + 1;
		if(counter == 1){
			checkMatch();
			firstId = getElementById;
		}
		if(counter == 2){
			checkMatch();
			secondId = getElementById;
		}
		if (firstId == secondId){
			$(firstId).addClass('match');
			$(secondId).addClass('match');
		}
		else{
			counter = 0;
			firstId = 0;
			secondId = 0;
		}
	}
}*/

//https://calendly.com/career-coach/careers-jp/

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
