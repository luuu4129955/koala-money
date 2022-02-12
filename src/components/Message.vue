<template>
  <div class="message" v-if="noRecord">{{text}}
    <Icon name="arrow"></Icon>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import {Component, Prop} from 'vue-property-decorator';

@Component
export default class Message extends Vue {
  @Prop(String) text: string | undefined;
  @Prop(Boolean) noRecord: undefined;

}
</script>

<style lang="scss" scoped>
@keyframes shakeY {
  20%, 40%, 60% {
    transform: translateY(10px);
  }
}
.message{
  display: flex;
  flex-direction: column;
  text-align: center;
  padding-top: 100%;
  .icon{
    width: 72px;
    height: 72px;
    margin:20px auto 0;
    animation: shakeY infinite 1s;
  }
}
</style>