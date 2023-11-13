<template>
    <el-row class="tac" >
      <el-menu
              active-text-color="#ffd04b"
              background-color="#b1d182"
              class="el-menu-vertical-demo"
              text-color="#fff"
              @open="handleOpen"
              @close="handleClose"
      >
        <h2 style="color: #ffffff">个人主页</h2>
        <router-link to="/person">
          <el-menu-item index="3">
            <el-icon><document /></el-icon>
            <span>个人信息</span>
          </el-menu-item>
        </router-link>
        <router-link to="/history">
          <el-menu-item index="5">
            <el-icon><document /></el-icon>
            <span>历史记录</span>
          </el-menu-item>
        </router-link>
        <router-link to="/collect">
          <el-menu-item index="6">
            <el-icon><PictureRounded /></el-icon>
            <span>收藏成果</span>
          </el-menu-item>
        </router-link>
        <router-link to="/mine">
          <el-menu-item index="7" v-if="this.$store.state.ifvip">
            <el-icon><document /></el-icon>
            <span>我的成果</span>
          </el-menu-item>
        </router-link>
      </el-menu>
    </el-row>
  </template>
  
  <script>
  import {
    Document,
    ArrowLeft,
    Menu as IconMenu,
    Location,
    Setting,
  } from '@element-plus/icons-vue'
  export default{
    methods:{
    }
  }
  </script>
  
  <style scoped>
  .tac {
    height: 93vh;
    width: 100vh;
  }
  
  .el-menu h2{
    color: #fff;
    line-height: 48px;
    font-size: 22px;
    font-weight: 400;
    padding-top: 20px;
  }
  
  .el-button {
    color: #FFF
  }
  
  .e-link span {
    color: #fff
  }
  
  
  .edit {
    margin-top: 20px;
  }
  
  .el-menu-item span {
    font-size: 16px;
    margin-left: 6px;
  }
  .el-menu-vertical-demo{
    padding-top: 0;
  }
  </style>
  