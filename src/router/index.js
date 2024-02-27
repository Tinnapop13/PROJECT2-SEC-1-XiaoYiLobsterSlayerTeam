import { createRouter,createWebHistory } from "vue-router";
import  Home  from "../components/Home.vue";
import  Delete  from "../components/Delete.vue";

const router = createRouter({
    history: createWebHistory(),
    routes:[
        {path:"/", name:"Home",component: Home},
        {path:"/delete", name:"Delete",component: Delete}
    ]
})

export default router
