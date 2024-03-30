import {createRouter, createWebHistory} from "vue-router"
import Home from "@/views/Home.vue"
import Details from "@/views/Details.vue"
import AddCard from "@/views/AddCard.vue"
import Authentication from "@/views/Authentication.vue"
import Statistics from "@/views/Statistics.vue"
import {useUserStore} from "@/stores/useUserStore.js"
import {decode} from "@/libs/cryptography"

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {path: "/home", name: "Home", component: Home},
    {path: "/details/:id", name: "Details", component: Details},
    {path: "/addcard", name: "addcard", component: AddCard},
    {path: "/", name: "auth", component: Authentication},
    {path: "/stat", name: "stat", component: Statistics},
  ],
})

const userToken = localStorage.getItem("login")

router.beforeEach(async (to, from) => {
  const userStore = useUserStore()

  if (!userStore.loggedIn && to.name !== "auth") {
    if (userToken === null) alert("Please Login First")
    return {name: "auth"}
  }
})

router.beforeEach(async (to, from) => {
  const userStore = useUserStore()

  if (userToken !== null && !userStore.loggedIn && to.name === "auth") {
    const decodeToken = decode(userToken)
    userStore.currentUser = decodeToken
    userStore.loggedIn = true
    return {name: "Home"}
  }
})

export default router
