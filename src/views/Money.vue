<template>
  <div>
    <Layout class-prefix="layout">
      <Tags :selectTag.sync="record.tag.name" />
      <FormItem @update:value="ouUpdateNotes" placeholder="在这里添加备注~">
        <Icon name="notes"></Icon>
      </FormItem>
      <Tabs :value.sync="record.category" :data-source="categoryList" class-prefix="money"/>
      <Board @update:value="onUpdateAmount" @submit="saveRecord"/>
    </Layout>
  </div>

</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';

import Board from '@/components/Money/Board.vue';
import Tags from '@/components/Money/Tags.vue';
import FormItem from '@/components/Money/FormItem.vue';
import Tabs from '@/components/Tabs.vue';

@Component({
  components: {Tabs, FormItem, Tags, Board},
  computed: {
    recordList() {
      return this.$store.state.recordList;
    }
  }
})
export default class Money extends Vue {
  // eslint-disable-next-line no-undef
  record: RecordItem = {
    id:'',
    tag: {id: 'foods', name: '餐饮'},
    notes: '',
    category: '-',
    amount: '0',
    createdAt: ''
  };

  categoryList = [
    {text: '支出', value: '-'},
    {text: '收入', value: '+'},
  ];


  created() {
    this.$store.commit('fetchRecords');
    this.$store.commit('fetchTags');
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

::v-deep .money-tabs {
  background-color: #c4c4c4;

  .tabs.items.selected {
    background-color: #a2dd9e;

    &::after {
      display: none;
    }
  }
}
</style>
<style lang="scss" scoped>
</style>