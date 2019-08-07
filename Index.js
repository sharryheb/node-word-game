const Word = require("./Word");
const inquirer = require("inquirer");
const colors = require('colors/safe');

var wordStock = ['Avatar', 'Titanic', 'Jurassic Park', 'Black Panther', 'Frozen', 'Beauty and the Beast',
                    'The Incredibles','The Lion King','Minions','Aquaman', 'Toy Story',
                    'Pirates of the Caribbean', 'Finding Nemo', 'Despicable Me', 'Shrek'];
var win = false;
var guessesLeft = 10;

var wordStockIndex;
var currentWord;
var limit = wordStock.length;
inquirer.prompt(
{
    name: "limit",
    type: "number",
    default: 15,
    message: "Limit word pool to (between 1 - 15):",
}).then(function(answers)
{
    if (answers.limit < limit)
    {
        wordStock = wordStock.splice(0, answers.limit);
        console.log("Limiting word pool to " + answers.limit);
    }
    wordStockIndex = getRandomIndex();
    currentWord = new Word(wordStock[wordStockIndex]);
    playGame();
});

function playGame()
{
    if (win || (guessesLeft <= 0))
    {
        wordStock.splice(wordStockIndex, 1); // remove the element at wordStockIndex index
        wordStockIndex = getRandomIndex();   // get new index for next word.
        win = false;
        guessesLeft = 10;
        if (wordStock.length <= 0)
        {
            console.log(colors.cyan("NO MORE WORDS!! To play again, re-run the program."));
        }
        else
        {
            currentWord = new Word(wordStock[wordStockIndex]);
            playGame();
        }
    } 
    else
    {
        console.log(colors.yellow("\nTo end the game, press Ctrl-C."));
        console.log(colors.yellow("You may make " + guessesLeft + " more mistakes before we show you the word."));
        console.log(currentWord.getWordDisplay(false));
        inquirer.prompt(
        {
            name: "guess",
            type: "input",
            message: "Guess a letter:",
        }).then(function(answers)
        {
            if (!currentWord.guessLetter(answers.guess))
            {
                guessesLeft--;   // only decrement guessesLeft if they guessed a wrong letter
                console.log(colors.red("INCORRECT!!"));
            }
            else
            {
                console.log(colors.green("CORRECT!!"));
            }

            win = currentWord.checkWin();
            if (win) 
            {
                console.log(colors.green(currentWord.getWordDisplay(true)));
                console.log(colors.green("YOU GUESSED IT!!! Next word!"));
                console.log(colors.magenta("============================================\n\n"));
            }

            if (guessesLeft <= 0)
            {
                console.log(colors.cyan("You're out of guesses! The word is: " + currentWord.getWordDisplay(true) + ". Next word!"));
                console.log(colors.magenta("============================================\n\n"));
            }
            playGame();
        });
    }
}

function getRandomIndex()
{
    wordStockIndex = Math.floor(Math.random() * wordStock.length);
    return wordStockIndex;
}
