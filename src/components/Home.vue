<script setup>
    import {ref, reactive, watch, onBeforeMount, computed} from "vue"
import Card from "./Card.vue";
    // import data from "../../data/db.json"

    // const employeeId = ref(0);
    const loading = ref(false);
    const fetchData = ref(null);

    const slide = (direction) => {
        const container = document.querySelector('.card-slider-container');
        const slider = document.querySelector('.card-slider');
        const scrollAmount = direction === 'left' ? -container.offsetWidth : container.offsetWidth;
        slider.scrollBy({
            left: scrollAmount,
            behavior: 'smooth'
        });
    };

    const readJsonData = async () => {
    await fetch("http://localhost:5000/employees")
      .then((respJson) => respJson.json())
      .then((data) => {
      fetchData.value = data;
      loading.value = true;
      });
    };

    const deleteJsonData = (e) => {
      let delID = Number(e.target.id)
      fetch(`http://localhost:5000/employees/${delID}`, {
        method: "DELETE",
        }).then(()=>{
          readJsonData()
        });
    };
    
    

  onBeforeMount(() => {readJsonData()});
</script>
 
<template v-if="loading">
    <header class="flex items-center justify-between bg-gray-800 p-8 w-full">
            <div class="text-white font-bold text-xl">
              Employee Insight
            </div>
            <ul class="space-x-14">
              <router-link class="bg-blue-500 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline-blue hover:bg-blue-700 "
                  :to="{path: '/addcard'}">
                      ADD EMPLOYEE
              </router-link>
            </ul>
    </header>

    <!-- display -->
    <main class="mt-32 overflow-x-scroll scrollable-content" >
        <div class="card-slider-container">
          <div class="bg-white opacity-60 p-3 text-black rounded-3xl ml-5 mt-0.5 text-2xs" @click="slide('left')"><button class="slider-button left" > < </button></div>

          <div class="card-slider">
              <!-- Your existing card loop code here -->
              <section  class="flex flex-row mb-4 mx-16 gap-10 items-center ">

                  <Card v-for="employee in fetchData" 
                    :key="employee.id"
                    :employeeId = employee.id
                    :Rating = employee.Rating
                    :imgUrl = employee.LinkImage
                    @deleteEmployee="deleteJsonData">
                    <template #fullname>{{ employee.FakeName }}</template>
                    <template #age>{{ employee.Age }}</template>
                    <template #position>{{ employee.PositionRank }}</template>
                    <template v-if="employee.Comment.trim()?.length != 0" #comment>{{ employee.Comment }}</template>
                    <template v-if="employee.PainPoint.trim()?.length != 0" #PainPoints>{{ employee.PainPoint }}</template>
                    <template v-if="employee.GoalAndNeed.trim()?.length != 0" #GoalAndNeeds>{{ employee.GoalAndNeed }}</template>


                      

                    </Card>

                </section>
              
          </div>

          <div class="bg-white opacity-60 p-3 text-black rounded-3xl mr-5 mt-0.5 text-2xs" @click="slide('right')"><button class="slider-button right"> > </button></div>
      </div>
    </main>    
</template>
 
<style scoped>
    
</style>