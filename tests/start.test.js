import Hangman from '../Hangman.js';

describe('Hangman - start', function() {

  it('should start the game', function() {
    const canvas = document.createElement('canvas');
    const game = new Hangman(canvas);

    game.start('easy', function() {
      expect(true).toBe(true);
    });

  });

});