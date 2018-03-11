import Hangman from '../Hangman.js';
// original idea inspired by Stanley
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
    it('game difficulty needs to be "easy"', function() {
        if(game._difficulty != "easy"){
            alert("invalid difficulty setting! recheck information");
        }
        else{
            expect(game._difficulty).toBe('easy');
        }
    });
});