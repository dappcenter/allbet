import * as types from "../mutation_types"
import eossdkutil from 'eos-sdk-util'
const state = {

}

const mutations = {

}

const actions = {
    registerEOS({commit, rootState}) {
        console.log(eossdkutil)
        if (eossdkutil) {
            window.eossdkutil = eossdkutil;
            
            eossdkutil.setScatterNetworkTest();//按需选择测试或正式网络
            // eossdkutil.setScatterNetworkMain();
            // eossdkutil.init().then(function () {
            //     var env = eossdkutil.getEnv();
            //     if (env == "tp") {
            //     //当前环境是tp
            //     } else if (env == "scatter") {
            //     //当前环境是scatter
            //         console.log("scatter")
            //         console.log(eossdkutil.getScatterIdentity())
            //         eossdkutil.login().then((identity) => {
            //             console.log(identity)
            //         });
            //     } else {
            //     }
            // });
        }
    }
}

export default {
    state,
    mutations,
    actions
}