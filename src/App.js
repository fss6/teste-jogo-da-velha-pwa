import React, { Component } from 'react';
import Game from './components/Game.jsx';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

export default class App extends Component {
  render() {
    return (
      <div style={{ flexGrow: 1 }}>
        <AppBar position="static" color="primary" style={{ marginBottom: '40px' }}>
          <Toolbar>
            <Typography variant="h6" color="inherit">
              Jogo da Velha (PWA)
            </Typography>
          </Toolbar>
        </AppBar>
        <Game />
      </div>
    );
  }
}