import "babel-polyfill";
import store from "../store"

const verify = function(verifyArr) {
    let b = true,
        msg = ""
    for(let i=0,len=verifyArr.length; i<len; i++) {
        let val = verifyArr[i].val
        switch(verifyArr[i].type) {
            case "email":
                if(val == "" || !/^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/.test(val)) {
                    b = false
                    msg = "邮箱输入有误"
                }
            break
            case "phone":
                if(val == "" || !/^[0-9]*$/.test(val)) {
                    b = false
                    msg = "手机号输入有误"
                }
            break
            case "noEmpty":
                if(val.trim() == "") {
                    b = false
                    msg = "不能为空"
                }
            break
            default:
            break
        }
        if(!b) {
            store.commit("alert",{
                type: "info",
                msg: msg
            })
            break
        }
    }
    return b
}

export default verify