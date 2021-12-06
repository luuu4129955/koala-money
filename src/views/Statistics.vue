<template>
  <Layout>
    <Tabs :data-source="categoryList" class-prefix="category" :value.sync="category"></Tabs>
    <Tabs :data-source="internalList" class-prefix="interval" :value.sync="interval"></Tabs>
    <ol>
      <li v-for="(group,index) in result" :key="index">
        <h3 class="title">{{ group.title }}</h3>
        <ol>
          <li v-for="item in group.items" :key="item.id"
              class="record">
           <span class="tags">{{tagString(item.tags)}}</span>
            <span class="notes">{{item.notes}}</span>
            <span>￥{{ item.amount }}</span>
          </li>
        </ol>
      </li>
    </ol>
  </Layout>
</template>

<script lang="ts">
import Vue from 'vue';
import {Component} from 'vue-property-decorator';
import Tabs from '@/components/Tabs.vue';

@Component({
  components: {Tabs}
})
export default class statistics extends Vue {
  // eslint-disable-next-line no-undef
  tagString(tags:Tag[]){
    return tags.length===0?'无':tags.join(',')
  }
  get recordList() {
    return this.$store.state.recordList;
  }

  get result() {
    const {recordList} = this;
    // eslint-disable-next-line no-undef
    type HashTableValue = { title: string, items: RecordItem[] }
    const hashTable: { [key: string]: HashTableValue } = {};
    for (let i = 0; i < recordList.length; i++) {
      const [date, time] = recordList[i].createdAt.split('T');
      hashTable[date] = hashTable[date] || {title: date, items: []};
      hashTable[date].items.push(recordList[i]);
    }
    return hashTable;
  }

  created() {
    this.$store.commit('fetchRecords');
  }

  category = '-';
  interval = 'day';
  internalList = [
    {text: '按天', value: 'day'},
    {text: '按周', value: 'week'},
    {text: '按月', value: 'mouth'}
  ];
  categoryList = [
    {text: '支出', value: '-'},
    {text: '收入', value: '+'},
  ];
}
</script>

<style lang="scss" scoped>

::v-deep {
  .category-tabs-item {
    background-color: #c4c4c4;

    &.selected {
      background-color: #a2dd9e;

      &::after {
        display: none;
      }
    }
  }

  .interval-tabs {
    .tabs-item {
      font-size: 16px;
      height: 32px;
      padding: 4px 0;
    }
  }
}

%item {
  padding: 8px 16px;
  line-height: 24px;
  display: flex;
  justify-content: space-between;
  align-content: center;
  color: #3C4469;
}

.title {
  background-color: #eeffed;
  @extend %item;
}

.record {
  $fs:14px;
  background-color: #fff;
  font-size: $fs;

  @extend %item;
  .tags{
    white-space: nowrap;
    width: 64px;
    font-weight: bold;
  }
  .notes{
    margin-right: auto;
    margin-left: 16px;
  }
}
</style>