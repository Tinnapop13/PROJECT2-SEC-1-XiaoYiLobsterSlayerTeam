import {createRouter, createWebHistory} from "vue-router"
import Home from "@/views/Home.vue"
import Details from "@/views/Details.vue"
import AddCard from "@/views/AddCard.vue"
import Authentication from "@/views/Authentication.vue"
import {useUserStore} from "@/stores/useUserStore.js"

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {path: "/home", name: "Home", component: Home},
    {path: "/details/:id", name: "Details", component: Details},
    {path: "/addcard", name: "addcard", component: AddCard},
    {path: "/", name: "auth", component: Authentication},
  ],
})

router.beforeEach(async (to, from) => {
  const userStore = useUserStore()
  if (!userStore.loggedIn && to.name !== "auth") {
    alert("Please Login First")
    return {name: "auth"}
  }
})

export default router
