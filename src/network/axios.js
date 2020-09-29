import originAxios from 'axios'

export default function axios(option) {
	return new Promise((resolve, reject) => {
		// 1.创建axios的实例
		const instance = originAxios.create({
			baseURL: 'http://152.136.185.210:8000/api/w6',
			timeout: 5000
		});
    
		// 配置请求和响应拦截
		instance.interceptors.request.use(config => {
			// 1.当发送网络请求时, 在页面中添加一个loading组件, 作为动画
			return config
		}, err => {
			// 网络请求失败
			return err
		})

		instance.interceptors.response.use(response => {
			// 响应成功
			return response.data
		}, err => {
      // 响应失败
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
