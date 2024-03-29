<script setup></script>

<template>
  <div class="w-screen h-screen relative">
    <div
      class="flex justify-center w-full h-full items-center gap-x-10 bg-slate-900"
    >
      <div class="flex flex-col items-center">
        <div class="skeleton rounded-full size-52"></div>

        <div
          class="skeleton w-20 h-7 mt-4 text-xl font-semibold underline"
        ></div>
      </div>

      <div class="flex flex-col gap-y-5">
        <div class="flex justify-evenly">
          <div class="flex flex-col m-5">
            <!-- Age -->
            <p class="skeleton w-14 h-7 m-2"></p>
            <!-- Age Input -->
            <p class="skeleton w-24 h-6 m-2 text-xs font-[10]"></p>
          </div>
          <div class="flex flex-col m-5">
            <!-- Rank -->
            <p class="skeleton w-14 h-7 m-2"></p>
            <!-- Rank Input -->
            <p class="skeleton w-24 h-6 m-2 text-xs font-[10]"></p>
          </div>
          <div class="flex flex-col m-5">
            <!-- PainPoint -->
            <p class="skeleton w-14 h-7 m-2"></p>
            <!-- PainPoint -->
            <p class="skeleton w-24 h-6 m-2 text-xs font-[10]"></p>
          </div>
          <div class="flex flex-col m-5">
            <!-- GoalAndNeed -->
            <p class="skeleton w-14 h-7 m-2"></p>
            <!-- GoalAndNeed Input -->
            <p class="skeleton w-24 h-6 m-2 text-xs font-[10]"></p>
          </div>
        </div>
        <p class="skeleton w-full h-40 m-2"></p>

        <div class="flex justify-evenly"></div>

        <!-- ============================================
      ================ Rating Details  ================
      ============================================= -->
        <div class="flex w-full justify-evenly mt-10">
          <p class="skeleton w-28 h-6 m-2"></p>
          <p class="skeleton w-28 h-6 m-2"></p>
          <p class="skeleton w-28 h-6 m-2"></p>
        </div>
      </div>
    </div>
  </div>
</template>
