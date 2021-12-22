import clone from '@/lib/clone';

const localStorageKeyName = 'recordList';
const recordStore = {
  recordList: [] as RecordItem[],
  fetchRecords() {
    this.recordList = JSON.parse(window.localStorage.getItem(localStorageKeyName) || '[]') as RecordItem[];
    return this.recordList;
  },
  saveRecords() {
    window.localStorage.setItem(localStorageKeyName, JSON.stringify(this.recordList));
  },
  removeRecord(id:string){
    let index = -1;
    for (let i = 0; i < this.recordList.length; i++) {
      if (this.recordList[i].id === id) {
        index = i;
        break;
      }
    }
    this.recordList.splice(index, 1);
    this.saveRecords();
    return true;
  },
  createRecord(record: RecordItem) {
    const record2: RecordItem = clone(record);
    record2.createdAt = new Date().toISOString();
    this.recordList && this.recordList.push(record2);
    recordStore.saveRecords();
  },
};

recordStore.fetchRecords();

export default recordStore;
