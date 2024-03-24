import { defineStore } from 'pinia'
import { ref } from 'vue'

export const errorStore = defineStore('error',() => {
    const loginErrorLog = ref("")
    const loginFailed = ref(false)
    return { loginErrorLog , loginFailed }
})