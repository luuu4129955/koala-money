<template>
  <div class="tags">
    <div class="tags-list">
      <ul>
        <li>吃饭</li>
        <li>睡觉</li>
        <li>游戏</li>
        <li>衣服</li>
        <li>旅游</li>
        <li>化妆品</li>
        <li>请客</li>
        <li>差旅</li>
        <li>学习</li>
        <li>电子设备</li>
        <li>请客</li>
        <li>酒吧</li>
        <li>打牌</li>
        <li>医院</li>
        <li>奶茶</li>

      </ul>
    </div>
    <button class="tags-add">新增标签</button>
  </div>
</template>

<script lang="ts">
export default {
  name: 'Tags'
};
</script>

<style lang="scss" scoped>
.tags {
  flex-grow: 1;
  overflow: auto;

  li {
    display: inline-block;
    padding: 2px 10px;
    background-color: #eeffed;
    color: #01063D;
    font-size: 14px;
    margin: 4px;
    border-radius: 10px;
  }

  .tags-add {
    color: #999;
    font-size: 14px;
    padding: 10px;
    text-decoration: underline #333;

  }
}

</style>