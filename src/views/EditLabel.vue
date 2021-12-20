<template>
  <Layout>
    <div class="topNav">
      <router-link to="/labels">
        <Icon name="leftArrow"></Icon>
      </router-link>
      <span>编辑标签</span>
      <span></span>
    </div>
    <FormItem ref="newTag" :placeholder="tag.name" :value="tag.name"
    >标签名
    </FormItem>
    <Button class="confirm" @click="update($refs.newTag.value)">确认修改</Button>
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
  get tag() {
    return this.$store.state.currentTag;
  }

  created() {
    const id = this.$route.params.id;
    this.$store.commit('fetchTags');
    this.$store.commit('setCurrentTag', id);
    if (!this.tag) {
      this.$router.replace('/404');
    }
  }

  update(name: string) {
    if (this.tag) {
      if (!name) {
        return window.alert('标签名不能为空！');
      } else if (name.length > 4) {
        return window.alert('标签名最长4个字符！');
      }
      this.$store.commit('updateTag', {id: this.tag.id, name});
      this.$router.replace('/labels');
    }
  }

  remove() {
    if (this.tag) {
      this.$store.commit('removeTag', this.tag.id);
      this.$router.replace('/labels');
    }
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

.FormItem {
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