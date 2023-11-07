<template>
    <div class="common-layout">
      <el-container>
        <el-aside width="200px">
          <Personaside></Personaside>
        </el-aside>
        <el-container>
          <el-header>Header</el-header>
          <el-main>
            <el-row>
              <el-col :span="12"><div class="grid-content ep-bg-purple" /></el-col>
              <el-col :span="12"><div class="grid-content ep-bg-purple-light" /></el-col>
            </el-row>
          </el-main>
        </el-container>
      </el-container>
    </div>
  </template>
    <script>
    import Personaside from '@/components/Personaside.vue';
    export default {
      components: {
        Personaside,
      }
    }
    </script>
    