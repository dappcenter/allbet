if(window.location.href.indexOf('www.allbet.io') >= 0) {
    //正式环境
    window.SERVERPATH = "http://apinode.allbet.io"
    window.BANCORADDRESS = "0x36fc06fef49e2d92fe9460685d56a5998d9ba187"
    window.ROLLERADDRESS = "0x5544b7603c39e7f471a08e761ff0c7362878c70b"
    window.NETWORK = 1
}else {
    //测试环境
    window.SERVERPATH = "http://192.168.150.134"
    window.BANCORADDRESS = "0x57ce2ffe2e198c97f1fd057e0e89df33d7c5705a"
    window.ROLLERADDRESS = "0x861e9351996abc27b1f932f92e5cad82ac1cbdd2"
    window.NETWORK = 4
}

