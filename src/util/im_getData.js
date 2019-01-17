import store from "../store.js"
import * as types from "../vuex/mutation_types"
import PollHttp from "./pollHttp"

const getBonusPools = () => {
    PollHttp({
        type: "get",
        url: "/app/profit/profit",
        data: {
            coinType: store.state.user.coinType
        }
    }).then(res => {
        if(res.code == 200) {
            store.commit(types.UPDATE_BP_DATA, res.result)
        }
    })
    setTimeout(() => {
        getBonusPools()
    }, 8000)
}

export {getBonusPools}