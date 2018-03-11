/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

    "use strict";
    Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
    /* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Hangman_js__ = __webpack_require__(1);
    
    
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
    
    const game = new __WEBPACK_IMPORTED_MODULE_0__Hangman_js__["a" /* default */](canvas);
    
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
    
    
    /***/ }),
    /* 1 */
    /***/ (function(module, __webpack_exports__, __webpack_require__) {
    
    "use strict";
    class Hangman {
      constructor(canvas) {
        this._canvas = canvas;
        this._ctx = this._canvas.getContext(`2d`);
      }
    
      async start(difficulty, callback) {
        this._difficulty = difficulty;
        this._clearCanvas();
        this._drawBase();
        this._guesses = [];
        this._isOver = false;
        this._didWin = false;
        this._word = await this._getWord().catch(this._handleError);
    
        callback();
      }
    
      guess(letter) {
        if (
          !letter ||
          typeof letter !== `string` ||
          !/[a-z]/.test(letter.toLowerCase())
        ) {
          return alert(`Must provide valid input`);
        }
    
        if (letter.length > 1) {
          return alert(`Only one letter at a time!`);
        }
    
        letter = letter.toLowerCase();
    
        if (this._guesses.includes(letter)) {
          return alert(`You have already guessed this letter`);
        }
    
        this._guesses.push(letter);
    
        this._guesses.sort();
    
        if (this._word.includes(letter)) {
          return this._checkWin();
        }
    
        this._drawNext();
      }
    
      isOver() {
        return this._isOver;
      }
    
      didWin() {
        return this._didWin;
      }
    
      getWordHolderText() {
        return this._word
          .split(``)
          .map(letter => this._guesses.includes(letter) ? letter : `_`)
          .join(` `);
      }
    
      getGuessesText() {
        return `Guesses: ${ this._guesses.join(`, `) }`;
      }
    
      _checkWin() {
        const unknownRemaining = this._word
          .split(``)
          .filter(letter => !this._guesses.includes(letter))
          .length;
    
        if (unknownRemaining) { return; }
    
        this._isOver = true;
        this._didWin = true;
      }
    
      _drawNext() {
        const incorrectGuesses = this._guesses.filter(letter => !this._word.includes(letter)).length;
    
        switch (incorrectGuesses) {
          case 1:
            this._drawHead();
            break;
          case 2:
            this._drawBody();
            break;
          case 3:
            this._drawLeftArm();
            break;
          case 4:
            this._drawRightArm();
            break;
          case 5:
            this._drawLeftLeg();
            break;
          case 6:
            this._drawRightLeg();
            this._isOver = true;
            this._didWin = false;
          default:
            break;
        }
    
      }
    
      _handleError(error) {
        alert(`Uh oh! Something happened and the game has crashed!`);
        console.log(error);
      }
    
      _getWord() {
        return fetch(`https://it3049c-hangman.now.sh?difficulty=${ this._difficulty }`)
          .then(r => r.json())
          .then(r => r.word);
      }
    
      _clearCanvas() {
        this._ctx.clearRect(0, 0, this._canvas.width, this._canvas.height);
      }
    
      _drawBase() {
        this._ctx.fillRect(95, 10, 150, 10); // Top
        this._ctx.fillRect(245, 10, 10, 50); // Noose
        this._ctx.fillRect(95, 10, 10, 400); // Main beam
        this._ctx.fillRect(10, 410, 175, 10); // Base
      }
    
      _drawHead() {
        this._ctx.beginPath();
        this._ctx.arc(250, 85, 25, 0, 2 * Math.PI);
        this._ctx.fill();
        this._ctx.stroke();
      }
    
      _drawBody() {
        this._ctx.fillRect(245, 110, 10, 125);
      }
    
      _drawLeftLeg() {
        this._ctx.beginPath();
        this._ctx.lineWidth = `10`;
        this._ctx.moveTo(250, 230);
        this._ctx.lineTo(200, 300);
        this._ctx.stroke();
      }
    
      _drawRightLeg() {
        this._ctx.beginPath();
        this._ctx.lineWidth = `10`;
        this._ctx.moveTo(250, 230);
        this._ctx.lineTo(300, 300);
        this._ctx.stroke();
      }
    
      _drawLeftArm() {
        this._ctx.beginPath();
        this._ctx.lineWidth = `10`;
        this._ctx.moveTo(250, 175);
        this._ctx.lineTo(200, 100);
        this._ctx.stroke();
      }
    
      _drawRightArm() {
        this._ctx.beginPath();
        this._ctx.lineWidth = `10`;
        this._ctx.moveTo(250, 175);
        this._ctx.lineTo(300, 100);
        this._ctx.stroke();
      }
    }
    /* harmony export (immutable) */ __webpack_exports__["a"] = Hangman;