import { defineStore } from "pinia";
import { ref } from 'vue';

export const authenticationStore = defineStore('authentication',()=>{
    const currentUser = ref("") 
    const loggedIn = ref(false)
    
    return { loggedIn , currentUser }
})