import React, { Component } from 'react';
import GridList from '@material-ui/core/GridList';
import Square from './Square';
import Panel from './Panel';

export default class Board extends Component {

  constructor(props) {
    super(props);
    this.squares = [
      { instance: null, style: styles.squareBR },
      { instance: null, style: styles.squareBR },
      { instance: null, style: styles.squareB },
      { instance: null, style: styles.squareBR },
      { instance: null, style: styles.squareBR },
      { instance: null, style: styles.squareB },
      { instance: null, style: styles.squareR },
      { instance: null, style: styles.squareR },
      { instance: null, style: {} },
    ]
  }

  reset = () => {
    this.squares.forEach(square => {
      square.instance.reset();
    });
    this.props.parentReset();
  }
  actionNotify = async (index) => {
    let square = this.squares[index].instance
    if (square.isClickable()) {
      let { currentSymbol, gameActionNotify } = this.props;

      await square.clicked();
      await square.setSymbol(currentSymbol);

      let headMessage = 'Vez de ' + (currentSymbol === 'X' ? 'O' : 'X');
      let bodyMessage = 'Última jogada: ' + currentSymbol + ' quadrado [' + index + ']';
      this.panel.setText(headMessage, bodyMessage)
      let isWinner = this._checkRules();
      gameActionNotify(isWinner);
    }

  }

  _checkRules = () => {
    let isWinner = false;
    let { currentSymbol } = this.props;

    const rules = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8], // linhas
      [0, 3, 6], [1, 4, 7], [2, 5, 8], // colunas
      [0, 4, 8], [2, 4, 6] // diagonais
    ];

    rules.forEach(rule => {
      let filteredSquares = this.squares.filter(function (square, index) {
        return (rule.includes(index) && square.instance.getSymbol() === currentSymbol)
      });

      if (filteredSquares.length >= 3) {
        let squares = this.squares;
        squares.forEach(square => {
          square.instance.clicked();
        });

        filteredSquares.forEach(square => {
          square.instance.setTextColor('green');
        });

        isWinner = true;
      }
    });
    return isWinner;
  }

  render() {
    return (
      <div>
        <div style={styles.container}>
          <GridList cellHeight={100} style={styles.gridList} cols={3}>
            {this.squares.map((square, index) => (
              <Square
                key={index}
                index={index}
                style={square.style}
                ref={instance => { this.squares[index].instance = instance }}
                parentActionNotify={index => this.actionNotify(index)} />
            ))}
          </GridList>
        </div>
        <Panel
          parentReset={() => this.reset()}
          ref={instance => { this.panel = instance }} />
      </div>
    );
  }
}

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center'
  },
  paper: {
    marginTop: '20px',
    marginLeft: '10px',
    marginRight: '10px',
    padding: '10px',
  },
  squareBR: {
    borderBottom: '2px dashed #868e96',
    borderRight: '2px dashed #868e96'
  },
  squareB: {
    borderBottom: '2px dashed #868e96',
  },
  squareR: {
    borderRight: '2px dashed #868e96'
  },
  gridList: {
    width: 320,
    height: 320,
  },
};