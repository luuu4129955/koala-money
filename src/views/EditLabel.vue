<template>
  <Layout>
    <div class="topNav">
      <router-link to="/labels">
        <Icon name="leftArrow"></Icon>
      </router-link>
      <span>编辑标签</span>
      <span></span>
    </div>
    <FormItem :placeholder="tag.name" :value="tag.name"
              @update:value="update"
    >标签名
    </FormItem>

    <Button class="confirm" @click="xxx">确认修改</Button>
    <Button class="remove" @click="remove">删除标签</Button>
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
  tag=window.findTag(this.$route.params.id);


  created() {
    if (!this.tag) {
      this.$route.replace('/404');
    }
  }

  remove() {
    if (this.tag) {
      if (window.removeTag(this.tag.id)){
        this.$router.push({path:'/labels'})
      }else{
        window.alert('删除失败')
      }
    }
  }

  update(name: string) {
    if (this.tag) {
      window.updateTag(this.tag.id,name)
    }
  }

  xxx(value: string) {
    console.log(value);
  }

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

  .icon {
    width: 20px;
    height: 20px;
    fill: #fff;
  }

}

.notes {
  background-color: #fff;
}

.confirm {
  background-color: #a2dd9e;
  color: #fff;
}

.remove {
  background-color: #f76361;
  color: #fff;
  margin-top: 10px;
}
</style>