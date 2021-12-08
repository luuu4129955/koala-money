<template>
  <div class="tags">
    <div class="tags-list">
      <ul>
        <li>
          <Icon name="foods"></Icon>
          <span>餐饮</span>
        </li>
        <li>
          <Icon name="athletics"></Icon>
          <span>运动</span>
        </li>
        <li>
          <Icon name="clothes"></Icon>
          <span>服饰</span>
        </li>
        <li>
          <Icon name="digital"></Icon>
          <span>数码</span>
        </li>
        <li>
          <Icon name="donate"></Icon>
          <span>捐赠</span>
        </li>
        <li>
          <Icon name="education"></Icon>
          <span>教育</span>
        </li>
        <li>
          <Icon name="entertainment"></Icon>
          <span>娱乐</span>
        </li>
        <li>
          <Icon name="games"></Icon>
          <span>游戏</span>
        </li>
        <li>
          <Icon name="home"></Icon>
          <span>家居</span>
        </li>
        <li>
          <Icon name="makeup"></Icon>
          <span>美妆</span>
        </li>
        <li>
          <Icon name="medical"></Icon>
          <span>医疗</span>
        </li>
        <li>
          <Icon name="objects"></Icon>
          <span>日用品</span>
        </li>
        <li>
          <Icon name="pets"></Icon>
          <span>宠物</span>
        </li>
        <li>
          <Icon name="shopping"></Icon>
          <span>购物</span>
        </li>
        <li>
          <Icon name="social"></Icon>
          <span>社交</span>
        </li>
        <li>
          <Icon name="traffic"></Icon>
          <span>交通</span>
        </li>
        <li>
          <Icon name="others"></Icon>
          <span>其他</span>
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


@Component({
  computed: {
    tagList() {
      return this.$store.state.tagList;
    }
  }
})
export default class Tags extends mixins(TagHelper) {
  selectedTags: string[] = [];

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