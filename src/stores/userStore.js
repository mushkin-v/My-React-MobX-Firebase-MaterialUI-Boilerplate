import { observable, action, computed, decorate } from "mobx";

class UserStore {
  users = null;

  constructor(rootStore) {
    this.rootStore = rootStore;
  }

  setUsers = users => {
    this.users = users;
  };

  setUser = (user, uid) => {
    if (!this.users) {
      this.users = {};
    }

    this.users[uid] = user;
  };

  get userList() {
    return Object.keys(this.users || {}).map(key => ({
      ...this.users[key],
      uid: key
    }));
  }
}

decorate(UserStore, {
  users: observable,
  userList: computed,
  setUsers: action,
  setUser: action
});

export default UserStore;
