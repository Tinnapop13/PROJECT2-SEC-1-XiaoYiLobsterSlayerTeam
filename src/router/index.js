import { createRouter,createWebHistory } from "vue-router";
import  Home  from "../components/Home.vue";
import  Details  from "../components/Details.vue";
import Card from "../components/Card.vue";
import AddCard from "@/components/AddCard.vue";

const router = createRouter({
    history: createWebHistory(),
    routes:[
        {path:"/", name:"Home",component: Home},
        {path:"/details/:id", name:"Details",component: Details},
        {path:"/card", name:"card",component: Card},
        {path:"/addcard", name:"addcard",component: AddCard }
    ]
})

export default router
