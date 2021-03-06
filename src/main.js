// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuetify from 'vuetify'
import Vuex from 'vuex'
import App from './App'
import router from './router'
import 'vuetify/dist/vuetify.min.css'
import Header from '@/components/PageHeader'
import SubHeader from '@/components/PageSubHeader'
import Footer from '@/components/PageFooter'
import LeftMenu from '@/components/LeftMenu'
import Waiting from '@/components/Waiting'
import Analytics from '@/components/Analytics'
import store from './store'
import VueGoogleCharts from 'vue-google-charts'
import TreeView from 'vue-json-tree-view'
import vPlayBack from 'v-playback'
import VideoLink from '@/components/VideoLink'
import DatasetCreateOrSelect from '@/components/DatasetCreateOrSelect'
import VueSocketIO from 'vue-socket.io'
import SocketIO from 'socket.io-client'

Vue.use(TreeView)
Vue.use(vPlayBack)
Vue.use(VueGoogleCharts)

Vue.config.productionTip = false
// Vue.config.devtools = true

Vue.use(Vuex)
Vue.use(Vuetify, {
  theme: {
    primary: '#096ff4',
    secondary: '#03A9F4',
    tertiary: '#083d56',
    accent: '#1519fe',
    error: '#f44336',
    warning: '#ffeb3b',
    info: '#82B1FF',
    success: '#4caf50'
  }
})

Vue.use(new VueSocketIO({
  // debug: true,
  connection: SocketIO({path: '/nmr/socket.io', port: 3000})
}))

Vue.component('page-header', Header)
Vue.component('page-subheader', SubHeader)
Vue.component('page-footer', Footer)
Vue.component('LeftMenu', LeftMenu)
Vue.component('waiting', Waiting)
Vue.component('analytics', Analytics)
Vue.component('video-link', VideoLink)
Vue.component('dataset-create-or-select', DatasetCreateOrSelect)

/* eslint-disable no-new */
export default new Vue({
  el: '#app',
  store,
  router,
  components: { App },
  template: '<App/>'
})
