<template>
  <ul class="tabs" :class="{[classPrefix+'-tabs']:classPrefix}">
    <li v-for="item in dataSource" :key="item.value"
        :class="liClass(item)" @click="select(item)"
        class="tabs-item">
      {{ item.text }}
    </li>
  </ul>
</template>

<script lang="ts">
import Vue from 'vue';
import {Component, Prop} from 'vue-property-decorator';

type DataSourceItem = { text: string, value: string }

@Component
export default class Tabs extends Vue {
  @Prop({required: true, type: Array})
  dataSource!: { text: string, value: string }[];
  @Prop(String) readonly value!: string;
  @Prop(String) classPrefix?: string;

  liClass(item: DataSourceItem) {
    return {
      [this.classPrefix + '-tabs-item']: this.classPrefix,
      selected: item.value === this.value,
    };
  }

  select(item: DataSourceItem) {
    this.$emit('update:value', item.value);
  }
}
</script>

<style lang="scss" scoped>
.tabs {
  display: flex;
  flex-direction: row;
  justify-content: space-around;

  &-item {
    width: 100%;
    padding: 12px 0;
    text-align: center;
    background-color: #a2dd9e;
    color: #fff;
    font-size: 20px;
    position: relative;

    &.selected::after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 4px;
      background: #6e72a4;
    }
  }
}

</style>