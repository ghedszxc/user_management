import Vue from 'vue'
import App from './App.vue'
import Auth from './package/auth'
import vuetify from './plugins/vuetify'
import router from './router'
import store from './store'
import vueResource from 'vue-resource'
import globalMixin from './mixins/global'
import apexCharts from 'vue-apexcharts'

Vue.use(Auth)
Vue.use(vueResource)
Vue.mixin(globalMixin)

Vue.use(apexCharts)
Vue.component('apexchart', apexCharts)

Vue.http.options.root = "http://127.0.0.1:8000"

Vue.config.productionTip = false

Vue.http.interceptors.push((request, next) => {
  request.headers.set("Authorization", "Bearer " + Vue.auth.getToken());
  next();
});

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.forVisitors)) {
    Vue.auth.isAuthenticated() ? next({ path: '/dashboard' }) : next()
  } else if(to.matched.some(record => record.meta.forAuth)){
    !Vue.auth.isAuthenticated() ? next({ path: '/' }) : next()
  } else next()
})

new Vue({
  vuetify,
  router,
  store,
  render: h => h(App)
}).$mount('#app')
