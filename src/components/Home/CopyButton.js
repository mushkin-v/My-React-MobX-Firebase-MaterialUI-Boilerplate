import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import FileCopyIcon from "@material-ui/icons/FileCopy";
import Fab from "@material-ui/core/Fab";
import Tooltip from "@material-ui/core/Tooltip";

const styles = theme => ({
  fab: {
    marginRight: "15px",
    color: theme.palette.common.white,
    backgroundColor: "#263238",
    "&:hover": {
      backgroundColor: "#37474f"
    }
  }
});

const CopyButton = ({ classes, onClick }) => (
  <Tooltip title="Click to copy text to clipboard!">
    <Fab className={classes.fab} color="primary" onClick={onClick}>
      <FileCopyIcon />
    </Fab>
  </Tooltip>
);

CopyButton.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(CopyButton);
