import Hangman from '../Hangman.js';
// original idea inspired by Stanley
describe('Hangman - difficulty check for hard', function(){
    var canvas = document.createElement('canvas');
    var game = new Hangman(canvas);

    it('game difficulty needs to be "hard"', done => {
        function hardCallBack(){
            expect(game._difficulty).toBe('hard');
            done();
        }
        game.start('hard', hardCallBack);
    });
    it('game difficulty needs to be "hard"', function() {
        var hard = 'hard';
        if(game._difficulty != hard){
            expect(game._difficulty).toBe('hard');
            console.log(game._difficulty);
        }
        if(game._difficulty == hard){
            alert("invalid difficulty setting! recheck information");
        }
        else{
            expect(game._difficulty).toBe('hard');
        }
    });
});