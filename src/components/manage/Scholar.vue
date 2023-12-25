<template>
  <div>
    <el-row :gutter="24">
      <el-col :span="22">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>管理页面</el-breadcrumb-item>
          <el-breadcrumb-item>学术门户审核</el-breadcrumb-item>
        </el-breadcrumb>
      </el-col>
      <el-col :span="2">
        <el-button type="primary">登出</el-button>
      </el-col>
    </el-row>

    <el-card>
      <el-row :gutter="24">
				<el-col :span="8">
					<el-input placeholder="请输入内容" clearable v-model="searchKey">
					</el-input>
				</el-col>
        <el-col :span="1">
          <el-button type="primary" :icon="Search" @click="searchScholar">Search</el-button>
        </el-col>
        <el-col :span="10"></el-col>
        <el-col :span="5">
          <el-select v-model="value" class="m-2" placeholder="Select" @change="filterScholar" clearable>
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-col>
			</el-row>

      <el-table v-loading="loading" :data="scholarList" border stripe>
        <el-table-column type="index"></el-table-column>
        <el-table-column label="发起人" prop="approvePeople"></el-table-column>
        <el-table-column label="门户" prop="openalexID"></el-table-column>
        <el-table-column label="时间" prop="time"></el-table-column>
        <el-table-column label="状态">
          <template #default="scope">
            <el-button type="info" plain v-if="scope.row.ischeck==1">待处理</el-button>
            <el-button type="warning" plain v-if="scope.row.ischeck==2">处理中</el-button>
            <el-button type="success" plain v-if="scope.row.ischeck==3">已处理</el-button>
            <el-button type="danger" plain v-if="scope.row.ischeck==4">已驳回</el-button>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="180px">
          <template #default="scope">
            <el-button circle  @click="showScholar(scope.row)">
              <el-icon ><More /></el-icon>
            </el-button>
            <el-button type="primary" round @click="handleScholar(scope.row)">开始处理</el-button>
          </template>
        </el-table-column>
      </el-table>
      
      <!-- <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="queryInfo.pagenum"
        :page-sizes="[1, 2, 5, 10]"
        :page-size="queryInfo.pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total">
      </el-pagination> -->
      
      <el-dialog title="查看信息" v-model="infoVisible" width="50%" destroy-on-close>
        <el-form :model="infoForm" ref="infoFormRef" label-width="140px" v-loading="dialog_loading" label-position="left">
          <el-form-item label="发起人：" prop="approvePeople">
            <el-text>{{infoForm.approvePeople}}</el-text>
            <!-- <el-input v-model="infoForm.approvePeople"></el-input> -->
          </el-form-item>
          <el-form-item label="时间：" prop="time">
            <el-text>{{infoForm.time}}</el-text>
            <!-- <el-input v-model="infoForm.time" disabled></el-input> -->
          </el-form-item>
          <el-form-item label="申请门户：" prop="openalexID">
            <el-link :href="infoForm.openalexID" target="_blank">{{infoForm.openalexID}}</el-link>
          </el-form-item>
          <el-form-item label="正文：" prop="text">
            <el-text>{{infoForm.text}}</el-text>
            <!-- <el-input v-model="infoForm.text" type="textarea" :rows="20" disabled></el-input> -->
          </el-form-item>
        </el-form>

        <span class="dialog-footer">
          <el-button @click="infoVisible = false">确定</el-button>
        </span>
      </el-dialog>

      <el-dialog title="处理" v-model="handleVisible" width="50%" destroy-on-close>
        <el-form :model="handleForm" ref="handleFormRef" label-width="140px" v-loading="dialog_loading" label-position="left">
          <el-form-item label="发起人：" prop="approvePeople">
            <el-text>{{handleForm.approvePeople}}</el-text>
            <!-- <el-input v-model="handleForm.approvePeople" disabled></el-input> -->
          </el-form-item>
          <el-form-item label="时间：" prop="time">
            <el-text>{{handleForm.time}}</el-text>
            <!-- <el-input v-model="handleForm.time" disabled></el-input> -->
          </el-form-item>
          <el-form-item label="申请门户：" prop="openalexID">
            <el-link :href="handleForm.openalexID" target="_blank">{{handleForm.openalexID}}</el-link>
          </el-form-item>
          <el-form-item label="正文：" prop="text">
            <el-text>{{handleForm.text}}</el-text>
            <!-- <el-input v-model="handleForm.text" type="textarea" :rows="20" disabled></el-input> -->
          </el-form-item>
        </el-form>

        <span class="dialog-footer">
          <el-button @click="cancelHandle">取 消</el-button>
          <el-button type="danger" @click="rejectHandle">驳 回</el-button>
          <el-button type="primary" @click="finishHandle">通 过</el-button>
        </span>
      </el-dialog>

      <el-dialog v-model="rejectDialogVisible" title="Warning" width="30%" center>
        <span>
          该请求已驳回，要重新打开吗？
        </span>
        <template #footer>
          <span class="dialog-footer">
            <el-button @click="rejectDialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="reOpen">确 定</el-button>
          </span>
        </template>
      </el-dialog>
    </el-card>
  </div>
</template>

<script>
import { ElMessage } from 'element-plus'
import { ref } from 'vue'
import {AllScholarApproval, SearchScholarApproval, FilterScholarApproval, GetScholarApproval, HandelScholarApproval} from '../../api/scholar.js'
export default {
  data() {
    return {
      loading: true,
      dialog_loading: true,
      searchKey: "",
      queryInfo: {
				query: '',
				pagenum: 1,
				pagesize:2
			},
      scholarList: [
        // {
        //   id: 1,
        //   approvePeople: "Test",
        //   openalexID: "aaa",
        //   time: "2023年11月19日22:02:58",
        //   ischeck: 0,
        // },
        // {
        //   id: 2,
        //   approvePeople: "Test2",
        //   openalexID: "aaa",
        //   time: "2023年11月19日22:17:58",
        //   ischeck: 1,
        // },
        // {
        //   id: 3,
        //   approvePeople: "Test3",
        //   openalexID: "aaa",
        //   time: "2023年11月19日22:19:58",
        //   ischeck: 2,
        // }
      ],
      options: [
        {
          value: 1,
          label: '待处理',
        },
        {
          value: 2,
          label: '处理中',
        },
        {
          value: 3,
          label: '已处理',
        },
        {
          value: 4,
          label: '已驳回',
        }
      ],
      value: "",
      total: 3,
      infoVisible: false,
      handleVisible: false,
      rejectDialogVisible: false,
      infoForm: {
        id: 1,
        approvePeople: 'Test',
        time: '2023年11月19日22:19:58',
        text: '这个是要和数据库交互所以点哪个都一样的',
      },
      handleForm: {
        id: 1,
        approvePeople: 'Test2',
        time: '2023年11月19日22:19:58',
        text: '和前面那个表格同理点哪个都一样',
      },
      handlingScholar: {},
    }
  },
  created(){
    this.getAllScholar()
  },
  methods: {
    getAllScholar(){
      var promise = AllScholarApproval();
      promise.then((result)=>{
        this.loading = false
        this.scholarList = result.data
        if(this.searchKey!=""){
          for(var i=0; i<this.scholarList.length; i++){
            if(!this.scholarList[i].approvePeople.includes(this.searchKey)){
              this.scholarList.splice(i, 1)
            }
          }
        }
      })
    },
    getScholarById(id){
      var promise = GetScholarApproval(id);
      promise.then((result)=>{
        console.log(result.data[0])
        return result.data[0]
      })
    },
    handleSizeChange(newSize) {
      this.queryInfo.pagesize = newSize
      // this.getUserList()
    },
    handleCurrentChange(newPage) {
      this.queryInfo.pagenum = newPage
      // this.getUserList()
    },
    showScholar(s) {
      this.infoVisible = true
      this.dialog_loading = true
      var promise = GetScholarApproval(s.id);
      promise.then((result)=>{
        this.dialog_loading = false
        this.infoForm = result.data[0]
      })
    },
    handleScholar(s) {
      this.dialog_loading = true
      if(s.ischeck === 1){
        this.handleVisible = true
        this.handleForm.id = s.id
        // console.log(this.handleForm.id)
        for(var scholar of this.scholarList){
          if(scholar.id === this.handleForm.id){
            scholar.ischeck = 2
          }
        }
        var promise = GetScholarApproval(s.id);
        promise.then((result)=>{
          this.handleForm = result.data[0]
          this.handlingScholar = result.data[0]
          var p2 = HandelScholarApproval(s.id, 2)
          p2.then((result)=>{
            this.dialog_loading = false
          })
        })
      }
      else if(s.ischeck === 2){
        ElMessage('该事务正在处理中！')
        // var p2 = HandelScholarApproval(s.id, 1)
      }
      else if(s.ischeck === 4){
        this.handleForm.id = s.id
        var promise = GetScholarApproval(s.id);
        promise.then((result)=>{
          this.handlingScholar = result.data[0]
        })
        this.rejectDialogVisible = true
      }else{
        this.showScholar(s)
      }
      
    },
    cancelHandle() {
      for(var scholar of this.scholarList){
        if(scholar.id === this.handleForm.id){
          scholar.ischeck = 1
        }
      }
      var promise = HandelScholarApproval(this.handlingScholar.id, 1)
      promise.then((result)=>{
        this.handleVisible = false
      })
    },
    finishHandle() {
      for(var scholar of this.scholarList){
        if(scholar.id === this.handleForm.id){
          scholar.ischeck = 3
        }
      }
      var promise = HandelScholarApproval(this.handlingScholar.id, 3)
      promise.then((result)=>{
        this.handleVisible = false
      })
    },
    rejectHandle() {
      for(var scholar of this.scholarList){
        if(scholar.id === this.handleForm.id){
          scholar.ischeck = 4
        }
      }
      var promise = HandelScholarApproval(this.handlingScholar.id, 4)
      promise.then((result)=>{
        this.handleVisible = false
      })
    },
    reOpen() {
      for(var scholar of this.scholarList){
        if(scholar.id === this.handleForm.id){
          scholar.ischeck = 1
        }
      }
      var promise = HandelScholarApproval(this.handlingScholar.id, 1)
      promise.then((result)=>{
        this.rejectDialogVisible = false
      })
    },
    searchScholar() {
      this.loading = true;
      var promise = SearchScholarApproval(this.searchKey);
      promise.then((result)=>{
        this.loading = false
        this.scholarList = result.data
        if(this.value!=""){
          for(var i=0; i<this.scholarList.length; i++){
            if(this.scholarList[i].ischeck!=this.value){
              this.scholarList.splice(i, 1)
            }
          }
        }
      })
    },
    filterScholar() {
      this.loading = true;
      if(this.value==""){
        this.getAllScholar()
      }else{
        console.log(this.value)
        var promise = FilterScholarApproval(this.value);
        promise.then((result)=>{
          this.loading = false
          this.scholarList = result.data
          if(this.searchKey!=""){
            for(var i=0; i<this.scholarList.length; i++){
              if(!this.scholarList[i].approvePeople.includes(this.searchKey)){
                this.scholarList.splice(i, 1)
              }
            }
          }
        })
      }
    }
  },
}
</script>

<style>
.el-text{
  text-align: left;
}
.el-card{
  margin-top: 15px;
}
.el-breadcrumb{
  margin-top: 10px;
}
</style>