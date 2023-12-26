<template>
    <el-dialog v-model="localIsVisibal" title="认领门户">
        <el-table :data="[item]">
            <el-table-column property="name" label="名字" width="230" />
            <el-table-column property="achievementsNum" label="成果数量" width="230" />
            <el-table-column property="citationsNum" label="被引次数" width="230" />
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
import { claimPortal } from "../api/portal.js"
import { ElNotification } from 'element-plus';
import store from '@/store';
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
            if (this.$store.state.userInfo.isLogin == false) {
                ElNotification({
                    message: "您还未登陆，请登录后再进行认证",
                    type: 'error',
                    showClose: true,
                    position: 'top-right',
                    duration: 2000,
                });
                return ;
            }
            console.log(this.item)
            var promise = claimPortal(this.item.uid, this.textarea);
            console.log(this.item.uid,this.textarea)
            promise.then((result) => {
                if (result.code == 1022) {
                    ElNotification({
                        message: "您已经认领过门户，不能重复认领",
                        type: 'error',
                        showClose: true,
                        position: 'top-right',
                        duration: 2000,
                    });
                }
                else if (result.code == 200) {
                    {
                        ElNotification({
                            message: "发送成功，等待审核",
                            type: 'success',
                            showClose: true,
                            position: 'top-right',
                            duration: 2000,
                        });
                    }
                }
                console.log(result);
            })
        },
    },
}
</script>