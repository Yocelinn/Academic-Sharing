import { createStore } from 'vuex'

export default createStore({
  state: {
    isLogin: false,
    token: "",
    searchType: "",
  },
  getters: {
  },
  mutations: {
    login(state, token){
      state.token=token;
      // state.isLogin=true;
    },
    logout(state){
      state.authorization="",
      state.isLogin=false;
    },
    changeSearchType(state, searchType){
      state.searchType=searchType;
    }
  },
  actions: {
  },
  modules: {
  }
})
