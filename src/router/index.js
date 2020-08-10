import Vue from 'vue'
import VueRouter from 'vue-router'
import Project from '../views/Project.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Project',
    component: Project,
    children: [
      {
        path: '/:pageId',
        name: 'ProjectPage',
        component: () => import(/* webpackChunkName: "project" */ '../views/ProjectPage.vue')
      }
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router
