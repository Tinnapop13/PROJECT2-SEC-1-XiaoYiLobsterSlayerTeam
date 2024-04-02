<script setup></script>

<template>
  <main
    class="w-screen h-screen bg-slate-300 items-center justify-center flex flex-col"
  >
    <!-- ============================================
     ================ Stat Header ===============
     ============================================ -->
    <div
      class="font-basblue text-5xl text-black flex gap-4 w-full justify-center my-4"
    >
      Employee
      <div class="skeleton w-[7rem] h-[2.6rem]">{{ currentState }}</div>
    </div>

    
    <div class="w-full pt-8 flex justify-center ">
      <!-- ============================================
     =========== Chart Container ================
     ============================================ -->
      <div class="flex gap-x-32">
        <div class="flex flex-col gap-y-5">
          <span class="skeleton h-7 w-10"></span>
          <div class="skeleton w-[2.5rem] h-[30rem]"></div>
          <span class="skeleton h-5 w-10"></span>
        </div>
        <div class="flex flex-col gap-y-5">
          <span class="skeleton h-7 w-10"></span>
          <div class="skeleton w-[2.5rem] h-[30rem]"></div>
          <span class="skeleton h-5 w-10"></span>
        </div>
        <div class="flex flex-col gap-y-5">
          <span class="skeleton h-7 w-10"></span>
          <div class="skeleton w-[2.5rem] h-[30rem]"></div>
          <span class="skeleton h-5 w-10"></span>
        </div>
        <div class="flex flex-col gap-y-5">
          <span class="skeleton h-7 w-10"></span>
          <div class="skeleton w-[2.5rem] h-[30rem]"></div>
          <span class="skeleton h-5 w-10"></span>
        </div>
        <!-- ============================================
     ================ Stat Info =================
     ============================================ -->

        <div class="flex flex-col gap-y-16 justify-center">
          <div class="skeleton w-[30rem] h-[1rem]"></div>

          <div class="flex gap-x-16">
            <div class="skeleton w-[15rem] h-[6rem]"></div>
            <div class="skeleton w-[15rem] h-[6rem]"></div>
          </div>
          <div class="flex gap-x-16">
            <div class="skeleton w-[15rem] h-[6rem]"></div>
            <div class="skeleton w-[15rem] h-[6rem]"></div>
          </div>
          <div class="skeleton w-[30rem] h-[1rem]"></div>

          <div class="flex gap-x-16">
            <div class="skeleton w-[15rem] h-[12rem]"></div>
            <div class="skeleton w-[15rem] h-[8rem]"></div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<style scoped></style>
