type RecordItem = {
  tag: Tag,
  notes: string,
  category: string,
  amount: string,
  createdAt: string,
}
type Tag = {
  id: string,
  name: string
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


