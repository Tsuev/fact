<template>
  <div class="ft-str-hash-block">
    {{ value }}
  </div>
</template>

<script>
export default {
  name: "ft-output-block",
  props: {
    value: {
      default: null
    }
  },
};
</script>

<style>
.ft-str-hash-block {
  margin: 5px;
  height: 200px;
  overflow-y: scroll;
  border: 2px solid black;
  padding: 10px;
  width: 33%;
  word-wrap: break-word;
}
</style>