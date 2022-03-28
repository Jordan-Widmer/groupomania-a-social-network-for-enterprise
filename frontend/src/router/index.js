import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import store from "@/store";

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
    meta: {
      requiredAuth: true,
    },
  },
  {
    path: "/sign",
    name: "Inscription",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Inscription.vue"),
  },
  {
    path: "/login",
    name: "Connexion",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Connexion.vue"),
  },
  {
    path: "/acceuil",
    name: "Acceuil",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Accueil.vue"),
    meta: {
      requiredAuth: true,
    },
  },
  {
    path: "/profil",
    name: "Profil",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Profil.vue"),
    meta: {
      requiredAuth: true,
    },
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach(async (to, from, next) => {
  const LoggedIn = store.getters.getLoggedIn;
  console.log(LoggedIn);
  const requiredAuth = to.matched.every((user) => user.meta.requiredAuth);
  if (requiredAuth && !LoggedIn) next({ name: "Connexion" });
  else next();
});

export default router;
