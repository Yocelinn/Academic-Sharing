<template>
    <div class="mainContainer">
        <!-- <el-button style="margin-top: 100px;" @click="isDialoVisibal = true">test</el-button>
        <seniorSearchBox v-model="isDialoVisibal"></seniorSearchBox> -->
        <searchBox width=50 color="white" :isClassVisible=false  :isLargeModel = false></searchBox>
        <el-button @click="test1">test</el-button>
        <!-- <button @click="test">test</button> -->
    </div>
</template>
<style></style>
<script>
import searchBox from '../components/searchBox.vue'
import seniorSearchBox from '../components/seniorSearchPage.vue'
import {claimPortal} from "../api/portal.js"
export default {
    components: {
        searchBox,
        seniorSearchBox
    },
    data() {
        return {
            radio : 0,
            searchText: '',
            isDialoVisibal : false,
        }
    },
    methods: {
        handleSearch(query) {
            console.log('搜索内容：', query);
            // 你可以在这里进行搜索逻辑
        },
        test(){
            var promise = claimPortal("https://openalex.org/A5023888391");
            promise.then((result) =>{
                console.log(result);
            })
        },
        test1(){
            this.radio++;
            console.log(this.radio)
        }
    }
}
</script>
