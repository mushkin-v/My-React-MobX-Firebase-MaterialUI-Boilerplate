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
    return this.columns.size;
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
