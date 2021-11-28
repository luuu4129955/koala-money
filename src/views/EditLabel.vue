<template>
  <Layout>
    <div class="topNav">
      <router-link to="/labels">
        <Icon name="leftArrow"></Icon>
      </router-link>
      <span>编辑标签</span>
      <span></span>
    </div>
    <FormItem placeholder="" :value="tag.name"
              @update:value="update">标签名
    </FormItem>
    <Button class="remove" @click="remove">删除标签</Button>
  </Layout>
</template>

<script lang="ts">
import Vue from 'vue';
import {Component} from 'vue-property-decorator';
import FormItem from '@/components/Money/FormItem.vue';
import Button from '@/components/Money/Button.vue';
import tagListModel from '@/models/tagListModel';

@Component({
  components: {Button, FormItem}
})
export default class EditLabel extends Vue {
  tag?: { id: string, name: string } = undefined;

  created() {
    const id = this.$route.params.id;
    tagListModel.fetch;
    const tags = tagListModel.data;
    const tag = tags.filter(t => t.id.toString() === id)[0];
    if (tag) {
      this.tag = tag;
    } else {
      this.$route.replace('/404');
    }
  }

  remove() {
    if (this.tag) {
      tagListModel.remove(this.tag.id, name);
    }
  }

  update(name: string) {
    if (this.tag) {
      tagListModel.update(this.tag.id, name);
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

.notes {
  background-color: #fff;
}

.remove {
  background-color: #f76361;
  color: #fff;
}
</style>