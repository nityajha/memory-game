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
	//let k=e.target.id; 
	console.log(e.target.innerHTML);
	moves = moves + 1; 
	document.getElementById("moves").innerHTML = moves;
	clicked_card_id = e.target.innerHTML; 
	store_in_array(clicked_card_id);
	
});


$("span").prepend(moves);

function store_in_array(clicked_card_id){
	for(counter = 1; counter<2; counter++){
		clicked_cards.push(clicked_card_id);
	}
	if(clicked_cards.length ==  2){
		check();
		console.log("it is going to check");
		
	}
}

function check(){
	if (clicked_cards[0] === clicked_cards[1]){
		for(var j=0; j<2; j++){
			var matched_card = clicked_cards[j];
			
			
		}
		score = score + 5;
		document.getElementById("score").innerHTML=score
		document.getElementById("moves").innerHTML = moves;
		pairs = pairs + 1;
		check_win();
		clicked_cards.pop();
		clicked_cards.pop();
	}else{
		for (var j = 0; j<2; j++){
			var unmatched_card = clicked_cards[j];
			$("li").toggleClass("show");
		}
		clicked_cards.pop();
		clicked_cards.pop();
		score = score - 1;
		document.getElementById("score").innerHTML=score
		
		
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
	location.reload();
}
