<template>
    <div >
           
        <institutionDisplay :institution="displayedInstitution" :loading="loading"></institutionDisplay>
        
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
        //    await getData();
        get('/institution/getInstitutionsForMainPage')
        .then(response=>{
            institution.value=response.results;
            totalPage.value=Math.ceil(institution.value.length /InstitutionPerPage.value);
            // console.log(institution.value);
            loading.value=false;
        })
        .catch(error=>{
            console.log(error)
        })
        //    console.log(totalPage.value)
        }
        catch(error){

        }
       })
       var InstitutionPerPage=ref(8);
       var currentPage=ref(1);
       var loading=ref(true)
        const displayedInstitution = computed(() => {
            // console.log(institution.value)
            const startIndex = (currentPage.value - 1) * InstitutionPerPage.value;
            const endIndex = startIndex + InstitutionPerPage.value;
            // console.log(institution.value.slice(startIndex, endIndex))
            return institution.value.slice(startIndex, endIndex);
        });
    var institution=ref([])
    const totalPage=ref()
    function handlePageChange(newPage){
        currentPage.value=newPage;

    }
        return {institution,currentPage,InstitutionPerPage,handlePageChange,displayedInstitution,totalPage,loading}
    },
})
</script>
<style scoped>

.pagination{
    display: flex;
    justify-content: center;
    margin-bottom:10px;

}
</style>
  
