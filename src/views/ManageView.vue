<template>
	<el-container class="home-container">
		<el-container>
			<el-aside>
				<el-menu
				:default-active="activePath"
				class="el-menu-vertical-demo"
				background-color="#545c64"
				text-color="#fff"
				active-text-color="#ffd04b"
				:router="true">
					<el-menu-item :index=scholarPath @click="saveNavState(scholarPath)">
						<el-icon><location /></el-icon>
						<span>学术门户审核</span>
					</el-menu-item>
					<el-menu-item :index=paperPath @click="saveNavState(paperPath)">
						<el-icon><Share /></el-icon>
						<span>学术成果举报</span>
					</el-menu-item>
					<el-menu-item :index=commentsPath @click="saveNavState(commentsPath)">
						<el-icon><document /></el-icon>
						<span>学术成果评论</span>
					</el-menu-item>
				</el-menu>
			</el-aside>
			
			<el-main>
				<router-view></router-view>
			</el-main>
		</el-container>
	</el-container>
</template>

<script>

export default {
	data() {
		return{
			scholarPath: "/manage/scholar",
			paperPath: "/manage/paper",
			commentsPath: "/manage/comments",
			activePath: '/manage/scholar'
		}
	},
	created() {
		this.activePath = window.sessionStorage.getItem('activePath')
	},
	methods: {
		saveNavState(path) {
      window.sessionStorage.setItem('activePath', path)
      this.activePath = path
    }
	}
}
</script>

<style lang="less" scoped>
.home-container {
  height: 100%;
}
.el-aside {
  background-color: #333744;
  height: 100%;
	width: 15%;
	.el-menu{
		height: 100%;
	}
}
</style>
