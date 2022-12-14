import Vue from 'vue'
import VueRouter from 'vue-router'

const Layers = () => import('../views/Layers.vue')
const Download = () => import('../views/Download.vue')
const DownloadGeoserver = () => import('../views/DownloadGeoserver.vue')

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'layers',
    component: Layers,
  },
  {
    path: '/download',
    component: Download,
    children: [
      {
        path: '/',
        redirect: 'geoserver',
      },
      {
        path: 'geoserver',
        name: 'download.geoserver',
        component: DownloadGeoserver,
      },
    ],
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
})

export default router
