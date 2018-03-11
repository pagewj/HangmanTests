export default class Hangman {
    constructor(canvas) {
      if (!canvas) {
        throw new Error(`Invalid Canvas provided`);
      }
  
      this._canvas = canvas;
      this._ctx = this._canvas.getContext(`2d`);
    }
  
    start(difficulty, callback) {
      this._difficulty = difficulty;
      this._clearCanvas();
      this._drawBase();
      this._guesses = [];
      this._isOver = false;
      this._didWin = false;
      
      this._getWord()
      .then(word => {
        this._word = word;
  
        callback();
      }).catch(this._handleError);
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