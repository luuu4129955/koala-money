<template>
  <div class="board">
    <div class="numbers">
      <button>1</button>
      <button>2</button>
      <button>3</button>
      <button>+</button>
      <button>4</button>
      <button>5</button>
      <button>6</button>
      <button>-</button>
      <button>7</button>
      <button>8</button>
      <button>9</button>
      <button>×</button>
      <button>·</button>
      <button>0</button>
      <button>%</button>
      <button>÷</button>
    </div>
    <div class="result">
      <button class="delete">清空</button>
      <button class="clear">删除</button>
      <button class="ok">OK</button>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: 'Board'
};
</script>

<style lang="scss" scoped>
.board {
  display: flex;

  .numbers {
    display: grid;
    width: 80%;
    grid-template-columns: repeat(4, 25%);
    grid-template-rows: repeat(5, 25%);
    $bg:#f5f5f5;
    button {
      padding: 16px 32px;
      &:nth-child(1){
        background: $bg;
      }
      &:nth-child(2),&:nth-child(5){
        background: darken($bg,4%);
      }
      &:nth-child(3),&:nth-child(6),&:nth-child(9){
        background: darken($bg,4%*2);
      }
      &:nth-child(4),&:nth-child(7),&:nth-child(10),&:nth-child(13){
        background: darken($bg,4%*3);
      }
      &:nth-child(8),&:nth-child(11),&:nth-child(14){
        background: darken($bg,4%*4);
      }
      &:nth-child(12),&:nth-child(15){
        background: darken($bg,4%*5);
      }
      &:nth-child(16){
        background: darken($bg,4%*6);
      }
    }
  }
  .result {
    width: 20%;
    display: grid;
    grid-template-rows: 25% 25% 50%;

    button {color: #fff}

    .delete {background-color: #f76361;}

    .clear {background-color: #ffb850;}

    .ok {background-color: #a2dd9e;}
  }
}
</style>