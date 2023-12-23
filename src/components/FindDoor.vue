<template>
    <el-dialog v-model="localIsVisibal" title="认领门户">
        <el-table :data="[item]">
            <el-table-column property="name" label="名字" width="170" />
            <el-table-column property="company" label="机构" width="170" />
            <el-table-column property="year" label="年份" width="170" />
            <el-table-column property="source" label="来源" width="170" />
        </el-table>
        <div class="introduceContainer">
            <span style="font-size: 15px;">
                申请理由
            </span>
            <el-input v-model="textarea" :rows="4" type="textarea" placeholder="请输入理由"
                style="box-shadow: 1px 1px 2px #42b983;position: relative;display: flex;" />
        </div>
        <div class="introduceContainer">
            <div>
                <el-button style="position: relative;" type="success" @click="claimDoor">
                    确认
                </el-button>
                <el-button style="position: relative;" type="danger" @click="textarea = ''">
                    重置
                </el-button>
            </div>

        </div>
    </el-dialog>
</template>
<style>
.introduceContainer {
    position: relative;
    flex-direction: column;
    display: flex;
    width: 100%;
    margin-top: 30px;
}
</style>
<script>
import {claimPortal} from "../api/portal.js"
export default {
    props: {
        isVisibal: Boolean,
        item: Object
    },

    data() {
        return {
            localIsVisibal: this.isVisibal,
            textarea: ""
        };
    },
    watch: {
        isVisibal(newVal) {
            this.localIsVisibal = newVal;
        },
        localIsVisibal(newVal) {
            if (newVal !== this.isVisibal) {
                this.$emit('update:isVisibal', newVal);
            }
        }
    },
    methods: {
        claimDoor() {
            var promise = claimPortal("https://openalex.org/A5023888391");
            promise.then((result) => {
                console.log(result);
            })
        },
    },
}
</script>