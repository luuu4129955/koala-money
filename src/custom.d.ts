type RecordItem = {
  tags: string[],
  notes: string,
  category: string,
  amount: string,
  createdAt: Date,
}
type Tag = {
  id: string,
  name: string
}
type TagListModel = {
  data: Tag[],
  fetch: () => Tag[],
  save: () => void,
  add: (name: string) => 'success' | 'duplicated'//联合类型 是字符串的子类型
  update: (id: string, name: string) => 'success' | 'not found' | 'duplicated'
  remove: (id: string) => boolean
}
type Store= {
  tagList: Tag[];
  addTag: (name: string) => void;
  findTag: (id: string) => Tag;
  removeTag: (id: string) => boolean;
  updateTag: (id: string, name: string) => 'success' | 'not found' | 'duplicated';
  recordList: RecordItem[];
  createRecord: (record: RecordItem) => void
};


