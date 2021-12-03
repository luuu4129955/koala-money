<template>
  <Layout>
    <Tabs :data-source="array2" class-prefix="category" :value.sync="yyy" ></Tabs>
    <Tabs :data-source="array" class-prefix="interval" :value.sync="hhh"></Tabs>
  </Layout>
</template>

<script lang="ts">
import Category from '@/components/Money/Category.vue';
import Vue from 'vue';
import {Component} from 'vue-property-decorator';
import Tabs from '@/components/Tabs.vue';

@Component({
  components: {Tabs, Category}
})
export default class statistics extends Vue {
  yyy = '-';
  hhh='day'
  array = [
    {text: '按天', value: 'day'},
    {text: '按周', value: 'week'},
    {text: '按月', value: 'mouth'}
  ];
  array2=[
    {text:'支出',value:'-'},
    {text:'收入',value:'+'},
  ]
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
</style>