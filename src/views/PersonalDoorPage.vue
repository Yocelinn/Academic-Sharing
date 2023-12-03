<template>
    <FindDoor v-model="isDialoVisibal" :item="nowPerson">

    </FindDoor>
    <div class="allContainer">
        <div class="mainContainer">
            <div class="main">
                <div style="top:30px;width: 100%;display: flex;position: relative;align-items: flex-start;">
                    <div class="header">
                        <div class="headerText">
                            <div class="nameContainer">
                                康家麒
                            </div>
                            <div class="factoryConainer" style="color: #529b2e;cursor: pointer;" id="factory"
                                @mousemove="mouseOverToChangeColor('factory')"
                                @mouseleave="mouseLeaveToChangeColor('factory')">
                                北京航空航天大学
                            </div>
                            <span class="factoryConainer" style="margin-top: 10px;">
                                软件工程
                            </span>
                            <span class="factoryConainer" style="margin-top: 10px;font-weight: 700;">
                                总发文量:0 &nbsp &nbsp &nbsp &nbsp 总下载量:0
                            </span>
                        </div>
                        <div class="sameNamePersonBlock">
                            <div class="sameName">
                                <div>
                                    <span>
                                        同名作者
                                    </span>
                                    <el-button type="primary" style="margin-left: 30px;height: 30px;" @click="findauthor">
                                        认领门户
                                    </el-button>
                                </div>
                                <div v-for="(item, index) in sameNamePerson" :key="index"
                                    style="font-size: 14px;margin-top: 10px;">
                                    <span style="font-weight: 400;cursor: pointer;color: #529b2e;" :id="'sameName' + index"
                                        @mouseover="mouseOverToChangeColor('sameName' + index)"
                                        @mouseleave="mouseLeaveToChangeColor('sameName' + index)">
                                        {{ item.name }}
                                    </span>
                                    <span style="margin-left: 20px;font-weight: 600;cursor: pointer;color: #529b2e;"
                                        :id="'sameNameFactory' + index"
                                        @mouseover="mouseOverToChangeColor('sameNameFactory' + index)"
                                        @mouseleave="mouseLeaveToChangeColor('sameNameFactory' + index)">
                                        {{ item.factory }}
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
                                :id="'eachField' + index" @mouseover="mouseOverToChangeColor('eachField' + index)"
                                @mouseleave="mouseLeaveToChangeColor('eachField' + index)">
                                {{ item }}
                            </span>
                        </div>
                    </div>
                </div>
                <div class="fiedContainer" style="margin-top: 30px;">
                    <div class="fieldInnerContainer">
                        <span
                            style="display: flex;position: relative;font-size: 20px;width: 100%;border-bottom:2px solid #c8c9cc ;height: 40px;">
                            作者文献
                        </span>
                        <div class="detailFieldContainer" style="flex-direction: column;">
                            <div v-for="(item, index) in messageList" :key="index" class="messageListItemContainer">
                                <span>
                                    [{{ index + 1 }}]
                                </span>
                                <span class="eachMessage" :id="'eachMessage' + index"
                                    @mousemove="mouseOverToChangeColor('eachMessage' + index)"
                                    @mouseleave="mouseLeaveToChangeColor('eachMessage' + index)"
                                    style="color: #529b2e;cursor: pointer;">
                                    {{ item.name }}.
                                </span>
                                <div>
                                    <span v-for="(e, i) in item.authorList" :key="i"
                                        style="color: #73767a;font-weight: 500;">
                                        {{ e }};
                                    </span>
                                </div>
                                <span style="color: #73767a;font-weight: 500;">
                                    {{ item.year }}
                                </span>
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
    cursor: pointer;
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
    width: 400px;
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
    box-shadow: 2px 2px 5px #409eff;
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
export default {
    components: {
    FindDoor
  },
    data() {
        return {
            isDialoVisibal: false,
            nowPerson: {
                "name": "康家麒",
                "company": "北京航空航天大学",
                "essay": ["none", "none", "none"],
                "year": 2002,
                "source": "buaa"

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
            detailField: [
                'test', 'test', 'test', 'test',
                'test', 'test', 'test', 'test',
                'test', 'test', 'test', 'test', 'test',
                'test', 'test', 'test', 'test', 'test', 'test', 'test', 'test',
                'test', 'test', 'test', 'test',
                'test', 'test', 'test', 'test', 'test',
                'test', 'test', 'test', 'test',
                'test', 'test', 'test', 'test',
                'test', 'test', 'test', 'test',
                'test', 'test', 'test', 'test', 'test',
                'test', 'test', 'test', 'test'
            ],
            messageList: [
                {
                    name: "TestMessage",
                    authorList: [
                        "testauthor",
                        "testauthor",
                        "testauthor",
                        "testauthor",
                    ],
                    year: 2020,
                },
                {
                    name: "TestMessage",
                    authorList: [
                        "testauthor",
                        "testauthor",
                        "testauthor",
                        "testauthor",
                    ],
                    year: 2020,
                },
                {
                    name: "TestMessage",
                    authorList: [
                        "testauthor",
                        "testauthor",
                        "testauthor",
                        "testauthor",
                    ],
                    year: 2020,
                },
                {
                    name: "TestMessage",
                    authorList: [
                        "testauthor",
                        "testauthor",
                        "testauthor",
                        "testauthor",
                    ],
                    year: 2020,
                },
            ]
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
        findauthor(){
            this.isDialoVisibal = true;
        }
    },

}
</script>