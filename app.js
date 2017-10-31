/*
 * Create a list that holds all of your cards
 */
var cardLists = ["fa-diamond", "fa-paper-plane-o", "fa-anchor", "fa-bolt", "fa-cube", "fa-leaf", "fa-bicycle", "fa-bomb"];
// to store number of moves and matches found
var moves = 0;
var match_found = 0;

// check when first card is opened
var game_started = false;

// reference to reset button
$('#reset-button').click(resetGame);
// create and append card html
function createCard(card) {
    $('#deck').append(`<li class="card"><i class="fa ${card}"></i></li>`);
}
// generate random cards on the deck
function generateCards() {
    for (var i = 0; i < 2; i++) {
        cardLists = shuffle(cardLists);
        cardLists.forEach(createCard);
    }
}
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
// Array to keep track of open cards
openCards = [];

// card functionality
function toggleCard() {    
    // start the timer when first card is opened
    if (game_started == false) {
        game_started = true;
        }    
    if (openCards.length === 0) {
        $(this).toggleClass("show open");
        openCards.push($(this));
        disableCLick();
    }
    else if (openCards.length === 1) {
        // increment moves
        updateMoves();
        $(this).toggleClass("show open");
        openCards.push($(this));
        setTimeout(matchOpenCards, 1100);
    }
}
// Disable click of the open Cards
function disableCLick() {
    openCards.forEach(function (card) {
        card.off('click');
    });
}
// enable click on the open card
function enableClick() {
    openCards[0].click(toggleCard);
}
// check openCards if they match or not
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
// function to remove openCards
function removeOpenCards() {
    openCards = [];
}

// update moves
function updateMoves() {
    moves += 1;
    $('#moves').html(`${moves} Moves`);
    if (moves == 24) {
        addBlankStar();
    }
    else if (moves == 15) {
        addBlankStar();
    }
}
// check whether the game is finished or not 
function checkWin() {
    match_found += 1;
    if (match_found == 8) {
        showResults();
    }
}
// add blank stars
function addBlankStar() {
    $('#stars').children()[0].remove();
    $('#stars').append('<li><i class="fa fa-star-o"></i></li>');
}
// add initial stars
function addStars() {
    for (var i = 0; i < 3; i++) {
        $('#stars').append('<li><i class="fa fa-star"></i></li>');
    }
}
// reset the game
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
// Init function
function playGame() {
    generateCards();
    $('.card').click(toggleCard);
    $('#moves').html("0 Moves");
    addStars(3);
}
// shows result on end game
function showResults() {
    $('#sucess-result').empty();
    <p class="success"> Congrats !!! </p>
    <p>
        <span class="score-titles">Moves:</span>
        <span class="score-values">${moves}</span>
        <span class="score-titles">Time:</span>
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

// start the game
playGame();



