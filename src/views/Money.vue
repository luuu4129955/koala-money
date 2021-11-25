<template>
  <div>
    <Layout class-prefix="layout">
      {{record}}
      <Tags :data-source.sync="tags" @update:value="ouUpdateTags"/>
      <Notes @update:value="ouUpdateNotes"/>
      <Category :value.sync="record.category" />
      <Board @update:value="onUpdateAmount" @submit="saveRecord"/>
    </Layout>
  </div>

</template>

<script lang="ts">
import {Component, Vue, Watch} from 'vue-property-decorator';

import Board from '@/components/Money/Board.vue';
import Category from '@/components/Money/Category.vue';
import Notes from '@/components/Money/Notes.vue';
import Tags from '@/components/Money/Tags.vue';

type Record = {
  tags: string[],
  notes: string,
  category: string,
  amount: number
  createdAt:Date
}

@Component({
  components: {Tags, Notes, Category, Board}
})
export default class Money extends Vue {
  tags = ['衣', '食', '住'];
  recordList:Record[]=[];
  record: Record = {tags: [], notes: '', category: '-', amount: 0};

  ouUpdateTags(value: string[]) {
    this.record.tags=value
  }

  ouUpdateNotes(value: string) {
    this.record.notes=value
  }

  onUpdateAmount(value: string) {
    this.record.amount=value
  }
  saveRecord(){
    const record2:Record=JSON.parse(JSON.stringify(this.record))
    record2.createdAt=new Date()
    this.recordList.push(record2)
  }
  @Watch('recordList')
  onRecordListChange(){
    window.localStorage.setItem('recordList',JSON.stringify(this.recordList))
  }
}
</script>

<style lang="scss">
@import "~@/assets/style/helper.scss";

.layout-content {
  display: flex;
  flex-direction: column;
}
</style>
<style lang="scss" scoped>
</style>