<template>
  <div>
    <Layout class-prefix="layout">
      <Tags :data-source.sync="tags"/>
      <Notes/>
      <Category/>
      <Output/>
      <Board/>
    </Layout>
  </div>

</template>

<script lang="js">
import Board from '@/components/Money/Board.vue';
import Category from '@/components/Money/Category.vue';
import Notes from '@/components/Money/Notes.vue';
import Tags from '@/components/Money/Tags.vue';

export default {
  name: 'Money',
  components: {Tags, Notes, Category, Board},
  data() {
    return {tags: ['衣', '食', '住']}
  }

};
</script>

<style lang="scss">
@import "~@/assets/style/helper.scss";

.layout-content {
  display: flex;
  flex-direction: column;
}
</style>
<style lang="scss" scoped>
</style>