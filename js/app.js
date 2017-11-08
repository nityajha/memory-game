/*
 * Create a list that holds all of your cards
 */

var cards = ["fa-diamond", "fa-diamond", "fa-paper-plane", "fa-paper-plane", "fa-anchor", "fa-anchor", "fa-bolt", "fa-bolt", "fa-cube", "fa-cube", "fa-leaf", "fa-leaf", "fa-bicycle", "fa-bicycle", "fa-bomb", "fa-bomb"];
var clicked_cards = [];
var counter = 0;
var moves = 0;
var clicked_card_id = 0;
var score = 0;
var pairs = 0;

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

 //shuffle the list of cards using the provided "shuffle" method below


// - loop through each card and create its HTML
// - add each card's HTML to the page


//<li class="card" id ="1" onclick = "clicked(this)">
//                <i class="fa fa-diamond"></i>
//            </li>
    

function makeDeck() {
	cards = shuffle(cards);
	$('.deck').empty();
	cards.forEach(function(card, index) {
		//console.log(card)
		var cardElem = '<li class="card" id="' + index + '"><i class="fa ' + card +'"></i></li>';

		//console.log(cardElem)
		$('.deck').append(cardElem);
	});
}

makeDeck();


$('.card').click(function (e) { 
	$(this).toggleClass('show'); 
	console.log(e.target.id);
	moves = moves + 1; 
	clicked_card_id = e.target.id; 
	store_in_array(clicked_card_id); 
});

$("span").prepend(moves);

function store_in_array(clicked_card_id){
	for(counter = 0; counter<2; counter++){
		clicked_cards.push(clicked_card_id);
	}
	if(clicked_cards.length === 2){
		console.log("it is going to check");
		check();
	}
}

function check(){
	if (clicked_cards[0] === clicked_cards[1]){
		for(var j=0; j<2; j++){
			var matched_card = clicked_cards[j];
			$("li").addClass("match");
		}
		score = score + 5;
		pairs = pairs + 1;
		check_win();
	}else{
		for (var j = 0; j<2; j++){
			var unmatched_card = clicke_cards[j];
			$("li").removeClass("show");
		}
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
function reset_game(){
	pairs = 0;
	clicked_cards = [];
	moves = 0;
	clicked_card_id = 0;
	score = 0;
	firstId = 0;
	secondId = 0;
	shuffle(cards);
}
