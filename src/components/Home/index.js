import React, { Component } from "react";
import { inject, observer } from "mobx-react";
import { compose } from "recompose";
import { styles } from "./styles";

import withAuthorization from "../Session/withAuthorization";
import { withFirebase } from "../Firebase";
import uuidv4 from "../../Helpers/uuidv4";
import Loading from "../Loading";

import AddButton from "./addBotton";
import SimpleList from "./SimpleList";
import Greetings from "./Greetings";
import Snackbar from "./SimpleSnackbar";

import Grid from "@material-ui/core/Grid";
import AddIcon from "@material-ui/icons/Add";
import Paper from "@material-ui/core/Paper";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import { withStyles } from "@material-ui/core";
import Divider from "@material-ui/core/Divider";

class HomePage extends Component {
  state = {
    generatedPhrase: "Click button to generate greetings!",
    showSnackbar: false,
    snackbarText: "Can't create more then 6 columns!",
    loading: true
  };

  componentDidMount() {
    const authUser = JSON.parse(localStorage.getItem("authUser"));
    // const props = this.props;
    const that = this;

    that.props.firebase.user(authUser.id).onSnapshot(doc => {
      const currentUser = doc.data();

      that.props.userStore.setUser(
        currentUser.id,
        currentUser.username,
        currentUser.email
      );
    });

    that.props.firebase
      .columns()
      .where("user", "==", authUser.id)
      .get()
      .then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
          that.props.columnsStore.setColumn(doc.id, {
            phrases: doc.data().phrases,
            id: doc.data().id,
            order: doc.data().order
          });
        });

        ///sorting
        const columns = that.props.columnsStore.getColumns;
        const sortedColumns = new Map(
          Array.from(columns.toJS()).sort((a, b) => a[1].order - b[1].order)
        );
        columns.clear();
        columns.merge(sortedColumns);
        that.setState({ loading: false });
      })
      .catch(function(error) {
        console.log("Error getting documents: ", error);
      });
  }

  handleGeneratedTextChange = event => {
    this.setState({ generatedPhrase: event.target.value });
  };

  addButtonClick = () => {
    const columnsStore = this.props.columnsStore;
    const currentUser = this.props.userStore.getUser;
    const columns = this.props.firebase.columns();
    const countColumns = columnsStore.countColumns;
    const uuid = uuidv4();
    const lastColumnOrderValue = parseInt(columnsStore.lastOrderValue) + 1;
    if (countColumns < 6) {
      columns
        .add({
          user: currentUser.id,
          phrases: [`Click to change the text`],
          id: uuid,
          order: lastColumnOrderValue
        })
        .then(function(docRef) {
          columnsStore.setColumn(docRef.id, {
            phrases: [`Click to change the text`],
            id: uuid,
            order: lastColumnOrderValue
          });
        })
        .catch(function(error) {
          console.error("Error adding document: ", error);
        });
    } else {
      this.setState({
        showSnackbar: true,
        snackbarText: "Can't create more then 6 columns!"
      });
    }
  };

  handleSnackbarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    this.setState({ showSnackbar: false });
  };

  onPhraseClick = (columnKey, phraseNumber, e) => {
    const currentUser = this.props.userStore.getUser;
    const columns = this.props.firebase.columns();
    const oldPhrases = this.props.columnsStore.getColumns.get(columnKey)
      .phrases;
    oldPhrases[phraseNumber] = e.target.value;
    this.props.columnsStore.getColumns.set(columnKey, {
      id: this.props.columnsStore.getColumns.get(columnKey).id,
      order: this.props.columnsStore.getColumns.get(columnKey).order,
      phrases: [...oldPhrases]
    });

    columns
      .doc(columnKey)
      .update({
        user: currentUser.id,
        phrases: [...oldPhrases],
        id: this.props.columnsStore.getColumns.get(columnKey).id,
        order: this.props.columnsStore.getColumns.get(columnKey).order
      })
      .catch(function(error) {
        // The document probably doesn't exist.
        console.error("Error adding a document: ", error);
      });
  };

  onPhraseDeleteClick = (columnKey, phraseNumber, e) => {
    if (
      this.props.columnsStore.getColumns.get(columnKey).phrases.toJS().length <=
      1
    ) {
      this.onColumnDeleteClick(columnKey);
      return;
    }

    const columnsStore = this.props.columnsStore;
    const currentUser = this.props.userStore.getUser;
    const columns = this.props.firebase.columns();
    const updatedPhrases = columnsStore.getColumns
      .get(columnKey)
      .phrases.toJS();

    updatedPhrases.splice(phraseNumber, 1);

    columnsStore.setColumn(columnKey, {
      id: this.props.columnsStore.getColumns.get(columnKey).id,
      order: this.props.columnsStore.getColumns.get(columnKey).order,
      phrases: [...updatedPhrases]
    });

    columns
      .doc(columnKey)
      .update({
        user: currentUser.id,
        phrases: [...updatedPhrases],
        id: this.props.columnsStore.getColumns.get(columnKey).id,
        order: this.props.columnsStore.getColumns.get(columnKey).order
      })
      .catch(function(error) {
        // The document probably doesn't exist.
        console.error("Error removing document: ", error);
      });
  };

  onPhraseAddClick = (key, e) => {
    const currentUser = this.props.userStore.getUser;
    const columns = this.props.firebase.columns();
    const oldPhrases = this.props.columnsStore.getColumns.get(key).phrases;

    this.props.columnsStore.getColumns.set(key, {
      phrases: [...oldPhrases, `Click to change the text`],
      id: this.props.columnsStore.getColumns.get(key).id,
      order: this.props.columnsStore.getColumns.get(key).order
    });

    columns
      .doc(key)
      .update({
        user: currentUser.id,
        phrases: [...oldPhrases, `Click to change the text`],
        id: this.props.columnsStore.getColumns.get(key).id,
        order: this.props.columnsStore.getColumns.get(key).order
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
    const columns = this.props.columnsStore;
    let generatedPhrase = "";
    if (columns.countColumns > 1) {
      columns.getColumns.forEach((value, key) => {
        generatedPhrase += `${
          value.phrases[Math.floor(Math.random() * value.phrases.length)]
        } `;
      });
      this.setState({ generatedPhrase: generatedPhrase });
    } else {
      this.setState({
        showSnackbar: true,
        snackbarText: "You don't have any data yet! Click Red Plus to start!"
      });
    }
  };

  GenerateCopy = () => {
    navigator.clipboard.writeText(this.state.generatedPhrase);
    this.setState({
      showSnackbar: true,
      snackbarText: "Copied to clipboard successfully!"
    });
  };

  render() {
    const columns = this.props.columnsStore.getColumns;
    const countColumns = this.props.columnsStore.countColumns;
    const { classes } = this.props;

    return this.state.loading ? (
      <Loading />
    ) : (
      <div className={classes.root}>
        <Snackbar
          state={this.state.showSnackbar}
          text={this.state.snackbarText}
          handleClose={this.handleSnackbarClose}
        />

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
            <Grid key={key} item xs={Math.floor(12 / countColumns)}>
              <Paper className={classes.paper}>
                <IconButton
                  size="small"
                  aria-label="Add"
                  onClick={e => this.onPhraseAddClick(key, e)}
                >
                  <AddIcon />
                </IconButton>
                <IconButton
                  aria-label="Delete column"
                  size="small"
                  onClick={e => this.onColumnDeleteClick(key, e)}
                >
                  <CloseIcon />
                </IconButton>
                <Divider />
                <SimpleList
                  key={key}
                  columnId={key}
                  phrases={columns.get(key).phrases}
                  onPhraseClick={this.onPhraseClick}
                  onPhraseDeleteClick={this.onPhraseDeleteClick}
                />
              </Paper>
            </Grid>
          ))}
          <Grid item xs={12}>
            <Paper className={classes.greetingsPaper}>
              <Greetings
                value={this.state.generatedPhrase}
                onChange={this.handleGeneratedTextChange}
                onBuildClick={this.GenerateGreetings}
                onCopyClick={this.GenerateCopy}
              />
            </Paper>
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
  withStyles(styles),
  observer
)(HomePage);
