<template>
  <Layout>
    <Tabs :data-source="categoryList" class-prefix="category" :value.sync="category"></Tabs>
    <ol>
      <li v-for="(group,index) in groupedList" :key="index">
        <h3 class="title">{{ beautify(group.title) }}<span>{{group.total}}</span></h3>
        <ol>
          <li v-for="item in group.items" :key="item.id"
              class="record">
            <span class="tags">{{ tagString(item.tags) }}</span>
            <span class="notes">{{ item.notes }}</span>
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
import dayjs from 'dayjs';
import clone from '@/lib/clone';

@Component({
  components: {Tabs}
})
export default class statistics extends Vue {
  tagString(tags: Tag[]) {
    return tags.length === 0 ? '无' : tags.join(',');
  }

  beautify(string: string) {
    const day = dayjs(string);
    const now = dayjs();
    if (day.isSame(now, 'day')) {
      return '今天';
    } else if (day.isSame(now.subtract(1, 'day'), 'day')) {
      return '昨天';
    } else if (day.isSame(now.subtract(2, 'day'), 'day')) {
      return '前天';
    } else if (day.isSame(now, 'year')) {
      return day.format('MM月D日');
    } else {
      return day.format('YYYY年MM月D日');
    }
  }

  get recordList() {
    return this.$store.state.recordList;
  }

  get groupedList() {
    const {recordList} = this;
    if (recordList.length === 0) {
      return [];
    }
    const newList = clone(recordList)
        .filter(r => r.category === this.category)
        .sort((a, b) => dayjs(b.createdAt).valueOf() - dayjs(a.createdAt).valueOf());
    // eslint-disable-next-line no-undef
    type Result={title:string,total?:number,items:RecordItem[]}[];
    const result:Result = [{title: dayjs(newList[0].createdAt).format('YYYY-MM-DD'), items: [newList[0]]}];
    for (let i = 1; i < newList.length; i++) {
      const current = newList[i];
      const last = result[result.length - 1];
      if (dayjs(last.title).isSame(dayjs(current.createdAt), 'day')) {
        last.items.push(current);
      } else {
        result.push({title: dayjs(current.createdAt).format('YYYY-MM-DD'), items: [current]});
      }
    }
result.forEach(group=>{
  group.total=group.items.reduce((sum,item)=>sum+item.amount,0)
})
    return result;
  }

  created() {
    this.$store.commit('fetchRecords');
  }

  category = '-';
  interval = 'day';
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
  $fs: 14px;
  background-color: #fff;
  font-size: $fs;

  @extend %item;

  .tags {
    white-space: nowrap;
    width: 64px;
    font-weight: bold;
  }

  .notes {
    margin-right: auto;
    margin-left: 16px;
  }
}
</style>