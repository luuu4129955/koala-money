<template>
  <div class="tags">
    <div class="tags-list">
      <ul>
        <li v-for="tag in defaultTags" :key="tag.id">
          <Icon :name="tag.id"></Icon>
          <span>{{ tag.name }}</span>
        </li>
        <li @click="createTag">
          <Icon name="add"></Icon>
          <span>自定义</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import {Component} from 'vue-property-decorator';
import {mixins} from 'vue-class-component';
import TagHelper from '@/mixins/TagHelper';
import defaultTags from '@/lib/constant';


@Component({
  computed: {
    createTagList() {
      return this.$store.state.tagList;
    }
  }
})
export default class Tags extends mixins(TagHelper) {
  selectedTags: string[] = [];
  defaultTags = defaultTags;

  created() {
    this.$store.commit('fetchTags');
  }

  toggle(tag: string) {
    const index = this.selectedTags.indexOf(tag);
    if (index >= 0) {
      this.selectedTags.splice(index, 1);
    } else {
      this.selectedTags.push(tag);
    }
    this.$emit('update:value', this.selectedTags);
  }
}
</script>


<style lang="scss" scoped>
.tags {
  flex-grow: 1;
  overflow: auto;
  background-color: #fff;
  padding: 4px;

  li {
    display: inline-flex;
    flex-direction: column;
    width: 64px;
    margin: 1px;

    .icon {
      padding: 8px;
      margin: 0 auto;
      fill: #888;
    }

    span {
      color: #888;
      height: 24px;
      line-height: 24px;
      font-size: 12px;
      text-align: center;
    }

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