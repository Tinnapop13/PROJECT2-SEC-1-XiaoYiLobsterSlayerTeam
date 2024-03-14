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

  <!-- <div class="flex justify-between w-full h-24 bg-red-300">
    <h1>This is card page !!!</h1>
    <router-link to="/statistics"><button>statistics</button></router-link>
    <router-link to="/details"><button>details</button></router-link>
    <router-link to="/"><button>home</button></router-link>
  </div> -->

  <div class="flex justify-center items-center min-h-screen">
    <div class="w-1/5 h-[70vh] bg-slate-600 rounded-md pt-5 max-sm:w-3/4">
      <div class="flex items-center justify-center gap-x-5">
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTqogG_tIinH_K1HoXM24xH5KC2hrmNs2BpX2PCmXGCgUUlVpIwBiSQMbJU13DAqRTIj2g&usqp=CAU"
          class="size-32 rounded-full p-2"
        />

        <div class="flex flex-col h-1/3">
          <h1 class="text-2xl font-bold text-black">User test</h1>
          <div class="ml-2">
            <h3 class="text-xs font-medium text-black">
              Age <slot name="age"></slot>
            </h3>
            <h3 class="text-xs font-medium text-black">
              Position <slot name="position"></slot>
            </h3>
            <h3 class="text-xs font-medium text-black">
              Personality <slot name="personality"></slot>
            </h3>
          </div>
        </div>
      </div>

      <div class="flex flex-col gap-y-2">
        <h2 class="text-lg font-medium text-black underline ml-2">
          Pain Point
        </h2>
        <ul class="ml-8 list-disc">
          <li>Pain Point<slot name="painPoint"></slot></li>
        </ul>

        <h3 class="text-lg font-medium text-black underline ml-2">
          Goal and Needs
        </h3>
        <ul class="ml-8 list-disc">
          <li>Goal and Needs<slot name="GoalAndNeeds"></slot></li>
        </ul>

        <h3 class="text-lg font-medium text-black underline ml-2">Rating</h3>
        <div class="flex justify-center justify-evenly">
          <div
            class="radial-progress"
            style="--value: 10; --size: 4rem"
            role="progressbar"
          >
            <span class="material-symbols-outlined"> groups </span>
          </div>
          <div
            class="radial-progress"
            style="--value: 20; --size: 4rem"
            role="progressbar"
          >
            <span class="material-symbols-outlined"> source_environment </span>
          </div>
          <div
            class="radial-progress"
            style="--value: 90; --size: 4rem"
            role="progressbar"
          >
            <span class="material-symbols-outlined"> work </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
