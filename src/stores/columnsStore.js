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
  get countColumns() {
    return this.columns.size;
  }
}

decorate(ColumnsStore, {
  columns: observable,
  getColumns: computed,
  countColumns: computed,
  setColumns: action
});

export default ColumnsStore;
