import { createStore } from 'vuex'

export default createStore({
  state: {
    isLogin: false,
    authorization: "",
  },
  getters: {
  },
  mutations: {
    Login(state, authorization){
      state.authorization=authorization;
      state.isLogin=true;
    },
    LogOut(state){
      state.authorization="",
      state.isLogin=false;
    }
  },
  actions: {
  },
  modules: {
  }
})
