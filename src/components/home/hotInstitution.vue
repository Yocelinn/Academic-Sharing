<template>
    <div class="institution">
        <el-card class="institutionCard">
            <div class="header">
                <el-icon><OfficeBuilding /></el-icon>
                知名机构
            </div>
            <div class="body">
                <div class="institutionItem">
                    <el-icon><School /></el-icon>
                    中国科学院
                </div>
                <div class="institutionItem">
                    <el-icon><School /></el-icon>
                    中国科学院
                </div>
                <div class="institutionItem">
                    <el-icon><School /></el-icon>
                    中国科学院
                </div>
                <div class="institutionItem">
                    <el-icon><School /></el-icon>
                    中国科学院
                </div>
                <div class="institutionItem">
                    <el-icon><School /></el-icon>
                    中国科学院
                </div>
            </div>
        </el-card>
    </div>

</template>

<script>

export default{
    props:{

    },
    data(){

    },
    methods:{

    },
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
</style>
