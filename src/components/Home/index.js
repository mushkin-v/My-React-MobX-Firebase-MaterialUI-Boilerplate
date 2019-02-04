import React, { Component } from "react";
import { inject, observer } from "mobx-react";
import { compose } from "recompose";

import withAuthorization from "../Session/withAuthorization";
import { withFirebase } from "../Firebase";

import AddButton from "./AddBotton";

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

  render() {
    const currentUser = this.props.userStore.getUser;
    const columns = this.props.columnsStore.getColumns;
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
        {Array.from(columns.keys()).map(key => (
          <p key={key}>
            {key} : {columns.get(key)}
          </p>
        ))}
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
