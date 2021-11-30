type RecordItem = {
  tags: string[],
  notes: string,
  category: string,
  amount: number,
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

interface Window {
  tagList: Tag[];
  addTag:(name:string)=>void
}