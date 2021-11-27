<template>
  <div class="btn" ><slot/></div>
</template>

<script lang="ts">
import Vue from 'vue';
import {Component} from 'vue-property-decorator';

@Component
export default class Button extends Vue {

}
</script>

<style lang="scss" scoped>
$f: 18px;
.btn {
  text-align: center;
  margin: 64px $f 0 $f;
  padding: $f/2 $f;
  border-radius: 8px;
  letter-spacing: 6px;
}
</style>