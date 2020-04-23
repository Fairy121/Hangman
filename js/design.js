let guessingWord = document.querySelector(".guessingWord");
let gameStatusText = document.querySelector("#game-status-text");
let lives = document.querySelector(".lives");
let userField = document.querySelector(".user-field");
let userInput = document.querySelector(".user-input");
let wordsList = [
  "Soul Eater",
  "Fairy tail",
  "Ouran Highschool Host Club",
  "Angel Beats",
  "Black Butler",
  "Sword Art Online",
  "Attack on Titan",
  "Mushishi",
  "Kill la Kill",
  "Scrapped Princess",
  "Banana Fish",
  "Naruto",
  "Eureka Seven"
];
let hiddenArr = [];
let hiddenWord = " ";
let splitAns = " ";
let guesses = 5;
let isStarted = false;

lives.innerHTML = `<i class="fas fa-heart"></i> ${guesses}`;

function startGame() {
  let { splitAns, hiddenWord, hiddenArr } = ChooseWord();

  lives.innerHTML = `<i class="fas fa-heart"></i> ${guesses}`;

  let hiddenText = `<p style='white-space:pre-wrap' >${hiddenWord}</p>`;
  guessingWord.innerHTML = hiddenText;
}

function gameStatus(isWin) {
  userInput.disabled = true;

  !isWin
    ? (gameStatusText.innerHTML = `<p id='game-lost'>You lost the game <i data-name='redo' class=" lose-redo fas fa-redo"></i> </p>`)
    : (gameStatusText.innerHTML = `<p id='game-won'>You won the game. <i data-name='redo' class=" win-redo fas fa-redo"></i> </p>`);
}
function reset() {
  hiddenArr = [];
  hiddenWord = "";
  splitAns = "";
  wonGame = false;
  guessingWord.innerHTML = "";
  gameStatusText.innerHTML = "";
  userInput.disabled = false;
  guesses = 5;
}

function ChooseWord() {
  let random = Math.floor(Math.random() * wordsList.length);
  let word = wordsList[random].toLowerCase();

  let answer = " ";

  let added = " ";

  word.split(" ").map(split => {
    answer += split + " ";
    splitAns = answer.split("");
  });

  splitAns.map(ans => {
    ans !== " " ? (added = "_") : (added = " ");
    hiddenWord += added;
    hiddenArr.push(added);
  });

  return { splitAns, hiddenWord, hiddenArr };
}
function guessWord(arr, arr2, userGuess) {
  let guessedLetters = [];
  let result = ""; // holds the text after user guesses
  let guess = userGuess;
  let hasLetter = false;
  let match = false;
  let upper;

  arr.forEach((letter, index) => {
    letter === guess ? (arr2[index] = letter) : null;
    // iterate through arr to see if multiple letters match the user guess
  });
  let inc = arr.includes(guess);

  console.log(inc);

  if (!inc) {
    guesses--;
    lives.innerHTML = `<i class="fas fa-heart"></i> ${guesses}`;
  }

  arr2.map(hidden => {
    result += hidden;
  });

  let hiddenText = `<p style='white-space:pre-wrap' >${result}</p>`;
  guessingWord.innerHTML = hiddenText;
  return result;
}

userField.addEventListener("submit", e => {
  e.preventDefault();

  let value = e.target.children[0].value.toLowerCase();

  if (guesses <= 1) {
    gameStatus(false);
  }
  guesses === 0 ? console.log("game over") : null;

  if (value.length === 1) {
    let result = guessWord(splitAns, hiddenArr, value);
    value = "";

    if (result.indexOf("_") === -1) {
      gameStatus(true);
    }
  }
});
gameStatusText.addEventListener("click", e => {
  if (e.target.dataset.name === "redo") {
    reset();
    startGame();
  }
});

startGame();
