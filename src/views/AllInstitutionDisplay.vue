<template>
    <div >
        <institutionDisplay :institution="institution"></institutionDisplay>
        <div class="pagination"> 
        <el-pagination
            v-if="totalPage>1"
            class="center-pagination"
            background
            :hide-on-single-page="false"
            :current-page="currentPage"
            :page-size="InstitutionPerPage"
            :total="institution.length"
            layout="prev, pager, next"
            @current-change="handlePageChange"
          ></el-pagination>
       </div>
       
    </div>
   </template>
   
   <script>
import { defineComponent,ref,h, onMounted,onUnmounted,computed } from "vue";
import institutionDisplay from "@/components/institutionDisplay.vue"
import {get} from "@/api/api.js"
export default defineComponent({
    components:{
        institutionDisplay
    },
    setup() {
       onMounted(async()=>{
        try{
           await getData();
           totalPage.value=Math.ceil(institution.value.length /InstitutionPerPage.value)
        }
        catch(error){

        }
       })
   
        const displayedInstitution = computed(() => {
            const startIndex = (currentPage.value - 1) * InstitutionPerPage.value;
            const endIndex = startIndex + InstitutionPerPage.value;
            console.log(institution.value.slice(startIndex, endIndex))
            return institution.value.slice(startIndex, endIndex);
        });
        var currentPage=ref(1);
        var InstitutionPerPage=ref(12);
    //     const institution=ref([{id:1,name:11111,introduction:"aaaaaa"},
    //                            {id:2,name:11111,introduction:"aaaaaa"},
    //                            {id:3,name:11111,introduction:"aaaaaa"},
    //                            {id:4,name:11111,introduction:"aaaaaa"},
    //                            {id:5,name:11111,introduction:"aaaaaa"},
    //                            {id:6,name:11111,introduction:"aaaaaa"},
    //                            {id:7,name:11111,introduction:"aaaaaa"},
    //                            {id:8,name:11111,introduction:"aaaaaa"},
    //                            {id:9,name:11111,introduction:"aaaaaa"},
    //                            {id:10,name:11111,introduction:"aaaaaa"},
    //                            {id:11,name:99911111,introduction:"aaaaaa"},
    //                            {id:12,name:11111,introduction:"aaaaaa"},
    //                            {id:13,name:13461111,introduction:"aaaaaa"},
    //                            {id:14,name:11111,introduction:"aaaaaa"},
    //                            {id:15,name:11111,introduction:"aaaaaa"},
    //                            {id:16,name:11341111,introduction:"aaaaaa"},
    //                            {id:17,name:11111,introduction:"aaaaaa"},
    //                            {id:18,name:32452111,introduction:"aaaaaa"},
    //                            {id:19,name:8121111,introduction:"aaaaaa"},
    //                            {id:20,name:67111,introduction:"aaaaaa"},
    //                            {id:21,name:121111,introduction:"aaaaaa"},
    //                            {id:22,name:123111,introduction:"aaaaaa"},
    //                            {id:23,name:3111,introduction:"aaaaaa"},
    //                            {id:24,name:12211,introduction:"aaaaaa"},
    // ])
    var institution=ref()
    async function getData(){
        get('/institution/getInstitutionsForMainPage')
        .then(response=>{
            institution.value=response.data;
            console.log(institution.value)
        })
        .catch(error=>{
            console.log(error)
        })
    }
    const totalPage=ref()
    function handlePageChange(newPage){
        currentPage.value=newPage;

    }
        return {institution,currentPage,InstitutionPerPage,handlePageChange,displayedInstitution,totalPage,getData}
    },
})
</script>
<style scoped>

.pagination{
    display: flex;
    justify-content: center;
}
</style>
  
