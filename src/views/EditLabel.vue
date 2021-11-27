<template>
  <Layout>
    <div class="topNav">
      <Icon name="leftArrow"></Icon>
      <span>编辑标签</span>
      <span></span>
    </div>
    <notes></notes>
  </Layout>
</template>

<script lang="ts">
import Vue from 'vue';
import {Component} from 'vue-property-decorator';
import Notes from '@/components/Money/Notes.vue';
@Component({
  components: {Notes}
})
export default class EditLabel extends Vue {

}
</script>

<style lang="scss" scoped>
.topNav{
  display: flex;
  justify-content: space-between;
  background-color: #a2dd9e;
  font-size: 18px;
  color: #fff;
  padding: 20px 18px;
  text-align: center;
  align-items: center;
  .icon{
    width: 20px;
    height: 20px;
    fill: #fff;
  }

}
</style>