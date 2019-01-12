import qs from 'qs'
import store from "../store"
//创建http对象


let pollHttp = function(playload) {
    let ajax = new XMLHttpRequest();
    return new Promise(function(resolve, reject) {
        let data = qs.stringify(playload.data)
        ajax.open(playload.type, window.SERVERPATH + playload.url + "?" + data)
        ajax.setRequestHeader("token", store.state.user.userInfo.token || "")
        // if(playload.type == 'post') {
        //     ajax.send(JSON.stringify(playload.data))
        // }else {
        //     ajax.send()
        // }
        ajax.send()
        ajax.onreadystatechange = function () {
            if (ajax.readyState==4 && ajax.status==200) {
             　 resolve(JSON.parse(ajax.responseText))
            }else if(ajax.readyState==4 && ajax.status!=200) {
                reject()
            }
        }
    })
}

export default pollHttp

