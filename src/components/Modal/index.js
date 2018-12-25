import React from "react";
import Modal from "@material-ui/core/Modal";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core/styles";
import { styles } from "./styles";

const CustomModal = ({
  open,
  classes,
  handleModalClose,
  handleModalAction,
  modalText,
  leftButtonText,
  rightButtonText
}) => (
  <Modal
    aria-labelledby="simple-modal-title"
    aria-describedby="simple-modal-description"
    open={open}
    onClose={handleModalClose}
  >
    <div className={classes.modal}>
      <Grid
        container
        direction="column"
        justify="space-evenly"
        alignItems="center"
      >
        <Grid item xs={12}>
          <Typography variant="title" id="modal-title" align="center">
            {modalText}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Button
            variant="outlined"
            onClick={handleModalClose}
            className={classes.button}
          >
            {leftButtonText}
          </Button>
          <Button
            variant="outlined"
            color="secondary"
            onClick={handleModalAction}
            className={classes.button}
          >
            {rightButtonText}
          </Button>
        </Grid>
      </Grid>
    </div>
  </Modal>
);

export default withStyles(styles)(CustomModal);
