import React, { Component } from "react";
import { inject, observer } from "mobx-react";
import { compose } from "recompose";

import withAuthorization from "../Session/withAuthorization";
import { withFirebase } from "../Firebase";

import AddButton from "./addBotton";
import SimpleList from "./list";
import Grid from "@material-ui/core/Grid";

class HomePage extends Component {
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
      .onSnapshot(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
          props.columnsStore.setColumns(doc.id, doc.data().phrases);
        });
      });
  }

  addButtonClick = () => {
    const currentUser = this.props.userStore.getUser;
    const columns = this.props.firebase.columns();

    columns
      .add({
        user: currentUser.id,
        phrases: [`Your first phrase!`]
      })
      .then(function(docRef) {
        console.log(`New column added with id: ${docRef.id}`);
      })
      .catch(function(error) {
        console.error("Error adding document: ", error);
      });
  };

  onPhraseClick = (i, e) => {
    console.log(`Phrase ${i} click!`);
  };
  onPhraseDeleteClick = (i, e) => {
    console.log(`Phrase ${i} Delete click!`);
  };

  render() {
    const currentUser = this.props.userStore.getUser;
    const columns = this.props.columnsStore.getColumns;
    const countColumns = this.props.columnsStore.countColumns;
    return (
      <div>
        <AddButton onClick={this.addButtonClick} />
        <h1>Home</h1>
        <p>
          userList:
          {`
          id=${currentUser.id} 
          name=${currentUser.username} 
          email=${currentUser.email}`}
        </p>
        <p>ColumnsList:</p>
        <Grid container justify="center" spacing={40}>
          {Array.from(columns.keys()).map(key => (
            <Grid key={key} item xs={Math.round(12 / countColumns)}>
              <SimpleList
                key={key}
                phrases={columns.get(key)}
                onPhraseClick={this.onPhraseClick}
                onPhraseDeleteClick={this.onPhraseDeleteClick}
              />
            </Grid>
          ))}
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
