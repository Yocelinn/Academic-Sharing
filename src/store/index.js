import { createStore } from 'vuex'

export default createStore({
  state: {
    userInfo:{
      isLogin: false,
      nickName: "",
      token: "",
      showName: "",
    },
    administratorInfo:{
      isLogin: false,
      token: "",
    },
    searchType: "",
    currentPage: "",
    isHome: false,
  },
  getters: {
  },
  mutations: {
    login(state, info){
      state.userInfo.token=info.token;
      state.userInfo.nickName=info.nickName;
      state.userInfo.isLogin=true;
      let tmp=new Blob([state.userInfo.nickName])
      if(tmp.size<19){
        state.userInfo.showName=info.nickName;
      } else{
        state.userInfo.showName=state.userInfo.nickName.substring(0, 5)+"...";
      }
      console.log(state.userInfo.showName);
      localStorage.setItem('savedVuex', JSON.stringify(state.userInfo));
    },
    logout(state){
      state.userInfo.token="",
      state.userInfo.nickName="",
      state.userInfo.showName="",
      state.userInfo.isLogin=false;
      localStorage.setItem('savedVuex', JSON.stringify(state.userInfo));
    },
    changeSearchType(state, searchType){
      state.searchType=searchType;
      sessionStorage.setItem('saveSearchType', searchType);
    },
    changeCurrentPage(state, currentPage){
      state.currentPage=currentPage;
    },
    administratorLogin(state, token){
      state.administratorInfo.token=token;
      state.administratorInfo.isLogin=true;
      sessionStorage.setItem('saveAdministrator', JSON.stringify(state.administratorInfo));
    },
    administratorLogout(state){
      state.administratorInfo.isLogin=false;
      state.administratorInfo.token="";
      sessionStorage.setItem('saveAdministrator', JSON.stringify(state.administratorInfo));
    }
  },
  actions: {
  },
  modules: {
  }
})
