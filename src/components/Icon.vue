<template>
  <svg class="icon">
    <use :xlink:href="'#'+name"/>
  </svg>
</template>

<script lang="ts">
// eslint-disable-next-line no-undef
let importAll = (requireContext: __WebpackModuleApi.RequireContext) => {requireContext.keys().forEach(requireContext);};
try {importAll(require.context('../assets/icons', true, /\.svg$/));}catch (error) {console.log(error);}

export default {
  name: 'Icon',
  props:['name']
};
</script>

<style lang="scss" scoped>
.icon{
  width: 2em;
  height: 2em;
}
</style>