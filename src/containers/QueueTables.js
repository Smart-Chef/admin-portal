import React, { Component } from "react";
import Button from "@material-ui/core/Button/Button";
import { SimpleTable } from "../components";
import * as PropTypes from "prop-types";
import Typography from "@material-ui/core/Typography/Typography";

class QueueTables extends Component {
  render() {
    return (
      <>
        <Typography variant="h4" gutterBottom>
          Trigger Queues
        </Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={this.props.setTimer}
        >
          Start Polling
        </Button>
        <Button
          variant="contained"
          color="secondary"
          onClick={this.props.clearTimer}
        >
          Stop Polling
        </Button>
        {Object.keys(this.props.queues).map(key => (
          <SimpleTable
            key={key}
            name={key}
            data={this.props.queues[key]}
            deleteById={this.props.deleteById}
            executeById={this.props.executeById}
          />
        ))}
      </>
    );
  }
}

QueueTables.propTypes = {
  setTimer: PropTypes.func,
  clearTimer: PropTypes.func,
  deleteById: PropTypes.func,
  executeById: PropTypes.func,
  queues: PropTypes.any
};

export default QueueTables;
