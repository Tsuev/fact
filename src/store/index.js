import Vue from 'vue'
import Vuex from 'vuex'
import { sha256 } from 'js-sha256'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    data: [],
    list: [],
    strArr: [], 
    hash: '',
    
  },
  mutations: {
    SET_DATA(state, data){
      state.data = data
    },
    PUSH_CHOOSE_VALUE(state, value){
      state.list.push(value)

      if(!Number(value) && typeof value != 'object') {
        state.strArr.push(value)
        state.hash = sha256(state.strArr.join(''))
      } 
        
    },
    RESET_APP(state){
      
    },
  },
  actions: {
    async FETCH_DATA({commit}){
      try{
        const res = await fetch('https://raw.githubusercontent.com/WilliamRu/TestAPI/master/db.json')
        .then(res => res.json())
        .then(res => res.testArr)

        const str = [], number = [], object = [];

        (function customFlatArrMethod(arr) {
          for (const item in arr) {
            if(typeof arr[item] === 'string'){
              str.push(arr[item])
            } else if (typeof arr[item] === 'number'){
              number.push(arr[item])
            } else if (Array.isArray(arr[item])){
              customFlatArrMethod(arr[item])
            } 
            else if (typeof arr[item] === 'object' && arr[item] != null){
              object.push(arr[item])
            }
          }
        })(res);

        commit('SET_DATA', [str, number, object])

      } catch (error){
        if (error.response && error.response.status === 500) {
          commit('SET_DATA', [])
        } else {
          console.warn(error)
        }
      }
    }
  },
  getters: {
    GET_SELECTIONS(state){
      return state.data
    },
    GET_LIST(state){
      return state.list
    },
    GET_HASH(state){
      return state.hash
    }
  }
})
