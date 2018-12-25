import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";

import PropTypes from "prop-types";
import Button from "@material-ui/core/Button";
import FormControl from "@material-ui/core/FormControl";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import InputAdornment from "@material-ui/core/InputAdornment";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import withStyles from "@material-ui/core/styles/withStyles";
import Grid from "@material-ui/core/Grid";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import IconButton from "@material-ui/core/IconButton";

import { PasswordForgetLink } from "../PasswordForget";

import { withFirebase } from "../Firebase";

import * as routes from "../../constants/routes";

import { styles } from "./styles";

const updateByPropertyName = (propertyName, value) => () => ({
  [propertyName]: value
});

const INITIAL_STATE = {
  username: "",
  email: "",
  passwordOne: "",
  passwordTwo: "",
  showPasswordOne: false,
  showPasswordTwo: false,
  error: null
};

class SignUpForm extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  handleMouseDownPassword = event => {
    event.preventDefault();
  };

  handleClickShowPasswordOne = () => {
    this.setState(state => ({ showPasswordOne: !state.showPasswordOne }));
  };

  handleClickShowPasswordTwo = () => {
    this.setState(state => ({ showPasswordTwo: !state.showPasswordTwo }));
  };

  onSubmit = event => {
    const { username, email, passwordOne } = this.state;

    const { history } = this.props;

    this.props.firebase
      .doCreateUserWithEmailAndPassword(email, passwordOne)
      .then(authUser => {
        // Create a user in your own accessible Firebase Database too
        return this.props.firebase
          .user(authUser.user.uid)
          .set({
            username,
            email
          })
          .then(() => {
            this.setState(() => ({ ...INITIAL_STATE }));
            history.push(routes.HOME);
          })
          .catch(error => {
            this.setState(updateByPropertyName("error", error));
          });
      })
      .catch(error => {
        this.setState(updateByPropertyName("error", error));
      });

    event.preventDefault();
  };

  render() {
    const {
      username,
      email,
      passwordOne,
      passwordTwo,
      error,
      showPasswordOne,
      showPasswordTwo
    } = this.state;
    const classes = this.props.classes;

    const isInvalid =
      passwordOne !== passwordTwo ||
      passwordOne === "" ||
      username === "" ||
      email === "";

    return (
      <React.Fragment>
        <main className={classes.layout}>
          <Paper className={classes.paper}>
            <Typography variant="headline">Create your Account</Typography>
            <form className={classes.form} onSubmit={this.onSubmit}>
              <FormControl margin="normal" required fullWidth>
                <InputLabel htmlFor="username">Full Name</InputLabel>
                <Input
                  id="username"
                  name="username"
                  autoComplete="username"
                  autoFocus
                  value={username}
                  onChange={event =>
                    this.setState(
                      updateByPropertyName("username", event.target.value)
                    )
                  }
                />
              </FormControl>

              <FormControl margin="normal" required fullWidth>
                <InputLabel htmlFor="email">Email Address</InputLabel>
                <Input
                  id="email"
                  name="email"
                  autoComplete="email"
                  autoFocus
                  value={email}
                  onChange={event =>
                    this.setState(
                      updateByPropertyName("email", event.target.value)
                    )
                  }
                />
              </FormControl>

              <FormControl margin="normal" required fullWidth>
                <InputLabel htmlFor="passwordOne">Password</InputLabel>
                <Input
                  name="passwordOne"
                  type={showPasswordOne ? "text" : "password"}
                  id="passwordOne"
                  autoComplete="current-password"
                  value={passwordOne}
                  onChange={event =>
                    this.setState(
                      updateByPropertyName("passwordOne", event.target.value)
                    )
                  }
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="Toggle password visibility"
                        onClick={this.handleClickShowPasswordOne}
                        onMouseDown={this.handleMouseDownPassword}
                      >
                        {this.state.showPasswordOne ? (
                          <VisibilityOff />
                        ) : (
                          <Visibility />
                        )}
                      </IconButton>
                    </InputAdornment>
                  }
                />
              </FormControl>

              <FormControl margin="normal" required fullWidth>
                <InputLabel htmlFor="passwordTwo">Confirm Password</InputLabel>
                <Input
                  name="passwordTwo"
                  type={showPasswordTwo ? "text" : "password"}
                  id="passwordTwo"
                  autoComplete="current-password"
                  value={passwordTwo}
                  onChange={event =>
                    this.setState(
                      updateByPropertyName("passwordTwo", event.target.value)
                    )
                  }
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="Toggle password visibility"
                        onClick={this.handleClickShowPasswordTwo}
                        onMouseDown={this.handleMouseDownPassword}
                      >
                        {this.state.showPasswordTwo ? (
                          <VisibilityOff />
                        ) : (
                          <Visibility />
                        )}
                      </IconButton>
                    </InputAdornment>
                  }
                />
              </FormControl>

              {error && (
                <Typography className={classes.error}>
                  {error.message}
                </Typography>
              )}

              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
                disabled={isInvalid}
              >
                Sign Up
              </Button>
              <Grid
                container
                direction="column"
                justify="space-evenly"
                alignItems="center"
                className={classes.marginTop}
              >
                <PasswordForgetLink />
              </Grid>
            </form>
          </Paper>
        </main>
      </React.Fragment>
    );
  }
}

const SignUpLink = () => (
  <Typography variant="caption">
    Don't have an account? <Link to={routes.SIGN_UP}>Sign Up</Link>
  </Typography>
);

SignUpForm.propTypes = {
  classes: PropTypes.object.isRequired
};

const SignUpFormWithStyles = withStyles(styles)(SignUpForm);

export default withRouter(withFirebase(SignUpFormWithStyles));

export { SignUpLink };
