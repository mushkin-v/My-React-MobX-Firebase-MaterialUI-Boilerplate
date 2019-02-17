import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import AddIcon from "@material-ui/icons/Add";
import Fab from "@material-ui/core/Fab";
import Tooltip from "@material-ui/core/Tooltip";

const styles = theme => ({
  fab: {
    position: "fixed",
    top: theme.spacing.unit * 5,
    right: theme.spacing.unit * 15
  }
});

const AddButton = ({ classes, onClick }) => (
  <Tooltip title="Click to add new column">
    <Fab className={classes.fab} color="secondary" onClick={onClick}>
      <AddIcon />
    </Fab>
  </Tooltip>
);

AddButton.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(AddButton);
