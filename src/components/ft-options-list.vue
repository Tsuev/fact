<template>
  <div class="ft-options-list">
    <ol>
      <li v-for="(item, index) of items" :key="index">{{ item }}</li>
    </ol>
  </div>
</template>

<script>
export default {
  name: "ft-options-list",
  props: {
    items: {
      type: Array,
      default: () => [],
    },
  },
};
</script>

<style>
.ft-options-list{
  width: 33%;
  margin: 5px;
  height: 200px;
  overflow-y: scroll;
  border: 2px solid black;
  padding: 10px;
}
li{
  text-align: left;
}
</style>