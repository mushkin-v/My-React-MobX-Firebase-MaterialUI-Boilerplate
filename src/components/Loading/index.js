import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import LinearProgress from "@material-ui/core/LinearProgress";
import Grid from "@material-ui/core/Grid";

const styles = {
  root: {
    flexGrow: 1,
    minHeight: "100vh",
    padding: "25%"
  }
};

function Loading(props) {
  const { classes } = props;
  return (
    <Grid
      className={classes.root}
      container
      direction="row"
      justify="center"
      alignItems="center"
    >
      <Grid item xs={12}>
        <LinearProgress />
        <br />
        <LinearProgress color="secondary" />
      </Grid>
    </Grid>
  );
}

Loading.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Loading);
