const LetterConst = require("./Letter");

function Word(word)
{
    this.letterArray = [];
    for (letter in word)
    {
        this.letterArray.push(new LetterConst(word[letter]));
    }
}

Word.prototype.getWordDisplay = function(reveal)
{
    var wordDisplay = "";
    for(letter in this.letterArray)
    {
        currentLetter = this.letterArray[letter];
        if (!reveal)
            wordDisplay += currentLetter.getCharacter();
        else
            wordDisplay += currentLetter.value;
    }
    return wordDisplay;
}

Word.prototype.guessLetter = function(guess)
{
    var gotHit = false;
    for (letter in this.letterArray)
    {
        var currentLetter = this.letterArray[letter];
        if (currentLetter.checkGuess(guess))
            gotHit = true;
    }
    return gotHit;
}

Word.prototype.checkWin = function()
{
    for (letter in this.letterArray)
    {
        if (this.letterArray[letter].guessed === false)
            return false;
    }
    return true;
}

module.exports = Word;