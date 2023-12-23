import { ElNotification } from 'element-plus';
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
      localStorage.setItem('savedVuex', JSON.stringify({'isLogin': true,'token': state.token}));
    },
    logout(state){
      state.token="",
      state.isLogin=false;
      localStorage.setItem('savedVuex', JSON.stringify({'isLogin': false,'token': ''}));
      ElNotification({
        message: "再见，尊敬的",
        type: 'success',
        showClose: true,
        position: 'top-right',
        duration: 2000,
      })
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
