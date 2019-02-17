import { observable, action, computed, decorate } from "mobx";

class ColumnsStore {
  columns = new Map();

  constructor(rootStore) {
    this.rootStore = rootStore;
  }

  setColumn = (id, phrases) => {
    this.columns.set(id, phrases);
  };

  deleteColumn = id => {
    this.columns.delete(id);
  };

  get getColumns() {
    return this.columns;
  }
  get countColumns() {
    if (typeof this.columns !== "undefined") return this.columns.size;
    else return 0;
  }
}

decorate(ColumnsStore, {
  columns: observable,
  getColumns: computed,
  countColumns: computed,
  setColumn: action,
  deleteColumn: action
});

export default ColumnsStore;
