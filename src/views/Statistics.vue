<script setup>
import {useUserStore} from "@/stores/useUserStore"
import {reactive} from "vue"
const userStore = useUserStore()

const employeeMood = reactive({
  happy : { value : 7 , color : "yellow"},
  stress :  { value : 10 , color : "red"},
  bored :  { value : 5 , color : "purple"},
  tired :  { value : 6 , color : "cyan"}
})

const employeeSatisfied = reactive({
  coworker : 7,
  environment : 10,
  responsibility : 4
})

</script>

<template>
    <main class="w-screen h-screen bg-slate-300 p-4 overflow-y-scroll">
        <div class="font-basblue text-5xl text-black">Employee Insight statistics</div>
        
            <div class="chart-container w-fit pt-8">
                <div class="base"></div>
                <div class="w-full h-full flex  justify-evenly items-end">
                <div v-for="chart in employeeMood" class="bar" :style="{height:`${chart.value*10}%`}">
                  <div class="back" :style="{backgroundColor : 'green'}"></div>
                  <div class="top" :style="{backgroundColor : 'blue'}"></div>
                </div>
               
              </div>
            </div>
    </main>
</template>

<style scoped>


.base {
  position: absolute;
  bottom: 0;
  left: -35px;
  width: 825px;
  height: 20px;
  background-color: rgba(255,255,255,0.05);
  -moz-transform: skew(45deg);
  -o-transform: skew(45deg);
  -webkit-transform: skew(45deg);
}

.chart-container {
  position: relative;
  z-index: 0;
  width: 800px;
  height: 500px;
  background-color: rgba(101, 101, 99, 0.8);
}

.chart-container:after {
  content:"";
  position: absolute;
  top: -15px;
  left: -8px;
  height: 15px;
  width: 800px;
  background-color: rgba(255,255,255,0.055);
  -moz-transform: skew(45deg);
  -o-transform: skew(45deg);
  -webkit-transform: skew(45deg);
  transform: skew(45deg);
}




/* ---------------------
  Vertical Bars
----------------------*/

.bar {
  position:relative;
  bottom: 0;
  z-index: 99;
  width: 40px;
  
}

.back {
  content: "";
  position: absolute;
  left: -15px;
  bottom: 7px;
  height: 100%;
  width: 15px;
  -webkit-transform: skewY(45deg);
}

.top {
  content: "";
  position: absolute;
  top: -15px;
  left: -8px;
  width: 40px;
  height: 15px;
  -moz-transform: skewX(45deg);
  -o-transform: skewX(45deg);
  -webkit-transform: skewX(45deg);
  transform: skewX(45deg);
}

</style>