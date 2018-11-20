import React, { Component } from 'react';
import GridListTile from '@material-ui/core/GridListTile';

const initialState = {
  symbol: '',
  clickable: true,
  textColor: '#000000'
}

export default class Square extends Component {

  constructor(props) {
    super(props);
    this.state = initialState;
  }

  reset = () => {
    this.setState(initialState);
  }

  isClickable = () => {
    return this.state.clickable;
  }

  clicked = () => {
    this.setState({ clickable: false }, () => { })
  }

  getSymbol = () => {
    return this.state.symbol;
  }

  setTextColor = (textColor) => {
    this.setState({ textColor: textColor }, () => { })
  }

  setSymbol = (symbol) => {
    this.setState({ symbol: symbol }, () => { })
  }

  render() {
    let { parentActionNotify, index } = this.props;
    return (
      <GridListTile
        cols={1}
        style={this.props.style}
        onClick={() => parentActionNotify(index)}>
        <div style={styles.symbol}>
          <h2 style={{ color: this.state.textColor }}>
            {this.state.symbol}
          </h2>
        </div>
      </GridListTile>
    );
  }
}

const styles = {
  symbol: {
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  }
}