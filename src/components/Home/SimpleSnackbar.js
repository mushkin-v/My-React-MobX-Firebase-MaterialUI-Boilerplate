import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Snackbar from "@material-ui/core/Snackbar";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import PropTypes from "prop-types";

const styles = theme => ({
  close: {
    padding: theme.spacing.unit / 2
  }
});
function SimpleSnackbar(props, classes) {
  return (
    <div>
      <Snackbar
        anchorOrigin={{
          vertical: "top",
          horizontal: "center"
        }}
        open={props.state}
        autoHideDuration={2000}
        onClose={props.handleClose}
        ContentProps={{
          "aria-describedby": "message-id"
        }}
        message={<span id="message-id">{props.text}</span>}
        action={[
          <IconButton
            key="close"
            aria-label="Close"
            color="inherit"
            className={classes.close}
            onClick={props.handleClose}
          >
            <CloseIcon />
          </IconButton>
        ]}
      />
    </div>
  );
}

SimpleSnackbar.propTypes = {
  state: PropTypes.any,
  text: PropTypes.any,
  handleClose: PropTypes.func,
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(SimpleSnackbar);
