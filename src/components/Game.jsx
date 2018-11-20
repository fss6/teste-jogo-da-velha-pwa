import React, { Component } from 'react';
import Board from './Board';

const initialState = {
  symbol: 'X',
  plays: 0,
  xIsCurrentSymbol: true
}

export default class Game extends Component {
  constructor(props) {
    super(props);
    this.state = initialState;
  }

  reset = () => {
    this.setState(initialState);
  }

  actionNotify(isWinner) {

    if (isWinner) {
      this.board.panel.setText('Partida encerrada!!!', ' Temos um  vencedor.');
      return;
    }

    let { plays, xIsCurrentSymbol } = this.state;
    let nextSymbol = xIsCurrentSymbol ? 'O' : 'X';
    this.setState({
      plays: plays + 1,
      symbol: nextSymbol,
      xIsCurrentSymbol: !xIsCurrentSymbol
    }, () => {
      if (this.state.plays > 8) {
        this.board.panel.setText('Ops... Deu velha!!!', ' Não houve vencedor.')
      }
    });
  }

  render() {
    return (
      <div>
        <Board
          currentSymbol={this.state.symbol}
          parentReset={() => this.reset()}
          ref={instance => { this.board = instance }}
          gameActionNotify={index => this.actionNotify(index)} />
      </div>
    );
  }
}