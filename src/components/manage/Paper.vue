<template>
  <div>
    <el-breadcrumb separator="/">
			<el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
			<el-breadcrumb-item>管理页面</el-breadcrumb-item>
			<el-breadcrumb-item>学术成果举报审核</el-breadcrumb-item>
		</el-breadcrumb>

    <el-card>
      <el-row :gutter="24">
				<el-col :span="8">
					<el-input placeholder="请输入内容" clearable v-model="searchKey">
					</el-input>
				</el-col>
        <el-col :span="1">
          <el-button type="primary" :icon="Search" @click="searchPaperReport">Search</el-button>
        </el-col>
        <el-col :span="10"></el-col>
        <el-col :span="5">
          <el-select v-model="value" class="m-2" placeholder="Select" clearable @change="filterPaperReport">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-col>
			</el-row>

      <el-table v-loading="loading" :data="paperList" border stripe>
        <el-table-column type="index"></el-table-column>
        <el-table-column label="发起人" prop="reporterName"></el-table-column>
        <el-table-column label="学术成果" prop="reporteeWork"></el-table-column>
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
            <el-button circle  @click=showPaperReport(scope.row)>
              <el-icon ><More /></el-icon>
            </el-button>
            <el-button type="primary" round @click="handlePaper(scope.row)">开始处理</el-button>
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
          <el-form-item label="发起人" prop="reporterName">
            <el-text>{{infoForm.reporterName}}</el-text>
            <!-- <el-input v-model="infoForm.reporterName" disabled></el-input> -->
          </el-form-item>
          <el-form-item label="时间" prop="time">
            <el-text>{{infoForm.time}}</el-text>
            <!-- <el-input v-model="infoForm.time" disabled></el-input> -->
          </el-form-item>
          <el-form-item label="学术成果：" prop="reporteeWork">
            <el-link :href="infoForm.reporteeWork" target="_blank">{{infoForm.reporteeWork}}</el-link>
          </el-form-item>
          <el-form-item label="正文" prop="description">
            <el-text>{{infoForm.description}}</el-text>
            <!-- <el-input v-model="infoForm.text" type="textarea" :rows="20" disabled></el-input> -->
          </el-form-item>
        </el-form>

        <span class="dialog-footer">
          <el-button @click="infoVisible = false">确定</el-button>
        </span>
      </el-dialog>

      <el-dialog title="处理" v-model="handleVisible" width="50%" destroy-on-close>
        <el-form :model="handleForm" ref="handleFormRef" label-width="140px" v-loading="dialog_loading" label-position="left">
          <el-form-item label="发起人" prop="reporterName">
            <el-text>{{handleForm.reporterName}}</el-text>
            <!-- <el-input v-model="handleForm.reporterName" disabled></el-input> -->
          </el-form-item>
          <el-form-item label="时间" prop="time">
            <el-text>{{handleForm.time}}</el-text>
            <!-- <el-input v-model="handleForm.time" disabled></el-input> -->
          </el-form-item>
          <el-form-item label="学术成果：" prop="reporteeWork">
            <el-link :href="handleForm.reporteeWork" target="_blank">{{handleForm.reporteeWork}}</el-link>
          </el-form-item>
          <el-form-item label="正文" prop="description">
            <el-text>{{handleForm.description}}</el-text>
            <!-- <el-input v-model="handleForm.text" type="textarea" :rows="20" disabled></el-input> -->
          </el-form-item>
        </el-form>

        <span class="dialog-footer">
          <el-button @click="cancelHandle">取 消</el-button>
          <el-button type="danger" @click="rejectHandle">驳 回</el-button>
          <el-button type="primary" @click="finishHandle">确 定</el-button>
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
import {AllPaperReport, GetPaperReportById, HandelPaperReport, SearchPaperReport, FilterPaperReport} from '../../api/report.js'
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
      paperList: [
        // {
        //   id: 1,
        //   paperName: "Test",
        //   time: "2023年11月19日22:02:58",
        //   status: 0,
        // },
        // {
        //   id: 2,
        //   paperName: "Test2",
        //   time: "2023年11月19日22:17:58",
        //   status: 1,
        // },
        // {
        //   id: 3,
        //   paperName: "Test3",
        //   time: "2023年11月19日22:19:58",
        //   status: 2,
        // },
        // {
        //   id: 4,
        //   paperName: "Test4",
        //   time: "2023年11月26日22:19:58",
        //   status: 2,
        // },
        // {
        //   id: 5,
        //   paperName: "Test5",
        //   time: "2023年11月26日21:19:58",
        //   status: 1,
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
        reporterName: 'Test',
        time: '2023年11月19日22:19:58',
        text: '这个是要和数据库交互所以点哪个都一样的',
      },
      handleForm: {
        id: 1,
        reporterName: 'Test2',
        time: '2023年11月19日22:19:58',
        text: '和前面那个表格同理点哪个都一样',
      },
      handlingReport: {}
    }
  },
  created(){
    this.getAllPaperReport()
  },
  methods: {
    getAllPaperReport() {
      var promise = AllPaperReport();
      promise.then((result => {
        this.loading = false
        this.paperList = result.data
        if(this.searchKey!=""){
          for(var i=0; i<this.paperList.length; i++){
            if(!this.paperList[i].reporterName.includes(this.searchKey)){
              this.paperList.splice(i, 1)
            }
          }
        }
      }))
    },
    getPaperReportById(id){
      var promise = GetPaperReportById(id);
      promise.then((result)=>{
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
    showPaperReport(s){
      this.infoVisible = true
      this.dialog_loading = true
      var promise = GetPaperReportById(s.id);
      promise.then((result)=>{
        this.dialog_loading = false
        this.infoForm = result.data[0]
      })
    },
    handlePaper(s) {
      this.dialog_loading = true
      if(s.ischeck === 1){
        this.handleVisible = true
        this.handleForm.id = s.id
        // console.log(this.handleForm.id)
        for(var paper of this.paperList){
          if(paper.id === this.handleForm.id){
            paper.ischeck = 2
          }
        }
        var promise = GetPaperReportById(s.id);
        promise.then((result)=>{
          this.handleForm = result.data[0]
          this.handlingReport = result.data[0]
          var p2 = HandelPaperReport(s.id, 2)
          p2.then((result)=>{
            this.dialog_loading = false
          })
        })
      }
      else if(s.ischeck === 2){
        ElMessage('该事务正在处理中！')
      }
      else if(s.ischeck === 4){
        this.handleForm.id = s.id
        var promise = GetPaperReportById(s.id);
        promise.then((result)=>{
          this.handlingReport = result.data[0]
        })
        this.rejectDialogVisible = true
      }else{
        this.showPaperReport(s)
      }
      
    },
    cancelHandle() {
      for(var paper of this.paperList){
        if(paper.id === this.handleForm.id){
          paper.ischeck = 1
        }
      }
      var promise = HandelPaperReport(this.handlingReport.id, 1)
      promise.then((result)=>{
        this.handleVisible = false
      })
    },
    finishHandle() {
      for(var paper of this.paperList){
        if(paper.id === this.handleForm.id){
          paper.ischeck = 3
        }
      }
      var promise = HandelPaperReport(this.handlingReport.id, 3)
      promise.then((result)=>{
        this.handleVisible = false
      })
    },
    rejectHandle() {
      for(var scholar of this.paperList){
        if(scholar.id === this.handleForm.id){
          scholar.ischeck = 4
        }
      }
      var promise = HandelPaperReport(this.handlingReport.id, 4)
      promise.then((result)=>{
        this.handleVisible = false
      })
    },
    reOpen() {
      for(var scholar of this.paperList){
        if(scholar.id === this.handleForm.id){
          scholar.ischeck = 1
        }
      }
      var promise = HandelPaperReport(this.handlingReport.id, 1)
      promise.then((result)=>{
        this.rejectDialogVisible = false
      })
    },
    searchPaperReport() {
    this.loading = true;
    var promise = SearchPaperReport(this.searchKey);
    promise.then((result)=>{
      this.loading = false
      this.paperList = result.data
      if(this.value!=""){
        for(var i=0; i<this.paperList.length; i++){
          if(this.paperList[i].ischeck!=this.value){
            this.paperList.splice(i, 1)
          }
        }
      }
    })
  },
  filterPaperReport() {
    this.loading = true;
    if(this.value==""){
      this.getAllPaperReport()
    }else{
      var promise = FilterPaperReport(this.value);
      promise.then((result)=>{
        this.loading = false
        this.paperList = result.data
        if(this.searchKey!=""){
          for(var i=0; i<this.paperList.length; i++){
            if(!this.paperList[i].reporterName.includes(this.searchKey)){
              this.paperList.splice(i, 1)
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

</style>