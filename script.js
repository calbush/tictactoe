
//create gameboard object with list of tiles and store winning outcomes (module?)
const gameBoard = (() => {
    return {
        "squares":[0, 1, 2, 3, 4, 5, 6, 7, 8],
        "winningOutcomes":[[1,2,3], [4,5,6], [7,8,9], [1,4,7], [2,5,8], [3,6,9], [1,5,9], [3,5,7]]
    };
})();

//Factory function to create player object
let playerCreator = ((player, gamePiece) => {
   return {
    player,
    "selectedSquares":[],
    gamePiece,
    "wins": 0,
    test: function(){
        
    }
   }
});

let Caleb = playerCreator('Caleb', 'O');


//Add event listeners to listen for click on gameboard squares.
(function() {
    let allSquares = document.querySelectorAll('.square')
    for(i of allSquares){
        i.addEventListener('click', (e) => {
            e.target.innerHTML = Caleb.gamePiece;
        })

    }
})();

