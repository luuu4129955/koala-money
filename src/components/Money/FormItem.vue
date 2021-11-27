<template>
  <div class="notes">
    <slot></slot>
    <label>
      <input type="text" v-model="value"
             :placeholder="placeholder">
    </label>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import {Component, Prop, Watch} from 'vue-property-decorator';

@Component
export default class Notes extends Vue {
  @Prop(String) placeholder: string | undefined;
  value = '';

  @Watch('value')
  onValueChanged(value: string, oldValue: string) {
    this.$emit('update:value', value);
  }
}
</script>

<style lang="scss" scoped>
.notes {
  padding: 10px 10px;

  input {
    font-size: inherit;
    padding-left: 8px;
  }
}
</style>