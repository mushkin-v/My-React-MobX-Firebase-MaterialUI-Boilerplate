import React from "react";
import { withStyles } from "@material-ui/core/styles";
import { styles } from "./styles";
import Typography from "@material-ui/core/Typography";
import PropTypes from "prop-types";
import Button from "@material-ui/core/Button";
import * as routes from "../../constants/routes";
import { withRouter } from "react-router";
import { compose } from "recompose";
import Grid from "@material-ui/core/Grid";

const LandingPage = ({ classes, history }) => (
  <Grid container className={classes.root} spacing={16}>
    <Grid item xs={12}>
      <Typography
        variant="h3"
        gutterBottom
        align="center"
        className={classes.landingTitle}
      >
        Best Greetings Generator App
      </Typography>
    </Grid>
    <Grid item xs={12}>
      <img src="images/logo-1.gif" alt="" className={classes.img} />
    </Grid>
    <Grid item xs={12}>
      <Button
        justify="center"
        size="large"
        variant="outlined"
        className={classes.button}
        onClick={() => history.push(routes.SIGN_IN)}
      >
        Sign In
      </Button>
    </Grid>
  </Grid>
);

LandingPage.propTypes = {
  classes: PropTypes.object.isRequired
};

export default compose(
  withRouter,
  withStyles(styles)
)(LandingPage);
