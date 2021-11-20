<template>
  <div class="notes">
    备注
    <label>
      <input type="text" v-model="value"
             placeholder="在这里添加备注">
    </label>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import {Component} from 'vue-property-decorator';
@Component
export default class Notes extends Vue{
  value='';
}
</script>

<style lang="scss" scoped>
.notes {
  padding: 10px 10px;
  background-color: #f5f8fd;

  input {
    font-size: inherit;
    padding-left: 8px;
  }
}
</style>