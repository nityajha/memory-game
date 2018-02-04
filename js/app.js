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
var start = false
 
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
	start = true
	const $clickedCard = $(this);
	$clickedCard.toggleClass('open show');
	//let k=e.target.id; 
	//console.log(e.target.innerHTML);
	moves = moves + 1; 
	document.getElementById("moves").innerHTML = moves;
	//clicked_card_id = e.target.innerHTML; 
	store_in_array($clickedCard);
});


$("span").prepend(moves);

function store_in_array($clickedCard){

	clicked_cards.push($clickedCard);

	if(clicked_cards.length ===  2){
		
		check();
		console.log("it is going to check");
		
	}
}

function check(){
	const firstCard = clicked_cards[0].children().attr("class");
	const secondCard = clicked_cards[1].children().attr("class");

	console.log(firstCard, secondCard, firstCard === secondCard);
			
		if (firstCard === secondCard){
			for(var j=0; j<2; j++){
				var $matched_card = clicked_cards[j];
				$matched_card.addClass("match");
			}
			clicked_cards = [];
			score = score + 5;
			document.getElementById("score").innerHTML=score;
			document.getElementById("moves").innerHTML = moves;
			pairs = pairs + 1;
			check_win(pairs);
			clicked_cards.pop();
			clicked_cards.pop();
		}else{
			for (var j = 0; j<2; j++){
				var $unmatched_card = clicked_cards[j];
				$unmatched_card.addClass("wrong");
				$unmatched_card.removeClass("open show");
			}
			clicked_cards = [];
			score = score - 1;
			document.getElementById("score").innerHTML=score;
		}
	}


function check_win(pairs){
	if (pairs === 8){
		console.log("win");
		window.alert("You have won the game with" +moves+" moves in "+parseInt(document.getElementById('minutes').innerHTML)+" minutes and "+document.getElementById('seconds').innerHTML+" seconds. Press restart symbol to play again.");
	}
	clearInterval(timer);
}

function star_rating(moves){
	var $node_one = $('<li id ="one"><i class = "fa fa-star"></i></li>');
	var $node_two = $('<li id ="two"><i class = "fa fa-star"></i></li>');
	var $node_three = $('<li id ="three"><i class = "fa fa-star"></i></li>');
	if(moves>16 && moves<22){
		$node_one.removeClass('fa-star').addClass('fa-star-o');
		$node_two.removeClass('fa-star').addClass('fa-star-o');
		$node_three.removeClass('fa-star').addClass('fa-star-o');		
	}else if(moves>22 && moves<32){
		$node_one.removeClass('fa-star').addClass('fa-star-o');
		$node_two.removeClass('fa-star').addClass('fa-star-o');
	}else if(moves>32){
		$node_one.removeClass('fa-star').addClass('fa-star-o');
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

//timer function from https://stackoverflow.com/questions/5517597/plain-count-up-timer-in-javascript
var sec = 0;
function pad (val){ 
	return val > 9 ? val : "0" + val;
}
var timer = setInterval (function(){
	if (start === true){
		document.getElementById("seconds").innerHTML = pad(++sec%60);
		document.getElementById("minutes").innerHTML = pad(parseInt(sec/60, 10));
		}
	else{
		start = false
	}
}, 1000);
	
