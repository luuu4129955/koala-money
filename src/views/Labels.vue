<template>
  <div>
    <Layout>
      <div class="topNav">编辑自定义标签</div>
      <div class="tags-list">
        <router-link class="tag"
                     v-for="tag in tags" :key="tag.name"
                     :to="`/labels/edit/${tag.id}`"
        >
          <span>{{ tag.name }}</span>
          <Icon name="edit"/>
        </router-link>

      </div>
      <Button class="tag-add" @click="createTag">新增标签</Button>
    </Layout>
  </div>
</template>

<script lang="ts">
import {Component} from 'vue-property-decorator';
import Button from '@/components/Money/Button.vue';
import TagHelper from '@/mixins/TagHelper';
import {mixins} from 'vue-class-component';

@Component({
  components: {Button},

  computed: {
    tags() {
      return this.$store.state.tagList;
    }
  }
})
export default class Labels extends mixins(TagHelper) {
  created() {
    this.$store.commit('fetchTags');
  }
}
</script>

<style lang="scss" scoped>
@import "~@/assets/style/helper.scss";

$f: 16px;
.tags-list {
  background-color: #fff;

  .tag {
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
  background-color: #ffb850;
  color: #fff;
}
.topNav{
  background-color:#a1dd9d;
  color: #fff;
  padding: 12px 0;
  font-size: 20px;
  text-align: center;
}
</style>