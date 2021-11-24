<template>
  <div class="tags">
    <div class="tags-list">
      <ul>
        <li v-for="tag in dataSource " :key="tag"
            :class="{selected:selectedTags.indexOf(tag)>=0}"
            @click="toggle(tag)">{{ tag }}
        </li>
      </ul>
    </div>
    <button @click="create" class="tags-add">新增标签</button>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import {Component, Prop} from 'vue-property-decorator';

@Component
export default class Tags extends Vue {
  @Prop() readonly dataSource: string[] | undefined;
  selectedTags: string[] = [];

  toggle(tag: string) {
    const index = this.selectedTags.indexOf(tag);
    if (index >= 0) {
      this.selectedTags.splice(index, 1);
    } else {
      this.selectedTags.push(tag);
    }
    this.$emit('update:value',this.selectedTags)
  }

  create() {
    const name = window.prompt('请输入标签');
    if (name === '') {
      window.alert('标签名不能为空');
    } else if (this.dataSource) {
      this.$emit('update:dataSource', [...this.dataSource, name]);
    }
  }

}
</script>


<style lang="scss" scoped>
.tags {
  flex-grow: 1;
  overflow: auto;

  li {
    display: inline-block;
    padding: 0 10px;
    background-color: #eeffed;
    color: #01063D;
    height: 24px;
    line-height: 24px;
    font-size: 14px;
    margin: 4px;
    border-radius: 10px;

    &.selected {
      background-color: #a2dd9e;
      color: #ffffff;
    }
  }

  .tags-add {
    color: #999;
    font-size: 14px;
    padding: 10px;
    text-decoration: underline #333;

  }
}

</style>