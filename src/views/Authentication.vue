<script setup>
import { getUsersData, addUserData } from "@/libs/crud.js";
import { useRouter } from "vue-router";
import { ref, onBeforeMount } from "vue";
import Modal from "@/components/Modal.vue";
import { useAuthStore } from "@/stores/useAuthStore";
import { useUserStore } from "@/stores/useUserStore";
import { storeToRefs } from "pinia";
import { encode,decode} from "@/libs/cryptography.js"

const route = useRouter()
const userStore = useUserStore()
const authStore = useAuthStore()

const {
  hasUpper,
  hasLower,
  hasDigit,
  hasSpecial,
  hasLongUsername,
  username,
  password,
  validatePassword,
} = storeToRefs(authStore);

const users = ref(null);
const keepLoggedIn = ref(false);
const registerMode = ref(false);
const registrationSuccess = ref(false);

/*
============================================
============= Login Function ===============
============================================
*/

const login = (event) => {
  event.preventDefault()
  for (const [key, value] of Object.entries(users.value)) {
    encode(value.id)
    decode
    if (value.username == username.value && decode(value.password) == password.value) {
      authStore.loginErrorLog = ""
      authStore.loginFailed = false
      userStore.currentUser = value.id
      userStore.currentUsername = username.value
      userStore.loggedIn = true
      route.push("/home")
      if (keepLoggedIn.value) {
        localStorage.setItem("login", encode(value.id)); 
      }
      break;
    }
  }

  event.preventDefault();
  authStore.loginErrorLog = "Incorrect Username or Password.";
  authStore.loginFailed = true;
};

/*
============================================
=============== Regist Login ===============
============================================
*/

const regist = (event) => {
  for (const [key, value] of Object.entries(users.value)) {
    if (value.username == username.value) {
      authStore.loginErrorLog = "This username has already been used.";
      authStore.loginFailed = true;
      event.preventDefault();
      return;
    }
  }

  if (
    username.value.trim().length === 0 ||
    password.value.trim().length === 0
  ) {
    authStore.loginErrorLog = "Please fulfill both username and password.";
    authStore.loginFailed = true;
    event.preventDefault();
    return;
  }
  if (password.value !== validatePassword.value) {
    authStore.loginErrorLog = "Password doesn't match.";
    authStore.loginFailed = true;
    event.preventDefault();
    return;
  }
  if (hasUpper.value &&  hasDigit.value && hasLower.value && hasSpecial.value && hasLongUsername.value) {
    addUserData(username.value, encode(password.value));
    event.preventDefault();
    registrationSuccess.value = true; 
  }
  event.preventDefault()
  
  
};


const closeModal = () => {
  registrationSuccess.value = false;
  location.reload();
};

onBeforeMount(async () => {
  
    users.value = await getUsersData();
  
});

</script>
<template> 
  <div class="w-screen h-screen bg-slate-800 overflow-y-scroll ">
    <div class="w-1/2 rounded-3xl m-auto my-10  flex flex-col items-center justify-center">
      <img :src="'/src/assets/images/employee_white.png'" class="size-24" />

<!-- ============================================
     ================ Form Topic ================
     ============================================ -->

      <div class="font-bold text-4xl font-basblue">
        {{ registerMode ? "SIGN UP" : "LOGIN" }}
      </div>

<!-- ============================================
     ================ Form Input ================
     ============================================ -->
      <form class="w-1/3 flex flex-col gap-4">
        <label
          class="font-semibold divider divider-neutral divider-start font-basblue mb-0"
          >Username</label
        >
        <input
          type="text"
          placeholder="Username"
          v-model="username"
          class="bg-slate-400 rounded-md h-10 text-black p-1"
        />
        <label
          class="font-semibold divider divider-neutral divider-start font-basblue mb-0"
          >Password</label
        >

        <input
          type="password"
          placeholder="Password"
          v-model="password"
          class="bg-slate-400 rounded-md h-10 text-black p-1"
        />

        <div v-if="!registerMode" class="form-control">
          <label class="cursor-pointer label">
            <span class="label-text">Remember Me</span>
            <input
              type="checkbox"
              checked="checked"
              class="checkbox checkbox-info"
              v-model="keepLoggedIn"
            />
          </label>
        </div>

        <label
          v-if="registerMode"
          class="font-semibold divider divider-neutral divider-start font-basblue mb-0"
          >Password Again</label
        >
        <input
          v-if="registerMode"
          type="password"
          placeholder="Password"
          v-model="validatePassword"
          class="bg-slate-400 rounded-md h-10 text-black p-1"
        />

<!-- ============================================
     ====== Register Password Validation ========
     ============================================ -->
        <div v-if="registerMode">
          <div v-if="hasDigit" class="text-green-500">
            {{ authStore.computedPasswordHasDigit }}
          </div>
          <div v-else class="text-red-500">
            {{ authStore.computedPasswordHasDigit }}
          </div>
          <div v-if="hasLower" class="text-green-500">
            {{ authStore.computedPasswordHasLower }}
          </div>
          <div v-else class="text-red-500">
            {{ authStore.computedPasswordHasLower }}
          </div>
          <div v-if="hasUpper" class="text-green-500">
            {{ authStore.computedPasswordHasUpper }}
          </div>
          <div v-else class="text-red-500">
            {{ authStore.computedPasswordHasUpper }}
          </div>
          <div v-if="hasSpecial" class="text-green-500">
            {{ authStore.computedPasswordHasspecial }}
          </div>
          <div v-else class="text-red-500">
            {{ authStore.computedPasswordHasspecial }}
          </div>
          <div v-if="hasLongUsername" class="text-green-500">
            {{ authStore.computedUsernameLength }}
          </div>
          <div v-else class="text-red-500">
            {{ authStore.computedUsernameLength }}
          </div>
        </div>
        <div v-if="authStore.loginFailed" class="text-red-500">
          {{ authStore.loginErrorLog }}
        </div>

<!-- ============================================
     ========== Submit Action Button ============
     ============================================ -->

        <input
          v-if="!registerMode"
          type="submit"
          class="btn bg-blue-500 text-slate-200 hover:bg-slate-200 hover:text-blue-500"
          value="Login"
          @click="login($event)"
        />
        <input
          v-if="registerMode"
          type="submit"
          class="btn bg-blue-500 text-slate-200 hover:bg-slate-200 hover:text-blue-500"
          value="Sign up"
          @click="regist($event)"
        />
      </form>
      <div class="flex items-center my-4 gap-4">
        {{
          registerMode
            ? "Already have an account ?"
            : "Don't have an account yet ?"
        }}<button
          class="border rounded-3xl text-blue-500 hover:text-slate-100 hover:border-slate-100 border-blue-500 py-1 px-2 transition-all"
          @click="
            registerMode = !registerMode;
            authStore.loginFailed = false;
          "
        >
          {{ registerMode ? "Sign in now !" : "Create now !" }}
        </button>
      </div>
    </div>
  </div>

  <Modal
    v-if="registrationSuccess"
    :modalType="'RegistrationSuccess'"
    @closeModal="closeModal"
  />
</template>
