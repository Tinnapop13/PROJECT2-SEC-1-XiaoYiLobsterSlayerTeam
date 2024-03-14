<script setup></script>

<template>
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

  <div
    class="w-2/4 bg-[#F9F7F7] rounded-xl py-5 px-5 max-sm:w-4/5 max-sm:h-5/6"
  >
    <div class="flex items-center justify-center gap-x-5 mb-3">
      <img
        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTqogG_tIinH_K1HoXM24xH5KC2hrmNs2BpX2PCmXGCgUUlVpIwBiSQMbJU13DAqRTIj2g&usqp=CAU"
        class="relative size-32 rounded-full"
      />

      <div class="flex flex-col h-1/3">
        <h1 class="text-2xl font-bold text-[#3F72AF]">
          <slot name="fullname"></slot>
        </h1>
        <div class="indent-3">
          <h3 class="text-xs font-medium text-[#3F72AF]">
            Age : <slot name="age"></slot>
          </h3>
          <h3 class="text-xs font-medium text-[#3F72AF]">
            Position : <slot name="position"></slot>
          </h3>
          <h3 class="text-xs font-medium text-[#3F72AF]">
            Comment : <slot name="comment"></slot>
          </h3>
        </div>
      </div>
    </div>

    <div class="flex flex-col">
      <h2 class="text-lg font-extrabold text-[#3F72AF] underline">
        Pain Points
      </h2>

      <p class="text-[#3F72AF]">
        <slot name="PainPoints"></slot>
      </p>

      <h3 class="text-[#3F72AF] underline">Goal and Needs</h3>

      <p class="text-[#3F72AF]">
        <slot name="GoalAndNeeds"></slot>
      </p>

      <div class="">
        <div
          class="radial-progress text-[#9fb4dd]"
          style="--value: 20; --size: 2rem"
          role="progressbar"
        >
          <span class="material-symbols-outlined"> groups </span>
        </div>
        <div
          class="radial-progress text-[#9fb4dd]"
          style="--value: 60; --size: 2rem"
          role="progressbar"
        >
          <span class="material-symbols-outlined"> source_environment </span>
        </div>
        <div
          class="radial-progress text-[#9fb4dd]"
          style="--value: 80; --size: 2rem"
          role="progressbar"
        >
          <span class="material-symbols-outlined"> work </span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
