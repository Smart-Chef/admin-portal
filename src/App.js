import React, { Component } from "react";

import { MenuAppBar } from "./components";
import { QueueTables } from "./containers";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      queues: {}
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
    this.timerHandle = setInterval(
      (() => {
        this.callApiWrapper();
        this.getCurrentStepWrapper();
        return () => {
          this.callApiWrapper();
          // this.getCurrentStepWrapper();
        };
      })(),
      3000
    );
  };

  clearTimer = () => {
    if (this.timerHandle) {
      clearInterval(this.timerHandle);
      this.timerHandle = 0;
    }
  };

  callApiWrapper = () => {
    this.callApi()
      .then(queues => {
        this.setState({
          queues
        });
      })
      .catch(err => console.log(err));
  };

  getCurrentStepWrapper = () => {
    this.getCurrentStep()
      .then(step => {
        this.setState({
          step
        });
      })
      .catch(console.log);
  };

  getCurrentStep = async () => {
    const response = await fetch("http://localhost:8001/api/currentStep");
    const { body } = await response.json();
    if (response.status !== 200) throw Error(body.message);
    return body;
  };

  callApi = async () => {
    const response = await fetch("/api/show");
    const { body } = await response.json();
    if (response.status !== 200) throw Error(body.message);
    return body;
  };

  deleteById = async r => {
    const response = await fetch(`/api/delete${r}`, { method: "POST" });
    if (response.status !== 200) throw Error("body.message");
    this.callApiWrapper();
  };

  executeById = async r => {
    const response = await fetch(`/api/execute${r}`, { method: "POST" });
    if (response.status !== 200) throw Error("body.message");
    this.callApiWrapper();
  };

  render() {
    const { queues } = this.state;
    return (
      <div className="App">
        <MenuAppBar />
        <QueueTables
          setTimer={this.setTimer}
          clearTimer={this.clearTimer}
          deleteById={this.deleteById}
          executeById={this.executeById}
          queues={queues}
        />
      </div>
    );
  }
}

export default App;
