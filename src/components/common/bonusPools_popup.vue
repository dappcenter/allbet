<template>
    <mu-dialog :open.sync="isShow" :append-body="false" class="bonus-pools-popup" :class="{'isbp': tab == 1}">
        <div class="tab-bar">
            <a href="javascript:;" :class="{'active': tab == 1}" @click="tab = 1">{{$t('message.bonusPool')}}</a>
            <a href="javascript:;" :class="{'active': tab == 2}" @click="tab = 2">{{$t('message.BPDig')}}</a>
        </div>
        <div class="tab1" v-show="tab == 1">
            <div class="coin-wrap eth">
                <div class="coin-logo">
                    <img src="../../../public/img/coin/ETH.png" />
                    <span>{{$t('message.BPcurrentAmount')}}</span>
                </div>
                <h3>{{Number(bonusPoolsData.ethPool) > 0 ? Number(bonusPoolsData.ethPool).toFixed(2) : 0}} ETH</h3>
            </div>
            <div class="coin-wrap eth">
                <div class="coin-logo">
                    <img src="../../../public/img/coin/TRX.png" />
                    <span>{{$t('message.BPcurrentAmount')}}</span>
                </div>
                <h3>{{Number(bonusPoolsData.trxPool) > 0 ? Number(bonusPoolsData.trxPool).toFixed(2) : 0}} TRX</h3>
            </div>
            <ul>
                <li>
                    <img src="../../../public/img/coin/EOS.png" />
                    <span>{{$t("message.BPSoon")}}</span>
                </li>
                <li>
                    <img src="../../../public/img/coin/AB.png" />
                    <span>{{$t("message.BPSoon")}}</span>
                </li>
            </ul>
            <div class="tip3">
                <p>{{$t('message.BPtip')}}</p>
            </div>
        </div>
        <div class="tab2" v-if="tab == 2">
            <div class="progress-wrap">
                <h4 v-show="coinType == 'TRX'">{{$t("message.BP3stage")}}（{{$t("message.BPmost")}} 100TRX：50AB）</h4>
                <h4 v-show="coinType == 'ETH'">{{$t("message.BP3stage")}}（{{$t("message.BPmost")}} 1ETH：3200AB）</h4>
                <div class="progress-bar"><i>{{(bonusPoolsData.progressDig).toFixed(2)}}/1,000,000,000</i><span :style="{'width': bonusPoolsData.progressDig/1000000000*100 + '%'}"></span></div>
                <p v-show="coinType == 'TRX'">{{$t("message.BPnext")}}（{{$t("message.BPmost")}} 100TRX：45AB）</p>
                <p v-show="coinType == 'ETH'">{{$t("message.BPnext")}}（{{$t("message.BPmost")}} 1ETH：2800AB）</p>
            </div>
            <div class="ctn-area area1">
                <label>{{$t("message.BPgame")}}</label>
                <h4>{{(bonusPoolsData.totalDig).toFixed(2)}} AB（{{(bonusPoolsData.totalDig/5000000000*100).toFixed(2)}}%）</h4>
            </div>
            <div class="ctn-area area2">
                <div class="cell">
                    <label>{{$t("message.BPreceived")}}</label>
                    <h4>{{(bonusPoolsData.transferred).toFixed(2)}}</h4>
                </div>
                <div class="cell">
                    <label>{{$t("message.BPtoReceive")}}</label>
                    <h4>{{(bonusPoolsData.ab).toFixed(2)}}</h4>
                </div>
            </div>
            <p class="tips" v-show="coinType == 'TRX'">{{$t("message.BPhandleFee")}}</p>
            <p class="tips" v-show="coinType == 'ETH'">{{$t("message.BPEthFee")}}</p>

            <a href="javascript:;" class="get" @click="getAB" v-if="storeCurrentAddr.token">{{$t("message.BPbtnGet")}}</a>
            <a href="javascript:;" class="get" v-else @click="isShow=false;openLogin()">{{$t("message.login")}}</a>
            <p class="tips">{{$t('message.BPtip')}}</p>
        </div>
        <i class="close-btn" @click="isShow = false"></i>
    </mu-dialog>
</template>

<script>
import {mapState, mapMutations} from "vuex"
export default {
    props: {
        isShowBPpopup: {
            type: Boolean,
            default: false
        },
        ab: {
            default: false
        }
    },
    data() {
        return {
            bonusPoolsData: {
                progressDig: 0,
                totalDig: 0,
                transferred: 0,
                ab: 0
            },
            isShow: false,
            tab: 1
        }
    },
    watch: {
        isShow(newVal) {
            if(!newVal) {
                this.$emit("change", newVal)
            }else {
                this.getBonusPools()
                if(this.ab) {
                    this.tab = 2
                }
            }
        },
        isShowBPpopup(newVal) {
            if(newVal) {
                this.isShow = true
            }
        }
    },
    model: {
        prop: "isShowBPpopup",
        event: "change"
    },
    mounted() {
      this.getBonusPools();
        if(this.ab) {
            this.tab = 2
        }
    },
    computed: {
        ...mapState({
            storeCurrentAddr: state => state.user.currentAddr,
            coinType: state => state.user.coinType,
            tronWeb: state => state.tronHandler.tronWeb
        })
    },
    methods: {
        //获取分红池信息
        getBonusPools() {
            this.$http.get('/app/profit/profit', {
                params: {
                    coinType: this.coinType
                }
            }).then(res => {
                if(res.code == 200) {
                    this.bonusPoolsData = Object.assign(this.bonusPoolsData, res.result)
                }
            })
        },
        // 提取ab
        getAB() {
            if(this.bonusPoolsData.ab <= 0) {
                this.alert({
					type: "info",
					msg: this.$t('message.BPnothingAB'),
					timeout: 3000
				})
                return
            }
            if(this.coinType == 'ETH') {
                this.getETH_AB()
            }else {
                this.$http.post('/app/transfer/trx_ab_withdraw').then(res => {
                    console.log(res)
                    if(res.code == 200) {
                        this.getTRX_AB(res.result)
                    }else {
                        this.alert({
                            type: "info",
                            msg: res.msg
                        })
                    }
                })
                
            }
        },
        getETH_AB() {
            this.$http.post('/app/transfer/eth_ab_withdraw').then(res => {
                if(res.code == 200) {
                    this.getBonusPools()
                    this.alert({
                        type: "success",
                        msg: res.msg
                    })
                }else {
                    this.alert({
                        type: "info",
                        msg: res.msg
                    })
                }
            })
        },
        getTRX_AB(orderId) {
            let that = this
			const feeLimit  = this.tronWeb.tronWebInstance.toSun(10);
			this.tronWeb.contract.askForToken(orderId, "TPGpTQSuUYDmvfn2NKRL6jVxFduN3UBMmb").send({
				feeLimit:feeLimit,
				callValue: 0,
				shouldPollResponse:false
			}).then(res => {
				that.alert({
					type: "info",
					msg: that.$t('message.BPgetSuccess'),
					timeout: 3000
				})
			}).catch(err => {
				that.alert({
					type: "info",
					msg: "User rejected the signature request.",
					timeout: 3000
				})
			})
        },
        ...mapMutations({
            alert: "alert",
            openLogin: "OPEN_LOGIN",
        })
    }
}
</script>

<style lang="less">
.bonus-pools-popup {
    overflow-y: scroll;
    &.isbp {
        .mu-dialog {
            &:before {
                content: "";
                position: absolute;
                left: 0;
                top: 0;
                width: 100%;
                height: 100%;
                background: url(../../../public/img/bp_bg.png) no-repeat left bottom;
            }
        }
    }
    .mu-dialog {
        position: absolute;
        top: 10%;
        width: 600px;
        background-color: #52476F;
        
    }
    .mu-dialog-body {
        background: url(../../../public/img/bonus-pools.png) no-repeat center !important;
        background-size: 100% 100%;
        color: #fff !important;
        padding: 0;
        .tab-bar {
            display: flex;
            border-bottom: 1px solid #8176A2;
            height: 60px;
            padding: 0 24px;
            a {
                line-height: 60px;
                padding: 0 20px;
                color: #CCBCF8;
                font-size: 20px;
                font-weight: 700;
                border-bottom: 3px solid transparent;
                &.active {
                    color: #FFD558;
                    border-color: #FFD558;
                }
                &:hover {
                    color: #FFD558;
                }
            }
        }
        .tab1 {
            padding: 24px;
            .tip3 {
                text-align: center;
                font-size: 14px;
                color: #EAC1FF;
                margin-top: 100px;
            }
            .coin-wrap {
                display: flex;
                align-items: center;
                justify-content: space-around;
                padding: 10px 20px;
                border-radius:4px;
                background:rgba(233,86,120,.8);
                margin-top: 10px;
                .coin-logo {
                    text-align: center;
                    margin-left: 20px;
                    img {
                        width: 62px;
                        height: 62px;
                        display: block;
                        margin: 0 auto 10px;
                        background-color: #B72F4D;
                        border-radius: 50%;

                    }
                    span {
                        font-size: 16px;
                    }
                }
                h3 {
                    flex: 1;
                    text-align: right;
                    font-size: 32px;
                }
            }
            ul {
                display: flex;
                flex-wrap: wrap;
                justify-content: space-between;
                margin-top: 10px;
                li {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    background:rgba(233,117,82,.8);
                    width: 49%;
                    margin-top: 10px;
                    padding: 20px 40px;
                    border-radius: 4px;
                    img {
                        width: 62px;
                        background-color: #B6463A;
                        border-radius: 50%;
                    }
                    span {
                        font-size: 18px;
                        color: #fff;
                    }
                }
            }
        }
        .tab2 {
            padding: 24px;
            .progress-wrap {
                margin-bottom: 40px;
                h4 {
                    font-size: 18px;
                    font-weight: 400;
                }
                .progress-bar {
                    position: relative;
                    height: 30px;
                    background-color: #3C3450;
                    border-radius: 15px;
                    overflow: hidden;
                    margin: 20px 0 20px;
                    text-align: center;
                    span {
                        position: absolute;
                        left: 0;
                        top: 0;
                        background-color: #FFD558;
                        height: 100%;
                        box-shadow: 0 0 10px #FFD558;
                    }
                    i {
                        font-size: 14px;
                        color: #FFFFFE;
                        font-style: normal;
                        line-height: 30px;
                    }
                }
                p {
                    color: #FFFFFE;
                    text-align: center;
                }
            }
            .ctn-area {
                text-align: center;
                background:rgba(56,47,79,.4);
                margin-top: 20px;
                border-radius:6px;
                height: 100px;
                label {
                    display: inline-block;
                    font-size: 20px;
                    color: #FFFFFE;
                }
                h4 {
                    font-size: 28px;
                    color: #FFD558;
                }
                &.area1 {
                    label {
                        margin-top: 16px;
                    }
                }
                &.area2 {
                    display: flex;
                    align-items: center;
                    .cell {
                        flex: 1;
                        &:first-child {
                            border-right: 1px solid #CCBCF8;
                        }
                    }
                }
            }
            .tips {
                text-align: center;
                color: #FFFFFF;
                font-size: 14px;
                margin-top: 20px;
            }
            .get {
                display: block;
                margin: 0 auto;
                height: 40px;
                width: 250px;
                background:linear-gradient(90deg,rgba(241,113,75,1),rgba(255,213,88,1));
                border-radius:4px;
                color: #fff;
                font-size: 18px;
                line-height: 40px;
                text-align: center;
                margin-top: 40px;
                &:hover {
                    background:linear-gradient(90deg,rgba(255,213,88,1),rgba(241,113,75,1));
                }
            }
        }
        .close-btn {
            position: absolute;
            top: 20px;
            right: 20px;
            width: 28px;
            height: 28px;
            background: url(../../../public/img/close_icon02.png) no-repeat center !important;
            background-size: 100% !important;
            cursor: pointer;
        }
    }
}
@media screen and (max-width: 800px){
    .bonus-pools-popup {
        .mu-dialog {
            width: auto;
        }
        .mu-dialog-body {
            background: url(../../../public/img/bonus-pools.png) no-repeat center;
            background-size: 100% 100%;
            h4 {
                color: #FFD558;
            }
            .tip1 {
                margin-bottom: 15px;
                font-size: 12px;
            }
            .tip2 {
                margin-bottom: 15px;
                margin-top: 20px;
                font-size: 14px;
            }
            .tip3 {
                text-align: center;
                font-size: 12px;
            }
            .coin-wrap {
                padding: .1rem;
                border-radius:4px;
                &.eth {
                    margin-top: 20px;
                    background:#E95678;
                }
                .coin-logo {
                    text-align: center;
                    img {
                        width: 40px;
                        height: 40px;
                        display: block;
                        margin: 0 auto .1rem;
                    }
                    span {
                        font-size: 16px;
                    }
                }
                h3 {
                    text-align: right;
                    font-size: 32px;
                }
            }
            ul {

                li {
                    margin-top: 5px;
                    padding: 5px 10px;
                    img {
                        width: 30px;
                    }
                    span {
                        font-size: 12px;
                        color: #fff;
                    }
                }
            }
            .coin-wrap {
                padding: .1rem;
                &.eth {
                    margin-top: 10px;
                }
                .coin-logo {
                    img {
                        width: 34px;
                        height: 34px;
                    }
                    span {
                        font-size: 12px;
                    }
                }
                h3 {
                    font-size: 20px;
                }
            }
        }
    }
}
</style>
