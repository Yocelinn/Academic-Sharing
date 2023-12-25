<template>
  <div>
    <el-row :gutter="24">
      <el-col :span="22">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>管理页面</el-breadcrumb-item>
          <el-breadcrumb-item>学术成果评论审核</el-breadcrumb-item>
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
          <el-button type="primary" :icon="Search" @click="searchCommentReport">Search</el-button>
        </el-col>
        <el-col :span="10"></el-col>
        <el-col :span="5">
          <el-select v-model="value" class="m-2" placeholder="Select" clearable @change="filterCommentReport">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-col>
			</el-row>

      <el-table :data="commentList" border stripe>
        <el-table-column type="index"></el-table-column>
        <el-table-column label="发起人" prop="reporterName"></el-table-column>
        <el-table-column label="时间" prop="time"></el-table-column>
        <el-table-column label="评论内容" prop="reporteeComment"></el-table-column>
        <el-table-column label="举报理由" prop="reason"></el-table-column>
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
            <el-button circle  @click="showCommentReport(scope.row)">
              <el-icon ><More /></el-icon>
            </el-button>
            <el-button type="primary" round @click="handleComment(scope.row)">开始处理</el-button>
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
          <el-form-item label="评论内容" prop="reporteeComment">
            <el-text>{{infoForm.reporteeComment}}</el-text>
            <!-- <el-input v-model="infoForm.commentContent" disabled></el-input> -->
          </el-form-item>
          <el-form-item label="举报理由" prop="reason">
            <el-text>{{infoForm.reason}}</el-text>
            <!-- <el-input v-model="infoForm.reason" disabled></el-input> -->
          </el-form-item>
          <el-form-item label="具体描述" prop="description">
            <el-text>{{infoForm.description}}</el-text>
            <!-- <el-input v-model="infoForm.description" type="textarea" :rows="15" disabled></el-input> -->
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
            <!-- <el-input v-model="infoForm.reporterName" disabled></el-input> -->
          </el-form-item>
          <el-form-item label="时间" prop="time">
            <el-text>{{handleForm.time}}</el-text>
            <!-- <el-input v-model="infoForm.time" disabled></el-input> -->
          </el-form-item>
          <el-form-item label="评论内容" prop="reporteeComment">
            <el-text>{{handleForm.reporteeComment}}</el-text>
            <!-- <el-input v-model="infoForm.commentContent" disabled></el-input> -->
          </el-form-item>
          <el-form-item label="举报理由" prop="reason">
            <el-text>{{handleForm.reason}}</el-text>
            <!-- <el-input v-model="infoForm.reason" disabled></el-input> -->
          </el-form-item>
          <el-form-item label="具体描述" prop="description">
            <el-text>{{handleForm.description}}</el-text>
            <!-- <el-input v-model="infoForm.description" type="textarea" :rows="15" disabled></el-input> -->
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
import {AllCommentReport, GetCommentReportByID, HandleCommentReport, SearchCommentReport, FilterCommentReport} from '../../api/report.js'
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
      commentList: [
        // {
        //   id: 1,
        //   reporterName: "Test",
        //   time: "2023年11月19日22:02:58",
        //   commentContent: "ffffffffffffffff",
        //   reason: "人身攻击",
        //   description: "testtesttest",
        //   ischeck: 0,
        // },
        // {
        //   id: 2,
        //   reporterName: "Test2",
        //   time: "2023年11月19日22:17:58",
        //   commentContent: "xxxxxxxxxxxxxxxxxxx",
        //   reason: "内容无关",
        //   description: "testtesttest",
        //   ischeck: 1,
        // },
        // {
        //   id: 3,
        //   reporterName: "Test3",
        //   time: "2023年11月19日22:19:58",
        //   commentContent: "12345678999999",
        //   reason: "违法违规",
        //   description: "testtesttest",
        //   ischeck: 2,
        // },
        // {
        //   id: 4,
        //   reporterName: "Test4",
        //   time: "2023年11月26日22:19:58",
        //   commentContent: "nnnnnnnnnnnnnnnnnnn",
        //   reason: "不实信息",
        //   description: "testtesttest",
        //   ischeck: 1,
        // },
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
        id: 3,
        reporterName: "Test3",
        time: "2023年11月19日22:19:58",
        commentContent: "12345678999999",
        reason: "违法违规",
        description: "testtesttesttesttesttest\
        testtesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttest\
        testtesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttest",
        ischeck: 2,
      },
      handleForm: {
        id: 3,
        reporterName: "Test3",
        time: "2023年11月19日22:19:58",
        commentContent: "12345678999999",
        reason: "违法违规",
        description: "testtesttest",
        ischeck: 2,
      },
      handlingReport: {}
    }
  },
  created(){
    this.getAllCommentReport()
  },
  methods: {
    getAllCommentReport() {
      var promise = AllCommentReport();
      promise.then((result => {
        this.loading = false
        this.commentList = result.data
        if(this.searchKey!=""){
          for(var i=0; i<this.commentList.length; i++){
            if(!this.commentList[i].reporterName.includes(this.searchKey)&&
            !this.commentList[i].reporteeComment.includes(this.searchKey)&&
            !this.commentList[i].reason.includes(this.searchKey)){
              this.paperList.splice(i, 1)
            }
          }
        }
      }))
    },
    handleSizeChange(newSize) {
      this.queryInfo.pagesize = newSize
      // this.getUserList()
    },
    handleCurrentChange(newPage) {
      this.queryInfo.pagenum = newPage
      // this.getUserList()
    },
    showCommentReport(s){
      this.infoVisible = true
      this.dialog_loading = true
      var promise = GetCommentReportByID(s.id);
      promise.then((result)=>{
        this.dialog_loading = false
        this.infoForm = result.data[0]
      })
    },
    handleComment(s) {
      this.dialog_loading = true
      if(s.ischeck === 1){
        this.handleVisible = true
        this.handleForm.id = s.id
        // console.log(this.handleForm.id)
        for(var comment of this.commentList){
          if(comment.id === this.handleForm.id){
            comment.ischeck = 2
          }
        }
        var promise = GetCommentReportByID(s.id);
        promise.then((result)=>{
          this.handleForm = result.data[0]
          this.handlingReport = result.data[0]
          var p2 = HandleCommentReport(s.id, 2)
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
        var promise = GetCommentReportByID(s.id);
        promise.then((result)=>{
          this.handlingReport = result.data[0]
        })
        this.rejectDialogVisible = true
      }else{
        this.showCommentReport(s)
      }
      
    },
    cancelHandle() {
      for(var comment of this.commentList){
        if(comment.id === this.handleForm.id){
          comment.ischeck = 1
        }
      }
      var promise = HandleCommentReport(this.handlingReport.id, 1)
      promise.then((result)=>{
        this.handleVisible = false
      })
    },
    finishHandle() {
      for(var comment of this.commentList){
        if(comment.id === this.handleForm.id){
          comment.ischeck = 3
        }
      }
      var promise = HandleCommentReport(this.handlingReport.id, 3)
      promise.then((result)=>{
        this.handleVisible = false
      })
    },
    rejectHandle() {
      for(var scholar of this.commentList){
        if(scholar.id === this.handleForm.id){
          scholar.ischeck = 4
        }
      }
      var promise = HandleCommentReport(this.handlingReport.id, 4)
      promise.then((result)=>{
        this.handleVisible = false
      })
    },
    reOpen() {
      for(var scholar of this.commentList){
        if(scholar.id === this.handleForm.id){
          scholar.ischeck = 1
        }
      }
      var promise = HandleCommentReport(this.handlingReport.id, 1)
      promise.then((result)=>{
        this.rejectDialogVisible = false
      })
    },
    searchCommentReport() {
      this.loading = true;
      var promise = SearchCommentReport(this.searchKey);
      promise.then((result)=>{
        this.loading = false
        this.commentList = result.data
        if(this.value!=""){
          for(var i=0; i<this.commentList.length; i++){
            if(this.commentList[i].ischeck!=this.value){
              this.commentList.splice(i, 1)
            }
          }
        }
      })
    },
    filterCommentReport() {
      this.loading = true;
      if(this.value==""){
        this.getAllCommentReport()
      }else{
        var promise = FilterCommentReport(this.value);
        promise.then((result)=>{
          this.loading = false
          this.commentList = result.data
          if(this.searchKey!=""){
            for(var i=0; i<this.commentList.length; i++){
              if(!this.commentList[i].reporterName.includes(this.searchKey)&&
              !this.commentList[i].reporteeComment.includes(this.searchKey)&&
              !this.commentList[i].reason.includes(this.searchKey)){
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