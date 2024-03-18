<script setup>
import {ref, onMounted} from "vue"
import CardSkeletonLoading from "./CardSkeletonLoading.vue"

const showSkeleton = ref(true)
const showCardDetails = ref(false)

onMounted(() => {
  setTimeout(() => {
    showSkeleton.value = false
    showCardDetails.value = true
  }, 2000)
})
</script>

<template>
  <CardSkeletonLoading v-if="showSkeleton" />

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
  <div
    v-if="showCardDetails"
    class="w-[20rem] h-[35rem] bg-[#F9F7F7] rounded-xl max-sm:w-full"
  >
    <!-- image and details -->
    <div
      class="flex items-center justify-center mx-auto h-[10rem] gap-x-5 bg-blue-300 rounded-b-xl"
    >
      <img
        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTqogG_tIinH_K1HoXM24xH5KC2hrmNs2BpX2PCmXGCgUUlVpIwBiSQMbJU13DAqRTIj2g&usqp=CAU"
        class="size-24 rounded-full"
      />

      <!-- div details : name, age and position -->
      <div
        class="flex flex-col justify-center bg-[#F9F7F7] w-[20vh] max-h-[18vh] rounded-bl-2xl rounded-tr-2xl p-3 resize-none"
      >
        <h1 class="text-xl font-extrabold text-[#3F72AF] break-words">
          <slot name="fullname"></slot>
        </h1>

        <h3 class="font-bold text-sm text-[#3F72AF]">
          Age:
          <span class="text-base font-medium text-[#3e608a]"
            ><slot name="age">20</slot></span
          >
        </h3>
        <h3 class="font-bold text-sm text-[#3F72AF]">
          Position:
          <span class="text-base font-medium text-[#3e608a]"
            ><slot name="position"></slot
          ></span>
        </h3>
      </div>
    </div>

    <!-- Comment, PainPoints, GoalsAndNeeds -->
    <div class="flex flex-col mx-5 my-2 max-h-[30rem]">
      <!-- Comment -->
      <h2 class="text-lg font-extrabold text-[#3F72AF] underline">Comment</h2>
      <p class="text-[#3F72AF] break-words text-sm">
        <slot name="comment"></slot>
      </p>

      <!-- PainPoints -->
      <h2 class="text-lg font-extrabold text-[#3F72AF] underline">
        Pain Points
      </h2>
      <p class="text-[#3F72AF] break-words text-sm">
        <slot name="PainPoints"></slot>
      </p>

      <!-- GoalAndNeed -->
      <h2 class="text-[#3F72AF] font-extrabold underline">Goal and Needs</h2>
      <p class="text-[#3F72AF] break-words text-sm">
        <slot name="GoalAndNeeds"></slot>
      </p>

      <!-- radial progress -->
      <div class="flex mt-5 justify-evenly">
        <div
          class="radial-progress text-[#9fb4dd]"
          style="--value: 20; --size: 8dvh"
          role="progressbar"
        >
          <span class="material-symbols-outlined"> groups </span>
        </div>
        <div
          class="radial-progress text-[#9fb4dd]"
          style="--value: 60; --size: 8dvh"
          role="progressbar"
        >
          <span class="material-symbols-outlined"> source_environment </span>
        </div>
        <div
          class="radial-progress text-[#9fb4dd]"
          style="--value: 80; --size: 8dvh"
          role="progressbar"
        >
          <span class="material-symbols-outlined"> work </span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>