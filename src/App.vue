<template>
  <navigationBar></navigationBar>
  <div style="position: relative;width: 100%;height: auto;min-width: 1200px;">
    <router-view/>
  </div>
  <statement></statement>
</template>

<script>
import store from './store';
import navigationBar from './components/home/navigationBar.vue';
import statement from '@/components/home/statement.vue';

export default{
  components: {
    navigationBar,
    statement,
  },
  data(){
    return{
      page: 1,
    }
  },
  methods:{
    
  },
  mounted(){
    let userInfo = JSON.parse(localStorage.getItem('savedVuex'));
    let searchType = sessionStorage.getItem('saveSearchType');
    let administratorInfo = JSON.parse(sessionStorage.getItem('saveAdministrator'));
    if(userInfo===null){
      store.state.userInfo.isLogin=false;
      store.state.userInfo.token='';
      store.state.userInfo.nickName='';
    } else{
      store.state.userInfo=userInfo;
    }
    if(searchType===null){
      store.state.searchType='';
    } else{
      store.state.searchType=searchType;
    }
    if(administratorInfo===null){
      store.state.administratorInfo.isLogin=false;
      store.state.administratorInfo.token='';
    } else{
      store.state.administratorInfo=administratorInfo;
    }
  }
}

</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
:root {  
  --primary-color: #8fc0a4;  
  --green-dark: #4a7c59;  
  --green-blue:#68b0ab;
  --green-light:#c8d5b9;
  --green-yellow:#B1D182;
  --green:#688F4E;
  --green-darkest:#28463C;
  --yellow-light:#faf3dd;
  --yellow-lightest:#F4F1E9;
}
</style>
