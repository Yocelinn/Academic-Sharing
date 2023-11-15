<template>
    <el-row class="tac">
      <el-menu
              active-text-color="#c1c11c"
              background-color="#1c69c1"
              class="el-menu-vertical-demo"
              text-color="#fff"
              @open="handleOpen"
              @close="handleClose"
      >
        <h2 style="color: #ffffff">个人主页</h2>
        <router-link to="/person/protectCenter">
          <el-menu-item index="3">
            <el-icon><document /></el-icon>
            <span>个人信息</span>
          </el-menu-item>
        </router-link>
        <router-link to="/prototype">
          <el-menu-item index="4">
            <el-icon><PictureRounded /></el-icon>
            <span>身份认证</span>
          </el-menu-item>
        </router-link>
        <router-link to="/person/protectCenter">
          <el-menu-item index="5">
            <el-icon><document /></el-icon>
            <span>历史记录</span>
          </el-menu-item>
        </router-link>
        <router-link to="/prototype">
          <el-menu-item index="6">
            <el-icon><PictureRounded /></el-icon>
            <span>收藏成果</span>
          </el-menu-item>
        </router-link>
        <router-link to="/person/protectCenter">
          <el-menu-item index="7">
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
      docsedit(){
        window.sessionStorage.setItem('curDocsId', '0');
        this.$router.push('/documentadd');
      }
    }
  }
  </script>
  
  <style scoped>
  .tac {
    height: 93vh;
  }
  
  .el-menu h2{
    color: #fff;
    text-align: center;
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
  