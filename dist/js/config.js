if(window.location.href.indexOf('www.allbet.io') >= 0) {
    //正式环境
    window.SERVERPATH = "https://apinodehk.allbet.io"
    window.BANCORADDRESS = "0x36fc06fef49e2d92fe9460685d56a5998d9ba187"
    window.ROLLERADDRESS = "0x5544b7603c39e7f471a08e761ff0c7362878c70b"

    window.TRONROLLARADDRESS = "TDZPd1D5C9ZtPCxcuUQCn5TTpUouMue4MU"
    window.TRONFUNDRAIYADDRESS = "TDmwcA6XuoSZCVdnpihZKtdLe85mUwWG64"
    window.TRONFUNDRAIYADDRESS2 = "TGCz7hLkvBamcSh7TipdFtBaSM2DXeY5aT"  //合约转账

    window.NETWORK = 1
}else if(window.location.href.indexOf('47.91.247.93') >= 0){
    //测试环境
    window.SERVERPATH = "http://47.91.247.93:7788"
    window.BANCORADDRESS = "0xd06b02f187c137f59f9351c62a421dae59739d37"
    window.ROLLERADDRESS = "0x861e9351996abc27b1f932f92e5cad82ac1cbdd2"

    window.TRONROLLARADDRESS = "TBnk88LDpp6zv59X9rxNPRiQQuektRJGmA"
    window.TRONFUNDRAIYADDRESS = "TGCz7hLkvBamcSh7TipdFtBaSM2DXeY5aT"
    window.TRONFUNDRAIYADDRESS2 = "TGCz7hLkvBamcSh7TipdFtBaSM2DXeY5aT"  //合约转账

    window.NETWORK = 4
}else {
    //本地环境
    window.SERVERPATH = "http://192.168.120.64:8080"
    window.BANCORADDRESS = "0xd06b02f187c137f59f9351c62a421dae59739d37"
    window.ROLLERADDRESS = "0x861e9351996abc27b1f932f92e5cad82ac1cbdd2"

    window.TRONROLLARADDRESS = "TBnk88LDpp6zv59X9rxNPRiQQuektRJGmA"
    window.TRONFUNDRAIYADDRESS = "TGCz7hLkvBamcSh7TipdFtBaSM2DXeY5aT"
    window.TRONFUNDRAIYADDRESS2 = "TGCz7hLkvBamcSh7TipdFtBaSM2DXeY5aT"  //合约转账

    window.NETWORK = 4
}