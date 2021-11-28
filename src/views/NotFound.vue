<template>
<div>
    <h2>404 Not Found</h2>
    当前页面不存在，请检查网址是否正确。<br>
    <router-link to="/"><span>返回首页</span></router-link>
</div>
</template>

<script lang="ts">
export default {
  name: 'NotFound'
};
</script>

<style lang="scss" scoped>
div{
  padding: 20px;

span{
  color: blue;
  text-decoration: underline blue;
}
}
</style>