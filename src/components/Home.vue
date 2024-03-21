<script setup>
import { ref, reactive, watch, onBeforeMount, computed ,onMounted} from "vue"
import Card from "./Card.vue";
import { readJsonData, deleteJsonData } from "/src/libs/crud.js";
import { EmployeeManagement } from "/src/libs/EmployeeManagement.js"

const fetchData = ref(new EmployeeManagement());
const searchKey = ref("")
const card_slider = ref(null)
const card_slider_container = ref(null)

/*
============================================
============= Silder Mechanic ==============
============================================
*/

const slide = (direction) => {
  const scrollAmount = direction === 'left' ? -card_slider_container.value.offsetWidth : card_slider_container.value.offsetWidth;
  card_slider.value.scrollBy({
    left: scrollAmount,
    behavior: 'smooth'
  });
};

/*
============================================
============= CRUD function ================
============================================
*/


const deleteEmployee = async (el) => {
  const deleteId = el.target.id
  try{
    await deleteJsonData(deleteId)
    fetchData.value.deleteEmployee(deleteId)
  }catch(error){
    console.log(error);
  }
}

/*
============================================
======= Filtered Data For Searching ========
============================================
*/

const filteredData = computed(() => {
  return fetchData.value.employees.filter((employee) => {
    return Object.entries(employee)
      .filter(([key, value]) => key === "FakeName" || key === "PositionRank" || key === "Age")
      .some(([key, value]) => {
        return value.toLowerCase().includes(searchKey.value.toLowerCase())
      })
  })
})

/*
============================================
== Initialize Data for the first time ======
============================================
*/

onMounted(async () => {
  try {
    const employees = await readJsonData()
    fetchData.value.addEmployees(employees)
  } catch (error) {
    console.log("cannot fetch");
  }
});

</script>

<template>

<!-- ============================================
     ============= Navigation Bar ===============
     ============================================ -->

  <header class="flex items-center justify-between bg-gray-800 p-8 w-full">
    <div class="text-white font-bold text-xl flex items-center">
      Employee Insight
      <img :src="'/src/assets/profile/user.png'" class="size-12 mx-4">
    </div>
    <ul class="space-x-14 flex">
      <label class="input input-bordered flex items-center gap-2">
        <input type="text" class="grow" placeholder="Search" v-model="searchKey" />
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" class="w-4 h-4 opacity-70">
          <path fill-rule="evenodd"
            d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
            clip-rule="evenodd" />
        </svg>
      </label>
      <router-link
        class="bg-blue-500 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline-blue hover:bg-blue-700 flex justify-center items-center"
        :to="{ path: '/addcard' }">
        ADD EMPLOYEE
      </router-link>
    </ul>
  </header>

<!-- ============================================
     ============= Card Container ===============
     ============================================ -->

  <main class="mt-16 overflow-x-scroll scrollable-content ">
    <div class="card-slider-container" :ref="'card_slider_container'">

      <!-- =========== Slider to left arrow ============ -->
      <div
        class="bg-white p-3 text-black rounded-full ml-5 mt-0.5 text-2xs  btn-circle size-fit scale-x-[-1] "
        @click="slide('left')">
        <img src="/src/assets/profile/arrow.png" class="w-[50px]">
      </div>

      <!-- =========== Slider Container ============ -->
      <div class="card-slider" :ref="'card_slider'">
        <section class="flex flex-row mb-4 mx-16 gap-10 items-center ">
          <Card v-for="employee in searchKey.trim().length === 0 ? fetchData.getEmployees() : filteredData" :key="employee.id"
            :employeeId=employee.id :Rating=employee.Rating :imgUrl=employee.LinkImage @deleteEmployee="deleteEmployee">
            <template #fullname>{{ employee.FakeName }}</template>
            <template #age>{{ employee.Age }}</template>
            <template #position>{{ employee.PositionRank }}</template>
            <template v-if="employee.Comment?.trim()?.length != 0" #comment>{{ employee.Comment }}</template>
            <template v-if="employee.PainPoint?.trim()?.length != 0" #PainPoints>{{ employee.PainPoint }}</template>
            <template v-if="employee.GoalAndNeed?.trim()?.length != 0" #GoalAndNeeds>{{ employee.GoalAndNeed
              }}</template>
          </Card>
        </section>
      </div>

      <!-- =========== Slider to right arrow ============ -->
      <div class="bg-white p-3 text-black rounded-full mr-5 mt-0.5 text-2xs btn-circle size-fit"
        @click="slide('right')">
        <img src="/src/assets/profile/arrow.png" class="w-[50px]">
      </div>
    </div>
  </main>
</template>

<style scoped></style>