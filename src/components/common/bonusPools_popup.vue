<template>
    <mu-dialog :open.sync="isShow" :append-body="false" class="bonus-pools-popup isbp">
        <div class="tab-bar">
            <a href="javascript:;" :class="{'active': tab == 1}" @click="tab = 1">{{$t('message.bonusPool')}}</a>
            <a href="javascript:;" :class="{'active': tab == 2}" @click="tab = 2">我的余额</a>
        </div>
        <div class="tab1" v-show="tab == 1">
            <div class="progress-wrap">
                <h4 v-show="coinType == 'TRX'">{{$t("message.BP3stage")}}（{{$t("message.BPmost")}} 100TRX：50AB）</h4>
                <h4 v-show="coinType == 'ETH'">{{$t("message.BP3stage")}}（{{$t("message.BPmost")}} 1ETH：3200AB）</h4>
                <div class="progress-bar"><i>{{(bonusPoolsData.progressDig).toFixed(2)}}/1,000,000,000</i><span :style="{'width': bonusPoolsData.progressDig/1000000000*100 + '%'}"></span></div>
            </div>
            <div class="jackpot-wrap">
                <h2>当前网络已冻结<span>87977978.34</span>AB，您冻结了<span>1439.34</span> AB</h2>
                <div class="coin-wrap eth">
                    <div class="coin-logo">
                        <img src="../../../public/img/coin/ETH.png" />
                        <span>{{$t('message.BPcurrentAmount')}}</span>
                    </div>
                    <div class="item-r">
                        <div class="cell-top">
                            <label>当前奖池累计：</label>
                            <h3><DigitalRoll :value="Math.floor(Number(storeBonusPoolsData.ethPool)*100)/100" :decimal="2"></DigitalRoll> ETH</h3>
                        </div>
                        <div class="cell-top">
                            <label>我的预期收益：</label>
                            <h3><DigitalRoll :value="Math.floor(Number(storeBonusPoolsData.ethPool)*100)/100" :decimal="2"></DigitalRoll> ETH</h3>
                        </div>
                    </div>
                </div>
                <div class="coin-wrap eth">
                    <div class="coin-logo">
                        <img src="../../../public/img/coin/TRX.png" />
                        <span>{{$t('message.BPcurrentAmount')}}</span>
                    </div>
                    <div class="item-r">
                        <div class="cell-top">
                            <label>当前奖池累计：</label>
                            <h3><DigitalRoll :value="Math.floor(Number(storeBonusPoolsData.trxPool)*100)/100" :decimal="2"></DigitalRoll> TRX</h3>
                        </div>
                        <div class="cell-top">
                            <label>我的预期收益：</label>
                            <h3><DigitalRoll :value="Math.floor(Number(storeBonusPoolsData.trxPool)*100)/100" :decimal="2"></DigitalRoll> TRX</h3>
                        </div>
                    </div>
                </div>
                <div class="coin-wrap eth notnoline">
                    <div class="coin-logo">
                        <img src="../../../public/img/coin/EOS.png" />
                        <span>{{$t('message.BPSoon')}}</span>
                    </div>
                    <div class="item-r">
                        <div class="cell-top">
                            <label>当前奖池累计：</label>
                            <h3><DigitalRoll :value="0" :decimal="2"></DigitalRoll> EOS</h3>
                        </div>
                        <div class="cell-top">
                            <label>我的预期收益：</label>
                            <h3><DigitalRoll :value="0" :decimal="2"></DigitalRoll> EOS</h3>
                        </div>
                    </div>
                </div>
            </div>
            <div class="user-ab-status">
                <div class="item">
                    <label>待领取 (AB)</label>
                    <span>{{bonusPoolsData.ab}}</span>
                    <a href="javascript:;" @click="getAB">领取</a>
                    <i>已领取: {{bonusPoolsData.transferred}}</i>
                </div>
                <div class="item">
                    <label>已持有 (AB)</label>
                    <span>{{contractAB}}</span>
                    <a href="javascript:;" class="freeze">冻结</a>
                </div>
                <div class="item">
                    <label>已冻结 (AB)</label>
                    <span>348485.43</span>
                    <a href="javascript:;" class="unfreeze">解冻</a>
                </div>
            </div>
            <div class="freeze-status">
                <label>解冻完成倒计时：23：29：30</label>
                <div class="freeze-amount">
                    <span><i>解冻数量：</i>348485.43</span>
                    <a href="javascript:;">撤销</a>
                </div>
            </div>
            <div class="tip3">
                <p>注：AB 解冻后需 24 小时才可到账。</p>
            </div>
        </div>
        <div class="tab2" v-if="tab == 2">
            <ul>
                <li>
                    <div class="balance">
                        <img src="../../../public/img/coin/ETH.png" alt="">
                        <span>1,343,354,555.34 ETH</span>
                        <a href="javascript:;" @click="active = 'ETH'" v-show="active != 'ETH'">领取</a>
                    </div>
                    <div class="addr-wrap" v-show="active == 'ETH'">
                        <label>接收地址：</label>
                        <input type="text">
                        <a href="javascript:;">确定</a>
                    </div>
                    <div class="tip" v-show="active == 'ETH'">
                        <p>注：1、请确保您的地址正确，资产一旦转出不可追回；2、到账时间受网络影响，预计 2 小时内发出请耐心等待。</p>
                    </div>
                </li>
                <li>
                    <div class="balance">
                        <img src="../../../public/img/coin/TRX.png" alt="">
                        <span>1,343,354,555.34 TRX</span>
                        <a href="javascript:;" @click="active = 'TRX'" v-show="active != 'TRX'">领取</a>
                    </div>
                    <div class="addr-wrap" v-show="active == 'TRX'">
                        <label>接收地址：</label>
                        <input type="text">
                        <a href="javascript:;">确定</a>
                    </div>
                    <div class="tip" v-show="active == 'TRX'">
                        <p>注：1、请确保您的地址正确，资产一旦转出不可追回；2、到账时间受网络影响，预计 2 小时内发出请耐心等待。</p>
                    </div>
                </li>
                <li>
                    <div class="balance">
                        <img src="../../../public/img/coin/EOS.png" alt="">
                        <span>1,343,354,555.34 EOS</span>
                        <a href="javascript:;" @click="active = 'EOS'" v-show="active != 'EOS'">领取</a>
                    </div>
                    <div class="addr-wrap" v-show="active == 'EOS'">
                        <label>接收地址：</label>
                        <input type="text">
                        <a href="javascript:;">确定</a>
                    </div>
                    <div class="tip" v-show="active == 'EOS'">
                        <p>注：1、请确保您的地址正确，资产一旦转出不可追回；2、到账时间受网络影响，预计 2 小时内发出请耐心等待。</p>
                    </div>
                </li>
            </ul>
        </div>
        <i class="close-btn" @click="isShow = false"></i>
    </mu-dialog>
</template>

<script>
import {mapState, mapMutations} from "vuex"
import DigitalRoll from "@/components/common/digitalRoll"
import PollHttp from "../../util/pollHttp"
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
                ab: 0,
                ethPool: 0,
                trxPool: 0
            },
            isShow: false,
            tab: 1,
            timer: null,
            active: "ETH",
            contractAB: 0
        }
    },
    watch: {
        isShow(newVal) {
            if(!newVal) {
                this.$emit("change", newVal)
            }else {
                this.getBonusPools()
                this.getContractAB()
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
        this.getBonusPools()
        if(this.ab) {
            this.tab = 2
        }
    },
    computed: {
        ...mapState({
            storeCurrentAddr: state => state.user.currentAddr,
            coinType: state => state.user.coinType,
            tronWeb: state => state.tronHandler.tronWeb,
            web3: state => state.web3Handler.web3,
            storeBonusPoolsData: state => state.database.bonusPools
        })
    },
    methods: {
        //获取分红池信息
        getBonusPools() {
            PollHttp({
                type: "get",
                url: "/app/profit/profit",
                data: {
                    coinType: this.coinType
                }
            }).then(res => {
                if(res.code == 200) {
                    console.log(res)
                    res.result.trxPool < 0 && (res.result.trxPool = 0)
                    res.result.ethPool < 0 && (res.result.ethPool = 0)
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

            if(this.storeCurrentAddr.platform == "DISPATCHER") {
                this.$router.push("my-assets")
                return
            }
            
            this.$http.post('/app/transfer/ab_withdraw').then(res => {
                this.getBonusPools()
                if(res.code == 200) {
                    if(this.coinType == 'ETH') {
                        this.getETH_AB(res.result)
                    }else {
                        this.getTRX_AB(res.result)
                    }
                }else {
                    this.alert({
                        type: "info",
                        msg: res.msg
                    })
                }
            })
        },
        getETH_AB(orderId) {
            let that = this
            this.web3.diceApiHandle.methods.askForToken(orderId, this.web3.coinbase).send({
                from: this.web3.coinbase,
                gas: 210000,
				gasPrice: 10000000000
            }, (err, res) => {
                if(!err) {
                    that.alert({
                        type: "info",
                        msg: that.$t('message.BPgetSuccess'),
                        timeout: 3000
                    })
                }else {
                    that.recall(orderId)
                    that.alert({
                        type: "info",
                        msg: "User rejected the signature request.",
                        timeout: 3000
                    })
                }
            })
        },
        getTRX_AB(orderId) {
            let that = this
			const feeLimit  = this.tronWeb.tronWebInstance.toSun(10);
			this.tronWeb.contract.askForToken(orderId, this.tronWeb.coinbase).send({
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
                that.recall(orderId)
				that.alert({
					type: "info",
					msg: "User rejected the signature request.",
					timeout: 3000
				})
			})
        },
        recall(withdrawId) {
            this.$http.post('/app/transfer/ab_withdraw/recall/' + withdrawId, {
                noLoading: true,
            }).then(res => {
                if(res.code == 200) {
                    console.log(222)
                    this.getBonusPools()
                }
            })
        },
        getContractAB() {
			try {
				this.coinType == "TRX" && this.tronWeb.tronWebInstance.contract().at(window.TRONABTOKEN, (err, abHandle) => {
					if(err) {
						console.error(err)
					}else {
						abHandle.balanceOf(this.tronWeb.coinbase).call((err, res) => {
							if(err) {
								console.error(err)
							}else {
								this.contractAB = parseInt(res._hex,16)/1000000
							}
						})
					}
				})
				this.coinType == "ETH" && this.web3.ABapiHandle.methods.balanceOf(this.web3.coinbase).call((error, result) => {
					if(!error) {
						this.contractAB = this.web3.web3Instance.utils.fromWei(result, "ether")*1
					} else {
						console.error(error);
					}
				})
			} catch (error) {
				
			}
        },
        ...mapMutations({
            alert: "alert",
            openLogin: "OPEN_LOGIN",
        })
    },
    deactivated() {
        clearInterval(this.timer)
        this.timer = null
    },
    components: {
        DigitalRoll   
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
        position: relative;
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
            .progress-wrap {
                margin-bottom: 30px;
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
                    margin: 10px 0 20px;
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
            .tip3 {
                text-align: center;
                font-size: 14px;
                color: #EAC1FF;
                margin-top: 10px;
            }
            .jackpot-wrap {
                padding: 0 20px;
                background:rgba(255,179,197,.2);
                overflow: hidden;
                border-radius: 6px;
                h2 {
                    padding: 20px 0;
                    font-size: 18px;
                    font-weight: 400;
                    text-align: center;
                    span {
                        color: #FFD558;
                    }
                }
                .coin-wrap {
                    display: flex;
                    align-items: center;
                    justify-content: space-around;
                    padding: 10px 0;
                    border-radius:4px;
                    background:rgba(233,86,120,.8);
                    margin-bottom: 20px;
                    .coin-logo {
                        flex: 1;
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
                    .item-r {
                        flex: 1;
                        .cell-top {
                            label {
                                font-size: 14px;
                            }
                            &:first-child {
                                border-bottom: 1px solid #B72F4D;
                            }
                        }
                        h3 {
                            text-align: left;
                            font-size: 20px;
                            font-weight: 400;
                        }
                    }
                    &.notnoline {
                        background-color: #E97552;
                        .coin-logo {
                            img {
                                background-color: #C54537;
                            }
                        }
                    }
                }
            }
            .user-ab-status {
                display: flex;
                background-color: rgba(255,179,197,.2);
                border-radius: 6px;
                margin-top: 30px;
                padding: 20px 0;
                .item {
                    flex: 1;
                    text-align: center;
                    padding: 0 20px;
                    border-right: 1px solid #68286C;
                    label {
                        display: block;
                        font-size: 16px;
                    }
                    span {
                        display: block;
                        font-size: 14px;
                        background-color: #68286C;
                        color: #FFD558;
                        margin: 15px 0;
                        padding: 10px 0;
                        border-radius: 4px;
                    }
                    a {
                        display: block;
                        font-size: 14px;
                        line-height: 36px;
                        width: 60%;
                        background-color: #FFD558;
                        margin: 0 auto;
                        font-weight: 600;
                        border-radius: 18px;
                        color: #68286C;
                        &.freeze {
                            background-color: #13F693;
                        }
                        &.unfreeze {
                            background-color: #FFD558;
                        }
                    }
                    i {
                        font-size: 12px;
                        font-style: normal;
                    }
                    &:last-child {
                        border: none;
                    }
                }

            }
            .freeze-status {
                background-color: rgba(255,179,197,.2);
                margin-top: 10px;
                border-radius: 6px;
                padding: 20px;
                label {
                    display: block;
                    text-align: center;
                }
                .freeze-amount {
                    display: flex;
                    margin-top: 10px;
                    span {
                        flex: 1;
                        background-color: #68286C;
                        padding: 0 20px;
                        line-height: 36px;
                        border-radius: 18px;
                        i {
                            font-size: 12px;
                            font-style: normal;
                        }
                    }
                    a {
                        background-color: #4A3E64;
                        color: #fff;
                        border-radius: 18px;
                        width: 80px;
                        margin-left: 18px;
                        text-align: center;
                        line-height: 36px;
                        font-size: 14px;
                        font-weight: 700;
                    }
                }
            }
        }
        .tab2 {
            padding: 24px;
            ul {
                li {
                    background:rgba(255,179,197,.2);
                    border-radius: 4px;
                    margin-top: 20px;
                    .balance {
                        display: flex;
                        align-items: center;
                        padding: 10px 0;
                        img {
                            height: 50px;
                            margin: 0 10px;
                        }
                        span {
                            flex: 1;
                            border-left: 1px solid rgba(104,40,108,.2);
                            line-height: 38px;
                            padding: 0 20px;
                        }
                        a {
                            width: 80px;
                            text-align: center;
                            border-radius: 19px;
                            line-height: 38px;
                            background-color: #FFD558;
                            color: #68286C;
                            font-size: 14px;
                            font-weight: 700;
                            margin-right: 20px;
                        }
                    }
                    .addr-wrap {
                        display: flex;
                        margin: 0 20px;
                        align-items: center;
                        padding: 20px 0;
                        border-top: 1px solid rgba(104,40,108,.2);
                        label {

                        }
                        input {
                            flex: 1;
                            height: 38px;
                            border-radius: 19px;
                            background-color: #68286C;
                            outline: none;
                            border: none;
                            padding: 0 10px;
                        }
                        a {
                            background-color:#13F693;
                            text-align: center;
                            line-height: 38px;
                            width: 80px;
                            font-weight: 700;
                            font-size: 14px;
                            border-radius: 19px;
                            margin-left: 20px;
                            color: #0F643F;
                        }
                    }
                    .tip {
                        margin: 0 20px;
                        padding: 20px 0;
                        border-top: 1px solid rgba(104,40,108,.2);
                        color: #FFD5DF;
                        font-size: 14px;
                    }
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
