import originAxios from 'axios'

export default function axios(option) {
	return new Promise((resolve, reject) => {
		// 1.创建axios的实例
		const instance = originAxios.create({
			baseURL: 'http://152.136.185.210:8000/api/z8',
			timeout: 5000
		});
    
		// 配置请求和响应拦截
		instance.interceptors.request.use(config => {
			// console.log('来到了request拦截success中');
			// 1.当发送网络请求时, 在页面中添加一个loading组件, 作为动画


			return config
		}, err => {
			// console.log('来到了request拦截failure中');
			return err
		})

		instance.interceptors.response.use(response => {
			// console.log('来到了response拦截success中');
			return response.data
		}, err => {
			console.log('来到了response拦截failure中');
      console.log(err);
      if (err && err.response) {
				switch (err.response.status) {
					case 400:
						err.message = '请求错误'
						break
					case 401:
						err.message = '未授权的访问'
						break
				}
			}
			return err
		})

		// 2.传入对象进行网络请求
		instance(option).then(res => {
			resolve(res)
		}).catch(err => {
			reject(err)
		})
	})
}
