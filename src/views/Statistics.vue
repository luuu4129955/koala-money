<template>
  <Layout>
    <Tabs :data-source="categoryList" class-prefix="category" :value.sync="category"></Tabs>
    <Message :text="`添加你的第一笔支出~`" :no-record="noRecord('-')"></Message>
    <Message :text="`添加你的第一笔收入~`" :no-record="noRecord('+')"></Message>
    <ol class="recordList">
      <li v-for="(group,index) in groupedList" :key="index">
        <h3 class="title">{{ beautify(group.title) }}<span>{{ group.total }}</span></h3>
        <ol>
          <li v-for="item in group.items" :key="item.id" class="record">
            <Icon :name="isNaN(parseInt(item.tag.id))?item.tag.id:'myCreate'"></Icon>
            <span class="tag">{{ item.tag.name }}</span>
            <span class="notes">{{ item.notes }}</span>
            <span>￥{{ item.amount }}</span>
            <span class="delete" @click="remove">删除</span>
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
import Message from '@/components/Message.vue';

@Component({
  components: {Message, Tabs}
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

  noRecord(string: string) {
    if (this.category === string) {
      if (this.recordList.filter((item: { category: string; }) => item.category === string).length === 0)
        return true;
    }
  }

  remove() {
    console.log('执行了');
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
  .category-tabs {
    position: absolute;
    top: 0;
    width: 100%;

    &-item {
      background-color: #c4c4c4;

      &.selected {
        background-color: #a2dd9e;

        &::after {
          display: none;
        }
      }
    }
  }

}

.recordList {
  margin-top: 50.4px;
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

  .icon {
    width: 20px;
    fill: #3C4469;
    margin-right: 16px;
  }

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