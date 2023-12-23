<template>
  <navigationBar></navigationBar>
  <router-view/>
</template>

<script>
import store from './store';
import navigationBar from './components/home/navigationBar.vue';

export default{
  components: {
    navigationBar,
  },
  data(){
    return{
      page: 1,
    }
  },
  methods:{
    
  },
  mounted(){
    let userInfo = JSON.parse(localStorage.getItem("savedVuex"));
    if(userInfo===null){
      store.state.userInfo.isLogin=false;
      store.state.userInfo.token='';
      store.state.userInfo.nickName='';
    } else{
      store.state.userInfo=userInfo;
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
