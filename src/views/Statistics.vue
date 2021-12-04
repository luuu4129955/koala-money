<template>
  <Layout>
    <Tabs :data-source="categoryList" class-prefix="category" :value.sync="category"></Tabs>
    <Tabs :data-source="internalList" class-prefix="interval" :value.sync="interval"></Tabs>
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
::v-deep .category-tabs-item {
  background-color: #c4c4c4;

  &.selected {
    background-color: #a2dd9e;

    &::after {
      display: none;
    }
  }
}

::v-deep .interval-tabs {
  .tabs-item{
    font-size: 16px;
    height: 32px;
    padding: 4px 0;
  }
}
</style>