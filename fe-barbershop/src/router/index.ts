import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      name: "home",
      component: () => import("../views/HomeView.vue"),
      meta: {
        layout: "default",
      },
    },
    {
      path: "/register",
      name: "register",
      component: () => import("../views/auth/RegisterView.vue"),
      meta: {
        layout: "auth",
      },
    },
    {
      path: "/sign-in",
      name: "sign-in",
      component: () => import("../views/auth/LoginView.vue"),
      meta: {
        layout: "auth",
      },
    },
    {
      path: "/:cathAll(.*)",
      name: "not-found",
      component: () => import("../views/NotFoundView.vue"),
      meta: {
        layout: "default",
      },
    },
  ],
});

router.beforeEach((to, from) => {});

export default router;
