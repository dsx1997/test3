import logo from './logo.svg';
import './App.css';
import React from 'react';

function App() {
  return (
    <div className="App">
      
      
      <header className="App-header">
        <Game />
           <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>     
      </header>      
      
    </div>
  );
}

function Square(props) {
  
  return (
    
    <button className="square" onClick={props.funcProps1}>
      {props.valProps1}
    </button>
  );
}

class Board extends React.Component {

  renderSquare(i) {
    return <Square valProps1={this.props.valProps2[i]} funcProps1={() => this.props.funcProps2(i)} />;
  }

  render() {
    console.log('board render part =========================================')
    return (
      <div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}

class Game extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      history : [{
        squares : Array(9).fill(null)
      }],
      xIsNext : true,
      stepNumber : 0,
    };
  }

  handleClick(i) {
    console.log('In handleClick function ====================================================');
    console.log('i : ' + i);
    let history = this.state.history.slice(0, this.state.stepNumber + 1);
    // let history = this.state.history;
    
    let stepNumber  = this.state.stepNumber;
    console.log('stepNumber : ' + stepNumber);
    console.log('history');
    console.log(history);
    let current = history[history.length - 1];    
    console.log('current')
    console.log(current);
    let squares = current.squares;
    let squares1 = current.squares.slice();

    console.log(' = squares');
    console.log(squares);
    console.log(' sliced squares');
    console.log(squares1);

    if(squares[i] || judgeWinner(squares)) {
      return;
    }
    squares[i] = (this.state.xIsNext ? 'X' : 'O');
    this.setState({
      history : this.state.history.concat([{
        squares : squares
      }]),
      xIsNext : !this.state.xIsNext,
      stepNumber : this.state.history.length,
    });
    console.log('after setState function called ===> ');
    console.log('history');
    let h1 = this.state.history;
    console.log(h1);
    console.log('current');
    let c1 = h1[h1.length - 1];
    console.log(c1);
    let s1 = c1.squares;
    console.log('squares');
    console.log(s1);
  }

  render() {

    console.log('game render part =========================================')    
    let history = this.state.history.slice(0, this.state.stepNumber + 1);
    console.log('stepNumber : ' + this.state.stepNumber);
    console.log('history');
    console.log(history)
    let current = history[history.length - 1];
    console.log('current'); 
    console.log(current);
    let winner = judgeWinner(current.squares);
    let status;
    if(winner) {
      status = 'Winner is : ' + winner;
    } else {
      status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
    }
    return (
      <div className="game">
        <div className="game-board">
          <Board valProps2 = {current.squares} funcProps2={(i) => this.handleClick(i)} />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <ol>{/* TODO */}</ol>
        </div>
      </div>
    );
  }
}

function judgeWinner (squares)  {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];
  for(let i = 0; i < lines.length; i++) {
    let [a, b, c] = lines[i];
    if(squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}
// ========================================


export default App;
