<script setup>
import {ref, onBeforeMount} from "vue"
import {useRoute} from "vue-router"
import {readJsonData, editJsonData, deleteJsonData} from "/src/libs/crud.js"
import {EmployeeManagement} from "/src/libs/EmployeeManagement.js"

const route = useRoute()
const employeeIndex = ref(0)
const fetchData = ref(new EmployeeManagement())
const updateResult = ref(false)

const editTemplate = ref({
  FakeName: "",
  Age: "",
  PositionRank: "",
  PainPoint: "",
  GoalAndNeed: "",
  Comment: "",
  Rating: {
    coworker: 0,
    environment: 0,
    responsibility: 0,
  },
})

const deleteEmployee = async () => {
  const deleteId = fetchData.value.getEmployees()[employeeIndex.value].id
  try {
    await deleteJsonData(deleteId)
    fetchData.value.deleteEmployee(deleteId)
  } catch (error) {
    console.log(error)
  }
}

const validateInput = (toEdit) => {
  const updateObject = {}
  if (toEdit.Age.trim().length > 0 && toEdit.Age < 60 && toEdit.Age > 20) {
    updateObject.Age = toEdit.Age
  }
  if (toEdit.PositionRank.trim().length > 0) {
    updateObject.PositionRank = toEdit.PositionRank
  }
  if (toEdit.PainPoint.trim().length > 0) {
    updateObject.PainPoint = toEdit.PainPoint
  }
  if (toEdit.GoalAndNeed.trim().length > 0) {
    updateObject.GoalAndNeed = toEdit.GoalAndNeed
  }
  if (toEdit.Comment.trim().length > 0) {
    updateObject.Comment = toEdit.Comment
  }
  if (
    toEdit.Rating.coworker.length > 0 ||
    toEdit.Rating.environment.length > 0 ||
    toEdit.Rating.responsibility.length > 0
  ) {
    updateObject.Rating = toEdit.Rating
  }
  return updateObject
}

const updateEmployee = async () => {
  const jsonEmployeeUpdate = validateInput(editTemplate.value)

  try {
    await editJsonData(route.params.id, jsonEmployeeUpdate)
    updateEmployee(employeeIndex.value, classEmployeeUpdate)
  } catch (error) {
    console.log(error)
  }
}

onBeforeMount(async () => {
  try {
    const employees = await readJsonData()
    fetchData.value.addEmployees(employees)
    employeeIndex.value = fetchData.value
      .getEmployees()
      .findIndex((employee) => employee.id === route.params.id)
  } catch (error) {
    console.log(error)
  }
})

const errorMessage = ref("")
</script>

<template>
  <link
    rel="stylesheet"
    href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200"
  />
  <link
    rel="stylesheet"
    href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200"
  />

  <div class="w-screen h-screen relative bg-purple-400">
    <!-- ============================================
  ================== NAV BAR ======================
  ============================================ -->
    <header
      class="absolute top-0 flex items-center justify-between bg-gray-800 h-[8rem] px-8 w-full"
    >
      <router-link
        class="text-white font-bold text-xl flex items-center"
        to="/"
      >
        Employee Insight
        <img :src="'/src/assets/profile/user.png'" class="size-12 mx-4" />
      </router-link>
      <ul class="">
        <router-link
          class="bg-blue-500 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline-blue hover:bg-blue-700"
          :to="{path: '/addcard'}"
        >
          ADD EMPLOYEE
        </router-link>
      </ul>
    </header>
    <!-- ================================================
  ================== END NAV BAR ======================
  ================================================= -->

    <div class="flex h-full justify-center items-center">
      <!-- ================================================
  ===================== IMAGE =========================
  ================================================= -->
      <div class="bg-red-200">
        <span
          v-if="!updateResult"
          class="border-black bg-white text-black indicator-item badge badge-secondary m-6"
          >{{ fetchData.getEmployees()[employeeIndex]?.FakeName }}</span
        >
        <div class="">
          <img :src="fetchData.getEmployees()[employeeIndex]?.LinkImage" />
        </div>
      </div>

      <div class="flex w-full h-[30vw] flex-col gap-y-5">
        <div class="flex justify-evenly">
          <div class="flex flex-col m-5">
            <p class="m-2">Age</p>
            <p class="m-2 text-xs font-[10]">
              <input
                @input="
                  errorMessage =
                    Number(editTemplate.Age) < 60 &&
                    Number(editTemplate.Age) > 20
                      ? ''
                      : 'Invalid age input!!!'
                "
                type="text"
                :placeholder="fetchData.getEmployees()[employeeIndex]?.Age"
                v-model="editTemplate.Age"
                class="input input-bordered input-xs w-full max-w-xs"
              />
            </p>
            <p>{{ errorMessage }}</p>
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
            <p class="m-2">Pain Point</p>
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
        <div class="flex justify-evenly">
          <textarea
            class="textarea textarea-bordered w-full"
            :placeholder="fetchData.getEmployees()[employeeIndex]?.Comment"
            v-model="editTemplate.Comment"
          >
          </textarea>
        </div>

        <!-- ============================================
      ================ Rating Details  ================
      ============================================= -->
        <div class="flex w-full justify-evenly mt-10">
          <p class="text-blue-950 font-semibold">
            Co-worker :
            {{ fetchData.getEmployees()[employeeIndex]?.Rating.coworker }}
          </p>
          <input
            type="range"
            min="1"
            max="10"
            class="slider my-1"
            v-model="editTemplate.Rating.coworker"
          />
          <p class="text-blue-950 font-semibold">
            Environment :
            {{ fetchData.getEmployees()[employeeIndex]?.Rating.environment }}
          </p>
          <input
            type="range"
            min="1"
            max="10"
            class="slider my-1"
            v-model="editTemplate.Rating.environment"
          />
          <p class="text-blue-950 font-semibold">
            Responsibility :
            {{ fetchData.getEmployees()[employeeIndex]?.Rating.responsibility }}
          </p>
          <input
            type="range"
            min="1"
            max="10"
            class="slider my-1"
            v-model="editTemplate.Rating.responsibility"
          />
        </div>
        <!-- ============================================
        ================ End Rating Details  ============
        ============================================= -->

        <div class="flex justify-end gap-5 mt-5">
          <!-- ============================================
        ================ Button Details  ================
        ============================================= -->
          <button
            class="btn btn-ghost text-xl bg-yellow-400 text-white"
            @click="updateResult = true"
          >
            <span class="material-symbols-outlined"> edit_note </span>
          </button>

          <router-link
            to="/"
            class="btn btn-ghost text-xl bg-red-500 text-white"
            @click="deleteEmployee()"
            ><span class="material-symbols-outlined">
              delete
            </span></router-link
          >
          <!-- ============================================
        ================ End Button Details  ============
        ============================================= -->
        </div>
      </div>
    </div>
  </div>

  <!-- ============================================
  ================ Details Modal ==================
  ============================================= -->
  <modal
    v-if="updateResult"
    class="w-screen h-screen bg-black/[.8] fixed top-0 left-0 flex items-center justify-center"
  >
    <innerModal
      class="h-[60vh] w-[30vw] bg-white rounded-xl flex flex-col items-center justify-evenly p-4"
    >
      <p class="text-green-500">UPDATE SUCCESS!!!</p>
      Employee {{ fetchData.getEmployees()[employeeIndex]?.FakeName }} Updated.
      <br /><br />
      New Age: {{ editTemplate.Age }}. <br />
      New Rank: {{ editTemplate.PositionRank }}. <br />
      New Pain Point: {{ editTemplate.PainPoint }}. <br />
      New Goal and Need: {{ editTemplate.GoalAndNeed }}. <br />
      <router-link
        to="/"
        class="btn-primary btn btn-ghost text-xl mr-2 bg-blue-500 text-white"
        @click="updateEmployee()"
        >CLOSE</router-link
      >
    </innerModal>
  </modal>
  <!-- =================================================
  =============== End of Details Modal =================
  ================================================== -->
</template>
