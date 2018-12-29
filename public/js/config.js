if(window.location.href.indexOf('www.allbet.io') >= 0) {
    //正式环境 ETH
    window.SERVERPATH = "https://apinodehk.allbet.io"
    window.BANCORADDRESS = "0x36fc06fef49e2d92fe9460685d56a5998d9ba187"
    window.ROLLERADDRESS = "0x2aef00e45e610fcd13fbc5b734b68c2353941520"   //dice游戏合约
    window.ETHABTOKEN = "0x9a6d042f8be45202464d66a88602864ebdc287f1"
    // TRX
    window.TRONROLLARADDRESS = "TKQ2WmYs9KRmD3c9TwUMjZ3vj5BKgADUZ5"   //dice游戏合约
    window.TRONFUNDRAIYADDRESS = "TDmwcA6XuoSZCVdnpihZKtdLe85mUwWG64"
    window.TRONFUNDRAIYADDRESS2 = "TGCz7hLkvBamcSh7TipdFtBaSM2DXeY5aT"  //合约转账
    window.TRONABTOKEN = "TNbYoP22d74RWy4ETssHsXYFrnmmbQ2fvt"
    // 网络标识
    window.NETWORK = 1
}else if(window.location.href.indexOf('47.91.247.93') >= 0){
    //测试环境
    window.SERVERPATH = "http://47.91.247.93:7788"
    window.BANCORADDRESS = "0xd06b02f187c137f59f9351c62a421dae59739d37"
    window.ROLLERADDRESS = "0x9fb54a29924ecca77e8f2c6c7e762e9e18e56b04"
    window.ETHABTOKEN = "0x1f1a8108671c893AD3382166Edd427E487be3266"

    window.TRONROLLARADDRESS = "TE3UB9XhWAvsMHxg1zNcYb4sWPZvRTGb1Y"
    window.TRONFUNDRAIYADDRESS = "TJdfA7GzgV8MtBBAxKJ5KtCpC9iH5kVxtN"
    window.TRONFUNDRAIYADDRESS2 = "TGCz7hLkvBamcSh7TipdFtBaSM2DXeY5aT"  //合约转账
    window.TRONABTOKEN = "TGouFj5A3gw2eTcQyQpupHrZmKdMnkehRW"

    window.NETWORK = 4
}else {
    //本地环境
    window.SERVERPATH = "http://192.168.120.64:8080"
    // window.SERVERPATH = "https://apinodehk.allbet.io"
    // window.SERVERPATH = "http://47.91.247.93:7788"
    window.BANCORADDRESS = "0xd06b02f187c137f59f9351c62a421dae59739d37"
    window.ROLLERADDRESS = "0x9fb54a29924ecca77e8f2c6c7e762e9e18e56b04"
    window.ETHABTOKEN = "0x1f1a8108671c893AD3382166Edd427E487be3266"

    window.TRONROLLARADDRESS = "TE3UB9XhWAvsMHxg1zNcYb4sWPZvRTGb1Y"
    window.TRONFUNDRAIYADDRESS = "TJdfA7GzgV8MtBBAxKJ5KtCpC9iH5kVxtN"
    window.TRONFUNDRAIYADDRESS2 = "TGCz7hLkvBamcSh7TipdFtBaSM2DXeY5aT"  //合约转账
    window.TRONABTOKEN = "TGouFj5A3gw2eTcQyQpupHrZmKdMnkehRW"

    window.NETWORK = 4
    
}