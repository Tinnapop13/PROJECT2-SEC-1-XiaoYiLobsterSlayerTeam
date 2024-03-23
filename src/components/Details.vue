<script setup>
import { ref, onBeforeMount } from "vue";
import { useRoute } from "vue-router";
import { readJsonData, editJsonData } from "/src/libs/crud.js";
import { EmployeeManagement } from "/src/libs/EmployeeManagement.js";

const route = useRoute();
const employeeIndex = ref(0);
const fetchData = ref(new EmployeeManagement());
const updateResult = ref(false);

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
});

const deleteEmployee = async () => {
  const deleteId = fetchData.value.getEmployees()[employeeIndex.value].id;
  try {
    await deleteJsonData(deleteId);
    fetchData.value.deleteEmployee(deleteId);
  } catch (error) {
    console.log(error);
  }
};

const validateInput = (toEdit) => {
  const updateObject = {};
  if (toEdit.Age.trim().length > 0 && toEdit.Age < 60 && toEdit.Age > 20) {
    updateObject.Age = toEdit.Age;
  }
  if (toEdit.PositionRank.trim().length > 0) {
    updateObject.PositionRank = toEdit.PositionRank;
  }
  if (toEdit.PainPoint.trim().length > 0) {
    updateObject.PainPoint = toEdit.PainPoint;
  }
  if (toEdit.GoalAndNeed.trim().length > 0) {
    updateObject.GoalAndNeed = toEdit.GoalAndNeed;
  }
  if (toEdit.Comment.trim().length > 0) {
    updateObject.Comment = toEdit.Comment;
  }
  if (
    toEdit.Rating.coworker.length > 0 ||
    toEdit.Rating.environment.length > 0 ||
    toEdit.Rating.responsibility.length > 0
  ) {
    updateObject.Rating = toEdit.Rating;
  }
  return updateObject;
};

const updateEmployee = async () => {
  const jsonEmployeeUpdate = validateInput(editTemplate.value);

  try {
    await editJsonData(route.params.id, jsonEmployeeUpdate);
    updateEmployee(employeeIndex.value, classEmployeeUpdate);
  } catch (error) {
    console.log(error);
  }
};

onBeforeMount(async () => {
  try {
    const employees = await readJsonData();
    fetchData.value.addEmployees(employees);
    employeeIndex.value = fetchData.value
      .getEmployees()
      .findIndex((employee) => employee.id === route.params.id);
  } catch (error) {
    console.log(error);
  }
});

const errorMessage = ref("");
</script>

<template>
  <!-- ============================================
  ================== NAV BAR ======================
  ============================================ -->
  <header class="flex items-center justify-between bg-gray-800 p-8">
    <router-link class="text-white font-bold text-xl" to="/">
      Employee Insight
    </router-link>
    <ul class="space-x-14">
      <router-link
        class="bg-blue-500 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline-blue hover:bg-blue-700"
        :to="{ path: '/addcard' }"
      >
        ADD EMPLOYEE
      </router-link>
    </ul>
  </header>
  <!-- ================================================
  ================== END NAV BAR ======================
  ================================================= -->

  <div class="flex px-4 py-5 h-[50vh]">
    <div class="avatar indicator">
      <span
        class="border-black bg-white text-black indicator-item badge badge-secondary m-6"
        >{{ fetchData.getEmployees()[employeeIndex]?.FakeName }}</span
      >
      <div class="rounded-sm overflow-hidden m-6 size">
        <img :src="fetchData.getEmployees()[employeeIndex]?.LinkImage" />
      </div>
    </div>

    <div class="flex w-[70vw] flex-col">
      <div class="flex flex-row justify-evenly">
        <div class="flex flex-col m-5">
          <p class="m-2">Age</p>
          <p class="m-2 text-xs font-[10]">
            <input
              @input="
                errorMessage =
                  Number(editTemplate.Age) < 60 && Number(editTemplate.Age) > 20
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
          <p class="m-2">PainPoint</p>
          <p class="m-2 text-xs font-[10]">
            <input
              type="text"
              :placeholder="fetchData.getEmployees()[employeeIndex]?.PainPoint"
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
        <textarea
          class="textarea textarea-bordered w-full"
          :placeholder="fetchData.getEmployees()[employeeIndex]?.Comment"
          v-model="editTemplate.Comment"
        >
        </textarea>
      </div>

      <div class="flex flex-row items-center m-10">
        <!-- ============================================
        ================ Rating Details  ================
        ============================================= -->
        <div class="flex flex-col w-[30vw]">
          <p class="text-blue-950 font-semibold">
            Current Co-worker : {{ fetchData.getEmployees()[employeeIndex]?.Rating.coworker }}
          </p>
          <input
            type="range"
            min="1"
            max="10"
            class="slider my-1"
            v-model="editTemplate.Rating.coworker"
          />
          <p class="text-blue-950 font-semibold">
            Current Environment :
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
            Current Responsibility :
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

        <!-- ============================================
        ================ Button Details  ================
        ============================================= -->
        <a
          :href="parseInt(fetchData.getEmployees()[employeeIndex - 1]?.id)"
          v-if="parseInt(employeeIndex) > 0"
          class="btn btn-circle"
          >❮</a
        >

        <button class="btn btn-ghost text-xl mr-2" @click="updateResult = true">
          UPDATE
        </button>

        <router-link
          to="/"
          class="btn btn-ghost text-xl ml-2"
          @click="deleteEmployee()"
          >DELETE</router-link
        >

        <a
          :href="parseInt(fetchData.getEmployees()[employeeIndex + 1]?.id)"
          v-if="
            parseInt(employeeIndex) <
            parseInt(fetchData.getEmployees().length - 1)
          "
          class="btn btn-circle"
          >❯</a
        >
        <!-- ============================================
        ================ End Button Details  ============
        ============================================= -->

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
            UPDATE SUCCESS!!!
            <router-link
              to="/"
              class="btn-primary btn btn-ghost text-xl mr-2"
              @click="updateEmployee()"
              >CLOSE</router-link
            >
          </innerModal>
        </modal>
        <!-- =================================================
        =============== End of Details Modal =================
        ================================================== -->
      </div>
    </div>
  </div>
</template>
