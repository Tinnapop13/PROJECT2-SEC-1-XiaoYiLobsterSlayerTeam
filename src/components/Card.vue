<script setup>
const props = defineProps({
  employeeId : String ,
  Rating : Object,
  imgUrl : String
})
defineEmits(["deleteEmployee"])
console.log(props.deleteCard)

</script>

<template>
  <!-- IMPORT LOGO -->
  <link
    rel="stylesheet"
    href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0"
  />
  <link
    rel="stylesheet"
    href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0"
  />
  <link
    rel="stylesheet"
    href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0"
  />

  <!-- User Card -->
 
                    
            
  <div class="w-[15vw] h-[50vh] bg-[#F9F7F7]  rounded-xl overflow-hidden" >
    <!-- image and details -->
    <router-link  :to="{ path: '/details/' + employeeId }  ">
    <div
      class="flex items-center justify-center h-[10rem] gap-x-5 bg-blue-300 ">
      <img
        :src="imgUrl"
        class="size-24 rounded-full mx-4"
      />

      <!-- div details : name, age and position -->
      <div
        class="flex flex-col justify-center bg-[#F9F7F7] w-[20vh]  rounded-bl-2xl rounded-tr-2xl p-3 resize-none m-4"
      >
        <h1 class="text-xl font-extrabold text-[#3F72AF] break-words">
          <slot name="fullname">-</slot>
        </h1>

        <h3 class="font-bold text-sm text-[#3F72AF]">
          Age:
          <span class="text-base font-medium text-[#3e608a]"
            ><slot name="age">-</slot></span
          >
        </h3>
        <h3 class="font-bold text-sm text-[#3F72AF]">
          Position:
          <span class="text-base font-medium text-[#3e608a]"
            ><slot name="position">-</slot
          ></span>
        </h3>
      </div>
    </div>

    <!-- Comment, PainPoints, GoalsAndNeeds -->
    <div class="flex flex-col mx-5 my-2 max-h-[30rem]">
      <!-- Comment -->
      <h2 class="text-lg font-extrabold text-[#3F72AF] underline">Comment</h2>
      <p class="text-[#3F72AF] break-words text-sm truncate">
        <slot name="comment">-</slot>
      </p>

      <!-- PainPoints -->
      <h2 class="text-lg font-extrabold text-[#3F72AF] underline">
        Pain Points
      </h2>
      <p class="text-[#3F72AF] break-words text-sm truncate">
        <slot name="PainPoints">-</slot>
      </p>

      <!-- GoalAndNeed -->
      <h2 class="text-[#3F72AF] font-extrabold underline">Goal and Needs</h2>
      <p class="text-[#3F72AF] break-words text-sm truncate">
        <slot name="GoalAndNeeds">-</slot>
      </p>

      <!-- radial progress -->
      <div class="flex mt-5 justify-evenly">
        <div
          class="radial-progress text-[#9fb4dd]"
          :style="`--value:${Rating.coworker*10}`"
          :value="Rating.coworker"
          role="progressbar"
        >
          <span class="material-symbols-outlined"> groups </span>
        </div>
        <div
          class="radial-progress text-[#9fb4dd]"
          :style="`--value:${Rating.environment*10}`"
         
        >
          <span class="material-symbols-outlined"> source_environment </span>
        </div>
        <div
          class="radial-progress text-[#9fb4dd]"
          :style="`--value:${Rating.responsibility*10}`"
        >
          <span class="material-symbols-outlined"> work </span>
        </div>
      </div>
      
    </div>
  </router-link>
    <button :id="employeeId" @click="$emit('deleteEmployee',$event)" class="bg-red-500 text-white font-bold py-1 px-2 rounded-full focus:outline-none focus:shadow-outline-blue hover:bg-blue-700  ">  
                        DELETE
    </button>  
  </div>


</template>

<style scoped></style>