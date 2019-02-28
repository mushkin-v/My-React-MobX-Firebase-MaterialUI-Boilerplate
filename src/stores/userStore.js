import { observable, action, computed, decorate } from "mobx";

class UserStore {
  user = {};

  constructor(rootStore) {
    this.rootStore = rootStore;
  }

  setUser = (id, username, email) => {
    this.user = {
      id,
      username,
      email
    };
  };

  resetUser = () => (this.user = {});

  get getUser() {
    return this.user;
  }
}

decorate(UserStore, {
  user: observable,
  getUser: computed,
  setUser: action,
  resetUser: action
});

export default UserStore;
