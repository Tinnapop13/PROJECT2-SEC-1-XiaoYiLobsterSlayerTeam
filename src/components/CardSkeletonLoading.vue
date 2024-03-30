<script setup>
// await new Promise((res) => setTimeout(res, 2000))
</script>

<template>
  <!-- User Card -->
  <div class="w-[20rem] h-[35rem] bg-[#F9F7F7] rounded-xl max-sm:w-full">
    <!-- image and details -->
    <div
      class="flex items-center justify-center mx-auto h-[10rem] gap-x-5 bg-blue-300 rounded-xl"
    >
      <div class="skeleton size-24 rounded-full"></div>

      <!-- div details : name, age and position -->
      <div
        class="flex flex-col justify-center bg-[#F9F7F7] w-[20vh] max-h-[18vh] rounded-bl-2xl rounded-tr-2xl p-3 resize-none gap-y-2"
      >
        <h1 class="skeleton w-full h-4"></h1>

        <h3 class="skeleton w-[13vh] h-3"></h3>
        <h3 class="skeleton w-[13vh] h-3"></h3>
      </div>
    </div>

    <!-- Comment, PainPoints, GoalsAndNeeds -->
    <div class="flex flex-col mx-5 my-2 max-h-[30rem] gap-y-4">
      <!-- Comment -->
      <h2 class="skeleton w-[15vh] h-4"></h2>
      <p class="skeleton w-full h-2"></p>
      <p class="skeleton w-full h-2"></p>

      <p class="skeleton w-full h-2"></p>

      <!-- PainPoints -->
      <h2 class="skeleton w-[15vh] h-4"></h2>
      <p class="skeleton w-full h-2"></p>

      <p class="skeleton w-[30vh] h-2"></p>

      <!-- GoalAndNeed -->
      <h2 class="skeleton w-[15vh] h-4"></h2>
      <p class="skeleton w-full h-2"></p>
      <p class="skeleton w-full h-2"></p>
      <p class="skeleton w-[25vh] h-2"></p>

      <div class="flex mt-5 justify-evenly">
        <div class="skeleton rounded-full size-14"></div>
        <div class="skeleton rounded-full size-14"></div>
        <div class="skeleton rounded-full size-14"></div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
