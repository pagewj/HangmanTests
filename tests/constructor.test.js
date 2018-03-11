import Hangman from '../Hangman.js';
// added another constructor to teacher's function
describe(`Hangman - constructor`, function() {
  it(`should construct with valid canvas`, function() {
    const canvas = document.createElement(`canvas`);

    const game = new Hangman(canvas);
  });

  it(`should throw an error when no canvas element is provided`, function() {
    expect(function() {
      const game = new Hangman();
    }).toThrow(`Invalid Canvas provided`);
  });
  it('should throw an error when no canvas element is there', function (){
    const canvas = document.createElement('canvas');
    if(canvas != canvas){
      alert("invalid canvas provided");
    }
  });
});