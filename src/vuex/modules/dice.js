import * as types from "../mutation_types"


const state = {
    betInfo: {
        diceList: [],
        amount: 0.01
    },
}

const getters = {
    /**
     * 获取预估奖励数据
     * @author shanks
     */
    getBetRecordData(state) {
        let n = 0
        state.betInfo.diceList.forEach((value, index) => {
            if(value.checked) {
                n ++
            }
        })
        return {
            odds: (n/6*100).toFixed(2),
            amount: state.betInfo.amount
        }
    }
}

const mutations = {
    /**
     * 设置骰子下注信息
     * @author shanks
     */
    [types.SET_DICE_BET_INFO](state, betInfo) {
        let obj = {}
        for(let j in state.betInfo) {
            obj[j] = state.betInfo[j]
        }
        for(let i in betInfo) {
            obj[i] = null
            obj[i] = betInfo[i]
        }
        state.betInfo = null
        state.betInfo = obj
    },
    /**
     * 清空骰子下注信息
     * @author shanks
     */
    [types.CLEAR_DICE_BET_INFO](state) {
        state.betInfo = {}
    }
}

export default {
    state,
    getters,
    mutations
}