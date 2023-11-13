<template>
  <!-- <nav>
    <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link>
  </nav> -->
  <router-view/>
</template>

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
  --green-mid:#68b0ab;
  --green-light:#c8d5b9;
  --light-yellow:#faf3dd;
  --light-white:#F4F1E9;
  --light-green:#B1D182;


}
</style>
