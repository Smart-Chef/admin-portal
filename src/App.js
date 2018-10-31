import React, { Component } from 'react';

import { SimpleTable, MenuAppBar } from './components';
import Button from '@material-ui/core/Button';

// import './App.css';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      queues: {},
    };
  }

  componentDidMount = () => {
    this.setTimer();
  };

  componentWillUnmount = () => {
    this.clearTimer();
  };

  setTimer = () => {
    if (this.timerHandle) {
      // Exception?
      return;
    }
    // Remember the timer handle
    this.timerHandle = setInterval((() => {
      this.callApiWrapper()
      return this.callApiWrapper;
    })(), 3000);
  };

  clearTimer = () => {
    if (this.timerHandle) {
        clearInterval(this.timerHandle);
        this.timerHandle = 0;
      }
    };

  callApiWrapper = () => {
    this.callApi().then(queues => {
      this.setState({
        queues
      })
    })
    .catch(err => console.log(err));
  }

  callApi = async () => {
    const response = await fetch('/api/show');
    const {body} = await response.json();
    if (response.status !== 200) throw Error(body.message);
    return body;
  };

  render() {
    const { queues } = this.state;
    return (
      <div className="App">
        <MenuAppBar />
        <Button variant="contained" color="primary" onClick={this.setTimer}>
          Start Polling
        </Button>
        <Button variant="contained" color="secondary" onClick={this.clearTimer}>
          Stop Polling
        </Button>
        {Object.keys(queues).map(key => (
          <SimpleTable key={key} name={key} data={queues[key]} />
        ))}
      </div>
    );
  }
}

export default App;
