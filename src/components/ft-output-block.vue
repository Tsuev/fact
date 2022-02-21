<template>
  <div class="ft-str-hash-block">
    {{ value }}
  </div>
</template>

<script>
export default {
  name: "ft-str-hash-block",
  props: {
    value: {
      type: String,
      default: "",
    },
  },
};
</script>

<style>
.ft-str-hash-block {
  min-height: 100px;
  max-height: 100px;
  overflow-y: scroll;
  border: 2px solid black;
  padding: 10px;
  width: 300px;
}
</style>