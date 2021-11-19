<template>
  <div class="category">
    <div class="pay">支出</div>
    <div class="income">收入</div>
  </div>
</template>

<script lang="ts">
export default {
  name: 'Category'
};
</script>

<style lang="scss" scoped>
.category {
  display: flex;
  flex-direction: row;
  justify-content: space-around;

  .pay, .income {
    width: 100%;
    padding: 12px 0;
    text-align: center;
    background-color: #a2dd9e;
    color: #fff;
    font-size: 20px;
  }
}
</style>