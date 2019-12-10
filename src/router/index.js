import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Spot from '@/components/Spot'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/:spotId',
      name: 'Spot',
      component: Spot
    }
  ]
})
