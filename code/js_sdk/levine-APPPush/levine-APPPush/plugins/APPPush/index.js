import app_push from './app_push.js'
import h5Push from './h5_push.vue'

const appPush = {
	install: function(Vue) {
		Vue.prototype.$appPush = function(op = {}) {
			// #ifdef APP-PLUS
			new app_push({
				...op
			}).show();
			// #endif
			// #ifdef H5
			// Vue.component('h5Push', h5Push)
			// 创建构造器
			const H5PushInstance = Vue.extend(h5Push)
			let instance = new H5PushInstance({
				data: op
			})
			instance.$mount()
			document.body.appendChild(instance.$el)
			Vue.nextTick(() => {
				instance.show = true
			})
			// #endif
		}
	}
}

export default appPush