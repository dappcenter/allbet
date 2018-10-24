import qs from 'qs'
//创建http对象
let ajax = new XMLHttpRequest();

let pollHttp = function(playload) {
    return new Promise(function(resolve, reject) {
        let data = qs.stringify(playload.data)
        ajax.open(playload.type, window.SERVERPATH + playload.url + "?" + data)
        ajax.send()
        ajax.onreadystatechange = function () {
            if (ajax.readyState==4 &&ajax.status==200) {
             　　resolve(JSON.parse(ajax.responseText))
            }
        }
    })
}

export default pollHttp

