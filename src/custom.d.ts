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
type Store= {
  tagList: Tag[];
  addTag: (name: string) => void;
  findTag: (id: string) => Tag;
  removeTag: (id: string) => boolean;
  updateTag: (id: string, name: string) => 'success' | 'not found' | 'duplicated';
  recordList: RecordItem[];
  createRecord: (record: RecordItem) => void
};


