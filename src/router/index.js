import {createRouter, createWebHistory} from "vue-router"
import Home from "../components/Home.vue"
import Details from "../components/Details.vue"
import Card from "../components/Card.vue"
import AddCard from "@/components/AddCard.vue"
import Authentication from "@/components/Authentication.vue"
import {authenticationStore} from "@/stores/authenticationStore.js"

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {path: "/home", name: "Home", component: Home},
    {path: "/details/:id", name: "Details", component: Details},
    {path: "/card", name: "card", component: Card},
    {path: "/addcard", name: "addcard", component: AddCard},
    {path: "/", name: "auth", component: Authentication},
  ],
})

router.beforeEach(async (to, from) => {
  const authStore = authenticationStore()
  if (!authStore.loggedIn && to.name !== "auth") {
    alert("Please Login First")
    return {name: "auth"}
  }
})

export default router
