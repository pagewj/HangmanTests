import Hangman from '../Hangman.js';
// original idea inspired by Stanley
describe('Hangman - difficulty check for medium', function(){
    var canvas = document.createElement('canvas');
    var game = new Hangman(canvas);

    it('game difficulty needs to be "medium"', done => {
        function mediumCallBack(){
            expect(game._difficulty).toBe('medium');
            done();
        }
        game.start('medium', mediumCallBack);
    });
    it('game difficulty needs to be "medium"', function() {
        if(game._difficulty != "medium"){
            alert("invalid difficulty setting! recheck information");
        }
        else{
            expect(game._difficulty).toBe('medium');
        }
    });
});