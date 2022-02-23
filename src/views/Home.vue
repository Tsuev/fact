<template>
  <div class="home">
    <div class="container">
      <div class="row">
        <div
          v-for="(select, index) of selections"
          :key="index"
          class="select-container"
        >
          <ft-select :selections="select" @addToList="addToList" />
        </div>
      </div>

      <div class="row">
        <ft-options-list :items="chooseValList" />
        <ft-output-block :value="hash" />
        <ft-output-block :value="multiplication" />
      </div>
    </div>

    <ft-modal v-if="showModalState" @closeModal="changeModalShow"/>
    <button class="reset" @click="resetApp">Сброс</button>
    <button v-show="stateChangesLength" class="back" @click="changeStateOnPrev">Назад</button>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";

import FtOptionsList from "@/components/ft-options-list.vue";
import ftSelect from "@/components/ft-select.vue";
import ftOutputBlock from "@/components/ft-output-block.vue";
import ftModal from "@/components/ft-modal.vue"

export default {
  components: { ftSelect, FtOptionsList, ftOutputBlock, ftModal },
  computed: {
    ...mapGetters({
      selections: "GET_SELECTIONS",
      chooseValList: "GET_LIST",
      hash: "GET_HASH",
      multiplication: "GET_MULTIPLICATION",
      stateChangesLength: "GET_STATE_CHANGES_LENGTH",
      showModalState: "GET_MODAL_SHOW"
    }),
  },
  methods: {
    ...mapMutations({
      addToList: "PUSH_CHOOSE_VALUE",
      resetApp: "RESET_APP",
      changeStateOnPrev: "SET_PREV_STATE",
      changeModalShow: "SHOW_MODAL"
    }),
  },
  mounted() {
    this.$store.dispatch("FETCH_DATA");
  },
};
</script>\

<style lang="scss" scoped>
.home {
  .container {
    display: flex;
    align-items: center;
    flex-direction: column;
    padding-left: 250px;
    padding-right: 250px;
    .row {
      display: flex;
      width: 50%;
      justify-content: space-between;
    }
  }
  .reset {
    position: fixed;
    top: 5%;
    left: 90%;
    cursor: pointer;
  }
  .back {
    position: fixed;
    top: 15%;
    left: 90%;
    cursor: pointer;
  }
}
</style>
