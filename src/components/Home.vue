<script setup>
    import {ref, reactive, watch, onBeforeMount} from "vue"
    // import data from "../../data/db.json"

    // const employeeId = ref(0);
    const loading = ref(false);
    const fetchData = ref(null);

    const currentID = ref(0)

    const addMode = ref(false)

    const newCard = reactive({
      LinkImage : "",
      FakeName: "",
      PositionRank: "",
      Age: "",
      PainPoint: "",
      GoalAndNeed: "",
      Personality: [""],
      Rating: {
              "coworker": 0,
              "environment": 0,
              "responsibility": 0
            }
      }
    ) 

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
    await fetch("http://localhost:3000/employees")
      .then((respJson) => respJson.json())
      .then((data) => {
      fetchData.value = data;
      loading.value = true;
      });
      // console.log(fetchData.value);

      currentID.value = fetchData.value.length
      console.log(currentID.value)
    };

    const deleteJsonData = (e) => {
      let delID = Number(e.target.id)
      fetch(`http://localhost:3000/employees/${delID}`, {
        method: "DELETE",
        }).then(()=>{
          readJsonData()
        });
    };
    
    const addJsonData = () => {
      addMode.value = !addMode.value
      console.log(currentID.value)
      console.log(newCard.id)
      fetch("http://localhost:3000/employees", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id : String(currentID.value),
          LinkImage : newCard.LinkImage,
          FakeName : newCard.FakeName,
          PositionRank: newCard.PositionRank,
          Age: newCard.Age,
          PainPoint: newCard.PainPoint,
          GoalAndNeed: newCard.GoalAndNeed,
          Personality: newCard.Personality,
          Rating: newCard.Rating
        }),
      }).then((respJson) => {
        respJson.json()
        console.log("add....")
        readJsonData()
      });
    };

  onBeforeMount(() => {readJsonData()});
</script>
 
<template v-if="loading">
    <header class="flex items-center justify-between bg-gray-800 p-8 w-full">
            <div class="text-white font-bold text-xl">Your Logo</div>
                <ul class="space-x-14">
                  <router-link to="/statistics"><button>statistics</button></router-link>
                  <router-link to="/details"><button>details</button></router-link>
                  <button class="bg-blue-500 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline-blue hover:bg-blue-700 "
                  @click="plusCard">
                      Add Button
                  </button>
                </ul>
    </header>

    <!-- display -->
    <main class="mt-32 overflow-x-scroll " >
      <section   
        class="flex flex-row mb-4 ml-16 gap-10 w-full">
        <div v-for="(employee, index) in fetchData" 
          :key="employee.id"
          :id="employee.id"
          class="bg-white border border-gray-300 min-w-48 min-h-80 rounded-md shadow-md"
          @click="clicking">
          <img class=" w-56 h-56 p-3"
          :src="fetchData === null ? '' : fetchData[index]?.LinkImage" :id="employee.id">
          <p class="text-center font-bold" :id="employee.id">{{ employee.id }}</p>
          <p class="text-center text-black " :id="employee.id">{{ employee.FakeName }}</p>
          <p class="text-right pr-3"><button :id="employee.id"@click="deleteJsonData"
          class="bg-red-500 text-white font-bold py-1 px-2 rounded-full focus:outline-none focus:shadow-outline-blue hover:bg-blue-700 ">
                  ☻
          </button></p>
        </div>
      </section>

    <!-- showpopup -->
      <section v-show="addMode === true"  
        v-if="addMode"
        class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
        <div class="max-sm:h-4/5 max-sm:overflow-y-scroll text-center bg-white p-8 rounded-lg ">
          <h1 class="text-2xl font-bold mb-4 text-black">Insert Data</h1>
          <div class="text-left">
            <p>Name : <input type="text" class="bg-white w-auto border border-gray-300 p-0.5 outline-none rounded-lg" v-model="newCard.FakeName"/></p>
            <p>PositionRank : <input type="text" class="bg-white w-auto border border-gray-300 p-0.5 outline-none rounded-lg" v-model="newCard.PositionRank"/></p>
            <p>Age : <input type="text" class="bg-white w-auto border border-gray-300 p-0.5 outline-none rounded-lg" v-model="newCard.Age"/></p>
            <p>PainPoint : <input type="text" class="bg-white w-auto border border-gray-300 p-0.5 outline-none rounded-lg" v-model="newCard.PainPoint"/></p>
            <p>GoalAndNeed : <input type="text" class="bg-white w-auto border border-gray-300 p-0.5 outline-none rounded-lg" v-model="newCard.GoalAndNeed"/></p>
            <p>Personality : <input type="text" class="bg-white w-auto border border-gray-300 p-0.5 outline-none rounded-lg" /></p>
            <p>Rating : <input type="text" class="bg-white w-auto border border-gray-300 p-0.5 outline-none rounded-lg" /></p>
            </div>
          <button @click="addJsonData"
            class="btn btn-warning text-white px-4 py-2 mt-5 text-right">
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

    const props = defineProps(['foo'])


</script>
 
<template>
    <div class="flex flex-col">
        <h1>This is HOME !!!</h1>
        <router-link to="/statistics"><button>statistics</button></router-link>
        <router-link :to="{name: 'Details', params: {id: 0}}"><button>details</button></router-link>
        <router-link to="/card"><button>card</button></router-link>
    </div>

</template>
 
<style scoped>
    
</style>