import Hangman from './Hangman.js';

const canvas = document.getElementById('canvas');
const guessForm = document.getElementById('guessForm');
const guessInput = document.getElementById('guessInput');
const guesses = document.getElementById('guesses');
const wordHolder = document.getElementById('wordHolder');
const guessSubmitButton = document.getElementById('guessSubmitButton');
const difficultySelectForm = document.getElementById('difficultySelect');
const difficultySelect = document.getElementById('difficulty');
const startWrapper = document.getElementById('startWrapper');
const gameWrapper = document.getElementById('gameWrapper');
const resetGame = document.getElementById('resetGame');

const game = new Hangman(canvas);

difficultySelectForm.addEventListener(`submit`, function(e) {
  e.preventDefault();

  const difficulty = difficultySelect.value;

  game.start(difficulty, function() {
    startWrapper.classList.add(`hidden`);
    gameWrapper.classList.remove(`hidden`);
    resetGame.classList.add(`hidden`);

    wordHolder.innerText = game.getWordHolderText();
    guesses.innerText = game.getGuessesText();
  });
});

guessForm.addEventListener(`submit`, function(e) {
  e.preventDefault();

  const guess = guessInput.value;

  game.guess(guess);

  wordHolder.innerText = game.getWordHolderText();
  guesses.innerText = game.getGuessesText();
  guessInput.value = ``;

  if (game.isOver()) {
    guessInput.disabled = `disabled`;
    guessSubmitButton.disabled = `disabled`;
    resetGame.classList.remove(`hidden`);


    if (game.didWin()) {
      return alert(`You won!`);
    }

    alert(`You lost!`);
  }
});

resetGame.addEventListener(`click`, function(e) {
  e.preventDefault();

  startWrapper.classList.remove(`hidden`);
  gameWrapper.classList.add(`hidden`);
});