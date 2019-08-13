import './css/main.css';
import './css/loader.less';
import './css/alert.css';
import './js/alert.js';
import Vue from 'vue';
import store from './js/store';
import App from './App.vue';

Vue.config.productionTip = false;

new Vue({
	el: '#calculator',
	store,
	template: '<App/>',
	components: { App },
});
