<template>
  <div>
    <el-breadcrumb separator="/">
			<el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
			<el-breadcrumb-item>管理页面</el-breadcrumb-item>
			<el-breadcrumb-item>学术门户审核</el-breadcrumb-item>
		</el-breadcrumb>

    <el-card>
      <el-row :gutter="24">
				<el-col :span="8">
					<el-input placeholder="请输入内容" clearable>
					</el-input>
				</el-col>
        <el-col :span="1">
          <el-button type="primary" :icon="Search">Search</el-button>
        </el-col>
        <el-col :span="10"></el-col>
        <el-col :span="5">
          <el-select v-model="value" class="m-2" placeholder="Select" clearable >
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-col>
			</el-row>

      <el-table :data="scholarList" border stripe>
        <el-table-column type="index"></el-table-column>
        <el-table-column label="发起人" prop="scholarName"></el-table-column>
        <el-table-column label="时间" prop="time"></el-table-column>
        <el-table-column label="状态">
          <template #default="scope">
            <el-button type="info" plain v-if="scope.row.status==0">待处理</el-button>
            <el-button type="warning" plain v-if="scope.row.status==1">处理中</el-button>
            <el-button type="success" plain v-if="scope.row.status==2">已处理</el-button>
            <el-button type="danger" plain v-if="scope.row.status==3">已驳回</el-button>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="180px">
          <template #default="scope">
            <el-button circle  @click="infoVisible = true">
              <el-icon ><More /></el-icon>
            </el-button>
            <el-button type="primary" round @click="handleScholar(scope.row)">开始处理</el-button>
          </template>
        </el-table-column>
      </el-table>
      
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="queryInfo.pagenum"
        :page-sizes="[1, 2, 5, 10]"
        :page-size="queryInfo.pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total">
      </el-pagination>
      
      <el-dialog title="查看信息" v-model="infoVisible" width="50%" destroy-on-close>
        <el-form :model="infoForm" ref="infoFormRef" label-width="70px">
          <el-form-item label="发起人" prop="scholarName">
            <el-input v-model="infoForm.scholarName" disabled></el-input>
          </el-form-item>
          <el-form-item label="时间" prop="time">
            <el-input v-model="infoForm.time" disabled></el-input>
          </el-form-item>
          <el-form-item label="正文" prop="text">
            <el-input v-model="infoForm.text" type="textarea" :rows="20" disabled></el-input>
          </el-form-item>
        </el-form>

        <span class="dialog-footer">
          <el-button @click="infoVisible = false">确定</el-button>
        </span>
      </el-dialog>

      <el-dialog title="处理" v-model="handleVisible" width="50%" destroy-on-close>
        <el-form :model="handleForm" ref="handleFormRef" label-width="70px">
          <el-form-item label="发起人" prop="scholarName">
            <el-input v-model="handleForm.scholarName" disabled></el-input>
          </el-form-item>
          <el-form-item label="时间" prop="time">
            <el-input v-model="handleForm.time" disabled></el-input>
          </el-form-item>
          <el-form-item label="正文" prop="text">
            <el-input v-model="handleForm.text" type="textarea" :rows="20" disabled></el-input>
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
export default {
  data() {
    return {
      queryInfo: {
				query: '',
				pagenum: 1,
				pagesize:2
			},
      scholarList: [
        {
          id: 1,
          scholarName: "Test",
          time: "2023年11月19日22:02:58",
          status: 0,
        },
        {
          id: 2,
          scholarName: "Test2",
          time: "2023年11月19日22:17:58",
          status: 1,
        },
        {
          id: 3,
          scholarName: "Test3",
          time: "2023年11月19日22:19:58",
          status: 2,
        }
      ],
      options: [
        {
          value: 0,
          label: '待处理',
        },
        {
          value: 1,
          label: '处理中',
        },
        {
          value: 2,
          label: '已处理',
        },
      ],
      value: 0,
      total: 3,
      infoVisible: false,
      handleVisible: false,
      rejectDialogVisible: false,
      infoForm: {
        id: 1,
        scholarName: 'Test',
        time: '2023年11月19日22:19:58',
        text: '这个是要和数据库交互所以点哪个都一样的',
      },
      handleForm: {
        id: 1,
        scholarName: 'Test2',
        time: '2023年11月19日22:19:58',
        text: '和前面那个表格同理点哪个都一样',
      }
    }
  },

  methods: {
    handleSizeChange(newSize) {
      this.queryInfo.pagesize = newSize
      // this.getUserList()
    },
    handleCurrentChange(newPage) {
      this.queryInfo.pagenum = newPage
      // this.getUserList()
    },
    handleScholar(s) {
      if(s.status === 0){
        this.handleVisible = true
        this.handleForm.id = s.id
        // console.log(this.handleForm.id)
        for(var scholar of this.scholarList){
          if(scholar.id === this.handleForm.id){
            scholar.status = 1
          }
        }
      }
      else if(s.status === 1){
        ElMessage('该事务正在处理中！')
      }
      else if(s.status === 3){
        this.rejectDialogVisible = true
      }else{
        this.infoVisible = true
      }
      
    },
    cancelHandle() {
      for(var scholar of this.scholarList){
        if(scholar.id === this.handleForm.id){
          scholar.status = 0
        }
      }
      this.handleVisible = false
    },
    finishHandle() {
      for(var scholar of this.scholarList){
        if(scholar.id === this.handleForm.id){
          scholar.status = 2
        }
      }
      this.handleVisible = false
    },
    rejectHandle() {
      for(var scholar of this.scholarList){
        if(scholar.id === this.handleForm.id){
          scholar.status = 3
        }
      }
      this.handleVisible = false
    },
    reOpen() {
      for(var scholar of this.scholarList){
        if(scholar.id === this.handleForm.id){
          scholar.status = 0
        }
      }
      this.rejectDialogVisible = false
    }
  },
}
</script>

<style>

</style>