
//create gameboard object with list of tiles and store winning outcomes (module?)
const gameBoard = (() => {
    return {
        "squares":[0, 1, 2, 3, 4, 5, 6, 7, 8],
        "gamePieces": ['X', 'O'],
        "winningOutcomes": [["0","1","2"], ["3","4","5"], ["6","7","8"], ["0","3","6"], ["1","4","7"], ["2","5","8"], ["0","4","8"], ["2","4","6"]],
        "winningOutcomeIndices": {
            "0": [0, 3, 6],
            "1": [0, 4],
            "2": [0, 5, 7],
            "3": [1, 3],
            "4": [1, 4, 6, 7],
            "5": [1, 5],
            "6": [2, 3, 7],
            "7": [2, 4],
            "8": [2, 5, 6]
        }
    };
})();

//Factory function to create player object
let playerCreator = ((player, gamePiece) => {
   return {
    player,
    "selectedSquares":[],
    gamePiece,
    "wins": 0
   }
});

//Add event listeners to listen for click on gameboard squares. Upon click, store clicked square in player object value.
(function() {
    let allSquares = document.querySelectorAll('.square')
    let winner = false;
    for(i of allSquares)
        i.addEventListener('click', (e) => {
            //only execute if clicked square is empty
            if(e.target.innerHTML == '' && !winner){
                e.target.innerHTML = playerOne.gamePiece;
                let selectedSquare = e.target.dataset.squarevalue
            
            //if player clicks same square multiple times, subsequent clicks are not added to selectedSquares list
            if (!playerOne.selectedSquares.includes(e.target.dataset.squarevalue)){
                playerOne.selectedSquares.push(e.target.dataset.squarevalue)
            }

            //compare clicked squares to winning outcomes. 
            for (let i = 0; i < gameBoard.winningOutcomeIndices[selectedSquare].length; i++){
                if (gameBoard.winningOutcomes[gameBoard.winningOutcomeIndices[selectedSquare][i]].every(iter => playerOne.selectedSquares.includes(iter))){
                    console.log(`${playerOne.gamePiece} Wins`)
                    winner = true;
                }
            }
            playerTwoMove();

            let emptySquareCounter = 0
            for (i of allSquares){
                if (!i.innerHTML == ''){
                    emptySquareCounter++
                    if (emptySquareCounter == 9 && winner == false){
                        console.log('tie')
                    }
                }
            }
        }
        })
    }
)();

//create array from empty squares, select a random number with the max random int being the length of the array 
function playerTwoMove(){
    const boardSquares = document.querySelectorAll('.square')
    let emptySquares = []
    for (square of boardSquares){
       if(square.innerHTML == ''){
        emptySquares.push(square)
       }
    }

    let potentialMoves = emptySquares.length - 1
    if (potentialMoves > 0){
        let move = Math.round(Math.random() * potentialMoves)
        emptySquares[move].innerHTML = computer.gamePiece
        
        let computerRecentMove = emptySquares[move].dataset.squarevalue;
        computer.selectedSquares.push(computerRecentMove)

        for (i = 0; i < gameBoard.winningOutcomeIndices[computerRecentMove].length; i++){
            if (gameBoard.winningOutcomes[gameBoard.winningOutcomeIndices[computerRecentMove][i]].every(iter => computer.selectedSquares.includes(iter))){
                console.log(`${computer.gamePiece} Wins`)
                winner = true
            } 
    }  
}
}

let playerOne;
let computer;

(() => {
    document.getElementsByName('gamePiece').forEach(radio => {
        radio.addEventListener('click', () => {
            let selectedBtn = document.querySelector('input[name="gamePiece"]:checked').value
            console.log(selectedBtn)
            playerOne = playerCreator('Cal', selectedBtn)
            if (playerOne.gamePiece == 'X'){
                computer = playerCreator('computer', 'O')
            }
            else if (playerOne.gamePiece == 'O'){
                computer = playerCreator('computer', 'X')
            }
        })
    })
})();

