<script setup>
import {ref, reactive, watch, onBeforeMount, Suspense} from "vue"

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
  Comment: [""],
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

const fetchUserData = async () => {
  fetch("http://localhost:5000/employees")
    .then((respJson) => respJson.json())
    .then((data) => {
      employeesData.value = data
    })
}

const deleteJsonData = (e) => {
  let delID = Number(e.target.id)
  fetch(`http://localhost:5000/employees/${delID}`, {
    method: "DELETE",
  }).then(() => {
    fetchUserData()
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
      Personality: newCard.Comment,
      Rating: newCard.Rating,
      DateAdded: currentDate.toDateString(),
    }),
  }).then((respJson) => {
    respJson.json()
    console.log("add....")
    fetchUserData()
  })
}

onBeforeMount(() => {
  fetchUserData()
})
</script>

<template v-if="loading">
  <div class="h-screen w-screen">
    <!-- NavBar-->
    <div class="w-full h-28 bg-[#3F72AF] flex items-center px-5">
      <h1 class="text-2xl text-[#DBE2EF] font-bold">Logo</h1>

      <div class="w-full flex justify-end gap-5">
        <router-link to="/statistics"
          ><button class="btn btn-success">statistics</button></router-link
        >
        <button class="btn btn-primary" @click="plusCard">Add Button</button>
      </div>
    </div>

    <!-- display card -->
    <div class="flex justify-center overflow-x-scroll">
      <div class="flex items-center gap-x-5">
        <Card
          v-for="(employee, index) in employeesData"
          :key="index"
          @click="clicking"
          :deleteCard="deleteJsonData"
          class="pointer"
        >
          <template #fullname>{{ employee.FakeName }}</template>
          <template #age>{{ employee.Age }}</template>
          <template #position>{{ employee.PositionRank }}</template>
          <template #comment>{{ employee.Comment }}</template>
          <template #PainPoints>{{ employee.PainPoint }}</template>
          <template #GoalAndNeeds>{{ employee.GoalAndNeed }}</template>
        </Card>
      </div>
    </div>
  </div>

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
          Comment :
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
</template>

<style scoped></style>
