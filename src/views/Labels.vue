<template>
  <div>
    <Layout>
      <div class="tags-list">
        <ul>
          <li v-for="tag in tags" :key="tag">
            <span>{{ tag }}</span>
            <Icon name="rightArrow"/>
          </li>
        </ul>
      </div>
      <div class="tag-add" @click="addTag">新增标签</div>
    </Layout>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import {Component} from 'vue-property-decorator';
import tagListModel from '@/models/tagListModel';

tagListModel.fetch;
@Component
export default class Labels extends Vue {
  tags = tagListModel.data;

  addTag(): () => void {
    const name = window.prompt('请输入标签名');
    if (name) {
      const message = tagListModel.add(name);
      if (message==='duplicated'){
        window.alert('标签名重复')
      }else if (message==='success'){
        return
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~@/assets/style/helper.scss";

$f: 18px;
.tags-list{
  background-color: #fff;

  li {
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid #e0e0e0;
    margin: 0 $f;
    padding: $f/2 $f;

    span {
      font-size: $f;
      font-family: $font-family;
      color: #a1dd9d;

    }

    .icon {
      width: $f;
      height: $f;
      fill: #a1dd9d
    }
  }
}


.tag-add {
  text-align: center;
  margin: 64px $f 0 $f;
  padding: $f/2 $f;
  background-color: #ffb850;
  color: #fff;
  border-radius: 8px;
  letter-spacing: 6px;
  font-family: $font-family;
}
</style>