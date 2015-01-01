
function gameBoard() {
  return [
    [0, 0, 0, 0, 0, 1, 0, 2, 0],
    [0, 0, 0, 0, 0, 2, 0, 0, 0],
    [0, 5, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 6, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 8, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 1, 0],
    [0, 0, 0, 0, 3, 0, 0, 0, 9],
    [0, 0, 0, 0, 0, 0, 0, 7, 0],
    [1, 0, 0, 0, 0, 0, 0, 0, 0]
  ];
}

var cellChecker = function(sudokuBoard, loc) {
  var allNumbers = sudokuBoard[loc.x];

  var rowX = Math.floor(loc.x / 3) * 3;
  var rowY = Math.floor(loc.y / 3) * 3;
  var rem = { x: loc.x % 3, y: loc.y % 3 };

  sudokuBoard.forEach(function(set,i) {
    if (i >= rowX && i < (rowX + 3)) {
      set.forEach(function(number,numIndex){
        if (numIndex >= rowY && numIndex < (rowY + 3)) {
          allNumbers.push(number);
        }
      })
    }
  })

  sudokuBoard.forEach(function(set,i){
    if ((i % 3) === rem.x) {
      set.forEach(function(n,numIndex){
        if (rem.y === (numIndex % 3)) {
          allNumbers.push(n);
        }
      })
    }
  })

  for (var i = 0; i < allNumbers.length; i++) {
    if (loc.number === allNumbers[i]) {
      return false;
    }
  }

  return true;
}

var thisBoard = gameBoard();
var gameNumbers = [1,2,3,4,5,6,7,8,9];
