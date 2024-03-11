<script setup>
    const props = defineProps(['foo'])


</script>
 
<template>
    <div class="flex flex-col">
        <h1>This is HOME !!!</h1>
        <router-link to="/statistics"><button>statistics</button></router-link>
        <router-link :to="{name: 'Details', params: {id: 0}}"><button>details</button></router-link>
        <router-link to="/card"><button>card</button></router-link>
    </div>
</template>
 
<style scoped>

</style>