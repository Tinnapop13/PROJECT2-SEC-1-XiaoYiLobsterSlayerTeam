import { createRouter,createWebHistory } from "vue-router";
import  Home  from "../components/Home.vue";
import  Details  from "../components/Details.vue";
import  Statistics  from "../components/Statistics.vue";
import Card from "../components/Card.vue";

const router = createRouter({
    history: createWebHistory(),
    routes:[
        {path:"/", name:"Home",component: Home},
        {path:"/details/:id", name:"Details",component: Details},
        {path:"/statistics", name:"statistics",component: Statistics},
        {path:"/card", name:"card",component: Card},
    ]
})

export default router
