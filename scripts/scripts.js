
var theword = [];

const MISTAKES_ALLOWED = 5

var WORDS = {
    "SKELETON": "There's one inside you right now",
    "JAVASCRIPT": "It's not as good as Python (kidding)",
    "FISH": "glub glub"
}

function NewGame() {
    const keys = Object.keys(WORDS);
    theword = keys[Math.floor(Math.random() * keys.length)];
    console.log(theword)
    document.getElementById('hint').textContent = "HINT: " + WORDS[theword];

    guesses = [];
    UpdateDisplay()

}

function SelectLetter(letter) {
    letter = letter.toUpperCase();
    if (guesses.includes(letter)) return
    guesses.push(letter);
    console.log(guesses)
    UpdateDisplay()

    let right = 0;
    let wrong = 0;
    for (let i = 0; i < guesses.length; i++) {
        if ([...theword].includes(guesses[i])) {
            right++
        } else {
            wrong ++
        }
      }

      console.log('right:' + right)
      console.log('wrong' + wrong)

      const uniques = new Set([...theword])

      if (right >= uniques.size) GameEnd('win')
      if (wrong > MISTAKES_ALLOWED ) GameEnd('lose')

}

function UpdateDisplay() {
//hangman figure out how many guesses are right and wrong
//guesses
const alphabet = "ABCDEFGHIJKLMNOPQRSTUVQXYZ"
const letterbox = document.getElementById('letterbox')
letterbox.innerHTML = '';
for (const letter of alphabet) {
    const displayLetter = document.createElement('div');
    displayLetter.classList.add('letter');
    if (guesses.includes(letter)) displayLetter.classList.add('guessed');
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
}

function GameEnd(result) {
 console.log("gameover " + result)
}

document.addEventListener('keydown', function(event) {
    if (event.key.length === 1 && /^[a-zA-Z]+$/.test(event.key)) {
        SelectLetter(event.key)
        console.log(event.key)
    }
  });

NewGame()