import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";

Vue.use(Router);

export default new Router({
    mode: "history",
    base: process.env.BASE_URL,
    routes: [
        {
            path: "/",
            component: () => import("./views/Dice.vue"),
            redirect: "/index"
        },
        {
            path: "/index",
            name: "index",
            component: () => import("./views/Home.vue")
        },
        {
            path: "/about",
            name: "about",
            // route level code-splitting
            // this generates a separate chunk (about.[hash].js) for this route
            // which is lazy-loaded when the route is visited.
            component: () => import(/* webpackChunkName: "about" */ "./views/About.vue")
        },
        {
            path: "/dice",
            name: "dice",
            component: () => import("./views/Dice.vue")
        },
        {
            path: "/roller",
            name: "roller",
            component: () => import("./views/Roller.vue")
        },
        {
            path: "/invite",
            name: "invite",
            component: () => import("./views/Invite.vue")
        },
        {
            path: "/my-assets",
            name: "my-assets",
            component: () => import("./views/My-assets.vue")
        },
        {
            path: "/trading-record",
            name: "trading-record",
            component: () => import("./views/Trading-record.vue")
        }
    ]
});
