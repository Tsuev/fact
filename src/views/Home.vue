<template>
  <div class="home">
    <div class="container">
      <div class="row">
        <div v-for="(select, index) of selections" :key="index" class="select-container">
          <ft-select 
            :selections="select"
            @addToList="addToList"
          />
        </div>
      </div>
      <div class="row">
        <ft-options-list 
          :items="chooseValList"
        />
        <ft-output-block 
          :value="hash"
        />
        <ft-output-block />
      </div>
    </div>
    
    <button>Сброс</button>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
import FtOptionsList from '../components/ft-options-list.vue';
import ftSelect from "../components/ft-select.vue";
import ftOutputBlock from "../components/ft-output-block.vue"

export default {
  components: { ftSelect, FtOptionsList, ftOutputBlock },
  computed: {
    ...mapGetters({
      selections: 'GET_SELECTIONS',
      chooseValList: 'GET_LIST',
      hash: 'GET_HASH'
    })
  },
  methods: {
    ...mapMutations({
      addToList: 'PUSH_CHOOSE_VALUE'
    })
  },
  mounted(){
    this.$store.dispatch('FETCH_DATA')
  }
};
</script>\

<style lang="scss" scoped>
.home{
  .container{
    display: flex;
    align-items: center;
    flex-direction: column;
    padding-left: 250px;
    padding-right: 250px;
    .row{
      display: flex;
      width: 50%;
      justify-content: space-between;
    }
  }
  button{
    position: fixed;
    top: 5%;
    left: 90%;
    cursor: pointer;
  }
}
</style>
