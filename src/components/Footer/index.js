import React from "react";
import Typography from "@material-ui/core/Typography";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { styles } from "./styles";

const Footer = ({ classes }) => (
  <div className={classes.pos}>
    <Typography
      variant="caption"
      gutterBottom
      align="center"
      className={classes.footer}
    >
      {/*Powered by Mushkin Vitaliy © 2019*/}
    </Typography>
  </div>
);

Footer.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Footer);
