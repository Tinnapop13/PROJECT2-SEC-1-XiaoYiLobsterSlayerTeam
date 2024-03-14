<script setup>
import {ref, reactive, watch, onBeforeMount} from "vue"

import Card from "./Card.vue"

// const employeeId = ref(0);
const loading = ref(false)
const employeesData = ref(null)

const currentID = ref(0)

const addMode = ref(false)

const currentDate = new Date()

const newCard = reactive({
  LinkImage: "",
  FakeName: "",
  PositionRank: "",
  Age: "",
  PainPoint: "",
  GoalAndNeed: "",
  Personality: [""],
  Rating: {
    coworker: 0,
    environment: 0,
    responsibility: 0,
  },
  DateAdded: "",
})

const plusCard = () => {
  // numOfMembers.value++
  addMode.value = !addMode.value
  console.log("addmode : ", addMode.value)
}

const clicking = (e) => {
  let itemClick = Number(e.target.id)
  console.log("Card Clicked : ", itemClick)
}

const readJsonData = async () => {
  await fetch("http://localhost:5000/employees")
    .then((respJson) => respJson.json())
    .then((data) => {
      employeesData.value = data
      loading.value = true
    })
  // console.log(employeesData.value);

  currentID.value = employeesData.value.length
  console.log(currentID.value)
}

const deleteJsonData = (e) => {
  let delID = Number(e.target.id)
  fetch(`http://localhost:5000/employees/${delID}`, {
    method: "DELETE",
  }).then(() => {
    readJsonData()
  })
}

const isIdExist = () => {
  // check Id is id exists?
}

const addJsonData = () => {
  addMode.value = !addMode.value
  console.log(currentID.value)
  console.log(newCard.id)
  fetch("http://localhost:5000/employees", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id: String(currentID.value),
      LinkImage: newCard.LinkImage,
      FakeName: newCard.FakeName,
      PositionRank: newCard.PositionRank,
      Age: newCard.Age,
      PainPoint: newCard.PainPoint,
      GoalAndNeed: newCard.GoalAndNeed,
      Personality: newCard.Personality,
      Rating: newCard.Rating,
      DateAdded: currentDate.toDateString(),
    }),
  }).then((respJson) => {
    respJson.json()
    console.log("add....")
    readJsonData()
  })
}

onBeforeMount(() => {
  readJsonData()
})
</script>

<!-- <router-link to="/statistics"><button>statistics</button></router-link>
<router-link to="/details"><button>details</button></router-link>
<button
  class="btn btn-primary"
  @click="plusCard"
>
  Add Button
</button> -->

<template v-if="loading">
  <div class=" w-full h-[13vh] bg-[#3F72AF] flex items-center px-5">
    <h1 class="text-2xl text-[#DBE2EF] font-bold">Logo</h1>

    <div class="w-full flex justify-end gap-5">
    <router-link to="/statistics"><button class="btn btn-success">statistics</button></router-link>
    <button class="btn btn-primary" @click="plusCard">Add Button</button>
   </div>
  
  </div>

  

  <!-- display -->
  <main
    class="fixed min-h-screen w-full flex flex-col justify-center items-center"
  >
    <section class="flex overflow-x-scroll gap-x-10">
      <Card
        v-for="(employee, index) in employeesData"
        :key="index"
        @click="clicking"
      >
        <template #fullname>{{ employee.FakeName }}</template>
        <template #age>{{ employee.Age }}</template>
        <template #position>{{ employee.PositionRank }}</template>
        <template #comment>{{ employee.Comment }}</template>
        <template #PainPoints>{{ employee.PainPoint }}</template>
        <template #GoalAndNeeds>{{ employee.GoalAndNeed }}</template>
      </Card>
    </section>

    <!-- insert pop-up -->
    <section
      v-show="addMode === true"
      v-if="addMode"
      class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
    >
      <div
        class="max-sm:h-4/5 max-sm:overflow-y-scroll text-center bg-white p-8 rounded-lg"
      >
        <h1 class="text-2xl font-bold mb-4 text-black">Insert Data</h1>
        <div class="text-left">
          <p>
            Name :
            <input
              type="text"
              class="bg-white w-auto border border-gray-300 p-0.5 outline-none rounded-lg"
              v-model="newCard.FakeName"
            />
          </p>
          <p>
            PositionRank :
            <input
              type="text"
              class="bg-white w-auto border border-gray-300 p-0.5 outline-none rounded-lg"
              v-model="newCard.PositionRank"
            />
          </p>
          <p>
            Age :
            <input
              type="text"
              class="bg-white w-auto border border-gray-300 p-0.5 outline-none rounded-lg"
              v-model="newCard.Age"
            />
          </p>
          <p>
            PainPoint :
            <input
              type="text"
              class="bg-white w-auto border border-gray-300 p-0.5 outline-none rounded-lg"
              v-model="newCard.PainPoint"
            />
          </p>
          <p>
            GoalAndNeed :
            <input
              type="text"
              class="bg-white w-auto border border-gray-300 p-0.5 outline-none rounded-lg"
              v-model="newCard.GoalAndNeed"
            />
          </p>
          <p>
            Personality :
            <input
              type="text"
              class="bg-white w-auto border border-gray-300 p-0.5 outline-none rounded-lg"
            />
          </p>
          <p>
            Rating :
            <input
              type="text"
              class="bg-white w-auto border border-gray-300 p-0.5 outline-none rounded-lg"
            />
          </p>
        </div>
        <button
          @click="addJsonData"
          class="btn btn-warning text-white px-4 py-2 mt-5 text-right"
        >
          Close
        </button>
      </div>
    </section>
  </main>

  <footer class="absolute bottom-0 w-full">
    <!-- <div class="flex flex-col items-center bg-black">
            <h1 class="text-yellow-300">This is HOME !!!</h1>
            <router-link to="/statistics"><button>statistics</button></router-link>
            <router-link to="/details"><button>details</button></router-link>
        </div> -->
  </footer>

  <!-- <template>
    <div class="flex flex-col">
      <h1>This is HOME !!!</h1>
      <router-link to="/statistics"><button>statistics</button></router-link>
      <router-link :to="{name: 'Details', params: {id: 0}}"
        ><button>details</button></router-link
      >
      <router-link to="/card"><button>card</button></router-link>
    </div> -->
</template>

<style scoped></style>
