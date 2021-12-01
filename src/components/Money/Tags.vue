<template>
  <div class="tags">
    <div class="tags-list">
      <ul>
        <li v-for="tag in tags " :key="tag"
            :class="{selected:selectedTags.indexOf(tag.name)>=0}"
            @click="toggle(tag.name)">{{ tag.name }}
        </li>
      </ul>
    </div>
    <button @click="add" class="tags-add">新增标签</button>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import {Component} from 'vue-property-decorator';


@Component({
  computed:{
    tagList(){
      //TODO
      return []
    }
  }
})
export default class Tags extends Vue {
  selectedTags: string[] = [];
  tags = this.$store.tagList;


  toggle(tag: string) {
    const index = this.selectedTags.indexOf(tag);
    if (index >= 0) {
      this.selectedTags.splice(index, 1);
    } else {
      this.selectedTags.push(tag);
    }
    this.$emit('update:value', this.selectedTags);
  }

  add() {
    const name = window.prompt('请输入标签名');
    if (!name) {return window.alert('标签名不能为空');}
    //TODO
    // store.addTag(name);
  }

}
</script>


<style lang="scss" scoped>
.tags {
  flex-grow: 1;
  overflow: auto;
  background-color: #fff;

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