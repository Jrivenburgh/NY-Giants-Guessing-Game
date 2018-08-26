const letterButtons = document.getElementById('letter-buttons');
var time;
var hints = [{
                pic: 'assets/images/taylor.png',
                hint: '#56 Lawrence'
            }, 
            {
                pic:"assets/images/barber.png",
                hint:'#21 Tiki'
            },
            {
                pic:"assets/images/strahan.png",
                hint:'#92 Michael'
            },
            {
                pic:"assets/images/manning.png",
                hint:'#10 Eli'
            },
            {
                pic:"assets/images/beckham.png",
                hint:'#13 Odell'
            },
            {
                pic:"assets/images/gifford.png",
                hint:'#16 Frank'
            },
            {
                pic:"assets/images/cruz.png",
                hint:'#80 Victor'
            },
            {
                pic:"assets/images/simms.png",
                hint:'#11 Phil'
            },
            {
                pic:"assets/images/banks.png",
                hint:'#58 Carl'
            },
            {
                pic:"assets/images/carson.png",
                hint:'#53 Harry'
            }];
var randomNum;
var winCondCheck;
//guesses to start with
//variable to store clicked letter
var clickedItem
var guessesLeft;
var allowedGuesses;
var wins = 0;
var losses = 0;
var choice;
//List of players to be used in hangman game. 
const gameList = ["TAYLOR", "BARBER", "STRAHAN", "MANNING", "BECKHAM", "GIFFORD", "CRUZ", "SIMMS", "BANKS", "CARSON"];
var underscores = [];
var lettersGuessed = [];
var blanks;
//Store the chosen player
var gameChosen;
var gameLetters;
//Letters used as buttons. 
const letters = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];
var hasLetterButtons = false;
var wonGame = true;

//Actions to start the game
function gameStart(){
    
    if(!hasLetterButtons){
       wonGame = false;
        printButtons();
        randNum = Math.floor(Math.random() * gameList.length);
        gameChosen = gameList[randNum];
        gameLetters = gameChosen.split('');
        guessesLeft = gameChosen.length;
        blanks = gameChosen.length;
        underscores = [];
        
        if(guessesLeft > 6){
            guessesLeft = 5;
        }

        for(let i = 0; i < blanks; i ++){
            if(gameLetters[i] === " "){
                underscores.push('&nbsp;');
            }else{
                underscores.push("_");
            }
            
        }

        document.getElementById('guess-area').innerHTML = underscores.join(' ');
        document.getElementById('guess-count').textContent = `Guesses Left: ${guessesLeft}`;
        document.getElementById('letter-picked').textContent = ` `;
        document.getElementById('wins').textContent = `Wins: ${wins}`;
        document.getElementById('lose').textContent = `Losses: ${losses}`;
        document.getElementById("game-image").src = hints[randNum].pic;
        document.getElementById('hint').innerHTML = `Hint: ${hints[randNum].hint}`;

        
        console.log(gameLetters);
        console.log(underscores);
        hasLetterButtons = true;
        
    }
}

//displays letters
function printButtons() {
    
        for(let i = 0; i < letters.length; i++){
            var button = document.createElement('button');
            button.setAttribute('data-letter', letters[i]);
            button.setAttribute('id', "letter-button");
            button.classList.add('btn', 'button-css', 'bttn-margin');
            button.textContent = letters[i];
            letterButtons.appendChild(button);
            
        }
    
        
        
    
}

function clickLetterButton(e) {
    if(!wonGame){
        clickedItem = e.target;
        
        choice = clickedItem.dataset.letter;
        if(clickedItem.nodeName !== 'DIV'){
            choiceCheck(choice);
            document.getElementById("wrong-buttons").appendChild(clickedItem);
        }
    }
}

function choiceCheck(letter) {
    var letterFound=false;

    for(let i = 0; i < blanks; i++){
        if(gameLetters[i] === letter){
            letterFound = true;
        }
    }
    if(letterFound){

        for (let i = 0; i < blanks; i++){
            if (underscores[i] === " "){
                underscores[i] = "&nbsp;";
            } else {
                underscores[i] = underscores[i];
            }
        }

        for(let i = 0; i < blanks; i ++) {
            if(gameLetters[i] === letter){
                underscores[i] = letter;
                document.getElementById('guess-area').innerHTML = underscores.join(' ');
                clickedItem.style.visibility = "hidden";
            }
        }
    }
        else {
            guessesLeft--;
            document.getElementById('guess-count').textContent = `Guesses Left: ${guessesLeft}`;
        }
        winCheck();
    
}

function winCheck(){
    winCondCheck = underscores;
    for (let i = 0; i < blanks; i++){
        if (underscores[i] === "&nbsp;"){
            winCondCheck[i] = " ";
        } else {
            winCondCheck[i] = underscores[i];
        }
    }
    if(winCondCheck.toString() === gameLetters.toString()){
        alert('You Know Your Giants!')
        wins++;
        document.getElementById('wins').textContent = `Wins: ${wins}`;
    } else if (guessesLeft === 0){
        alert("Try Again :(")
        losses++;
        document.getElementById('lose').textContent = `Losses: ${losses}`;
        wonGame = true;
    }
}



document.querySelector(".start-game").addEventListener("click", function() {
    gameStart();
    
    
    document.querySelector("#letter-buttons").addEventListener("click", clickLetterButton);
    
    
});

document.querySelector(".reset-game").addEventListener("click", function() {
    guessesLeft = 0;
    wins = 0;
    losses = 0;
    wonGame = false;
    hasLetterButtons = false;
    document.querySelector("#letter-buttons").innerHTML = "";
    document.querySelector("#wrong-buttons").innerHTML = "";
    document.getElementById('guess-area').textContent = '_ _ _ _ _ _'; 
    document.getElementById('guess-count').textContent = `Guesses Left: ${guessesLeft}`;
    document.getElementById('letter-picked').textContent = ` `;
    document.getElementById('wins').textContent = `Wins: ${wins}`;
    document.getElementById('lose').textContent = `Losses: ${losses}`;
    
    
});

    
    

