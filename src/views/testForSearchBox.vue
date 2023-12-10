<template>
    <div class="mainContainer">
        <searchBox width="400px" :isClassVisible=true :searchQuery="searchText" @update:searchQuery="searchText = $event"
            @search="handleSearch"></searchBox>
        <button @click="test">test</button>
    </div>
</template>
<style></style>
<script>
import searchBox from '../components/searchBox.vue'
import {claimPortal} from "../api/portal.js"
export default {
    components: {
        searchBox
    },
    data() {
        return {
            searchText: ''
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
        }
    }
}
</script>
