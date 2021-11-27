<template>
  <Layout>
    <div class="topNav">
      <Icon name="leftArrow"></Icon>
      <span>编辑标签</span>
      <span></span>
    </div>
    <FormItem placeholder="">标签名</FormItem>
    <Button class="remove">删除标签</Button>
  </Layout>
</template>

<script lang="ts">
import Vue from 'vue';
import {Component} from 'vue-property-decorator';
import FormItem from '@/components/Money/FormItem.vue';
import Button from '@/components/Money/Button.vue';

@Component({
  components: {Button, FormItem}
})
export default class EditLabel extends Vue {

}
</script>

<style lang="scss" scoped>
.topNav {
  display: flex;
  justify-content: space-between;
  background-color: #a2dd9e;
  font-size: 18px;
  color: #fff;
  padding: 20px 18px;
  text-align: center;
  align-items: center;

  .icon {
    width: 20px;
    height: 20px;
    fill: #fff;
  }

}
.notes{
  background-color: #fff;
}
.remove{
  background-color: #f76361;
  color: #fff;
}
</style>