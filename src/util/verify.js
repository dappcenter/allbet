import "babel-polyfill";
import store from "../store"
import LangZh from "../lang/language_packs/zh"
import LangEn from "../lang/language_packs/en"

const language = {
    "zh-CN": LangZh,
    "en-US": LangEn
}

const verify = function(verifyArr) {
    let b = true,
        msg = ""
    for(let i=0,len=verifyArr.length; i<len; i++) {
        let val = verifyArr[i].val
        switch(verifyArr[i].type) {
            case "email":
                if(val == "" || !/^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/.test(val)) {
                    b = false
                    msg = language[store.state.locale].message.PopEmailWrong
                }
            break
            case "phone":
                if(val == "") {
                    b = false
                    msg = language[store.state.locale].message.PopPhoneEmpty
                }else if(!(/^1[34578]\d{9}$/.test(val))) {

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