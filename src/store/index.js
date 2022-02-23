import Vue from "vue";
import Vuex from "vuex";
import { sha256 } from "js-sha256";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    data: [],
    list: [],
    strArr: [],
    stateChange: [],
    hash: null,
    multiplication: 0,
    changesCounter: null,
    modalShow: false
  },
  mutations: {
    SET_DATA(state, data) {
      state.data = data;
    },
    PUSH_CHOOSE_VALUE(state, value) {
      state.list.push(value);
      state.changesCounter++;

      if (!Number(value) && typeof value != "object") {
        state.strArr.push(value);
        state.hash = sha256(state.strArr.join(""));
      }

      if (Number(value)) {
        state.multiplication == 0 || state.multiplication == null
          ? (state.multiplication += value)
          : (state.multiplication *= value);
      }

      if (state.changesCounter <= 10) {
        state.stateChange.push({
          data: state.data,
          list: state.list,
          strArr: state.strArr,
          hash: state.hash,
          multiplication: state.multiplication,
          changesCounter: state.changesCounter,
        });
        state.changesCounter--;
      }
    },
    RESET_APP(state) {
      for (const key in state) {
        if (Array.isArray(state[key]) && key != "data") state[key] = [];
        if (!Array.isArray(state[key]) && key != "data") state[key] = null;
      }
    },
    SET_PREV_STATE(state) {
      if (state.stateChange.length < 2) state.stateChange.pop();

      const prevChanges = state.stateChange.splice(state.stateChange.length - 2, 1)[0];

      state.list.pop();
      state.hash = null;
      state.multiplication = 0;

      for (const key in state) {
        for (const prevKey in prevChanges) {
          if (key === prevKey) {
            state[key] = prevChanges[prevKey];
          }
        }
      }
    },
    SHOW_MODAL(state){
      state.modalShow = !state.modalShow
    }
  },
  actions: {
    async FETCH_DATA({ commit }) {
      const res = await fetch("https://raw.githubusercontent.com/WilliamRu/TestAPI/master/db.json")
        .then((res) => res.json())
        .then((res) => res.testArr)
        .catch(() => commit('SHOW_MODAL'));

      const str = [], number = [], object = [];

      (function customFlatArrMethod(arr) {
        for (const item in arr) {
          if (typeof arr[item] === "string") {
            str.push(arr[item]);
          } else if (typeof arr[item] === "number") {
            number.push(arr[item]);
          } else if (Array.isArray(arr[item])) {
            customFlatArrMethod(arr[item]);
          } else if (
            typeof arr[item] === "object" &&
            arr[item] != null &&
            Object.keys(arr[item]).length
          ) {
            object.push(arr[item]);
          }
        }
      })(res);

      commit("SET_DATA", [
        Array.from(new Set(str)),
        Array.from(new Set(number)),
        Array.from(new Set(object)),
      ]);
    },
  },
  getters: {
    GET_SELECTIONS(state) {
      return state.data;
    },
    GET_LIST(state) {
      return state.list;
    },
    GET_HASH(state) {
      return state.hash;
    },
    GET_MULTIPLICATION(state) {
      return state.multiplication;
    },
    GET_STATE_CHANGES_LENGTH(state) {
      return state.stateChange.length;
    },
    GET_MODAL_SHOW(state){
      return state.modalShow
    }
  },
});
