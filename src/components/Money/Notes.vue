<template>
  <div class="notes">
    备注
    <label>
      <input type="text" placeholder="在这里添加备注">
    </label>
  </div>
</template>

<script lang="ts">
export default {
  name: 'Notes'
};
</script>

<style lang="scss" scoped>
.notes {
  padding: 10px 10px;
  background-color: #f5f8fd;

  input {
    font-size: inherit;
    padding-left: 8px;
  }
}
</style>