import React, { Component } from 'react';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

const initialState = {
  headMessage: 'Jogo Iniciado',
  bodyMessage: 'Aguardando jogador 1'
}

export default class Panel extends Component {

  constructor(props) {
    super(props)
    this.state = initialState;
  }

  reset = () => {
    this.setState(initialState, () => { });
    this.props.parentReset();
  }

  setText = (headMessage, bodyMessage) => {
    this.setState({ headMessage, bodyMessage })
  }

  render() {
    return (
      <Paper elevation={5} style={styles.paper}>
        <Typography variant="h5" component="h3">
          {this.state.headMessage}
        </Typography>
        <Typography component="p">
          {this.state.bodyMessage}
        </Typography>
        <div style={styles.container}>
          <Button
            variant="contained"
            color="primary"
            onClick={() => this.reset()}>
            Resetar
          </Button>
        </div>
      </Paper>
    );
  }
}

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: '15px',
  },
  paper: {
    marginTop: '20px',
    marginLeft: '10px',
    marginRight: '10px',
    padding: '10px',
  }
}