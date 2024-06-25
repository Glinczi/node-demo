const axios = require('axios').default;
// http://36.97.236.47:90/iwork/im-biz/serverCommon/download?fileId=92a0f023f0564471ac7de09d80231282

const service = axios.create({
  baseURL: 'http://36.97.236.47:90/',
  timeout: 5000,
});

// request拦截器 request interceptor
service.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    // do something with request error
    console.log('request-err', error); // for debug
    return Promise.reject(error);
  }
);
// respone拦截器
service.interceptors.response.use(
  (response) => {
    return Promise.resolve(response.data);
  },
  (error) => {
    console.log('请求失败', error); // for debug
    // 超时
    if (error.message.includes('timeout')) {
      return Promise.reject(error);
    }
    // 网络
    if (error.message == 'Network Error') {
      return Promise.reject(error);
    }
    return Promise.reject(error);
  }
);

module.exports = service;
