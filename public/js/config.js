if(window.location.href.indexOf('47.91.247.93') >= 0) {
    console.log(111)
    //正式环境
    window.SERVERPATH = "http://47.91.247.93:7788"
    window.BANCORADDRESS = "0x57ce2ffe2e198c97f1fd057e0e89df33d7c5705a"
    window.ROLLERADDRESS = "afasfasdf"
}else {
    //测试环境
    window.SERVERPATH = "http://192.168.150.134"
    window.BANCORADDRESS = "0x57ce2ffe2e198c97f1fd057e0e89df33d7c5705a"
    window.ROLLERADDRESS = "0x861e9351996abc27b1f932f92e5cad82ac1cbdd2"
}

