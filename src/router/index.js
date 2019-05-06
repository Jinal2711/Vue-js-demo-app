import Vue from 'vue';
import Router from 'vue-router';


import Home from '@/components/Home';
import About from '@/components/About';
import Contact from '@/components/Contact';
import HelloWorld from "@/components/HelloWorld";

Vue.use(Router)

export default new Router({
  routes: [{
      path: '/helloworld',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/home',
      name: 'Home',
      component: Home
    },
    {
      path: '/todo-list',
      name: 'TODO-LIST',
      component: About
    },
    {
      path: '/calculator',
      name: 'CALCULATOR',
      component: Contact
    }
  ]
})
