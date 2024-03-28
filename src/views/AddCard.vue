<script setup>
import {ref, reactive, onBeforeMount} from "vue"
import {addJsonData, readJsonData, readProfileData} from "@/libs/crud"
import Modal from "@/components/Modal.vue"
import {useUserStore} from "@/stores/useUserStore"
import {useRouter} from "vue-router"

const userStore = useUserStore()
const profileData = ref(null)
const selectingProfile = ref(false)
const addResult = ref("")
const router = useRouter()

const newCard = reactive({
  LinkImage: "/src/assets/images/angry.png",
  FakeName: "",
  PositionRank: "",
  Age: 0,
  PainPoint: "",
  GoalAndNeed: "",
  Comment: "",
  Rating: {
    coworker: 0,
    environment: 0,
    responsibility: 0,
  },
  OwnedBy: userStore.currentUser,
})

/*
============================================
============= CRUD function ================
============================================
*/

const getProfileData = async () => {
  profileData.value = await readProfileData()
}

const addValidate = () => {
  if (newCard.Age > 60 || newCard.Age < 20) {
    addResult.value = "AddEmployeeFailed"
    console.log(newCard.Age)
    return
  }

  if (
    newCard.FakeName.trim().length === 0 ||
    newCard.PositionRank.trim().length === 0 ||
    newCard.Comment.trim().length === 0
  ) {
    addResult.value = "AddEmployeeFailed"
    return
  }
  addEmployee()
}

const addEmployee = async () => {
  await addJsonData(newCard)
  addResult.value = "AddEmployeeSuccess"
}

const closeModal = () => {
  addResult.value === "AddEmployeeSuccess" ? router.push("/home") : ""
  addResult.value = ""
  selectingProfile.value = false
}

const changeProfileImage = (profileUrl) => {
  newCard.LinkImage = profileUrl
}

const computedNameError = computed(() => {
  if(newCard.FakeName.trim().length === 0){
    return 'Please Insert Name'
  } 
  return
})

const computedRankError = computed(() => {
  if(newCard.PositionRank.trim().length === 0){
    return 'Please Insert Rank'
  } 
  return
})

const computedCommentError = computed(() => {
  if(newCard.Comment.trim().length === 0){
    return 'Please Insert Comment'
  } 
  return
})

const computedAgeError = computed(() => {
  if(Number(newCard.Age) > 60 || Number(newCard.Age) < 20){
    return 'Age must be value between 20 - 60'
  } 
  return
})

onBeforeMount(async () => {
  try {
    const employees = await readJsonData()
    userStore.employeeManager.addEmployees(employees)
    getProfileData()
  } catch (error) {
    console.log(error)
  }
})
</script>
<template>
  <!-- ============================================
     ================ Form Input ================
     ============================================ -->

  <section
    class="inset-0 flex flex-col items-center justify-center m-auto my-4 rounded-xl p-4 bg-slate-200 w-[50vw]"
  >
    <!-- ====== Form Header ======= -->
    <router-link to="/home">
      <div class="flex h-[10vhpx]">
        <h1 class="text-4xl font-bold mb-4 text-blue-950">ADD EMPLOYEE</h1>
        <img
          :src="'/src/assets/images/employee_black.png'"
          class="size-10 mx-4"
        />
      </div>
    </router-link>

    <div class="flex flex-col justify-evenly items-center">
      <!-- ====== Profile Selector Form ======= -->
      <div
        @click="selectingProfile = !selectingProfile"
        class="h-fit w-fit flex justify-center items-center shadow-xl rounded-full p-4 m-4 relative bg-[#f1f1f1]"
      >
        <span
          class="bg-white text-black absolute right-0 bottom-0 p-2 rounded-full shadow-2xl"
        >
          <img :src="'/src/assets/images/change.png'" class="size-[20px]" />
        </span>
        <img :src="newCard.LinkImage" class="w-[100px] h-[100px]" />
      </div>

      <div class="flex flex-col bg-[#a6bbc8] p-4 rounded-2xl w-full">
        <!-- ====== Text Input Form ======= -->
        <div>
          <p class="text-base font-bold text-blue-950">Name :</p>
          <input
            type="text"
            class="bg-white w-full border border-gray-300 p-0.5 outline-none rounded-lg text-black"
            v-model="newCard.FakeName"
          />
          <p class="text-red-700">{{ computedNameError }}</p>
        </div>
        <div class="flex gap-4">
          <div class="w-[50%]">
            <p class="text-base font-bold text-blue-950">PositionRank :</p>
            <input
              type="text"
              class="bg-white w-full border border-gray-300 p-0.5 outline-none rounded-lg text-black"
              v-model="newCard.PositionRank"
            />
            <p class="text-red-700">{{ computedRankError }}</p>
          </div>
          <div class="w-[50%]">
            <p class="text-base font-bold text-blue-950">Age :</p>
            <input
              type="number"
              min="20"
              max="60"
              class="bg-white w-full border border-gray-300 p-0.5 outline-none rounded-lg text-black"
              v-model="newCard.Age"
            />
            <p class="text-red-700">{{ computedAgeError }}</p>
          </div>
        </div>
        <div>
          <p class="text-base font-bold text-blue-950">PainPoint :</p>
          <input
            type="text"
            class="bg-white w-full border border-gray-300 p-0.5 outline-none rounded-lg text-black"
            v-model="newCard.PainPoint"
          />
        </div>
        <div>
          <p class="text-base font-bold text-blue-950">GoalAndNeed :</p>
          <input
            type="text"
            class="bg-white w-full border border-gray-300 p-0.5 outline-none rounded-lg text-black"
            v-model="newCard.GoalAndNeed"
          />
        </div>
        <div>
          <p class="text-base font-bold text-blue-950">Comment :</p>
          <textarea
            style="resize: none"
            v-model="newCard.Comment"
            class="bg-white border w-full border-gray-300 p-0.5 outline-none rounded-lg text-black"
          />
          <p class="text-red-700">{{ computedCommentError }}</p>
        </div>

        <!-- ====== Range Selector Form ======= -->
        <div class="flex flex-col w-[30vw]">
          <p class="text-xl font-bold text-blue-950">Rating :</p>
          <p class="text-blue-950 font-semibold">
            Co-worker : {{ newCard.Rating.coworker }}
          </p>
          <input
            type="range"
            min="1"
            max="10"
            v-model="newCard.Rating.coworker"
            class="slider my-1"
            id="myRange"
          />
          <p class="text-blue-950 font-semibold">
            Environment : {{ newCard.Rating.environment }}
          </p>
          <input
            type="range"
            min="1"
            max="10"
            v-model="newCard.Rating.environment"
            class="slider my-1"
            id="myRange"
          />
          <p class="text-blue-950 font-semibold">
            Responsibility : {{ newCard.Rating.responsibility }}
          </p>
          <input
            type="range"
            min="1"
            max="10"
            v-model="newCard.Rating.responsibility"
            class="slider my-1"
            id="myRange"
          />
        </div>
      </div>

      <!-- ====== Operation Button ======= -->
      <div class="flex items-center gap-4 m-4">
        <div @click="addValidate()" class="btn btn-success text-white">
          Submit
        </div>

        <router-link to="/home">
          <button class="btn btn-error text-white">Cancel</button>
        </router-link>
      </div>
    </div>
  </section>

  <!-- ============================================
     ========= Select Profile Modal =============
     ============================================ -->

  <Modal
    v-if="selectingProfile"
    :modalType="'SelectingProfile'"
    :newEmployee="newCard"
    :newEmployeeProfile="profileData"
    @changeImage="changeProfileImage"
    @closeModal="closeModal"
  />

  <!-- ============================================
     ============= Result Modal =================
     ============================================ -->
  <Modal
    v-if="addResult.length !== 0"
    :newEmployee="newCard"
    :modalType="addResult"
    @closeModal="closeModal"
  />
</template>

<style scoped>
.slider {
  -webkit-appearance: none;
  width: 100%;
  height: 15px;
  border-radius: 5px;
  background: #d3d3d3;
  outline: none;
  opacity: 0.7;
  -webkit-transition: 0.2s;
  transition: opacity 0.2s;
}

.slider:hover {
  opacity: 1;
}

.slider::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 25px;
  height: 25px;
  border-radius: 50%;
  background: #052c51;
  cursor: pointer;
}

.slider::-moz-range-thumb {
  width: 25px;
  height: 25px;
  border-radius: 50%;
  background: #052c51;
  cursor: pointer;
}
</style>
