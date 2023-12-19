import { createStore } from 'vuex'

export default createStore({
  state: {
    isLogin: false,
    token: "",
  },
  getters: {
  },
  mutations: {
    login(state, token){
      console.log(state.token);
      // state.isLogin=true;
    },
    logout(state){
      state.authorization="",
      state.isLogin=false;
    }
  },
  actions: {
  },
  modules: {
  }
})
