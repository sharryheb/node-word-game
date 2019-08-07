function Letter(value)
{
    this.value = value;
    this.placeholder = "_ ";
    this.guessed = false;
    if (value === " ")
        this.guessed = true;
}

Letter.prototype.getCharacter  = function()
{
    if (this.guessed) return this.value + " ";
    else return this.placeholder;
}

Letter.prototype.checkGuess = function(guess)
{
    if (guess.toLowerCase() === this.value.toLowerCase())
    {
        this.guessed = true;
        return true;
    }
    return false;
}

module.exports = Letter;