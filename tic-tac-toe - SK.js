/*  A simple Tic-Tac-Toe game
Players 'X' and 'O' take turn inputing their position on the command line using numbers 1-9
1 | 2 | 3
---------
4 | 5 | 6
---------
7 | 8 | 9
*/

// importing user import library
// missed ({sigint: true});
const prompt = require('prompt-sync')({sigint: true});

let board = {
    1: ' ', 2: ' ', 3: ' ',
    4: ' ', 5: ' ', 6: ' ',
    7: ' ', 8: ' ', 9: ' '
};

// TODO: update the gameboard with the user input
function markBoard(position, mark) {
        validateMove(position)
        board[position] = mark
        
}

// TODO: print the game board as described at the top of this code skeleton
function printBoard() {
        console.log(`
        ${board[1]} | ${board[2]} | ${board[3]}
        ---------
        ${board[4]} | ${board[5]} | ${board[6]}
        ---------
        ${board[7]} | ${board[8]} | ${board[9]}
        `)
}


// TODO: check for wrong input, this function should return true or false.
// true denoting that the user input is correct
// you will need to check for wrong input (user is entering invalid position) or position is out of bound
// another case is that the position is already occupied
function validateMove(position) {
        if(position < 1 || position > 9){
            console.log("Please enter a number (1-9) again.")
            return false
        }
        else if (board[position] === "X" || board[position] === "O"){
            console.log("Please enter a number (1-9) again as previous number is occupied.")
            return false
        }
        else if ((/^[a-zA-Z]*$/).test(position)){
            console.log("Please enter a number (1-9) again.")
            return false
        }
        else{
            return true
        }
}

// TODO: list out all the combinations of winning, you will neeed this
// one of the winning combinations is already done for you
let winCombinations = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
    [1, 4, 7],
    [1, 5, 9],
    [2, 5, 8],
    [3, 6, 9],
    [3, 5, 7]
];

// TODO: implement a logic to check if the previous winner just win
// This method should return with true or false
function checkWin(player) {
        for (const combo of winCombinations){
            const [a, b, c] = combo

            if (board[a] != " " && board[a] === player && board[a] === board[b] && board[b] === board[c]){
                console.log(player + " is the winner!")
                winnerIdentified = true
                playAgain()
                return true
            }
        }
        return false
}

// TODO: implement a function to check if the game board is already full
// For tic-tac-toe, tie bascially means the whole board is already occupied
// This function should return with boolean
function checkFull() {
        let boardEntries = Object.entries(board)
        let emptyEntries = boardEntries.filter(([_, marker]) => marker === " ")
        if (checkWin()){
            return false
        }
        else if(emptyEntries.length > 0){
            return false
        }
        else{
            console.log("This is a tie match!")
            winnerIdentified = true
            playAgain()
            return true
        }
}

// *****************************************************
// Copy all your code/fucntions in Part 1 to above lines
// (Without Test Cases)
// *****************************************************


// TODO: the main part of the program
// This part should handle prompting the users to put in their next step, checking for winning or tie, etc
function playTurn(player) {
        position = prompt ("Player " + player + ", please choose a position(1-9)")
        while(!validateMove(position)){
            position = prompt ("Player " + player + ", please choose a position(1-9)")
        }
        markBoard(position, player)
        printBoard()
        checkWin(player)
        checkFull()
}

// entry point of the whole program
console.log('Game started: \n\n' +
    ' 1 | 2 | 3 \n' +
    ' --------- \n' +
    ' 4 | 5 | 6 \n' +
    ' --------- \n' +
    ' 7 | 8 | 9 \n');

let winnerIdentified = false
let currentTurnPlayer = 'X'

while (!winnerIdentified){
    playTurn(currentTurnPlayer);
    // feel free to add logic here if needed, e.g. announcing winner or tie
        if (currentTurnPlayer === "X"){
            currentTurnPlayer = "O"
        }
        else if(currentTurnPlayer === "O"){
            currentTurnPlayer = "X"
        }
}


// Bonus Point: Implement the feature for the user to restart the game after a tie or game over
function playAgain() {
    userInput = prompt("Do you want to play again?Y/N")
    if(userInput == "Y" || userInput == "y"){
        for(let i=1; i<10;i++){
            board[i]=" "
        }
        console.log('Game started: \n\n' +
        ' 1 | 2 | 3 \n' +
        ' --------- \n' +
        ' 4 | 5 | 6 \n' +
        ' --------- \n' +
        ' 7 | 8 | 9 \n')
        winnerIdentified=false
    }
    else if(userInput == "N" || userInput == "n"){
        console.log("Thank you for your time!")
    }
    else{
        playAgain()
    }
}
