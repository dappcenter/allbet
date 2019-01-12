import store from "../store.js"
import * as types from "../vuex/mutation_types"
import {axios} from "../axios"
import PollHttp from "./pollHttp"

const getBonusPools = () => {
    // axios.get("/app/profit/profit", {
    //     params: {
    //         noLoading: true,
    //         coinType: "TRX"
    //     }
    // }).then(res => {
    //     if(res.code == 200) {
    //         store.commit(types.UPDATE_BP_DATA, res.result)
    //     }
    // }).catch(err => {
    // })
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
    }, 10000)
}

export {getBonusPools}