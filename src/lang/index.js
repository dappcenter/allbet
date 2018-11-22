/**
 * 国际化
 * @author shanks
 * @date 2018/10/10
 * @version 1.0.0
 */
import Vue from "vue"
import VueI18n from "vue-i18n"
import LangZh from "./language_packs/zh"
import LangEn from "./language_packs/en"
import {getLanguage} from "../util/extend_methods"

Vue.use(VueI18n)

export default new VueI18n({
    locale: localStorage.getItem('locale') || getLanguage(),
    messages: {
        "zh-CN": LangZh,
        "en-US": LangEn
    }
})
