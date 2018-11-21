import * as types from "./mutation_types"
import i18n from "../lang"

const mutations = {
    /**
     * 语言切换
     * @author shanks
     */
    [types.CHANGE_LANGUAGE](state, payload) {
        window.app.changeLanguage(payload) 
        console.log(payload)
        console.log(window.webkit)
        // window.webkit.messageHandlers.appMethodHandler.postMessage({
        //     callbackId: 1,
        //     methodName: "changeLanguage",
        //     parameters: JSON.stringify({test: 111})
        // });
        i18n.locale = payload
        localStorage.setItem("locale", payload)
        state.locale = payload
    }
}

export default mutations