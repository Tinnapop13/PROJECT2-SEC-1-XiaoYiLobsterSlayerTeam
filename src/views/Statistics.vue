<script setup>
import { useUserStore } from "@/stores/useUserStore"
import { readProfileData } from "@/libs/crud";
import { ref, reactive, computed, onMounted } from "vue"
import ManyEmployeeIcon from "@/components/ManyEmployeeIcon.vue"
import LeastEmployeeIcon from "@/components/LeastEmployeeIcon.vue"
const userStore = useUserStore()
const currentState = ref("MOOD RATIO")
const profileData = ref(null)
let countAllMood = 0
let mostEmployeeMood = []
let leastEmployeeMood = []

const chartAnimationVar = reactive({
  stress: "",
  happy:'',
  bored:'',
  tired:''

})

const employeeMood = reactive({
  happy: { amount: 0, color: "#F2CD0F" },
  stress: { amount: 0, color: "red" },
  bored: { amount: 0, color: "#AD5CFF" },
  tired: { amount: 0, color: "#0C8EFF" }
})


const displayColor = (chart) => {
  return {
    ['bg-red-500/[0.5]']: chart.color === "red",
    ['bg-yellow-500/[0.5]']: chart.color === "#F2CD0F",
    ['bg-purple-500/[0.5]']: chart.color === "#AD5CFF",
    ['bg-cyan-500/[0.5]']: chart.color === "#0C8EFF"
  }
}

onMounted(async () => {
  profileData.value = await readProfileData()
  Object.entries(employeeMood).forEach(([mood, info]) => {
    employeeMood[mood].amount = userStore.filteredData.filter((employee) => employee.LinkImage.includes(mood)).length
    countAllMood += employeeMood[mood].amount
  });

  Object.entries(employeeMood).forEach(([mood, info]) => {
    if (mostEmployeeMood.every(mood => mood.amount < info.amount)) {
      mostEmployeeMood = []
      mostEmployeeMood.push({ mood: mood, amount: info.amount })
    }
    else if (mostEmployeeMood.every(mood => mood.amount === info.amount)) {
      mostEmployeeMood.push({ mood: mood, amount: info.amount })
    }

    if (leastEmployeeMood.every(mood => mood.amount > info.amount)) {
      leastEmployeeMood = []
      leastEmployeeMood.push({ mood: mood, amount: info.amount })
    }
    else if (leastEmployeeMood.every(mood => mood.amount === info.amount)) {
      leastEmployeeMood.push({ mood: mood, amount: info.amount })
    }

  });
})
</script>

<template>
  <main class="w-screen h-screen bg-slate-300 p-4 overflow-y-scroll items-center flex flex-col">

<!-- ============================================
     ================ Stat Header ===============
     ============================================ -->
    <div class="font-basblue text-5xl text-black flex gap-4 w-full justify-center my-4">Employee 
      <div class="text-blue-900">{{ currentState }}
      </div>
    </div>

<!-- ============================================
     =========== Chart Container ================
     ============================================ -->

    <div class="container w-full pt-8 flex">
      <div class="base"></div>
      <div class="chart-container w-1/2 h-full flex  justify-evenly items-end">
        <div v-for="[name, chart] in Object.entries(employeeMood)" class="bar h-0 chart " :class="displayColor(chart)"
          :style="{ height: `${((chart.amount / countAllMood) * 100).toFixed(2)}%` }">
          <div class="back brightness-50" :class="displayColor(chart)"></div>
          <div class="top brightness-200" :class="displayColor(chart)"></div>
          <div class="font-basblue text-center absolute  -top-10 -left-1 text-4xl drop-shadow-lg text-slate-100">{{
      ((chart.amount / countAllMood) * 100).toFixed(2) }}%</div>
          <div class="w-full h-[50px] -bottom-14 absolute text-3xl font-basblue flex justify-center"
            :style="{ color: chart.color }">
            {{ name }}
          </div>
        </div>
      </div>

<!-- ============================================
     ================ Stat Info =================
     ============================================ -->

      <div class="w-1/2  rounded-2xl p-4">
        <div class="font-basblue text-4xl  text-slate-800 divider after:bg-slate-900 divider-start">Statistics </div>
        <div class="flex flex-wrap gap-4 justify-between">
          <div v-for="[name, info] in !profileData ? {} : Object.entries(employeeMood)"
            class="flex items-center  bg-white rounded-lg shadow-lg w-[48.8%] h-2/5 gap-4 p-4">
            <img :src="profileData[name]" class="w-[80px] h-[80px]">
            <div class="flex flex-col">
              <div class="text-2xl w-full  font-basblue" :style="{ color: `${info.color}` }">{{ name }}</div>
              <div class="font-basblue text-xl text-sky-950 flex gap-4 items-end">
                <div class="text-3xl  font-extrabold">{{ ((employeeMood[name].amount / countAllMood) * 100).toFixed(2)
                  }}
                  % </div>
                <div class="text-slate-400">{{ employeeMood[name].amount }} In Total </div>
              </div>
            </div>
          </div>



          <div class=" w-full border-opacity-50 ">
            <div class="divider font-basblue text-4xl  text-slate-800 before:bg-slate-800 my-2 m-0 divider-end">Total {{ countAllMood }}</div>
          </div>

<!-- ============================================
     =========== Stat Info 2nd Section ==========
     ============================================ -->

          <div class="w-full flex justify-between  gap-4 ">

            <div class="font-basblue text-2xl flex flex-col w-full h-fit bg-sky-800 gap-2 p-4 rounded-lg shadow-lg">
              <div class="flex flex-row items-center gap-4">
              <ManyEmployeeIcon class="size-10" />
              <div class="h-fit">Most founded Mood </div>
            </div>
              
                <div v-for="mood in mostEmployeeMood.length === 4 ? [''] : mostEmployeeMood" class="font-extrabold" :style="{ color : employeeMood[mood.mood]?.color}">- {{ mostEmployeeMood.length === 4 ? "All Mood" : mood.mood }}</div>
         
            </div>

            <div class="font-basblue text-2xl flex flex-col w-full h-fit bg-sky-800 gap-2 p-4 rounded-lg shadow-lg">
              <div class="flex flex-row items-center gap-4">
              <LeastEmployeeIcon class="size-10" />
              <div class="h-fit">Least founded Mood </div>
            </div>
              <div v-for="mood in mostEmployeeMood.length === 4 ? [''] : leastEmployeeMood" class="font-extrabold" :style="{ color : employeeMood[mood.mood]?.color}">- {{ mostEmployeeMood.length === 4 ? "All Mood" : mood.mood }}</div>
            </div>

          </div>
        </div>
      </div>

    </div>
  </main>
</template>

<style scoped>
.base {
  position: absolute;
  bottom: 0;
  left: -20px;
  width: 50%;
  height: 20px;
  background-color: rgba(23, 22, 22, 0.05);
  transform: skewY(45deg);
}

.container {
  position: relative;
  z-index: 0;
  height: 500px;
}


.bar {
  position: relative;
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
  transform: skewY(45deg);
}

.top {
  content: "";
  position: absolute;
  top: -15px;
  left: -8px;
  width: 40px;
  height: 15px;
  transform: skewX(45deg);
}

@keyframes grow {
  from {
    height: 0;
  }
  to {height: 100%;}
}

.chart {
  animation-name: grow;
  animation-duration: 4s;
}
</style>