<script setup>
    const props = defineProps({
        modalType : String,
        newEmployee : Object,
        newEmployeeProfile : Object,
        deleteEmployeeName : String,
        deleteEmployeeId : String  

    })

    const emits = defineEmits(['closeModal','changeImage','deleteEmployee'])
</script>


<template>

<!-- ============================================
     ===== Add Employee Failed Modal ===========
     ============================================ -->
  <div v-if="modalType === 'AddEmployeeFailed'"  class="w-screen h-screen bg-black/[.8] fixed top-0 left-0 flex items-center justify-center">
    <div class="h-[60vh] w-[30vw] bg-white rounded-xl flex flex-col items-center justify-evenly p-4">
      <div class="text-black font-bold text-5xl font-basblue">Result</div>
      <div v-if="newEmployee.FakeName.trim().length === 0" class="text-red-500 font-basblue">Please Insert Name</div>
      <div v-if="newEmployee.PositionRank.trim().length === 0" class="text-red-500 font-basblue">Please Insert Rank</div>
      <div v-if="newEmployee.Comment.trim().length === 0" class="text-red-500 font-basblue">Please Insert Comment</div>
      <div v-if="Number(newEmployee.Age) > 60 || Number(newEmployee.Age) < 20" class="text-red-500 font-basblue">Age must be value between 20 - 60</div>
      <button class="btn-primary btn" @click="$emit('closeModal')">Close</button>
    </div>
  </div>

<!-- ============================================
     ===== Add Employee Success Modal ===========
     ============================================ -->

  <div v-if="modalType === 'AddEmployeeSuccess'"  class="w-screen h-screen bg-black/[.8] fixed top-0 left-0 flex items-center justify-center">
    <div class="h-[60vh] w-[30vw] bg-white rounded-xl flex flex-col items-center justify-evenly p-4">
      <div class="text-5xl text-slate-900 font-basblue"> Result</div>
      <div  class="text-5xl text-green-500 font-basblue text-center">ADD EMPLOYEE SUCCESS</div>
      <button class="btn-primary btn" @click="$emit('closeModal')">Back to Home page</button>
    </div>
  </div>

<!-- ============================================
     =====  Select Employeee Profile Modal ======
     ============================================ -->

  <div v-if="modalType === 'SelectingProfile'"
    class="w-screen h-screen bg-black/[.8] fixed top-0 left-0 flex items-center justify-center">
    <div class="h-[60vh] w-[30vw] bg-white rounded-xl flex flex-col items-center justify-evenly p-4 max-2xl:h-[90vh] max-2xl:w-[60vw] overflow-y-scroll">
      <div class="text-4xl text-slate-800 font-basblue">What do you feel?</div>
      <div class="flex flex-wrap justify-center">
        <div v-for="profile in newEmployeeProfile" @click="$emit('changeImage',profile)"
          class="h-fit w-fit flex justify-center items-center overflow-hidden shadow-xl rounded-full p-4 m-4"
          :class="{ 'bg-slate-300': newEmployee.LinkImage === profile }">
          <img :src="profile" class="size-[75px]">
        </div>
      </div>
      <button class="btn-primary btn" @click="$emit('closeModal')">Close</button>
    </div>
  </div>

<!-- ============================================
     ==========  Confirm Delete Modal ===========
     ============================================ -->

  <div v-if="modalType === 'DeleteConfirmation'"  class="w-screen h-screen bg-black/[.8] fixed top-0 left-0 flex items-center justify-center">
    <div class="h-[60vh] w-[30vw] bg-white rounded-xl flex flex-col items-center justify-evenly p-4">
      <div class="text-5xl text-red-500 font-basblue"> Warning !</div>
      <div  class="text-5xl font-basblue text-black text-center">Are you sure to Delete Employee <span class="text-red-500"> {{ deleteEmployeeName }}</span> ?</div>
      <div class="flex gap-4">
        <button class="btn btn-error" @click="$emit('deleteEmployee',deleteEmployeeId)">Delete</button>
        <button class="btn-primary btn" @click="$emit('closeModal')">Cancel</button>
      </div>
      
    </div>
  </div>

<!-- ============================================
     ====== Regristration Success Modal =========
     ============================================ -->

  <div v-if="modalType === 'RegistrationSuccess'"  class="w-screen h-screen bg-black/[.8] fixed top-0 left-0 flex items-center justify-center">
    <div class="h-[60vh] w-[30vw] bg-white rounded-xl flex flex-col items-center justify-evenly p-4">
      <div class="text-5xl font-basblue text-slate-800"> Result</div>
      <div  class="text-5xl font-basblue text-green-500">Registration Success !</div>
      <button class="btn-primary btn" @click="$emit('closeModal')">Close</button>
    </div>
  </div>




</template>

<style scoped>
div::-webkit-scrollbar{
  display: none;
}


div {
  scrollbar-width: none;
  -ms-overflow-style: none;
}

</style>