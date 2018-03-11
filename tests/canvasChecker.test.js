import Hangman from '../Hangman.js';

describe('Hangman - canvas', function() {
    it('should throw an error when no canvas element is there', function (){
        const canvas = document.createElement('canvas');
        if(canvas != canvas){
          alert("invalid canvas provided");
        }
    });
})
