<template>
  <div class="wrapper">
    <div class="modal">
      <h2>Произошла ошибка</h2>
      <button @click="closeModal">Закрыть</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "ft-modal",
  methods: {
    closeModal(){
      this.$emit('closeModal')
    }
  }
};
</script>

<style lang="scss">
.wrapper {
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  position: absolute;
  background: rgba(128, 128, 128, 0.233);
  display: flex;
  justify-content: center;
  align-items: center;
  .modal {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 30px;
    border: 1px solid black;
    background: white;
  }
}
</style>