<template>
  <div class="ft-select">
    <select size="10" multiple>
      <option @click="addToList(option)" v-for="(option, index) of selections" :key="index">{{ option }}</option>
    </select>
  </div>
</template>

<script>
export default {
  name: 'ft-select',
  props: {
    selections: {
      type: Array,
      default: []
    }
  },
  methods: {
    addToList(val){
      this.$emit('addToList', val)
    }
  },
}
</script>

<style scoped>
.ft-select{
  margin: 10px;
}
</style>


