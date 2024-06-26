<script setup>
import {ref,  onBeforeMount} from "vue"
import Card from "@/components/Card.vue"
import {readEmployeesData, deleteEmployeesData, getUsersData , readProfileData} from "/src/libs/crud.js"
import ArrowDown from "@/components/icons/ArrowDown.vue"
import AddUserIcon from "@/components/icons/AddUserIcon.vue"
import {useUserStore} from "@/stores/useUserStore"
import Modal from "@/components/Modal.vue"
import {useRouter} from "vue-router"

const userStore = useUserStore()
const deleteName = ref("")
const deleteId = ref("")
const card_slider = ref(null)
const profileData = ref(null)
const card_slider_container = ref(null)
const router = useRouter()



/*
============================================
============= Silder Mechanic ==============
============================================
*/

const slide = (direction) => {
  const scrollAmount =
    direction === "left"
      ? -card_slider_container.value.offsetWidth
      : card_slider_container.value.offsetWidth
  card_slider.value.scrollBy({
    left: scrollAmount,
    behavior: "smooth",
  })
}

/*
============================================
============= CRUD function ================
============================================
*/

const deleteEmployee = async (deleteId) => {
  
    await deleteEmployeesData(deleteId)
    userStore.employeeManager.deleteEmployee(deleteId)
  closeModal()
}

const deleteConfirm = (el) => {
  deleteName.value = el.target.dataset.value
  deleteId.value = el.target.id
}

const closeModal = () => {
  deleteName.value = ""
  deleteId.value = ""
}

const logout = () => {
  localStorage.removeItem("login")
  router.push("/")
}

/*
============================================
== Initialize Data for the first time ======
============================================
*/

onBeforeMount(async () => {
    const employees = await readEmployeesData()
    userStore.employeeManager.addEmployees(employees)
    const users = await getUsersData()
    profileData.value = await readProfileData();
    for (const user of users) {
      if (userStore.currentUser === user.id){
        userStore.currentUsername = user.username
      }
    }
 
})
</script>

<template>
  <!-- ============================================
     ============= Navigation Bar ===============
     ============================================ -->
  <link
    rel="stylesheet"
    href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200"
  />

  <header
    class="flex items-center justify-between bg-gray-800 px-8 w-screen h-[15vh] overflow-"

  >
    <div class="text-white font-bold text-4xl flex items-center font-basblue tracking-in-expand">
      Employee Insight
      <img
        :src="'/src/assets/images/employee_white.png'"
        class="size-12 mx-4"
      />
    </div>
    <ul class="space-x-14 flex items-center">
      <label class="input input-bordered flex items-center gap-2">
        <input
          type="text"
          class="grow"
          placeholder="Search"
          v-model="userStore.searchKey"
        />
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 16 16"
          fill="currentColor"
          class="w-4 h-4 opacity-70"
        >
          <path
            fill-rule="evenodd"
            d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
            clip-rule="evenodd"
          />
        </svg>
      </label>
      <router-link
        class="bg-blue-500 text-white font-bold py-2 px-4 rounded-badge focus:outline-none focus:shadow-outline-blue hover:bg-blue-700 flex justify-center items-center w-[160px] h-[60px] text-[15px] hover:tranform hover:scale-95 transition-all"
        :to="{path: '/addcard'}"
      >
        ADD EMPLOYEE
        <AddUserIcon/>
      </router-link>

      <div class="dropdown dropdown-bottom dropdown-end ">
          <div
            class="bg-white text-black font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline-blue flex justify-between items-center gap-4 h-[60px]"
            tabindex="0"
            role="button"
          >
            <img
              tabindex="0"
              role="button"
              src="/src/assets/images/user.png"
              class="size-[40px]"
            />
            <div tabindex="0" role="button">{{ userStore.currentUsername }}</div>
            <ArrowDown/>
            <ul
              tabindex="0"
              class="dropdown-content z-[1] menu shadow bg-slate-200 mt-2 rounded-box"
            >
              <li class="hover:bg-slate-400 rounded-lg">
                <button>
                  <router-link to="/stat"
                    >STAT
                    <span class="material-symbols-outlined">
                      monitoring
                    </span></router-link
                  >
                </button>
              </li>
              <li class="hover:bg-slate-400 rounded-lg">
                <button @click="logout()">
                  LOGOUT
                  <span class="material-symbols-outlined">logout</span>
                </button>
              </li>
            </ul>
          </div>
        </div>
    </ul>
  </header>

  <!-- ============================================
     ============= Card Container ===============
     ============================================ -->

  <main
    class="overflow-x-scroll scrollable-content h-[85vh] bg-slate-900"
    v-if="
      userStore.filteredData.length !== 0 &&
      userStore.filteredSearchData.length !== 0
    "
  >
  <div class="flex gap-4 vh-[20vh] items-center justify-center">
    <div class="font-basblue text-4xl text-slate-200"  @click="userStore.moodFilter = ''" :class="userStore.moodFilter.length === 0 ? 'bg-slate-200 p-2 rounded-lg text-slate-800' : ''">ALL </div>
    <div v-for="[name,profile] in !profileData ? {} :Object.entries(profileData)" @click="userStore.moodFilter = name"
          class="h-fit w-fit flex justify-center items-center overflow-hidden shadow-xl rounded-full p-2 m-2"
          :class="{ 'bg-slate-300': profileData.LinkImage === profile , 'bg-slate-200 p-2 rounded-lg' : name === userStore.moodFilter}">
          <img :src="profile" class="size-[45px]">
        </div>

  </div>
    <div class="card-slider-container " :ref="'card_slider_container'">
      <!-- =========== Slider to left arrow ============ -->
      <div
        class="bg-white p-3 text-black rounded-full ml-5 mt-0.5 text-2xs btn-circle size-fit scale-x-[-1]"
        @click="slide('left')"
      >
        <img src="/src/assets/images/arrow.png" class="w-[50px]" />
      </div>

      <!-- =========== Slider Container ============ -->
      <div class="card-slider" :ref="'card_slider'">
        <section class="flex flex-row mb-4 mx-16 gap-10 items-center ">
          <Card
            v-for="employee in userStore.searchKey.trim().length === 0
              ? userStore.filteredData
              : userStore.filteredSearchData"
            :key="employee.id"
            :employeeId="employee.id"
            :Rating="employee.Rating"
            :imgUrl="employee.LinkImage"
            :Name="employee.FakeName"
            @deleteEmployee="deleteConfirm"
          >
            <template #fullname>{{ employee.FakeName }}</template>
            <template #age>{{ employee.Age }}</template>
            <template #position>{{ employee.PositionRank }}</template>
            <template v-if="employee.Comment?.trim()?.length != 0" #comment>{{
              employee.Comment
            }}</template>
            <template
              v-if="employee.PainPoint?.trim()?.length != 0"
              #PainPoints
              >{{ employee.PainPoint }}</template
            >
            <template
              v-if="employee.GoalAndNeed?.trim()?.length != 0"
              #GoalAndNeeds
              >{{ employee.GoalAndNeed }}</template
            >
          </Card>
        </section>
      </div>

      <!-- =========== Slider to right arrow ============ -->
      <div
        class="bg-white p-3 text-black rounded-full mr-5 mt-0.5 text-2xs btn-circle size-fit"
        @click="slide('right')"
      >
        <img src="/src/assets/images/arrow.png" class="w-[50px]" />
      </div>
    </div>
  </main>

  <div
    v-else
    class="w-screen flex  items-center flex-col h-[85vh] gap-4 bg-slate-900"
  >
  <div class="flex gap-4 vh-[20vh] items-center justify-center">
    <div class="font-basblue text-4xl text-slate-200"  @click="userStore.moodFilter = ''" :class="userStore.moodFilter.length === 0 ? 'bg-slate-200 p-2 rounded-lg text-slate-800' : ''">ALL </div>
    <div v-for="[name,profile] in !profileData ? {} :Object.entries(profileData)" @click="userStore.moodFilter = name"
          class="h-fit w-fit flex justify-center items-center overflow-hidden shadow-xl rounded-full p-2 m-2"
          :class="{ 'bg-slate-300': profileData.LinkImage === profile , 'bg-slate-200 p-2 rounded-lg' : name === userStore.moodFilter}">
          <img :src="profile" class="size-[45px]">
        </div>

  </div>
  <div class="flex  items-center flex-col w-full gap-4 place-content-center flex-grow">
    <img :src="'/src/assets/images/sad_emoji.png'" class="size-[150px]" />
    <div
      v-if="
        userStore.filteredSearchData.length === 0 &&
        userStore.filteredData.length !== 0
      "
      class="font-bold w-[40%] text-center"
    >
      Oops! It seems we couldn't find any employees matching your search. Make
      sure you've entered the correct name or keyword.
    </div>
    <div
      v-if="userStore.filteredData.length === 0"
      class="font-bold w-[40%] text-center"
    >
      It looks like you haven't added any employees yet. Managing your team is
      easy! Simply tap the "Add Employee"
    </div>
  </div>
  </div>

  <Modal
    v-if="deleteName.length != 0"
    :modalType="'DeleteConfirmation'"
    :deleteEmployeeName="deleteName"
    :deleteEmployeeId="deleteId"
    @deleteEmployee="deleteEmployee"
    @closeModal="closeModal"
  />
</template>

<style scoped>
html {
  background-color: white;
}
.scrollable-content::-webkit-scrollbar {
  display: none;
}

.card-slider-container {
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
}

.card-slider {
  display: flex;
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  -webkit-overflow-scrolling: touch;
  scrollbar-width: none;
  -ms-overflow-style: none;
}

.slider-button {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: transparent;
  border: none;
  outline: none;
  cursor: pointer;
  z-index: 1;
}

.left {
  left: 26px;
}

.right {
  right: 26px;
}

.tracking-in-expand {
	animation: tracking-in-expand 0.7s cubic-bezier(0.215, 0.610, 0.355, 1.000) both;
}

@keyframes tracking-in-expand {
  0% {
    letter-spacing: -0.5em;
    opacity: 0;
  }
  40% {
    opacity: 0.6;
  }
  100% {
    opacity: 1;
  }
}

</style>