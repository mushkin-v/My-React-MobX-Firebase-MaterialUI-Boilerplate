import { observable, action, computed, decorate } from "mobx";

class ColumnsStore {
  columns = new Map();

  constructor(rootStore) {
    this.rootStore = rootStore;
  }

  setColumn = (id, data) => {
    this.columns.set(id, data);
  };

  reset = () => {
    this.columns.clear();
  };

  deleteColumn = id => {
    this.columns.delete(id);
  };

  get getColumns() {
    return this.columns;
  }
  get countColumns() {
    return this.columns ? this.columns.size : 0;
  }

  get lastOrderValue() {
    if (this.columns && this.columns.values().length > 0)
      return Array.from(this.columns.values()).pop().order;
    else return 0;
  }
}

decorate(ColumnsStore, {
  columns: observable,
  getColumns: computed,
  countColumns: computed,
  lastOrderValue: computed,
  setColumn: action,
  deleteColumn: action
});

export default ColumnsStore;
