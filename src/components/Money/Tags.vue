<template>
  <div class="tags">
    <div class="tags-list">
      <ul>
        <li v-for="tag in defaultTags" :key="tag.id"
            @click="select(tag)"
            :class="tag.name===selectTag&&'selected'">
          <Icon :name="tag.id"></Icon>
          <span>{{ tag.name }}</span>
        </li>
        <li v-for="tag in createTagList" :key="tag.id"
            @click="select(tag)"
            :class="tag.name===selectTag&&'selected'"
        >
          <Icon name="myCreate"></Icon>
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
import {Component, Prop} from 'vue-property-decorator';
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
  @Prop(String) selectTag!: string;
  defaultTags = defaultTags;

  created() {
    this.$store.commit('fetchTags');
  }
  // eslint-disable-next-line no-undef
  select(item: string) {
    this.$emit('update:selectTag', item.name);
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
    width: 56px;
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
      border-radius: 50%;
      background-color: #eeffed;
      &:active {
        transform: translateY(4px);
        box-shadow: 0 2px #a2dd9e;
      }
      .icon {
        fill: #a2dd9e;
      }
      span {
        color: #a2dd9e;
      }
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