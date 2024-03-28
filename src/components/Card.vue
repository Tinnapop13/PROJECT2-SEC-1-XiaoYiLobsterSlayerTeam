<script setup>
import { ref , onMounted} from 'vue'
import CardSkeletonLoading from "./CardSkeletonLoading.vue"

/* ============================================
   =============== Props Handler ==============
   ============================================ */
  
const props = defineProps({
  employeeId : String ,
  Name : String ,
  Rating : Object,
  imgUrl : String
})
defineEmits(["deleteEmployee"])


const showSkeleton = ref(true)
const showCardDetails = ref(false)

/* ============================================
   ======= Skeleton Loader Mechanic ==========
   ============================================ */

onMounted(() => {
  setTimeout(() => {
    showSkeleton.value = false
    showCardDetails.value = true
  }, 1000)
})
</script>

<template>

<!-- ============================================
     ============== Skeleton Loader =============
     ============================================ -->

  <CardSkeletonLoading v-if="showSkeleton" />

<!-- ============================================
     ============= Import Icon ===============
     ============================================ -->

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

<!-- ============================================
     ============= Card Container ===============
     ============================================ -->

  <div
    v-if="showCardDetails"
    class="w-[20rem] h-[35rem] bg-[#F9F7F7]  max-sm:w-full overflow-hidden shadow-lg relative rounded-2xl"
  >
    <!-- =============== image and details ============== -->
    <router-link  :to="{ path: '/details/' + employeeId }  ">
    <div
      class="flex items-center h-[10rem] p-4 bg-[#38629c]  ">
      <div class="bg-white rounded-full size-fit p-4  shadow-xl">
      <img
        :src="imgUrl"
        class="size-24 rounded-full "
      />
    </div>

      <!-- ========= div details : name, age and position ======== -->
      <div class="flex flex-col justify-center bg-[#F9F7F7] w-[8vw] rounded-bl-2xl rounded-tr-2xl p-3 resize-none m-4">
        <h1 class="text-xl font-extrabold text-[#3F72AF] break-words truncate">
          <slot name="fullname">-</slot>
        </h1>
        <h3 class="font-bold text-sm text-[#3F72AF]">
          Age:
          <span class="text-base font-medium text-[#3e608a]"
            ><slot name="age">-</slot></span>
        </h3>
        <h3 class="font-bold text-sm text-[#3F72AF]">
          Position:
          <span class="text-base font-medium text-[#3e608a]"
            ><slot name="position">-</slot
          ></span>
        </h3>
      </div>
    </div>

<!-- ============================================
     === Comment, PainPoints, GoalsAndNeeds  ====
     ============================================ -->

    <div class="flex flex-col mx-5 my-2 max-h-[30rem] gap-1">
      <!-- ======= Comment =======-->
      <h2 class="text-lg font-extrabold text-[#3F72AF] underline">Comment</h2>
      <p class="text-[#3F72AF] break-words text-sm truncate">
        <slot name="comment">-</slot>
      </p>

      <!-- ======= PainPoints ======= -->
      <h2 class="text-lg font-extrabold text-[#3F72AF] underline">
        Pain Points
      </h2>
      <p class="text-[#3F72AF] break-words text-sm truncate">
        <slot name="PainPoints">-</slot>
      </p>

      <!-- ======= GoalAndNeed ======= -->
      <h2 class="text-[#3F72AF] font-extrabold underline text-lg">Goal and Needs</h2>
      <p class="text-[#3F72AF] break-words text-sm truncate">
        <slot name="GoalAndNeeds">-</slot>
      </p>

      <!-- ======= radial progress ========-->
      <div class="flex mt-5 justify-evenly">
        <div
          class="radial-progress text-[#9fb4dd]"
          :style="`--value:${Rating?.coworker*10}`"
          role="progressbar"
        >
          <span class="material-symbols-outlined"> groups </span>
        </div>
        <div
          class="radial-progress text-[#9fb4dd]"
          :style="`--value:${Rating?.environment*10}`"
         
        >
          <span class="material-symbols-outlined"> source_environment </span>
        </div>
        <div
          class="radial-progress text-[#9fb4dd]"
          :style="`--value:${Rating?.responsibility*10}`"
        >
          <span class="material-symbols-outlined"> work </span>
        </div>
      </div>
      
    </div>
  </router-link>
  
<!-- ============================================
     =========== Trash Delete Icon  =============
     ============================================ -->
    <button  
    @click="$emit('deleteEmployee',$event)" 
    class="absolute bottom-0 right-0 bg-red-500 text-white font-bold py-1 px-2 rounded-ss-xl focus:outline-none focus:shadow-outline-blue hover:bg-blue-700  w-fit h-fit"
    :data-value="Name"
      :id="employeeId"
    >  
      <img :src="'/src/assets/images/delete.png'" class="size-10" 
      :data-value="Name"
      :id="employeeId">
    </button>  
  
  </div>


</template>

<style scoped></style>