<template>
  <nav>
    <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link>
  </nav>
  <!-- <router-view/> -->
  <Net :wordData="wordData"/>
</template>

<script>
import { reactive } from 'vue'
import Net from './components/Net.vue'
export default {
  components: { Net },
  setup() {
    const wordData = reactive([
      {
        name: "十九大精神",
        id: 1,
        value: 15000
      },
      {
        name: "两学一做",
        value: 10081
      },{
        name: "中华民族",
        value: 9386
      },
      {
        name: "马克思主义",
        value: 7500
      },
      {
        name: "民族复兴",
        value: 7500
      },
      {
        name: "社会主义制度",
        value: 6500
      },
      {
        name: "国防白皮书",
        value: 6500
      },
      {
        name: "创新",
        value: 6000
      },
      {
        name: "民主革命",
        value: 4500
      },
      {
        name: "文化强国",
        value: 3800
      },
      {
        name: "国家主权",
        value: 3000
      },
      {
        name: "伟大复兴",
        value: 2500
      },
      {
        name: "领土完整",
        value: 2300
      },
      {
        name: "安全",
        value: 2000
      },
      {
        name: "从严治党",
        value: 1900
      },
      {
        name: "现代化经济体系",
        value: 1800
      },
      {
        name: "国防动员",
        value: 1700
      },
      {
        name: "信息化战争",
        value: 1600
      },
      {
        name: "局部战争",
        value: 1500
      },
      {
        name: "教育",
        value: 1200
      },
      {
        name: "中国梦",
        value: 1100
      },
      {
        name: "孙子兵法",
        value: 900
      },
      {
        name: "一国两制",
        value: 800
      },
      {
        name: "特色社会主义思想",
        value: 700
      }
    ])
    return{
      wordData
    };

  },
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
</style>
