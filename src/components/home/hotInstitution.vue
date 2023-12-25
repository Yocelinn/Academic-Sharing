<template>
    <div class="institution">
        <el-card class="institutionCard">
            <div class="header" @click="this.jumpToInstitutions()">
                <el-icon><OfficeBuilding /></el-icon>
                知名机构
                <div class="moreInstitution">更多<el-icon style="position: absolute;height: 100%;width: 100%;top: -15%;right: -5px;"><Right /></el-icon></div>
            </div>
            <div class="body">
                <div v-for="i in institutionList.length" class="institutionItem">
                    <el-text size="large" truncated style="position: relative; top: 30%;">{{ this.institutionList[i-1].displayName }}</el-text>
                </div>
            </div>
        </el-card>
    </div>

</template>

<script>
import { GetInstitutionsForMainPage } from '@/api/institution';

export default{
    props:{

    },
    data(){
        return{
            institutionList:[],
        }
    },
    methods:{
        jumpToInstitutions(){
            this.$router.push('/allInstitution');
        }
    },
    mounted(){
        var promise=GetInstitutionsForMainPage();
        promise.then((result) => {
            for(var i=0;i<5;i++){
                this.institutionList.push(result.results[i]);
            }
            console.log(this.institutionList);
        })
    }
}
</script>

<style scoped>
.institution{
    position: relative;
    width: 90%;
    height: 90%;
    left: 5%;
    top: 5%;
}
.institutionCard{
    position: relative;
    width: 100%;
    height: 100%;
}
.header{
    position: relative;
    width: 100%;
    height: 40px;
    line-height: 100%;
    text-align: left;
    font-size: 24px;
    font-weight: 900;
    font-style: italic;
    color: #68b0ab;
}
.header:hover{
    cursor: pointer;
    color: #4a7c59;
}
.body{
    position: relative;
    width: 100%;
    height: 280px;
    top: 0px;
    border: 1px solid silver;
    border-radius: 4%;
}
.institutionItem{
    position: relative;
    height: 12%;
    width: 90%;
    margin-top: 11px;
    margin-left: 5%;
    text-align: left;
    font-style: italic;
    font-size: 20px;
    font-weight: 600;
    border-bottom: 2px solid silver;
    color: #68b0ab;
}
.institutionItem:hover{
    cursor: pointer;
    color: #4a7c59;
}
.moreInstitution{
    position: absolute;
    width: 20%;
    height: 100%;
    top: 20%;
    right: 0%;
    font-size: 16px;
    font-weight: 600;
}
</style>
