<script setup>
import { UserManagement } from '@/libs/UserManagement.js'
import { getUsersData , addUserData } from '@/libs/crud.js'
import {useRouter} from "vue-router"
import { ref , onMounted, computed } from 'vue'
import Modal from '@/components/Modal.vue'
import { errorStore } from '@/stores/errorStore'
import { authenticationStore } from '@/stores/authenticationStore'

const userManager = ref(new UserManagement())
const authenStore = authenticationStore()
const errStore = errorStore()
const registerMode = ref(false)
const registrationSuccess = ref(false)
const route = useRouter()
const username = ref('')
const password = ref('')
const validatePassword = ref('')
const hasUpper = ref(false)
const hasLower = ref(false)
const hasDigit = ref(false)
const hasSpecial = ref(false)

const login = (event)=>{
    for (const [key,value] of Object.entries(userManager.value.getUsers())) {
        if(value.username == username.value && value.password == password.value){
            errStore.loginErrorLog = ""
            errStore.loginFailed = false
            authenStore.currentUser = username.value
            authenStore.loggedIn = true
            route.push('/home')
            return
        }
    } 
    event.preventDefault()
    errStore.loginErrorLog = "Incorrect Username or Password."
    errStore.loginFailed = true
    
}

const regist = (event)=>{
    for (const [key,value] of Object.entries(userManager.value.getUsers())) {
        if(value.username == username.value){
            errStore.loginErrorLog = "This username has already been used."
            errStore.loginFailed = true
            event.preventDefault();
            return
        }
    } 
    if(!/[0-9]/.test(password.value)){
        errStore.loginErrorLog = "Password doesn't have any digit"
        errStore.loginFailed = true
        event.preventDefault();
        return
    }
    if(!/[a-z]/.test(password.value)){
        errStore.loginErrorLog = "Password doesn't have any lower case"
        errStore.loginFailed = true
        event.preventDefault();
        return
    }
    if(!/[A-Z]/.test(password.value)){
        errStore.loginErrorLog = "Password doesn't have any upper case"
        errStore.loginFailed = true
        event.preventDefault();
        return
    }
    
    if(!/[@#$%^&*!]/.test(password.value)){
        errStore.loginErrorLog = "Password doesn't have any special character"
        errStore.loginFailed = true
        event.preventDefault();
        return
    }
    if(username.value.trim().length === 0 || password.value.trim().length === 0){
            errStore.loginErrorLog = "Please fulfill both username and password."
            errStore.loginFailed = true
            event.preventDefault();
            return
        }
    if(password.value !== validatePassword.value){
        errStore.loginErrorLog = "Password doesn't match."
        errStore.loginFailed = true
        event.preventDefault();
        return 
    }
    

    addUserData(username.value,password.value)
    event.preventDefault();
    registrationSuccess.value = true
    
    
}

const computedPasswordHasDigit = computed(() => {
    if(/[0-9]/.test(password.value)) { 
        hasDigit.value = true
        return 'Password have number'
    }
    else {
        hasDigit.value = false
        return "Password doesn't have any digit"
    }
})
const computedPasswordHasLower = computed(() => {
    if(/[a-z]/.test(password.value)) { 
        hasLower.value = true
        return 'Password have lower case'
    }
    else {
        hasLower.value = false
        return "Password doesn't have any lower case"
    }
})
const computedPasswordHasUpper = computed(() => {
    if(/[A-Z]/.test(password.value)) { 
        hasUpper.value = true
        return 'Password have upper case'
    }
    else {
        hasUpper.value = false
        return "Password doesn't have any upper case"
    }
})
const computedPasswordHasspecial = computed(() => {
    if(/[@#$%^&*!]/.test(password.value)) { 
        hasSpecial.value = true
        return 'Password have special character'
    }
    else {
        hasSpecial.value = false
        return "Password doesn't have any special character"
    }
})

const closeModal = ()=>{
    registrationSuccess.value = false
    location.reload()
}
 
onMounted(async () => {
    try{
    const users = await getUsersData()
    userManager.value.addUsers(users)

    }
    catch(error){
        console.log(error);
        
    }
 })

</script>
<template>
    <div class="w-screen h-screen flex justify-center items-center bg-slate-800">
        <div class="w-1/2  h-[60vh] rounded-3xl flex flex-col items-center justify-center ">
            <img :src="'/src/assets/profile/employee_white.png'" class="size-24">
            <div  class="font-bold text-4xl font-basblue">{{ registerMode ?  'SIGN UP' : 'LOGIN'  }}</div>
            <form class="w-1/3 flex flex-col gap-4">
                <label class=" font-semibold divider divider-neutral divider-start font-basblue mb-0">Username</label>
                <input type="text" placeholder="Username" v-model="username" class="bg-slate-400 rounded-md h-10 text-black p-1">
                <label class=" font-semibold divider divider-neutral divider-start font-basblue  mb-0">Password</label>
                <input type="password" placeholder="Password" v-model="password" class="bg-slate-400 rounded-md h-10 text-black p-1" >
                <label v-if="registerMode" class=" font-semibold divider divider-neutral divider-start font-basblue mb-0">Password Again</label>
                <input v-if="registerMode" type="password" placeholder="Password" v-model="validatePassword" class="bg-slate-400 rounded-md h-10 text-black p-1" >
                <div v-if="registerMode">
                    <div v-if="hasDigit" class="text-green-500">{{computedPasswordHasDigit}}</div>
                    <div v-else class="text-red-500">{{computedPasswordHasDigit}}</div>
                    <div v-if="hasLower" class="text-green-500">{{computedPasswordHasLower}}</div>
                    <div v-else class="text-red-500">{{computedPasswordHasLower}}</div>
                    <div v-if="hasUpper" class="text-green-500">{{computedPasswordHasUpper}}</div>
                    <div v-else class="text-red-500">{{computedPasswordHasUpper}}</div>
                    <div v-if="hasSpecial" class="text-green-500">{{computedPasswordHasspecial}}</div>
                    <div v-else class="text-red-500">{{computedPasswordHasspecial}}</div>
                </div>
                <div v-if="errStore.loginFailed" class="text-red-500">{{ errStore.loginErrorLog }}</div>
                <input v-if="!registerMode" type="submit" class="btn bg-blue-500 text-slate-200 hover:bg-slate-200 hover:text-blue-500" value="Login" @click="login($event)" >
                <input v-if="registerMode" type="submit" class="btn bg-blue-500 text-slate-200 hover:bg-slate-200 hover:text-blue-500" value="Sign up" @click="regist($event)" > 
            </form>
           <div class="flex items-center my-4 gap-4">{{ registerMode ? "Already have an account ?" : "Don't have an account yet ?"  }}<button class="border rounded-3xl text-blue-500 hover:text-slate-100 hover:border-slate-100 border-blue-500 py-1 px-2 transition-all" @click="registerMode = !registerMode ; errStore.loginFailed = false">{{ registerMode ? 'Sign in now !' : 'Create now !' }}</button> </div>    
        </div>
    </div>

    <Modal 
    v-if="registrationSuccess"
    :modalType="'RegistrationSuccess'"
    @closeModal="closeModal"/>
</template>