import Hangman from '../Hangman.js';

describe('Hangman - difficulty check for easy', function(){
    var canvas = document.createElement('canvas');
    var game = new Hangman(canvas);

    it('game difficulty needs to be "easy"', done => {
        function easyCallBack(){
            expect(game._difficulty).toBe('easy');
            done();
        }
        game.start('easy', easyCallBack);
    });
    it('game difficulty needs to be "medium"', done => {
        function mediumCallBack(){
            expect(game._difficulty).toBe('medium');
            done();
        }
        game.start('medium', mediumCallBack);
    });
    it('game difficulty needs to be "hard"', done => {
        function hardCallBack(){
            expect(game._difficulty).toBe('hard');
            done();
        }
        game.start('hard', hardCallBack);
    });
});