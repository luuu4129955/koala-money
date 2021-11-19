<template>
  <nav>
    <router-link to="/labels" class="item" active-class="selected">
      <Icon name="label"/>
      标签
    </router-link>
    <router-link to="/money" class="item" active-class="selected">
      <Icon name="money"/>
      记账
    </router-link>
    <router-link to="/statistics" class="item" active-class="selected">
      <Icon name="statistics"/>
      统计
    </router-link>
  </nav>
</template>

<script lang="ts">


export default {
  name: 'Nav'
};
</script>

<style lang="scss" scoped>
nav {
  display: flex;
  justify-content: space-around;
  padding: 4px 0;
  box-shadow: 0 0 2px #888;

  & > a {
    display: flex;
    flex-direction: column;

    &.selected {
      fill: #a2dd9e;
      color: #a2dd9e;
    }
  }
}

</style>