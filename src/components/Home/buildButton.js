import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import BuildIcon from "@material-ui/icons/Build";
import Fab from "@material-ui/core/Fab";
import Tooltip from "@material-ui/core/Tooltip";

const styles = theme => ({
  fab: {
    color: theme.palette.common.white,
    backgroundColor: "#212121",
    "&:hover": {
      backgroundColor: "#424242"
    }
  }
});

const BuildButton = ({ classes, onClick }) => (
  <Tooltip title="Click to generate!">
    <Fab className={classes.fab} color="primary" onClick={onClick}>
      <BuildIcon />
    </Fab>
  </Tooltip>
);

BuildButton.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(BuildButton);
