import React, { Component } from "react";
import { inject, observer } from "mobx-react";
import { compose } from "recompose";

import withAuthorization from "../Session/withAuthorization";
import { withFirebase } from "../Firebase";

import AddButton from "./addBotton";
import BuildButton from "./buildButton";
import SimpleList from "./SimpleList";

import Grid from "@material-ui/core/Grid";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import Paper from "@material-ui/core/Paper";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import { TextField } from "@material-ui/core";
import * as PropTypes from "prop-types";

function Greetings(props) {
  return (
    <Paper>
      <TextField
        value={props.value}
        multiline
        fullWidth
        onChange={props.onChange}
        variant="outlined"
      />
      <BuildButton onClick={props.onClick} />
    </Paper>
  );
}

Greetings.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func,
  onClick: PropTypes.func
};

class HomePage extends Component {
  state = {
    generatedPhrase: "Click button to generate greetings!"
  };

  handleGeneratedTextChange = event => {
    this.setState({ generatedPhrase: event.target.value });
  };

  componentDidMount() {
    const authUser = JSON.parse(localStorage.getItem("authUser"));
    const props = this.props;

    props.firebase.user(authUser.id).onSnapshot(doc => {
      const currentUser = doc.data();

      props.userStore.setUser(
        currentUser.id,
        currentUser.username,
        currentUser.email
      );
    });

    props.firebase
      .columns()
      .where("user", "==", authUser.id)
      .get()
      .then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
          props.columnsStore.setColumn(doc.id, doc.data().phrases);
        });
      })
      .catch(function(error) {
        console.log("Error getting documents: ", error);
      });
  }

  addButtonClick = () => {
    const currentUser = this.props.userStore.getUser;
    const columns = this.props.firebase.columns();
    const countColumns = this.props.columnsStore.countColumns;
    if (countColumns < 6)
      columns
        .add({
          user: currentUser.id,
          phrases: [`Lorem ipsum!`]
        })
        .catch(function(error) {
          console.error("Error adding document: ", error);
        });
    //TODO: add normal msg for a user
    else console.log("Max 6 columns is reached!");
  };

  onPhraseClick = (columnKey, phraseNumber, e) => {
    const currentUser = this.props.userStore.getUser;
    const columns = this.props.firebase.columns();
    const oldPhrases = this.props.columnsStore.getColumns.get(columnKey);
    oldPhrases[phraseNumber] = e.target.value;
    this.props.columnsStore.getColumns.set(columnKey, [...oldPhrases]);

    columns
      .doc(columnKey)
      .update({
        user: currentUser.id,
        phrases: [...oldPhrases]
      })
      .catch(function(error) {
        // The document probably doesn't exist.
        console.error("Error adding a document: ", error);
      });
  };

  onPhraseDeleteClick = (columnKey, phraseNumber, e) => {
    if (this.props.columnsStore.getColumns.get(columnKey).toJS().length <= 1) {
      this.onColumnDeleteClick(columnKey);
      return;
    }

    const currentUser = this.props.userStore.getUser;
    const columns = this.props.firebase.columns();
    const updatedPhrases = this.props.columnsStore.getColumns
      .get(columnKey)
      .toJS();
    updatedPhrases.splice(phraseNumber, 1);

    columns
      .doc(columnKey)
      .update({
        user: currentUser.id,
        phrases: [...updatedPhrases]
      })
      .catch(function(error) {
        // The document probably doesn't exist.
        console.error("Error removing document: ", error);
      });
  };

  onPhraseAddClick = (key, e) => {
    const currentUser = this.props.userStore.getUser;
    const columns = this.props.firebase.columns();
    const oldPhrases = this.props.columnsStore.getColumns.get(key);

    columns
      .doc(key)
      .update({
        user: currentUser.id,
        phrases: [...oldPhrases, `Lorem ipsum!`]
      })
      .catch(function(error) {
        // The document probably doesn't exist.
        console.error("Error adding a document: ", error);
      });
  };

  onColumnDeleteClick = (key, e) => {
    const columns = this.props.firebase.columns();

    this.props.columnsStore.deleteColumn(key);

    columns
      .doc(key)
      .delete()
      .catch(function(error) {
        console.error("Error removing document: ", error);
      });
  };

  GenerateGreetings = () => {
    const columns = this.props.columnsStore.getColumns;
    let generatedPhrase = "";
    columns.forEach((value, key) => {
      generatedPhrase += `${value[Math.floor(Math.random() * value.length)]} `;
    });
    this.setState({ generatedPhrase: generatedPhrase });
  };

  render() {
    const columns = this.props.columnsStore.getColumns;
    const countColumns = this.props.columnsStore.countColumns;
    return (
      <div>
        <AddButton onClick={this.addButtonClick} />
        {/*TODO: remove br's*/}
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />

        <Grid container spacing={40}>
          {Array.from(columns.keys()).map(key => (
            <Grid key={key} item xs={Math.round(12 / countColumns)}>
              <Fab
                size="small"
                aria-label="Add"
                onClick={e => this.onPhraseAddClick(key, e)}
              >
                <AddIcon />
              </Fab>
              <IconButton
                aria-label="Delete column"
                size="small"
                onClick={e => this.onColumnDeleteClick(key, e)}
              >
                <CloseIcon />
              </IconButton>
              <Paper>
                <SimpleList
                  key={key}
                  columnId={key}
                  phrases={columns.get(key)}
                  onPhraseClick={this.onPhraseClick}
                  onPhraseDeleteClick={this.onPhraseDeleteClick}
                />
              </Paper>
            </Grid>
          ))}
          <Grid item xs={12}>
            <Greetings
              value={this.state.generatedPhrase}
              onChange={this.handleGeneratedTextChange}
              onClick={this.GenerateGreetings}
            />
          </Grid>
        </Grid>
      </div>
    );
  }
}

const condition = authUser => !!authUser;

export default compose(
  withFirebase,
  inject("userStore", "columnsStore"),
  withAuthorization(condition),
  observer
)(HomePage);
