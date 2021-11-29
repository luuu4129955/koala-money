<template>
  <div>
    <ul class="category">
      <li :class="category==='-'&&'selected'"
          @click="selectCategory('-')">支出
      </li>
      <li :class="category==='+'&&'selected'"
          @click="selectCategory('+')">收入
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import {Component, Prop} from 'vue-property-decorator';

@Component
export default class Category extends Vue {
  @Prop() readonly category!: string;

  selectCategory(category: string) {
    if (category !== '-' && category !== '+') {
      throw new Error('category is unknown');
    }
    this.$emit('update:value',category)
  }

}

</script>

<style lang="scss" scoped>
.category {
  display: flex;
  flex-direction: row;
  justify-content: space-around;

  li {
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
      background: #120142;
    }
  }
}
</style>