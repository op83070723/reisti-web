import { createRouter, createWebHistory } from 'vue-router'
import HomeView     from '../views/HomeView.vue'
import ProductsView from '../views/ProductsView.vue'
import FamilyDetail from '../views/FamilyDetail.vue'
import AboutView    from '../views/AboutView.vue'
import OemView      from '../views/OemView.vue'
import ContactView  from '../views/ContactView.vue'

export default createRouter({
  history: createWebHistory(),
  scrollBehavior: () => ({ top: 0 }),
  routes: [
    { path: '/',                         name: 'home',     component: HomeView     },
    { path: '/products',                 name: 'products', component: ProductsView },
    { path: '/products/:category/:slug', name: 'family',   component: FamilyDetail },
    { path: '/about',                    name: 'about',    component: AboutView    },
    { path: '/oem',                      name: 'oem',      component: OemView      },
    { path: '/contact',                  name: 'contact',  component: ContactView  },
    // Legacy redirects
    { path: '/products/concrete-drill/:slug', redirect: '/products' },
    { path: '/products/step-drill/:slug',     redirect: '/products' },
    { path: '/products/hole-saw/bi',          redirect: '/products/hole-saw/hss' },
    { path: '/products/sds-plus',             redirect: '/products' },
    { path: '/products/hex-shank',            redirect: '/products' },
  ],
})
