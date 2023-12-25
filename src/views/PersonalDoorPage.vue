<template>
    
    <el-alert title="error" type="error" description="该学者不存在" show-icon v-if="authorIsExit == false" />
    <div v-loading="isLoading" style="margin-top: 100px;">
    </div>
    <div v-if="!isLoading">
        <FindDoor v-model="isDialoVisibal" :item="nowPerson">

        </FindDoor>
        <div class="allContainer">
            <div class="mainContainer">
                <div class="main">
                    <div style="top:30px;width: 100%;display: flex;position: relative;align-items: flex-start;">
                        <div class="header">
                            <div class="headerText">
                                <div class="nameContainer">
                                    {{ authorName }}
                                </div>
                                <div class="factoryConainer" style="color: #529b2e;cursor: pointer;" id="factory"
                                    @mousemove="mouseOverToChangeColor('factory')"
                                    @mouseleave="mouseLeaveToChangeColor('factory')">
                                    {{ authorData.organization }}
                                </div>
                                <span class="factoryConainer" style="margin-top: 10px;">
                                    简介 ： {{ authorData.introduction }}
                                </span>
                                <span class="factoryConainer" style="margin-top: 10px;font-weight: 700;">
                                    成果数量:{{ authorData.achievementsNum }} &nbsp &nbsp &nbsp &nbsp 被引次数:{{
                                        authorData.citationsNum }}
                                </span>
                            </div>
                            <div class="sameNamePersonBlock">
                                <div class="sameName">
                                    <div>
                                        <span>
                                            类似名字作者
                                        </span>
                                        <el-button type="primary" style="margin-left: 30px;height: 30px;"
                                            @click="findauthor" v-if="!authorData.isRelate">
                                            认领门户
                                        </el-button>
                                    </div>
                                    <div v-for="(item, index) in sameNamePerson" :key="index"
                                        style="font-size: 14px;margin-top: 10px;">
                                        <span style="font-weight: 400;color: #529b2e;" :id="'sameName' + index">
                                            {{ item }}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="fiedContainer">
                        <div class="fieldInnerContainer">
                            <span
                                style="display: flex;position: relative;font-size: 20px;width: 100%;border-bottom:2px solid #c8c9cc ;height: 40px;">
                                作者关注领域
                            </span>
                            <div class="detailFieldContainer">
                                <span v-for="(item, index) in detailField" :key="index" class="eachField"
                                    :id="'eachField' + index">
                                    {{ item }}
                                </span>
                            </div>
                        </div>
                    </div>
                    <div class="fiedContainer" style="margin-top: 30px;">
                        <div class="fieldInnerContainer">
                            <span
                                style="display: flex;position: relative;font-size: 20px;width: 100%;border-bottom:2px solid #c8c9cc ;height: 40px;">
                                作者成果
                            </span>
                            <div class="detailFieldContainer" style="flex-direction: column;">
                                <div v-for="(item, index) in messageList" :key="index" class="messageListItemContainer">
                                    <span>
                                        [{{ index + 1 }}]
                                    </span>
                                    <span class="eachMessage" :id="'eachMessage' + index"
                                        
                                        style="color: #529b2e;max-width: 600px;overflow: hidden;">
                                        {{ item.title }}.
                                    </span>
                                    <!-- <div>
                                        <span v-for="(e, i) in item.authorList" :key="i"
                                            style="color: #73767a;font-weight: 500;">
                                            {{ e }};
                                        </span>
                                    </div> -->
                                    <span style="color: #73767a;font-weight: 500;">
                                        {{ item.date }}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<style>
.messageListItemContainer {
    position: relative;
    display: flex;
    border-bottom: 2px dashed #c8c9cc;
    margin-bottom: 20px;
    height: 20px;
    margin-left: 50px;
    font-size: 15px;
}

.eachField {
    margin-left: 50px;
    font-size: 18px;
    color: #529b2e;
}

.detailFieldContainer {
    position: relative;
    display: flex;
    width: 100%;
    margin-left: -50px;
    margin-top: 20px;
    flex-wrap: wrap;
}

.fieldInnerContainer {
    width: 83%;
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
}

.fiedContainer {
    position: relative;
    display: flex;
    width: 100%;
    margin-top: 70px;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

.sameName {
    position: relative;
    display: flex;
    flex-direction: column;
    height: auto;
    margin-left: 30px;
}

.headerText {
    position: relative;
    display: flex;
    flex-direction: column;
    width: 300px;
}

.sameNamePersonBlock {
    position: relative;
    background-color: #F2F6FC;
    height: auto;
    width: 300px;
    margin-left: 100px;

}

.allContainer {
    position: relative;
    display: flex;
    text-align: center;
    align-items: center;
    justify-content: center;
    width: 100%;
}

.mainContainer {
    position: relative;
    display: flex;
    justify-content: center;
    min-height: 670px;
    width: 95%;
    box-shadow: 2px 2px 5px #42b983;
    background-color: #f0f9eb;
}

.main {
    position: relative;
    display: flex;
    flex-direction: column;
    height: 100%;
    width: 90%;
    align-items: flex-start;
}

.header {
    position: relative;
    display: flex;
    align-items: flex-start;
    padding-bottom: 30px;
    width: 85%;
    justify-content: left;
    text-align: left;
    left: 100px;
    border-bottom: #c8c9cc;
    border-bottom-style: solid;
    border-bottom-width: 2px;
}

.nameContainer {
    font-size: 28px;
    font-weight: 700;
}

.factoryConainer {
    font-size: 16px;
    margin-top: 15px;
}
</style>
<script>
import FindDoor from '@/components/FindDoor.vue';
import { getAuthorInfo } from "../api/portal.js"
import store from '@/store';

export default {
    components: {
        FindDoor
    },
    data() {
        return {
            authorIsExit: true,
            authorName: "",
            isLoading: true,
            authorData: "",
            uid: "",
            isDialoVisibal: false,
            nowPerson: {

            },
            sameNamePerson: [
                {
                    name: "康家麒",
                    factory: '北京航空航天大学'
                },
                {
                    name: "康家麒",
                    factory: '北京航空航天大学'
                },
                {
                    name: "康家麒",
                    factory: '北京航空航天大学'
                },
                {
                    name: "康家麒",
                    factory: '北京航空航天大学'
                },
                {
                    name: "康家麒",
                    factory: '北京航空航天大学'
                },
            ],
            detailField: [],
            messageList: []
        }
    },
    methods: {
        mouseOverToChangeColor(id) {
            console.log(id)
            var ele = document.querySelector("#" + id)
            ele.style.color = "#409EFF"
        },
        mouseLeaveToChangeColor(id) {
            var ele = document.querySelector("#" + id)
            ele.style.color = "#529b2e"
        },
        findauthor() {
            this.nowPerson = {}
            this.nowPerson.name = this.authorName
            this.nowPerson.achievementsNum = this.authorData.achievementsNum
            this.nowPerson.citationsNum = this.authorData.citationsNum
            this.nowPerson.uid = this.uid
            this.isDialoVisibal = true
        }
    },
    mounted() {
        console.log(this.$route.query.query)
        this.uid = this.$route.query.query
        console.log(this.uid);
        var promise = getAuthorInfo(this.uid);
        promise.then((result) => {
            console.log(result)
            if (result.code == 1008) {
                this.authorIsExit = false;
                return;
            }
            else {
                console.log(result);
                this.isLoading = false;
                this.authorData = result.data;
                this.detailField = this.authorData.interests
                console.log(this.authorData)
                this.authorName = result.data.name
                this.messageList = this.authorData.myWorkDisArrayList
                this.sameNamePerson = this.authorData.names
            }
        })
    },

}
</script>