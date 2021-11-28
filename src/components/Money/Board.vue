<template>
  <div class="board">
    <div class="board-output">{{ output }}</div>
    <div class="board-input">
      <div class="numbers">
        <button @click="inputContent">1</button>
        <button @click="inputContent">2</button>
        <button @click="inputContent">3</button>
        <button @click="inputContent">+</button>
        <button @click="inputContent">4</button>
        <button @click="inputContent">5</button>
        <button @click="inputContent">6</button>
        <button @click="inputContent">-</button>
        <button @click="inputContent">7</button>
        <button @click="inputContent">8</button>
        <button @click="inputContent">9</button>
        <button @click="inputContent">×</button>
        <button @click="inputContent">.</button>
        <button @click="inputContent">0</button>
        <button @click="inputContent">%</button>
        <button @click="inputContent">÷</button>
      </div>
      <div class="result">
        <button @click="clear" class="clear">清空</button>
        <button @click="back" class="back">
          <Icon name="backspace"></Icon>
        </button>
        <button @click="ok" class="ok">OK</button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import {Component} from 'vue-property-decorator';

@Component
export default class Board extends Vue {
  output = '0';

  inputContent(event: MouseEvent) {
    const button = event.target.textContent;
    const input = (button as string);
    if (this.output.length === 16) {
      return;
    }
    if (this.output === '0') {
      if ('0123456789'.indexOf(input) >= 0) {
        this.output = input;
      } else {
        this.output += input;
      }
      return;
    }
    if (this.output.indexOf('.') >= 0 && input === '.') {
      return;
    }
    this.output += input;
  }

  back() {
    this.output = this.output.slice(0, -1);
  }

  clear(){
    this.output='0'
  }
  ok(){
    this.$emit('update:value',this.output)
    this.$emit('submit',this.output)
    this.output='0'
  }
}
</script>

<style lang="scss" scoped>
.board {
  display: flex;
  flex-direction: column;
  background-color: #fff;

  .board-output {
    text-align: right;
    padding: 16px 18px;
    font-size: 24px;
    height: 62px;
    font-family: Consolas, monospace;
    box-shadow: inset 0px -1px #d6d6d6;
  }

  .board-input {
    display: flex;
    flex-direction: row;

    .numbers {
      display: grid;
      width: 80%;
      grid-template-columns: repeat(4, 25%);
      grid-template-rows: repeat(5, 25%);
      $bg: #f5f5f5;

      button {
        padding: 16px 32px;

        &:nth-child(1) {
          background: $bg;
        }

        &:nth-child(2), &:nth-child(5) {
          background: darken($bg, 4%);
        }

        &:nth-child(3), &:nth-child(6), &:nth-child(9) {
          background: darken($bg, 4%*2);
        }

        &:nth-child(4), &:nth-child(7), &:nth-child(10), &:nth-child(13) {
          background: darken($bg, 4%*3);
        }

        &:nth-child(8), &:nth-child(11), &:nth-child(14) {
          background: darken($bg, 4%*4);
        }

        &:nth-child(12), &:nth-child(15) {
          background: darken($bg, 4%*5);
        }

        &:nth-child(16) {
          background: darken($bg, 4%*6);
        }
      }
    }

    .result {
      width: 20%;
      display: grid;
      grid-template-rows: 25% 25% 50%;

      button {color: #fff}

      .clear {background-color: #f76361;}

      .back {background-color: #ffb850;
      .icon{
        fill: #fff;
      }
      }

      .ok {background-color: #a2dd9e;}
    }
  }
}
</style>