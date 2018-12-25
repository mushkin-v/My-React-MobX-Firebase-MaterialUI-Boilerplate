import React from "react";
import { inject, observer } from "mobx-react";
import { compose } from "recompose";

import PasswordChangeForm from "../PasswordChange";
import withAuthorization from "../Session/withAuthorization";

const AccountPage = ({ sessionStore }) => (
  <div>
    <PasswordChangeForm email={sessionStore.authUser.email} />
  </div>
);

const condition = authUser => !!authUser;

export default compose(
  inject("sessionStore"),
  observer,
  withAuthorization(condition)
)(AccountPage);
