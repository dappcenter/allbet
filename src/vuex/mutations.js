import * as types from "./mutation_types"
import i18n from "../lang"

const mutations = {
    /**
     * 语言切换
     * @author shanks
     */
    [types.CHANGE_LANGUAGE](state, payload) {
        i18n.locale = payload
        localStorage.setItem("locale", payload)
        state.locale = payload
        window.app.changeLanguage(payload) 
    }
}

export default mutations