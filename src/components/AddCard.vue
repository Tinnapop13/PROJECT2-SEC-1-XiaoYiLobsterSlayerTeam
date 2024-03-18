<script setup>
import { ref, reactive, onBeforeMount } from 'vue'
const fetchData = ref(null)
const profileData = ref(null)
const loading = ref(false)
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
      loading.value = true;
    });
};

const getPofileData = async () => {
  await fetch("http://localhost:5000/profile")
  .then((response) => response.json())
  .then((data) => {
    profileData.value = data;
  })
}
const addValidate = () =>{
  if(newCard.Age > 60 ||newCard.Age < 20 ){
    addResult.value = !addResult.value
    console.log(addResult.value);
    return 
  }
  if(newCard.FakeName.trim().length === 0 || newCard.PositionRank.trim().length === 0 || newCard.Comment.trim().length === 0){
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
      id: fetchData.value.length + 96 + "",
      LinkImage: newCard.LinkImage,
      FakeName: newCard.FakeName,
      PositionRank: newCard.PositionRank,
      Age: newCard.Age,
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
  <section v-if="loading" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 ">
   
    <div class=" max-sm:overflow-y-scroll  bg-slate-100 p-8 rounded-lg h-fit w-fit ">
      <h1 class="text-2xl font-bold mb-4 text-black self-start">ADD EMPLOYEE</h1>
      <div class="flex flex-col justify-center h-[60vh] w-[80vw]  ">
      <div class="flex justify-evenly items-center">
        <div @click="selectingProfile = !selectingProfile" class="h-fit w-fit flex justify-center items-center overflow-hidden shadow-xl rounded-full p-4 m-4">
          <img :src="newCard.LinkImage" class=" w-[10vw] h-[20vh]">
        </div>
        
        <div class="flex flex-col items-center">
          <div class="flex flex-wrap w-[50vw] gap-4">
            <div>
              <p>Name : </p><input type="text"
                class="bg-white w-auto border border-gray-300 p-0.5 outline-none rounded-lg"
                v-model="newCard.FakeName" />
            </div>
            <div>
              <p>PositionRank : </p><input type="text"
                class="bg-white w-auto border border-gray-300 p-0.5 outline-none rounded-lg"
                v-model="newCard.PositionRank" />
            </div>
            <div>
              <p>Age : </p><input type="number"
              min="20"
              max="60"
                class="bg-white w-auto border border-gray-300 p-0.5 outline-none rounded-lg" v-model="newCard.Age" />
            </div>
            <div>
              <p>PainPoint : </p><input type="text"
                class="bg-white w-auto border border-gray-300 p-0.5 outline-none rounded-lg"
                v-model="newCard.PainPoint" />
            </div>
            <div>
              <p>GoalAndNeed : </p><input type="text"
                class="bg-white w-auto border border-gray-300 p-0.5 outline-none rounded-lg"
                v-model="newCard.GoalAndNeed" />
            </div>
            <div>
              <p>Comment : </p><textarea style="resize: none;" v-model="newCard.Comment"
                class="  bg-white w-auto border border-gray-300 p-0.5 outline-none rounded-lg" />
            </div>
          </div>


          <div>
            <div class="flex flex-col w-[30vw]">
              <p>Rating : </p>
              <p>Co-worker : {{ newCard.Rating.coworker }}</p>
              <input type="range" min="1" max="10" v-model="newCard.Rating.coworker" class="slider" id="myRange">
              <p>Environment : {{ newCard.Rating.environment }}</p>
              <input type="range" min="1" max="10" v-model="newCard.Rating.environment" class="slider" id="myRange">
              <p>Responsibility : {{ newCard.Rating.responsibility }}</p>
              <input type="range" min="1" max="10" v-model="newCard.Rating.responsibility" class="slider" id="myRange">
            </div>
          </div>
          <div class="flex  items-center gap-4 m-4">
            <div @click="addValidate()"  class="btn btn-warning text-white ">
              {{ newCard.Age }}
              Submit
            </div>
            <router-link to="/" class="btn btn-error text-white">
              Cancel              
            </router-link>
      </div>
        </div>
      </div>
</div>
</div>
  </section>

  <modal v-if="selectingProfile" class="w-screen h-screen bg-black/[.8] fixed top-0 left-0 flex items-center justify-center">
    <innerModal class="h-[60vh] w-[30vw] bg-white rounded-xl flex flex-col items-center justify-evenly p-4">
      <topic class="text-4xl">What do you feel?</topic>
      <div class="flex ">
       <div v-for="profile in profileData" @click="newCard.LinkImage = profile" class="h-fit w-fit flex justify-center items-center overflow-hidden shadow-xl rounded-full p-4 m-4"  :class="{ 'bg-slate-300' : newCard.LinkImage === profile  }">
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
      <div v-if="newCard.Age> 60 || newCard.Age < 20 " class="text-red-500">Age must be value between 20 - 60</div>
      <div v-if=" newCard.FakeName.trim().length !== 0 &&
                  newCard.PositionRank.trim().length !== 0 &&
                  newCard.Comment.trim().length !== 0 &&
                  (newCard.Age <= 60 || newCard.Age >= 20)
      " class="text-5xl text-green-500" >ADD EMPLOYEE SUCCESS</div>
        <button class="btn-primary btn" @click="addResult = !addResult">Close</button>
    </innerModal>
    </modal>
</template>