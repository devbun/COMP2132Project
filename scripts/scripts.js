
var theword = [];

var guesses = [];

var gameover = false;

const MISTAKE_LIMIT = 7;

var WORDS = {
    "SKELETON": "There's one inside you right now",
    "BEYONCE": "Should have won album of the year",
    "BANANAS": "Yellow snack, vehiclar destruction",
    "ELEPHANT": "Big ears, long nose, never forgets",
    "COMPUTER": "It kind of ruined everything didn't it",
    "MONKEYS": "Like us but more fun",
    "BASEBALL": "Bat, ball, and a seventh-inning stretch.",
    "DIAMOND": "Just buy a fake one",
    "ELEVATE": "Lift yourself up",
    "JUGGLING": "When you have no one to play catch with."
    
}

function NewGame() {
    gameover = false;
    const keys = Object.keys(WORDS);
    theword = keys[Math.floor(Math.random() * keys.length)];
    console.log(theword)
    document.getElementById('hint').textContent = "HINT: " + WORDS[theword];

    guesses = [];
    UpdateDisplay()

}

function SelectLetter(letter) {
    if (gameover === true) return
    letter = letter.toUpperCase();
    if (guesses.includes(letter)) return
    guesses.push(letter);
    console.log(guesses)
    UpdateDisplay()

    //Could combine this with update display?
}

function UpdateDisplay() {
//hangman figure out how many guesses are right and wrong

let right = 0;
let wrong = 0; //TODO fix this redundancy in select letter also
for (let i = 0; i < guesses.length; i++) {
    if ([...theword].includes(guesses[i])) {
        right++
    } else {
        wrong ++
    }
  }

  if (wrong > MISTAKE_LIMIT) wrong = MISTAKE_LIMIT;

  document.getElementById("hamgmanimg").src = "images/hangman" + wrong + ".png" //template literal is better?


//guesses
const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
const letterbox = document.getElementById('letterbox')
letterbox.innerHTML = '';
for (const letter of alphabet) {
    const displayLetter = document.createElement('div');
    displayLetter.classList.add('letter');
    displayLetter.addEventListener('click', function() {
        SelectLetter(letter)
        
    });

    if (guesses.includes(letter)) {
        displayLetter.classList.add('guessed')
    } else {
            displayLetter.classList.add('selectable')
        }

    displayLetter.textContent = letter;
    letterbox.appendChild(displayLetter)
  }
//blanks/word
//for each letter in the word put letter or blank
const wordbox = document.getElementById("wordbox")
wordbox.innerHTML = '';
for (const letter of theword) {
    const displayLetter = document.createElement('div');
    displayLetter.classList.add('letter');
    displayLetter.textContent = (guesses.includes(letter)) ? letter : "_"
    wordbox.appendChild(displayLetter)
  }

  const uniques = new Set([...theword])

  if (right >= uniques.size) GameEnd('win')
  if (wrong >= MISTAKE_LIMIT ) GameEnd('lose')

}

function GameEnd(result) {
    gameover = true;
 console.log("gameover " + result)
 document.getElementById('hint').textContent = "GAME OVER: You " + result + "!"
}

document.addEventListener('keydown', function(event) {
    if (event.key.length === 1 && /^[a-zA-Z]+$/.test(event.key)) {
        SelectLetter(event.key)
        console.log(event.key)
    }
  });

NewGame()