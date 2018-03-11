'use strict';

var _Hangman = require('./Hangman.js');

var _Hangman2 = _interopRequireDefault(_Hangman);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var canvas = document.getElementById('canvas');
var guessForm = document.getElementById('guessForm');
var guessInput = document.getElementById('guessInput');
var guesses = document.getElementById('guesses');
var wordHolder = document.getElementById('wordHolder');
var guessSubmitButton = document.getElementById('guessSubmitButton');
var difficultySelectForm = document.getElementById('difficultySelect');
var difficultySelect = document.getElementById('difficulty');
var startWrapper = document.getElementById('startWrapper');
var gameWrapper = document.getElementById('gameWrapper');
var resetGame = document.getElementById('resetGame');

var game = new _Hangman2.default(canvas);

difficultySelectForm.addEventListener('submit', function (e) {
  e.preventDefault();

  var difficulty = difficultySelect.value;

  game.start(difficulty, function () {
    startWrapper.classList.add('hidden');
    gameWrapper.classList.remove('hidden');
    resetGame.classList.add('hidden');

    wordHolder.innerText = game.getWordHolderText();
    guesses.innerText = game.getGuessesText();
  });
});

guessForm.addEventListener('submit', function (e) {
  e.preventDefault();

  var guess = guessInput.value;

  game.guess(guess);

  wordHolder.innerText = game.getWordHolderText();
  guesses.innerText = game.getGuessesText();
  guessInput.value = '';

  if (game.isOver()) {
    guessInput.disabled = 'disabled';
    guessSubmitButton.disabled = 'disabled';
    resetGame.classList.remove('hidden');

    if (game.didWin()) {
      return alert('You won!');
    }

    alert('You lost!');
  }
});

resetGame.addEventListener('click', function (e) {
  e.preventDefault();

  startWrapper.classList.remove('hidden');
  gameWrapper.classList.add('hidden');
});