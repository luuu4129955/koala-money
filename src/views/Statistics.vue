<template>
  <Layout>
    <Tabs :data-source="categoryList" class-prefix="category" :value.sync="category"></Tabs>
    <div class="message" v-if="noCost()">添加你的第一笔支出~
      <Icon name="arrow"></Icon>
    </div>
    <div class="message" v-if="noIncome()">添加你的第一笔收入~
      <Icon name="arrow"></Icon>
    </div>
    <ol>
      <li v-for="(group,index) in groupedList" :key="index">
        <h3 class="title">{{ beautify(group.title) }}<span>{{ group.total }}</span></h3>
        <ol>
          <li v-for="item in group.items" :key="item.id"
              class="record">
            <span class="tag">
              {{ item.tag.name }}</span>
            <span class="notes">{{ item.notes }}</span>
            <span>￥{{ item.amount }}</span>
            <span class="delete" @click="xxx">删除</span>
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
  category = '-';
  categoryList = [
    {text: '支出', value: '-'},
    {text: '收入', value: '+'},
  ];

  created() {
    this.$store.commit('fetchRecords');
  }

  noCost() {
    if (this.category === '-') {
      if (this.recordList.filter((item: { category: string; }) => item.category === '-').length === 0)
        return true;
    }
  }

  noIncome() {
    if (this.category === '+') {
      if (this.recordList.filter((item: { category: string; }) => item.category === '+').length === 0)
        return true;
    }
  }

  xxx() {
    console.log('执行了');
    console.log(this.recordList);
    if (this.recordList) {
      this.$store.commit('removeRecord', this.recordList.id);
    }
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
        .filter((r: { category: string; }) => r.category === this.category)
        .sort((a: { createdAt: string | number | Date | dayjs.Dayjs | null | undefined; },
               b: { createdAt: string | number | Date | dayjs.Dayjs | null | undefined; }) => dayjs(b.createdAt).valueOf() - dayjs(a.createdAt).valueOf());
    if (newList.length === 0) {
      return [];
    }
    // eslint-disable-next-line no-undef
    type Result = { title: string, total?: number, items: RecordItem[] }[];
    const result: Result = [{title: dayjs(newList[0].createdAt).format('YYYY-MM-DD'), items: [newList[0]]}];
    for (let i = 1; i < newList.length; i++) {
      const current = newList[i];
      const last = result[result.length - 1];
      if (dayjs(last.title).isSame(dayjs(current.createdAt), 'day')) {
        last.items.push(current);
      } else {
        result.push({title: dayjs(current.createdAt).format('YYYY-MM-DD'), items: [current]});
      }
    }
    result.forEach(group => {
      group.total = group.items.reduce((sum, item) => parseFloat(sum + item.amount), 0);
    });
    return result;
  }
}
</script>

<style lang="scss" scoped>
@keyframes shakeY {
  20%, 40%, 60% {
    transform: translateY(10px);
  }
}

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
  border-bottom: 1px solid #e3dfdf;
  font-size: $fs;

  @extend %item;

  .tag {
    white-space: nowrap;
    width: 64px;
    font-weight: bold;
  }

  .notes {
    margin-right: auto;
    margin-left: 16px;
  }

  .delete {
    color: red;
  }
}


</style>