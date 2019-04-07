import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";

class panes extends Component {
  constructor() {
    super();
    this.style = { padding: 20, marginTop: 10, marginBottom: 20 };
  }
  render() {
    return (
      <Grid container>
        <Grid item sm>
          <Paper style={this.style}>left pane</Paper>
        </Grid>

        <Grid item sm>
          <Paper style={this.style}>right pane</Paper>
        </Grid>
      </Grid>
    );
  }
}

export default panes;
