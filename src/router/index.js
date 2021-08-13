import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [{
  path: '/login',
  name: 'login',
  component: () =>
    import('@/views/login')
}, {
  path: '/user/profile',
  name: 'user-profile',
  component: () =>
    import('@/views/user-profile')
},

{
  path: '/search',
  name: 'search',
  component: () =>
    import('@/views/search')
}, {
  path: '/article/:articleId',
  name: 'article-contain',
  props: true,
  component: () =>
    import('@/views/article-contain')
},

{
  path: '/',

  component: () =>
    import('@/views/layout'),
  children: [{
    path: '',
    redirect: 'home'
  },
  {
    path: 'home',
    name: 'home',
    component: () =>
      import('@/views/home')
  },
  {
    path: 'qa',
    name: 'qa',
    component: () =>
      import('@/views/qa')
  },
  {
    path: 'video',
    name: 'video',
    component: () =>
      import('@/views/video')
  },
  {
    path: 'my',
    name: 'my',
    component: () =>
      import('@/views/my')
  }

  ]

}
]
const router = new VueRouter({
  routes
})

export default router
