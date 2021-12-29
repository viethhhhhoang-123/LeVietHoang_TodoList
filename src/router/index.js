import Vue from "vue";
import Router from "vue-router";
import Hello from "../components/Hello";
import Tasks from "../components/Tasks";

Vue.use(Router);

export default new Router({
  mode: "history",
  routes: [
    {
      path: "/",
      name: "Tasks",
      component: Tasks
    },
    {
      path: "/hello",
      name: "Hello",
      component: Hello
    }
  ]
});
