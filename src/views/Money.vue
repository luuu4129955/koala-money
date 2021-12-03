<template>
  <div>
    <Layout class-prefix="layout">
      {{ record }}
      <Tags :data-source.sync="record.tags" @update:value="ouUpdateTags"/>
      <FormItem @update:value="ouUpdateNotes" placeholder="请在这里添加备注">备注</FormItem>
      <Category :value.sync="record.category"/>
      <Board @update:value="onUpdateAmount" @submit="saveRecord"/>
    </Layout>
  </div>

</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';

import Board from '@/components/Money/Board.vue';
import Category from '@/components/Money/Category.vue';
import Tags from '@/components/Money/Tags.vue';
import FormItem from '@/components/Money/FormItem.vue';


@Component({
  components: {FormItem, Tags, Category, Board},
  computed: {
    recordList() {
      return this.$store.state.recordList;
    }
  }
})
export default class Money extends Vue {
  // eslint-disable-next-line no-undef
  record: RecordItem = {tags: [], notes: '', category: '-', amount: '0', createdAt: new Date(2000, 1, 1)};

  created() {
    this.$store.commit('fetchRecords');
  }

  ouUpdateTags(value:string){
    this.record.tags.push(value)
  }
  ouUpdateNotes(value:string){
    this.record.notes=value
  }
  onUpdateAmount(value:string){
    this.record.amount=value
  }

  saveRecord(){
    this.$store.commit('createRecord',this.record)
  }
}
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