<template class="hotArea">
    <div class="hot-title">
        热点领域
    </div>
    <button class="typeButton" @click="this.switchShowType()">{{ this.typeString }}</button>
    <div v-show="this.showType==='barGraph'" class="barGraph">
        <div id="bar"></div>
        <div id="barTitle"></div>
    </div>
    <div v-show="this.showType==='pieChart'" class="pieChart">

    </div>
</template>

<script>


export default{
    data(){
        return{
            showType: "barGraph",
            typeString:"扇形图展示",
            hotAreaList:[{name: "医学", count: "3000"},{name: "1", count: "3000"},{name: "1", count: "2500"},{name: "1", count: "3000"},
            {name: "1", count: "3000"},{name: "1", count: "3000"},{name: "1", count: "1000"},{name: "1", count: "3000"},
            {name: "1", count: "3000"},{name: "1", count: "3000"},],
            heightList:[0,0,0,0,0,0,0,0,0,0],
        }
    },
    methods: {
        switchShowType(){
            if(this.showType==="barGraph"){
                this.showType="pieChart";
                this.typeString="柱状图展示";
                this.loadPie();
            } else{
                this.showType="barGraph";
                this.typeString="扇形图展示";
                this.drawOfBar();
            }
        },
        getData(){
            //获取数据的代码

            if(this.showType==="barGraph"){
                this.typeString="扇形图展示";
                this.loadBar();
            } else{
                this.typeString="柱状图展示";
                this.loadPie();
            }
        },
        loadBar(){
            var barGraph=document.getElementById("bar");
            var barList=[];
            var maxCount=0;
            for(var i=0;i<10;i++){
                if(this.hotAreaList[i].count>maxCount){
                    maxCount=this.hotAreaList[i].count;
                }
            }
            for(var i=1;i<=10;i++){
                barList.push(document.createElement("div"));
                barList[i-1].id="bar"+i;
                barList[i-1].style.position="absolute";
                barList[i-1].style.left=((i-1)*10+2.5)+"%";
                barList[i-1].style.bottom="0%";
                this.heightList[i-1]=this.hotAreaList[i-1].count/maxCount*75;
                barList[i-1].style.height="0%";
                barList[i-1].style.width="5%";
                barList[i-1].style.backgroundColor="#68b0ab";
                var number=document.createElement("div");
                number.textContent=this.hotAreaList[i-1].count;
                number.style.position="absolute";
                number.style.top="-20px";
                number.style.fontSize="14px";
                number.style.fontStyle="italic";
                number.style.width="100%"
                barList[i-1].appendChild(number);
                var name=document.createElement("div");
                name.textContent=this.hotAreaList[i-1].name;
                name.style.position="absolute";
                name.style.bottom="-20px";
                name.style.fontSize="14px";
                name.style.fontStyle="italic";
                name.style.width="100%";
                barList[i-1].appendChild(name);
            }
            for(var i=0;i<10;i++){
                barGraph.appendChild(barList[i]);
            }
            this.drawOfBar();
        },
        drawOfBar(){
            for(var i=1;i<=10;i++){
                this.barDraw(document.getElementById("bar"+i), this.heightList[i-1]);
            }
        },
        loadPie(){

        },
        barDraw(object, height){
            var init=0;
            var timer=setInterval(function(){
                if(init>=height){
                    clearInterval(timer);
                }
                init++;
                object.style.height=init+"%";
            },10)
        }
    },
    mounted(){
        this.getData();
    }
}

</script>

<style scoped>
.hotArea{
    position: relative;
    width: 100%;
    height: 100%;
}
.hot-title{
    position: absolute;
    background-color: #2b463c;
    width: 10%;
    height: 30px;
    top: -15px;
    left: 45%;
    z-index: 1;
    font-size: 20px;
    color: white;
}
.hot-title::before,.hot-title::after{
    content: '';
    position: absolute;
    top: 50%;
    width: 0;
    height: 0;
    border-style: solid;
    transform: translateY(-50%);
}
.hot-title::before{
    left: 100%;
    border-width: 15.5px 0 15.5px 15.5px;
    border-color: transparent transparent transparent #2b463c;
}
.hot-title::after{
    right: 100%;
    border-width: 15.5px 15.5px 15.5px 0;
    border-color: transparent #2b463c transparent transparent;
}
.typeButton{
    position: absolute;
    background-color: #4a7c59;
    color: #faf3dd;
    width: 10%;
    height: 30px;
    font-size: 14px;
    top: 10px;
    right: 10%;
    z-index: 1;
    border: 0ch;
    border-radius: 1ch;
}
.typeButton:hover{
    background-color: #c8d5b9;
}
.barGraph{
    position: relative;
    left: 2%;
    width: 96%;
    height: 100%;
}
#bar{
    position: relative;
    border-bottom: 3px solid #68b0ab;
    width: 100%;
    height: 80%;
}

</style>