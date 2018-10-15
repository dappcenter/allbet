import * as types from "../mutation_types"

const state = {
    alertOption: {
        open: false,
        color: 'info',
        timer: null,
        timeout: 3000,
        icon: 'info',
        msg: '提示'
    }
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
        }, state.alertOption.timeout);
    },
    closeAlert(state) {
        state.alertOption.open = false
    }
}

export default {
    state,
    mutations
}