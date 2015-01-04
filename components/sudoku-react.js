var generateBlankBoard = function() {
  var board = [
    [8, 0, 0, 0, 0, 0, 0, 0, 0],
    [2, 0, 0, 0, 1, 0, 0, 0, 9],
    [1, 7, 0, 4, 3, 0, 0, 0, 0],
    [9, 0, 8, 5, 0, 0, 0, 6, 2],
    [0, 4, 0, 9, 6, 7, 0, 8, 0],
    [7, 6, 0, 0, 0, 8, 5, 0, 4],
    [0, 0, 0, 2, 0, 9, 0, 7, 1],
    [7, 0, 0, 0, 5, 0, 0, 0, 8],
    [0, 0, 0, 0, 0, 0, 0, 0, 5]
  ]

  return board.map(function(segment, index){
    return segment.map(function(cell, i){
      return {
        number: cell,
        loc: { x: index, y: i },
        isClickable: (cell === 0),
        isActive: false
      };
    })
  })
}

var cellChecker = function(sudokuBoard, cell) {
  var allNumbers = [];
  var allNumbers = allNumbers.concat(sudokuBoard[cell.loc.x]);
  var rowX = Math.floor(cell.loc.x / 3) * 3;
  var rowY = Math.floor(cell.loc.y / 3) * 3;
  var rem = { x: cell.loc.x % 3, y: cell.loc.y % 3 };

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
    var value = allNumbers[i]
    if (cell.number === value.number) {
      return false;
    }
  }

  return true;
}

var Sudoku = React.createClass({

  getInitialState: function() {
    return {
      board: generateBlankBoard(),
      activeCell: {}
    };
  },

  handleNumberSelect: function(e, cell) {
    var board = this.state.board;
    console.log(cellChecker(board, cell))

    if (cellChecker(board, cell)) {
      board[cell.loc.x][cell.loc.y].number = cell.number;
    }

    this.setState({ board: board })
  },

  makeCellActive: function(e, cell) {
    var board = this.state.board;
    var prevCell = this.state.activeCell;

    if (prevCell.isActive) {
      prevCell.isActive = false;
      board[prevCell.loc.x][prevCell.loc.y] = prevCell;
    }

    var activeCell = board[cell.loc.x][cell.loc.y];
    activeCell.isActive = true;
    board[cell.loc.x][cell.loc.y] = activeCell;

    this.setState({ board: board, activeCell: activeCell })
  },

  render: function() {
    var numbers;
    var style;
    var pos = this.state.pos;

    var self = this;

    // the board broken up into segments

    var board = this.state.board.map(function(cells){
      return (
        <Segment cells={cells} makeCellActive={self.makeCellActive} handleSelection={self.handleNumberSelect}/>
      )
    })

    return (
      <div id='sudoku'>
        <div id='game-board'>
          {board}
        </div>
      </div>
    )
  }
})

var Segment = React.createClass({
  render: function() {
    var self = this;
    var cells = this.props.cells.map(function(cell){
      return (
        <Cell {...cell} cellActive={self.props.makeCellActive} handleSelection={self.props.handleSelection} />
      )
    })

    return (
      <div className='segment'>
        {cells}
      </div>
    )
  }
})

var Cell = React.createClass({
  getInitialState: function() {
    return { isClickable: false, numberPad: false, value: 8, isActive: false };
  },

  selectCell: function(e) {
    // e.preventDefault();
    // this.refs.theInput.getDOMNode().focus();
    // this.setState({ isActive: !this.state.isActive });
  },

  // to make sure that the cells that are loaded with a default value
  // cannot be changed by the user, a check is made the moment before the component
  // is mounted for the first time
  // and makes a cell editable if the default value is 0.

  componentWillMount: function() {
    if (this.props.val === 0) {
      this.setState({ isClickable: true });
    }
  },

  selectNumber: function(e) {
    var cell = this.props;
    cell.number = parseInt(String.fromCharCode(e.which), 10);
    if (!_.isNaN(cell.number)) {
      this.props.handleSelection(e, cell);
    }
  },

  makeCellActive: function(e) {
    if (this.props.isClickable) {
      this.props.cellActive(e, this.props)
    }
  },

  render: function() {
    var num = this.props.number === 0 ? "" : this.props.number;
    var style = { backgroundColor: this.props.isActive ? "#b4cdcd" : "#bbbbbb" };
    return (
      <div onClick={this.makeCellActive}>
        <div style={style} className='game-cell'>{num}
          <input style={{opacity: "0"}} value={num} onKeyDown={this.selectNumber} type='text' ref='theInput'></input>
        </div>
      </div>
    )
  }
})

var renderBoard = function() {
  React.render(
    <Sudoku numbers={gameNumbers} />,
    document.getElementById("game")
  )
}