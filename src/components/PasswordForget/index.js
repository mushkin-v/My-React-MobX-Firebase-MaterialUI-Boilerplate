import React, { Component } from "react";
import { Link } from "react-router-dom";

import * as routes from "../../constants/routes";
import { withFirebase } from "../Firebase";
import { compose } from "recompose";

import PropTypes from "prop-types";
import Button from "@material-ui/core/Button";
import FormControl from "@material-ui/core/FormControl";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import withStyles from "@material-ui/core/styles/withStyles";
import { styles } from "./styles";

const INITIAL_STATE = {
  email: "",
  error: null,
  thankYou: ""
};

class PasswordForgetForm extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  onSubmit = event => {
    const { email } = this.state;

    this.props.firebase
      .doPasswordReset(email)
      .then(() => {
        this.setState(() => ({
          ...INITIAL_STATE,
          thankYou: "A verification link has been sent to your email account."
        }));
      })
      .catch(error => {
        this.setState(() => ({
          thankYou: "",
          error: error
        }));
      });

    event.preventDefault();
  };

  render() {
    const { email, error, thankYou } = this.state;
    const classes = this.props.classes;
    const isInvalid = email === "";

    return (
      <React.Fragment>
        <main className={classes.layout}>
          <Paper className={classes.paper}>
            <Typography variant="headline">
              Enter your recovery email
            </Typography>
            <form className={classes.form} onSubmit={this.onSubmit}>
              <FormControl margin="normal" required fullWidth>
                <InputLabel htmlFor="email">Email Address</InputLabel>
                <Input
                  id="email"
                  name="email"
                  autoComplete="email"
                  autoFocus
                  value={email}
                  onChange={event =>
                    this.setState({ email: event.target.value })
                  }
                />
              </FormControl>

              {error && (
                <Typography className={classes.error}>
                  {error.message}
                </Typography>
              )}

              {thankYou && (
                <Typography className={classes.success}>{thankYou}</Typography>
              )}

              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
                disabled={isInvalid}
              >
                Reset My Password
              </Button>
            </form>
          </Paper>
        </main>
      </React.Fragment>
    );
  }
}

const PasswordForgetLink = () => (
  <Typography variant="caption">
    <Link to={routes.PASSWORD_FORGET}>Forgot Password?</Link>
  </Typography>
);

PasswordForgetForm.propTypes = {
  classes: PropTypes.object.isRequired
};

export { PasswordForgetLink };

export default compose(
  withFirebase,
  withStyles(styles)
)(PasswordForgetForm);
