<script setup>
import {ref, onBeforeMount} from "vue"
import {useRoute, useRouter} from "vue-router"
import {
  readEmployeesData,
  editEmployeesData,
  deleteEmployeesData,
  readProfileData,
} from "@/libs/crud"
import {EmployeeManagement} from "@/libs/EmployeeManagement.js"
import {useUserStore} from "@/stores/useUserStore.js"
import DetailsSkeletonLoading from "@/components/DetailsSkeletonLoading.vue"
import Modal from "@/components/Modal.vue"

const userStore = useUserStore()
const route = useRoute()
const router = useRouter()
const employeeIndex = ref(0)
const fetchData = ref(new EmployeeManagement())
const updateResult = ref(false)
const showSkeletonDetails = ref(true)
const showUserDetails = ref(false)
const profileData = ref(null)
const selectingProfile = ref(false)

const editTemplate = ref({
  FakeName: "",
  Age: "",
  PositionRank: "",
  PainPoint: "",
  GoalAndNeed: "",
  Comment: "",
  LinkImage: "",
  Rating: {
    coworker: 0,
    environment: 0,
    responsibility: 0,
  },
})

const deleteEmployee = async () => {
  const deleteId = fetchData.value.getEmployees()[employeeIndex.value].id
  try {
    await deleteEmployeesData(deleteId)
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

const closeModal = () => {
  selectingProfile.value = false
}

const changeProfileImage = (profileUrl) => {
  editTemplate.value.LinkImage = profileUrl
}

const updateEmployee = async () => {
  const jsonEmployeeUpdate = validateInput(editTemplate.value)

  try {
    editEmployeesData(route.params.id, jsonEmployeeUpdate)
    updateEmployee(employeeIndex.value, classEmployeeUpdate)
  } catch (error) {
    console.log(error)
  }
}

const logout = () => {
  localStorage.removeItem("login")
  router.push("/")
}

onBeforeMount(async () => {
  try {
    const employees = await readEmployeesData()
    fetchData.value.addEmployees(employees)
    employeeIndex.value = fetchData.value
      .getEmployees()
      .findIndex((employee) => employee.id === route.params.id)
    editTemplate.value.Rating.coworker =
      fetchData.value.getEmployees()[employeeIndex.value]?.Rating.coworker
    editTemplate.value.Rating.environment =
      fetchData.value.getEmployees()[employeeIndex.value]?.Rating.environment
    editTemplate.value.Rating.responsibility =
      fetchData.value.getEmployees()[employeeIndex.value]?.Rating.responsibility
    profileData.value = await readProfileData()
    setTimeout(() => {
      showSkeletonDetails.value = false
      showUserDetails.value = true
    }, 1000)
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

  <div class="w-screen h-screen relative">
    <!-- ============================================
     ============== Skeleton Loader =============
     ============================================ -->
    <DetailsSkeletonLoading v-if="showSkeletonDetails" />

    <!-- ============================================
     ============= Navigation Bar ===============
     ============================================ -->
    <header
      class="flex items-center justify-between bg-gray-800 h-[8rem] px-8 w-full absolute top-0"
    >
      <router-link to="/home">
        <div
          class="text-white font-bold text-4xl flex items-center font-basblue"
        >
          Employee Insight
          <img
            :src="'/src/assets/images/employee_white.png'"
            class="size-12 mx-4"
          />
        </div>
      </router-link>
      <ul class="space-x-14">
        <div class="relative">
          <div class="dropdown dropdown-bottom">
            <div
              class="bg-white text-black font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline-blue flex justify-between items-center gap-4 h-[60px] text-center"
              tabindex="0"
              role="button"
            >
              <img
                tabindex="0"
                role="button"
                src="/src/assets/images/user.png"
                class="size-full"
              />
              <div tabindex="0" role="button">{{ userStore.currentUser }}</div>
              <ul
                tabindex="0"
                class="dropdown-content z-[1] menu shadow bg-slate-200 mt-2 rounded-box"
              >
                <li class="hover:bg-slate-400 rounded-lg">
                  <button class="flex" @click="logout()">
                    LOGOUT
                    <span class="material-symbols-outlined"> logout </span>
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </ul>
    </header>

    <div
      v-if="showUserDetails"
      class="flex justify-center w-full h-full items-center gap-x-10 bg-slate-900"
    >
      <!-- ================================================
  ===================== IMAGE =========================
  ================================================= -->
      <div class="flex flex-col">
        <div
          @click="selectingProfile = !selectingProfile"
          class="h-fit w-fit flex justify-center items-center shadow-xl rounded-full p-4 m-4 relative bg-[#f1f1f1]"
        >
          <span
            class="bg-white text-black absolute right-0 bottom-0 p-2 rounded-full shadow-2xl"
          >
            <img :src="'/src/assets/images/change.png'" class="size-[40px]" />
          </span>
          <img
            class="p-5 w-[200px] h-[200px]"
            :src="
              editTemplate.LinkImage.length === 0
                ? fetchData.getEmployees()[employeeIndex]?.LinkImage
                : editTemplate.LinkImage
            "
          />
        </div>
        <div
          class="text-white text-center mt-4 text-xl font-semibold underline"
        >
          {{ fetchData.getEmployees()[employeeIndex]?.FakeName }}
        </div>
      </div>
      <!-- ================================================
  ===================== Edit detail =========================
  ================================================= -->

      <div class="flex flex-col gap-y-5">
        <div class="flex justify-evenly">
          <div class="flex flex-col m-5">
            <p class="m-2 font-basblue text-3xl">Age</p>
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
            <p class="m-2 font-basblue text-3xl">Rank</p>
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
            <p class="m-2 font-basblue text-3xl">Pain Point</p>
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
            <p class="m-2 font-basblue text-3xl">Goal And Need</p>
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
          <p class="text-slate-200 font-semibold">
            Co-worker :
            {{ editTemplate.Rating.coworker }}
          </p>
          <div class="flex flex-col">
            <input
              type="range"
              min="1"
              max="5"
              class="range"
              v-model="editTemplate.Rating.coworker"
            />
            <div class="w-full flex justify-between text-xs px-2">
              <span>|</span>
              <span>|</span>
              <span>|</span>
              <span>|</span>
              <span>|</span>
            </div>
          </div>
          <p class="text-slate-200 font-semibold">
            Environment :
            {{ editTemplate.Rating.environment }}
          </p>
          <div class="flex flex-col">
            <input
              type="range"
              min="1"
              max="5"
              class="range"
              v-model="editTemplate.Rating.environment"
            />
            <div class="w-full flex justify-between text-xs px-2">
              <span>|</span>
              <span>|</span>
              <span>|</span>
              <span>|</span>
              <span>|</span>
            </div>
          </div>
          <p class="text-slate-200 font-semibold">
            Responsibility :
            {{ editTemplate.Rating.responsibility }}
          </p>

          <div class="flex flex-col">
            <input
              type="range"
              min="1"
              max="5"
              class="range"
              v-model="editTemplate.Rating.responsibility"
            />
            <div class="w-full flex justify-between text-xs px-2">
              <span>|</span>
              <span>|</span>
              <span>|</span>
              <span>|</span>
              <span>|</span>
            </div>
          </div>
        </div>

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
            to="/home"
            class="btn btn-ghost text-xl bg-red-500 text-white"
            @click="deleteEmployee()"
            ><span class="material-symbols-outlined">
              delete
            </span></router-link
          >
        </div>
      </div>
    </div>
  </div>
  <!-- ============================================
  ================ Details Modal ==================
  ============================================= -->
  <div
    v-if="updateResult"
    class="w-screen h-screen bg-black/[.8] fixed top-0 left-0 flex items-center justify-center"
  >
    <div
      class="h-[60vh] w-[30vw] bg-white rounded-xl flex flex-col items-center justify-evenly p-4"
    >
      <p class="text-green-500">UPDATE SUCCESS!!!</p>
      <p class="text-blue-500">
        Employee "{{ fetchData.getEmployees()[employeeIndex]?.FakeName }}"
        Updated.
      </p>
      <router-link
        to="/home"
        class="btn-primary btn btn-ghost text-xl mr-2 bg-blue-500 text-white"
        @click="updateEmployee()"
        >CLOSE</router-link
      >
    </div>
  </div>

  <!-- ============================================
     ========= Select Profile Modal =============
     ============================================ -->

  <Modal
    v-if="selectingProfile"
    :modalType="'SelectingProfile'"
    :newEmployee="editTemplate"
    :newEmployeeProfile="profileData"
    @changeImage="changeProfileImage"
    @closeModal="closeModal"
  />
</template>
