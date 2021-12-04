<template>
  <div>
    <Layout class-prefix="layout">
      {{ record }}
      <Tags :data-source.sync="record.tags" @update:value="ouUpdateTags"/>
      <FormItem @update:value="ouUpdateNotes" placeholder="请在这里添加备注">备注</FormItem>
      <Tabs :value.sync="record.category" :data-source="categoryList" class-prefix="money"/>
      <Board @update:value="onUpdateAmount" @submit="saveRecord"/>
    </Layout>
  </div>

</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';

import Board from '@/components/Money/Board.vue';
import Category from '@/components/Money/Category.vue';
import Tags from '@/components/Money/Tags.vue';
import FormItem from '@/components/Money/FormItem.vue';
import Tabs from '@/components/Tabs.vue';


@Component({
  components: {Tabs, FormItem, Tags, Category, Board},
  computed: {
    recordList() {
      return this.$store.state.recordList;
    }
  }
})
export default class Money extends Vue {
  // eslint-disable-next-line no-undef
  record: RecordItem = {tags: [], notes: '', category: '-', amount: '0', createdAt: new Date(2000, 1, 1)};
  categoryList = [
    {text: '支出', value: '-'},
    {text: '收入', value: '+'},
  ];


  created() {
    this.$store.commit('fetchRecords');
  }

  ouUpdateTags(value: string) {
    this.record.tags.push(value);
  }

  ouUpdateNotes(value: string) {
    this.record.notes = value;
  }

  onUpdateAmount(value: string) {
    this.record.amount = value;
  }

  saveRecord() {
    this.$store.commit('createRecord', this.record);
  }
}
</script>

<style lang="scss">
@import "~@/assets/style/helper.scss";

.layout-content {
  display: flex;
  flex-direction: column;
}

::v-deep .money-tabs-item{
  &.selected::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 4px;
    background: #120142;
  }
}
</style>
<style lang="scss" scoped>
</style>