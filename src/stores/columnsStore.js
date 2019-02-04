import { observable, action, computed, decorate } from "mobx";

class ColumnsStore {
  columns = new Map();

  constructor(rootStore) {
    this.rootStore = rootStore;
  }

  setColumns = (id, phrases) => {
    this.columns.set(id, phrases);
  };

  get getColumns() {
    return this.columns;
  }
}

decorate(ColumnsStore, {
  columns: observable,
  getColumns: computed,
  setColumns: action
});

export default ColumnsStore;
