import axios from 'axios'
import store from './store'
import router from './router'
import LangZh from "./lang/language_packs/zh"
import LangEn from "./lang/language_packs/en"

const language = {
    "zh-CN": LangZh,
    "en-US": LangEn
}

axios.defaults.baseURL = window.SERVERPATH
axios.defaults.timeout = 18000
axios.defaults.retry = 4
axios.defaults.retryDelay = 1000

axios.interceptors.request.use(config => {
    if(!config.data || !config.data.noLoading) {
        if(!config.params || !config.params.noLoading) {
            store.commit("openWait")
        }
    }
    let token = store.state.user.userInfo.token || ""
    config.headers.common['token'] = token
    config.headers.common['Accept-Language'] = store.state.locale
    return config
}, error => {
    store.commit("closeWait")
    return Promise.reject(error)
})

axios.interceptors.response.use(response => {
    store.commit("closeWait")
    if(response.data.code == -2) {
        store.commit('REMOVE_USERINFO')
        router.replace('dice')
    }
    if(response.data.code == -1) {
        store.commit('CHANGE_PSDVER', true)
    }
    if(response.data.code != 200 && response.data.code != -2) {
        store.commit('alert', {
            type: 'info',
            msg: response.data.msg
        })
    }
    return response.data
}, err => {
    store.commit("closeWait")
    if (err && err.response) {
        switch (err.response.status) {
        case 400:
            err.message = '请求错误'
            break
        case 401:
            err.message = '未授权，请登录'
            break

        case 403:
            err.message = '拒绝访问'
            break

        case 404:
            err.message = `请求地址出错: ${err.response.config.url}`
            break

        case 408:
            err.message = '请求超时'
            break

        case 500:
            err.message = '服务器内部错误'
            break

        case 501:
            err.message = '服务未实现'
            break

        case 502:
            err.message = '网关错误'
            break

        case 503:
            err.message = '服务不可用'
            break

        case 504:
            err.message = '网关超时'
            break

        case 505:
            err.message = 'HTTP版本不受支持'
            break

        default:
            err.message = '未知错误'
        }
        // store.commit('alert', {
        //     type: 'info',
        //     // msg: err.message
        //     msg: language[store.state.locale].message.PopHttpTimeout
        // })
    }else {
        // store.commit('alert', {
        //     type: 'info',
        //     msg: language[store.state.locale].message.PopHttpTimeout
        // })
    }
    console.log("httperr",err)
    // return Promise.reject(err)
})
// 请求超时重试机制
axios.interceptors.response.use(undefined, function axiosRetryInterceptor(err) {
    var config = err.config;
    // If config does not exist or the retry option is not set, reject
    if(!config || !config.retry) return Promise.reject(err);
    
    // Set the variable for keeping track of the retry count
    config.__retryCount = config.__retryCount || 0;
    
    // Check if we've maxed out the total number of retries
    if(config.__retryCount >= config.retry) {
        // Reject with the error
        return Promise.reject(err);
    }
    
    // Increase the retry count
    config.__retryCount += 1;
    
    // Create new promise to handle exponential backoff
    var backoff = new Promise(function(resolve) {
        setTimeout(function() {
            resolve();
        }, config.retryDelay || 1);
    });
    
    // Return the promise in which recalls axios to retry the request
    return backoff.then(function() {
        return axios(config);
    });
});

export {axios}

export default {
    install(Vue) {
        Object.defineProperty(Vue.prototype, '$http', {
            value: axios
        })
    }
}
