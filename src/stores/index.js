import SessionStore from "./sessionStore";
import UserStore from "./userStore";
import ColumnsStore from "./columnsStore";

class RootStore {
  constructor() {
    this.sessionStore = new SessionStore(this);
    this.userStore = new UserStore(this);
    this.columnsStore = new ColumnsStore(this);
  }
}

const rootStore = new RootStore();

export default rootStore;
