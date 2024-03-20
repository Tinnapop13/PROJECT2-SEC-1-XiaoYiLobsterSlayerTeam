<script setup>
import { ref, reactive, onBeforeMount } from 'vue'
const fetchData = ref(null)
const profileData = ref(null)
const currentDate = new Date()
const selectingProfile = ref(false)
const addResult = ref(false)

const newCard = reactive({
  LinkImage: "/src/assets/profile/angry.png",
  FakeName: "",
  PositionRank: "",
  Age: 0,
  PainPoint: "",
  GoalAndNeed: "",
  Comment: "",
  Rating: {
    "coworker": 0,
    "environment": 0,
    "responsibility": 0
  },
  DateAdded: "",
}
)

const readJsonData = async () => {
  await fetch("http://localhost:5000/employees")
    .then((respJson) => respJson.json())
    .then((data) => {
      fetchData.value = data;
    });
};

const getPofileData = async () => {
  await fetch("http://localhost:5000/profile")
    .then((response) => response.json())
    .then((data) => {
      profileData.value = data;
    })
}
const addValidate = () => {
  if (newCard.Age > 60 || newCard.Age < 20) {
    addResult.value = !addResult.value
    return
  }
  if (newCard.FakeName.trim().length === 0 || newCard.PositionRank.trim().length === 0 || newCard.Comment.trim().length === 0) {
    addResult.value = !addResult.value
    return
  }
  addJsonData()
  addResult.value = !addResult.value

}

const addJsonData = () => {
  fetch("http://localhost:5000/employees", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id: parseInt(fetchData.value[fetchData.value.length - 1].id) + 1 + "",
      LinkImage: newCard.LinkImage,
      FakeName: newCard.FakeName,
      PositionRank: newCard.PositionRank,
      Age: String(newCard.Age),
      PainPoint: newCard.PainPoint,
      GoalAndNeed: newCard.GoalAndNeed,
      Comment: newCard.Comment,
      Rating: newCard.Rating,
      DateAdded: currentDate.toDateString()
    }),
  }).then((respJson) => {
    respJson.json()
    readJsonData()
  });
};

onBeforeMount(() => {
  getPofileData();
  readJsonData();
});

</script>
<template>
  <section class="inset-0 flex flex-col items-center justify-center m-auto my-4 rounded-xl p-4  bg-slate-200 w-[50vw]">
      <div class="flex h-[10vhpx]">
        <h1 class="text-4xl font-bold  mb-4 text-blue-950">ADD EMPLOYEE</h1>
        <img :src="'/src/assets/profile/user_black.png'" class="size-10 mx-4">
      </div>

      <div class="flex flex-col justify-evenly items-center">
        <div @click="selectingProfile = !selectingProfile"
          class="h-fit w-fit flex justify-center items-center shadow-xl rounded-full p-4 m-4 relative bg-[#f1f1f1]">
          <span class=" bg-white text-black absolute right-0 bottom-0  p-2 rounded-full shadow-2xl"
            >
            <img :src="'/src/assets/profile/change.png'" class="size-[20px]">
            </span
          >
          <img :src="newCard.LinkImage" class=" w-[100px]  h-[100px]">
        </div>

        <div class="flex flex-col  bg-[#a6bbc8] p-4 rounded-2xl w-full">

            <div >
              <p class="text-base font-bold text-blue-950">Name : </p>
              <input type="text"
                class="bg-white w-full border border-gray-300 p-0.5 outline-none rounded-lg"
                v-model="newCard.FakeName" />
            </div>
          <div class="flex gap-4">
            <div class="w-[50%]">
              <p class="text-base font-bold text-blue-950">PositionRank : </p><input type="text"
                class="bg-white w-full border border-gray-300 p-0.5 outline-none rounded-lg"
                v-model="newCard.PositionRank" />
            </div>
            <div class="w-[50%]">
              <p class="text-base font-bold text-blue-950">Age : </p><input type="number" min="20" max="60"
                class="bg-white w-full border border-gray-300 p-0.5 outline-none rounded-lg" v-model="newCard.Age" />
            </div>
          </div>
            <div>
              <p class="text-base font-bold text-blue-950">PainPoint : </p><input type="text"
                class="bg-white w-full border border-gray-300 p-0.5 outline-none rounded-lg"
                v-model="newCard.PainPoint" />
            </div>
            <div>
              <p class="text-base font-bold text-blue-950">GoalAndNeed : </p><input type="text"
                class="bg-white w-full border border-gray-300 p-0.5 outline-none rounded-lg"
                v-model="newCard.GoalAndNeed" />
            </div>
            <div>
              <p class="text-base font-bold text-blue-950">Comment : </p>
              <textarea style="resize: none;" v-model="newCard.Comment"
                class="bg-white border w-full border-gray-300 p-0.5 outline-none rounded-lg" />
            </div>
         
            <div class="flex flex-col w-[30vw]">
              <p class="text-xl font-bold text-blue-950">Rating : </p>
              <p class="text-blue-950 font-semibold">Co-worker : {{ newCard.Rating.coworker }}</p>
              <input type="range" min="1" max="10" v-model="newCard.Rating.coworker" class="slider my-1" id="myRange">
              <p class="text-blue-950 font-semibold">Environment : {{ newCard.Rating.environment }}</p>
              <input type="range" min="1" max="10" v-model="newCard.Rating.environment" class="slider my-1"
                id="myRange">
              <p class="text-blue-950 font-semibold">Responsibility : {{ newCard.Rating.responsibility }}</p>
              <input type="range" min="1" max="10" v-model="newCard.Rating.responsibility" class="slider my-1"
                id="myRange">
            </div>

          </div>
          <div class="flex  items-center gap-4 m-4">
            <div @click="addValidate()" class="btn btn-success text-white ">
              Submit
            </div>
            <router-link to="/" class="btn btn-error text-white">
              Cancel
            </router-link>
          </div>
        </div>
      
   
  </section>

  <modal v-if="selectingProfile"
    class="w-screen h-screen bg-black/[.8] fixed top-0 left-0 flex items-center justify-center">
    <innerModal class="h-[60vh] w-[30vw] bg-white rounded-xl flex flex-col items-center justify-evenly p-4">
      <topic class="text-4xl">What do you feel?</topic>
      <div class="flex ">
        <div v-for="profile in profileData" @click="newCard.LinkImage = profile"
          class="h-fit w-fit flex justify-center items-center overflow-hidden shadow-xl rounded-full p-4 m-4"
          :class="{ 'bg-slate-300': newCard.LinkImage === profile }">
          <img :src="profile" class="size-24">
        </div>
      </div>
      <button class="btn-primary btn" @click="selectingProfile = !selectingProfile">Close</button>
    </innerModal>
  </modal>


  <modal v-if="addResult" class="w-screen h-screen bg-black/[.8] fixed top-0 left-0 flex items-center justify-center">
    <innerModal class="h-[60vh] w-[30vw] bg-white rounded-xl flex flex-col items-center justify-evenly p-4">
      <div class="text-5xl"> Result</div>
      <div v-if="newCard.FakeName.trim().length === 0" class="text-red-500">Please Insert Name</div>
      <div v-if="newCard.PositionRank.trim().length === 0" class="text-red-500">Please Insert Rank</div>
      <div v-if="newCard.Comment.trim().length === 0" class="text-red-500">Please Insert Comment</div>
      <div v-if="newCard.Age > 60 || newCard.Age < 20" class="text-red-500">Age must be value between 20 - 60</div>
      <div v-if="newCard.FakeName.trim().length !== 0 &&
          newCard.PositionRank.trim().length !== 0 &&
          newCard.Comment.trim().length !== 0 &&
          (newCard.Age <= 60 && newCard.Age >= 20)
          " class="text-5xl text-green-500">ADD EMPLOYEE SUCCESS</div>
      <button class="btn-primary btn" @click="addResult = !addResult">Close</button>
    </innerModal>
  </modal>
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
  -webkit-transition: .2s;
  transition: opacity .2s;
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