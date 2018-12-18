import * as types from "../mutation_types"
import router from "../../router"

const state = {
    alertOption: {
        open: false,
        color: 'info',
        timer: null,
        timeout: 3000,
        icon: 'info',
        msg: '提示'
    },
    confirmOption: {
        title: "提示",
        content: "绑定账号，赢取邀请奖励分ETH",
        btn: [
            {
                text: "取消",
                type: "",
                cb: function() {
                }
            },
            {
                text: "确定",
                type: "high",
                cb: function() {
                }
            }
        ]
    },
    winPopupOption: {
        rewards: 0,
        ab: 0,
        winFlag: "LOSE"
    },
    loginBox: false,
    loading: false,
    noMainNetwork: false,
    popupStatus: false,
    isShowPsdVer: false
}

const mutations = {
    /**
     * 显示提示框
     * @param {Object} state store状态
     * @param {Object} data 传入数据 {type, msg}
     * @author shanks
     */
    alert(state,data) {
        if (state.alertOption.timer) clearTimeout(state.alertOption.timer);
        state.alertOption.color = data.type
        state.alertOption.icon = {
            success: 'check_circle',
            info: 'info',
            warning: 'priority_high',
            error: 'warning'
        }[data.type]
        state.alertOption.msg = data.msg || '提示'
        state.alertOption.open = true
        state.alertOption.timer = setTimeout(() => {
            state.alertOption.open = false;
        }, data.timeout || state.alertOption.timeout);
    },
    closeAlert(state) {
        state.alertOption.open = false
    },
    /**
     * 显示confirm询问框
     * @author shanks
     * @param {Object} payload confirm配置参数 {content: "文字类容", btn: "按钮参数"}
     */
    [types.OPEN_CONFIRM](state, payload) {
        state.confirmOption = Object.assign({}, payload)
    },
    /**
     * 打开login弹框
     */
    [types.OPEN_LOGIN](state) {
        if(/Android|webOS|iPhone|iPod|BlackBerry|android/i.test(navigator.userAgent)) {
            router.push("loginselect")
        }else {
            state.loginBox = !state.loginBox
        }

    },
    openWait(state) {
        state.loading = true
    },
    closeWait(state) {
        state.loading = false
    },
    /**
     * 打开win弹框
     */
    [types.OPEN_WIN_POPUP](state, payload) {
        state.winPopupOption = payload
    },
    /**
     * 关闭win、confirm弹框
     */
    [types.CLOSE_POPUP](state, payload) {
        state.popupStatus = !state.popupStatus
    },
    /**
     * 打开密码校验框
     */
    [types.CHANGE_PSDVER](state, payload) {
        state.isShowPsdVer = payload
    },

}

export default {
    state,
    mutations
}
