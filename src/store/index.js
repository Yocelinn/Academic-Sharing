import { createStore } from 'vuex'

export default createStore({
  state: {
    isLogin: false,
    token: "",
    searchType: "",
    currentPage: "",
  },
  getters: {
  },
  mutations: {
    login(state, token){
      state.token=token;
      state.isLogin=true;
    },
    logout(state){
      state.token="",
      state.isLogin=false;
    },
    changeSearchType(state, searchType){
      state.searchType=searchType;
    },
    changeCurrentPage(state, currentPage){
      state.currentPage=currentPage;
    },
  },
  actions: {
  },
  modules: {
  }
})
