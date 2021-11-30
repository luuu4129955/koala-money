<template>
  <div>
    <Layout class-prefix="layout">
{{record}}
      <Tags :data-source.sync="tags" @update:value="ouUpdateTags"/>
      <FormItem @update:value="ouUpdateNotes" placeholder="请在这里添加备注">备注</FormItem>
      <Category :value.sync="record.category"/>
      <Board @update:value="onUpdateAmount" @submit="saveRecord"/>
    </Layout>
  </div>

</template>

<script lang="ts">
import {Component, Vue, Watch} from 'vue-property-decorator';

import Board from '@/components/Money/Board.vue';
import Category from '@/components/Money/Category.vue';
import Tags from '@/components/Money/Tags.vue';
import FormItem from '@/components/Money/FormItem.vue';
import recordListModel from '@/models/recordListModel';

const recordList = recordListModel.fetch();


@Component({
  components: {FormItem, Tags,  Category, Board}
})
export default class Money extends Vue {

  // eslint-disable-next-line no-undef
  recordList: RecordItem[] = recordList;
  // eslint-disable-next-line no-undef
  record: RecordItem = {tags: [], notes: '', category: '-', amount: 0};

  ouUpdateTags(value: string[]) :()=>void{
    this.record.tags = value;
  }

  ouUpdateNotes(value: string):()=>void {
    this.record.notes = value;
  }

  onUpdateAmount(value: string) :()=>void{
    this.record.amount = value;
  }

  saveRecord():()=>void {
    recordListModel.create(this.record)
  }

  @Watch('recordList')
  onRecordListChange():()=>void {
    recordListModel.save(this.recordList);
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