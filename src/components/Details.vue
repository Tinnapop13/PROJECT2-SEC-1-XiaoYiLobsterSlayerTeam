<script setup>
import {ref, onBeforeMount} from "vue"
import {useRoute} from "vue-router"
import { readJsonData } from '/src/libs/crud.js'
import { EmployeeManagement } from '/src/libs/EmployeeManagement.js'


const route = useRoute();
const employeeIndex = ref(0);
const fetchData = ref(new EmployeeManagement());
const editTemplate = ref({
  Age: "",
  PositionRank: "",
  PainPoint: "",
  GoalAndNeed: "",
})

const deleteEmployee = async () => {
  const deleteId = fetchData.value.getEmployees()[employeeIndex.value].id
  try{
    await deleteJsonData(deleteId)
    fetchData.value.deleteEmployee(deleteId)
  }catch(error){
    console.log(error);
  }
}

// const editJsonData = () => {
//   fetch(`http://localhost:5000/employees/${fetchData.value[employeeIndex.value].id}`, {
//     method: "PATCH",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify({
//       Age:
//         editTemplate.value.Age.trim().length === 0
//           ? fetchData.value.Age
//           : editTemplate.value.Age,
//       PositionRank:
//         editTemplate.value.PositionRank.trim().length === 0
//           ? fetchData.value.PositionRank
//           : editTemplate.value.PositionRank,
//       PainPoint:
//         editTemplate.value.PainPoint.trim().length === 0
//           ? fetchData.value.PainPoint
//           : editTemplate.value.PainPoint,
//       GoalAndNeed:
//         editTemplate.value.GoalAndNeed.trim().length === 0
//           ? fetchData.value.GoalAndNeed
//           : editTemplate.value.GoalAndNeed,
//     }),
//   }).then((respJson) => {
//     respJson.json()
//   })
// }

onBeforeMount(async () => {
  try {
    const employees = await readJsonData()
    fetchData.value.addEmployees(employees)
    employeeIndex.value = fetchData.value.getEmployees().findIndex((employee)=> employee.id === route.params.id)
  } catch (error) {
    console.log(error);
  }
});

</script>

<template>
  <div class="border border-base-300 h-screen w-screen ">

    <header class="flex items-center justify-between bg-gray-800 p-8 ">
            <router-link class="text-white font-bold text-xl" to="/">
              Employee Insight
            </router-link>
            <ul class="space-x-14">
              <router-link class="bg-blue-500 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline-blue hover:bg-blue-700 "
                  :to="{path: '/addcard'}">
                      ADD EMPLOYEE
              </router-link>
            </ul>
    </header>


    <div class="flex px-4 py-5 border-t border-base-300 h-[50vh]">
      <div class="border border-base-300 flex ">

        <div class="avatar indicator">
          <span
            class="border-black bg-white text-black indicator-item badge badge-secondary m-6"
            >{{
              fetchData.getEmployees()[employeeIndex]?.FakeName
            }}</span
          >
          <div class="rounded-sm overflow-hidden m-6 size ">
            <img
              :src="fetchData.getEmployees()[employeeIndex]?.LinkImage"
            />
          </div>
        </div>

        <div class="flex w-[70vw] flex-col">
          <div class="flex flex-row justify-evenly">
            <div class="flex flex-col m-5">
              <p class="m-2">Age</p>
              <p class="m-2 text-xs font-[10]">
                <input
                  type="text"
                  :placeholder="
                    fetchData.getEmployees()[employeeIndex]?.Age
                  "
                  v-model="editTemplate.Age"
                  class="input input-bordered input-xs w-full max-w-xs"
                />
              </p>
            </div>
            <div class="flex flex-col m-5">
              <p class="m-2">Rank</p>
              <p class="m-2 text-xs font-[10]">
                <input
                  type="text"
                  :placeholder="
                    fetchData.getEmployees()[employeeIndex]?.PositionRank
                  "
                  v-model="editTemplate.PositionRank"
                  class="input input-bordered input-xs w-full max-w-xs"
                />
              </p>
            </div>
            <div class="flex flex-col m-5">
              <p class="m-2">PainPoint</p>
              <p class="m-2 text-xs font-[10]">
                <input
                  type="text"
                  :placeholder="
                    fetchData.getEmployees()[employeeIndex]?.PainPoint
                  "
                  v-model="editTemplate.PainPoint"
                  class="input input-bordered input-xs w-full max-w-xs"
                />
              </p>
            </div>
            <div class="flex flex-col m-5">
              <p class="m-2">Goal And Need</p>
              <p class="m-2 text-xs font-[10]">
                <input
                  type="text"
                  :placeholder="
                    fetchData.getEmployees()[employeeIndex]?.GoalAndNeed
                  "
                  v-model="editTemplate.GoalAndNeed"
                  class="input input-bordered input-xs w-full max-w-xs"
                />
              </p>
            </div>
          </div>
          <div class="divider"></div>
          <div class="flex flex-row justify-evenly">
            <textarea class="textarea textarea-bordered w-full">{{ fetchData.getEmployees()[employeeIndex]?.Comment }}</textarea>
          </div>
          <div class="flex flex-row items-center m-10">
            <p class="mr-5 mb-1">Coworker</p>
            <progress
              class="progress progress-primary w-50 mr-20"
              :value="fetchData.getEmployees()[employeeIndex]?.Rating.coworker"
              max="100"
            ></progress>
            <p class="mr-5 mb-1">Environment</p>
            <progress
              class="progress progress-primary w-50 mr-20"
              :value="fetchData.getEmployees()[employeeIndex]?.Rating.environment"
              max="100"
            ></progress>
            <p class="mr-5 mb-1">Responsibility</p>
            <progress
              class="progress progress-primary w-50 mr-20"
              :value="fetchData.getEmployees()[employeeIndex]?.Rating.responsibility"
              max="100"
            ></progress>
           
            <router-link
              to="/"
              class="btn btn-ghost text-xl mr-2"
              @click="deleteEmployee()"
              >UPDATE</router-link
            >
            <router-link
              to="/"
              class="btn btn-ghost text-xl ml-2"
              @click="deleteEmployee()"
              >DELETE</router-link
            >
          </div>
          
        </div>
      </div>
    </div>


    <div class=" m-5 flex flex-row justify-center h-[30vh]">
      <div class=" flex gap-4  items-center">
        <a :href="parseInt(fetchData.getEmployees()[employeeIndex - 1]?.id)" v-if="parseInt(employeeIndex) > 0" class="btn btn-circle">❮</a>
        <img :src="fetchData?.[employeeIndex]?.LinkImage" class="size-40" />
          <a :href="parseInt(fetchData.getEmployees()[employeeIndex + 1]?.id)" v-if="parseInt(employeeIndex) < parseInt(fetchData.getEmployees().length - 1)" class="btn btn-circle">❯</a>

        </div>
      </div>
    </div>
  
</template>