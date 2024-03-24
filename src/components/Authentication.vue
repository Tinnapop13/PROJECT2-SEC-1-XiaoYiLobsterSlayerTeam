<script setup>
import { UserManagement } from '@/libs/UserManagement.js'
import { getUsersData , addUserData } from '@/libs/crud.js'
import {useRouter} from "vue-router"
import { ref , onMounted } from 'vue'
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
    errStore.loginErrorLog = "Incorrect Username or Password"
    errStore.loginFailed = true
    
}

const regist = (event)=>{
    for (const [key,value] of Object.entries(userManager.value.getUsers())) {
        if(value.username == username.value){
            errStore.loginErrorLog = "This username has already been used"
            errStore.loginFailed = true
            event.preventDefault();
            return
        }
    } 
    if(username.value.trim().length === 0 || password.value.trim().length === 0){
            errStore.loginErrorLog = "Please fulfill both username and password"
            errStore.loginFailed = true
            event.preventDefault();
            return
        }
    if(password.value !== validatePassword.value){
        errStore.loginErrorLog = "Password doesn't match"
        errStore.loginFailed = true
        event.preventDefault();
        return
    }
    addUserData(username.value,password.value)
    event.preventDefault();
    registrationSuccess.value = true
    
    
}

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
    <div class="w-screen h-screen flex justify-center items-center">
        <div class="bg-white w-[40vw] h-[60vh] rounded-3xl flex flex-col items-center justify-center ">
            <div v-if="!registerMode" class="text-black font-bold text-4xl">Login</div>
            <div v-if="registerMode" class="text-black font-bold text-4xl">Sign up</div>
            <form class="flex flex-col gap-4 w-[50%]">
                <label class="text-black font-semibold divider divider-neutral divider-start ">Username</label>
                <input type="text" placeholder="Username" v-model="username" class="bg-slate-400 rounded-md h-10 text-black p-1">
                <label class="text-black font-semibold divider divider-neutral divider-start ">Password</label>
                <input type="password" placeholder="Password" v-model="password" class="bg-slate-400 rounded-md h-10 text-black p-1" >
                <label v-if="registerMode" class="text-black font-semibold divider divider-neutral divider-start ">Password Again</label>
                <input v-if="registerMode" type="password" placeholder="Password" v-model="validatePassword" class="bg-slate-400 rounded-md h-10 text-black p-1" >
                <div v-if="errStore.loginFailed" class="text-red-500">{{ errStore.loginErrorLog }}</div>
                <input v-if="!registerMode" type="submit" class="btn btn-primary" value="Login" @click="login($event)" >
                <input v-if="registerMode" type="submit" class="btn btn-primary" value="Sign up" @click="regist($event)" > 
            </form>
            <button class="btn btn-secondary w-1/2 my-1" @click="registerMode = !registerMode ; errStore.loginFailed = false">{{ registerMode ? 'Go to Sign in' : 'Go to Sign up' }}</button>    
        </div>
    </div>

    <Modal 
    v-if="registrationSuccess"
    :modalType="'RegistrationSuccess'"
    @closeModal="closeModal"/>
</template>