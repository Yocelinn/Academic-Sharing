<template>
    <div class="institution">
        <el-card class="institutionCard">
            <div class="header">
                    <el-icon><OfficeBuilding /></el-icon>
                    知名机构：Well-Known Institutions
                </div>
            <div class="body">
                <div class="item">中国科学院</div>
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
    height: 50px;
    line-height: 100%;
    text-align: left;
    font-size: 17px;
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
    height: 620px;
    top: 0px;
    border: 1px solid silver;
}
.item{
    position: relative;
    height: 10%;

}
</style>
