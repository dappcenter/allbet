<template>
    <mu-dialog :open.sync="isShow" :append-body="false" class="bonus-pools-popup" :class="{'isbp': tab == 1}">
        <div class="tab-bar">
            <a href="javascript:;" :class="{'active': tab == 1}" @click="tab = 1">{{$t('message.bonusPool')}}</a>
            <a href="javascript:;" :class="{'active': tab == 2}" @click="tab = 2">{{$t('message.BPmyBalance')}}</a>
        </div>
        <div class="tab1" v-show="tab == 1">
            <div class="progress-wrap">
                <h4 v-show="coinType == 'TRX'">{{$t("message.BP3stage")}}（{{$t("message.BPmost")}} 100TRX：50AB）</h4>
                <h4 v-show="coinType == 'ETH'">{{$t("message.BP3stage")}}（{{$t("message.BPmost")}} 1ETH：3200AB）</h4>
                <div class="progress-bar"><i>{{(storeBonusPoolsData.progressDig).toFixed(2)}}/1,000,000,000</i><span :style="{'width': storeBonusPoolsData.progressDig/1000000000*100 + '%'}"></span></div>
            </div>
            <div class="jackpot-wrap">
                <h2>{{$t('message.BPtip3')}}<span>{{Math.floor(storeBonusPoolsData.totalPledge*100)/100}}</span>AB，{{$t('message.BPtip4')}}<span>{{Math.floor(storeBonusPoolsData.pledgeAb*100)/100}}</span> AB</h2>
                <div class="coin-wrap eth">
                    <div class="coin-logo">
                        <img src="../../../public/img/coin/ETH.png" />
                        <span>{{$t('message.BPtimeDown')}}<TimeCountDown :time="storeBonusPoolsData.profitTime*1"></TimeCountDown></span>
                    </div>
                    <div class="item-r">
                        <div class="cell-top">
                            <label>{{$t('message.BPcurrentAmount')}}</label>
                            <h3><DigitalRoll :value="Number(storeBonusPoolsData.profitPool.ETH)" :decimal="4"></DigitalRoll> ETH</h3>
                        </div>
                        <div class="cell-top">
                            <label>{{$t('message.BPmyErnings')}}</label>
                            <h3><DigitalRoll :value="Number(storeBonusPoolsData.profitPredict.ETH)" :decimal="4"></DigitalRoll> ETH</h3>
                        </div>
                    </div>
                </div>
                <div class="coin-wrap eth">
                    <div class="coin-logo">
                        <img src="../../../public/img/coin/TRX.png" />
                        <span>{{$t('message.BPtimeDown')}}<TimeCountDown :time="storeBonusPoolsData.profitTime*1"></TimeCountDown></span>
                    </div>
                    <div class="item-r">
                        <div class="cell-top">
                            <label>{{$t('message.BPcurrentAmount')}}</label>
                            <h3><DigitalRoll :value="Math.floor(Number(storeBonusPoolsData.profitPool.TRX)*100)/100" :decimal="2"></DigitalRoll> TRX</h3>
                        </div>
                        <div class="cell-top">
                            <label>{{$t('message.BPmyErnings')}}</label>
                            <h3><DigitalRoll :value="Math.floor(Number(storeBonusPoolsData.profitPredict.TRX)*100)/100" :decimal="2"></DigitalRoll> TRX</h3>
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
                            <label>{{$t('message.BPcurrentAmount')}}</label>
                            <h3><DigitalRoll :value="Math.floor(Number(storeBonusPoolsData.profitPool.EOS)*100)/100" :decimal="2"></DigitalRoll> EOS</h3>
                        </div>
                        <div class="cell-top">
                            <label>{{$t('message.BPmyErnings')}}</label>
                            <h3><DigitalRoll :value="Math.floor(Number(storeBonusPoolsData.profitPredict.EOS)*100)/100" :decimal="2"></DigitalRoll> EOS</h3>
                        </div>
                    </div>
                </div>
            </div>
            <div class="user-ab-status">
                <div class="item">
                    <label>{{$t('message.GameGeted')}} (AB)</label>
                    <span v-if="storeCurrentAddr.platform == 'IMPORT'">{{storeBonusPoolsData.ab}}</span>
                    <span v-else>0</span>
                    <a href="javascript:;" @click="getAB">{{$t('message.BPbtnGet')}}</a>
                    <i>{{$t('message.BPreceived')}}: {{storeBonusPoolsData.transferred}}</i>
                </div>
                <div class="item">
                    <label>{{$t('message.BPyichiyou')}} (AB)</label>
                    <span>{{contractAB}}</span>
                    <div class="btn-wrap">
                        <a href="javascript:;" class="freeze" @click="freezeInputPopup = true">{{$t('message.BPfreeze')}}</a>
                        <i data-text="冻结说明" @click="instructionsPopup = true"></i>
                    </div>
                </div>
                <div class="item">
                    <label>{{$t('message.BPyidongjie')}} (AB)</label>
                    <span>{{storeBonusPoolsData.pledgeAb}}</span>
                    <a href="javascript:;" class="unfreeze" @click="unfreezeInputPopup = true">{{$t('message.BPunfreeze')}}</a>
                </div>
            </div>
            <div class="freeze-status" v-if="storeBonusPoolsData.recoverAb != 0">
                <label>{{$t('message.BPCompleteCountdown')}}<TimeCountDown :time="storeBonusPoolsData.recoverAbTime*1"></TimeCountDown></label>
                <div class="freeze-amount">
                    <span><i>{{$t('message.BPFreezeAmount')}}</i>{{storeBonusPoolsData.recoverAb}}</span>
                    <a href="javascript:;" @click="revocationDo">{{$t('message.BPrepeal')}}</a>
                </div>
            </div>
            <div class="tip3">
                <p>{{$t('message.BPtip5')}}</p>
            </div>
            <!-- 冻结数量输入 -->
            <mu-dialog :append-body="false" width="360" :open.sync="freezeInputPopup" class="freeze-input-popup">
                <p>{{$t('message.BPcallableBalance')}}{{contractAB}} AB</p>
                <div class="input-wrap">
                    <div>
                        <input type="text" v-model="freezeAmount" oninput="value=value.replace(/[^0-9\.]/g,'')">
                        <span>AB</span>
                    </div>
                    <a href="javascript:;" @click="freezeAmount = contractAB">ALL</a>
                </div>
                <a href="javascript:;" class="enter" @click="freezeDo">{{$t('message.PopConfirm')}}</a>
                <i class="close-btn" @click="freezeInputPopup = false"></i>
            </mu-dialog>
            <!-- 解冻数量输入 -->
            <mu-dialog :append-body="false" width="360" :open.sync="unfreezeInputPopup" class="freeze-input-popup">
                <p>{{$t('message.BPdefrostQuantity')}}{{storeBonusPoolsData.pledgeAb}} AB</p>
                <div class="input-wrap">
                    <div>
                        <input type="text" v-model="unfreezeAmount" oninput="value=value.replace(/[^0-9\.]/g,'')">
                        <span>AB</span>
                    </div>
                    <a href="javascript:;" @click="unfreezeAmount = storeBonusPoolsData.pledgeAb">ALL</a>
                </div>
                <a href="javascript:;" class="enter" @click="unFreezeDo">{{$t('message.PopConfirm')}}</a>
                <i class="close-btn" @click="unfreezeInputPopup = false"></i>
            </mu-dialog>

            <!-- 质押说明 -->
            <mu-dialog :append-body="false" :open.sync="instructionsPopup" class="instructions-popup">
                <h2>{{$t('message.BPIFS')}}</h2>
                <div class="ctn">
                    <p>
                        {{$t('message.BPIFStext1')}}<br /><br />
                        {{$t('message.BPIFStext2')}}<br /><br />
                        {{$t('message.BPIFStext3' + coinType)}}<br /><br />
                        {{$t('message.BPIFStext4')}}<br /><br />
                        <p v-if="coinType == 'TRX'">{{$t('message.BPIFStext5')}}</p>
                    </p>
                </div>
                <i class="close-btn" @click="instructionsPopup = false"></i>
            </mu-dialog>
        </div>
        <div class="tab2" v-if="tab == 2">
            <ul>
                <li>
                    <div class="balance">
                        <img src="../../../public/img/coin/ETH.png" alt="">
                        <span>{{storeBonusPoolsData.balance.ETH}} ETH</span>
                        <a href="javascript:;" @click="active = 'ETH'" v-show="active != 'ETH'">{{$t('message.BPbtnGet')}}</a>
                    </div>
                    <div class="addr-wrap" v-show="active == 'ETH'">
                        <label>{{$t('message.BPReceivingAddress')}}</label>
                        <input type="text" v-model="getAddrETH">
                        <a href="javascript:;" @click="getMoney('ETH')">{{$t('message.PopConfirm')}}</a>
                    </div>
                    <div class="tip" v-show="active == 'ETH'">
                        <p v-html="$t('message.BPtip6')"></p>
                    </div>
                </li>
                <li>
                    <div class="balance">
                        <img src="../../../public/img/coin/TRX.png" alt="">
                        <span>{{storeBonusPoolsData.balance.TRX}} TRX</span>
                        <a href="javascript:;" @click="active = 'TRX'" v-show="active != 'TRX'">{{$t('message.BPbtnGet')}}</a>
                    </div>
                    <div class="addr-wrap" v-show="active == 'TRX'">
                        <label>{{$t('message.BPReceivingAddress')}}</label>
                        <input type="text" v-model="getAddrTRX">
                        <a href="javascript:;" @click="getMoney('TRX')">{{$t('message.PopConfirm')}}</a>
                    </div>
                    <div class="tip" v-show="active == 'TRX'">
                        <p v-html="$t('message.BPtip6')"></p>
                    </div>
                </li>
                <!-- <li>
                    <div class="balance">
                        <img src="../../../public/img/coin/EOS.png" alt="">
                        <span>{{storeBonusPoolsData.balance.EOS}} EOS</span>
                        <a href="javascript:;" @click="active = 'EOS'" v-show="active != 'EOS'">{{$t('message.BPbtnGet')}}</a>
                    </div>
                    <div class="addr-wrap" v-show="active == 'EOS'">
                        <label>{{$t('message.BPReceivingAddress')}}</label>
                        <input type="text" v-model="getAddrEOS">
                        <a href="javascript:;" @click="getMoney('EOS')">{{$t('message.PopConfirm')}}</a>
                    </div>
                    <div class="tip" v-show="active == 'EOS'">
                        <p v-html="$t('message.BPtip6')"></p>
                    </div>
                </li> -->
            </ul>
        </div>
        <i class="close-btn" @click="isShow = false"></i>
    </mu-dialog>
</template>

<script>
import {mapState, mapMutations} from "vuex"
import DigitalRoll from "@/components/common/digitalRoll"
import PollHttp from "../../util/pollHttp"
import TimeCountDown from "@/components/common/timeCountDown2"
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
            active: "",
            freezeInputPopup: false,
            unfreezeInputPopup: false,
            instructionsPopup: false,  //质押说明
            freezeAmount: "",
            unfreezeAmount: "",
            getAddrETH: "",
            getAddrTRX: "",
            getAddrEOS: ""
        }
    },
    watch: {
        isShow(newVal) {
            if(!newVal) {
                this.$emit("change", newVal)
            }else {
                // this.getBonusPools()
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
            storeBonusPoolsData: state => state.database.bonusPools,
            TRXcontractAB: state => state.tronHandler.tronWeb.contractAB,
            ETHcontractAB: state => state.web3Handler.web3.contractAB
        }),
        contractAB() {
            if(this.storeCurrentAddr.platform == 'IMPORT') {
                switch(this.coinType) {
                    case "ETH":
                        return Math.floor(this.ETHcontractAB*1000)/1000
                        break
                    case "TRX":
                        return this.TRXcontractAB
                        break
                    default: 
                        return 0
                        break
                }
            }else {
                return this.storeBonusPoolsData.ab || 0
            }
        }
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
                    this.$store.commit('UPDATE_BP_DATA', res.result)
                }
            })
        },
        // 提取ab
        getAB() {
            if(this.storeBonusPoolsData.ab <= 0) {
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
			const feeLimit  = this.tronWeb.tronWebInstance.toSun(1000);
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
                    this.getBonusPools()
                }
            })
        },
        // 冻结
        freezeDo() {
            if(this.freezeAmount > this.contractAB) {
                this.alert({
                    type: "info",
                    msg: this.$t('message.assetsNotEnough'),
                    timeout: 3000
                })
                return
            }
            if(this.freezeAmount < 1) {
                this.alert({
                    type: "info",
                    msg: this.$t('message.BPalert1'),
                    timeout: 3000
                })
                return
            }
            // 平台账户
            if(this.storeCurrentAddr.platform == 'DISPATCHER') {
                this.$http.post('/app/profit/pledge/' + this.freezeAmount).then(res => {
                    this.getBonusPools()
                    if(res.code == 200) {
                        this.getBonusPools()
                        this.freezeAmount = ""
                        this.freezeInputPopup = false
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
                return
            }
            // 合约账户
            switch(this.coinType) {
                case "ETH":
                    let freezeAmountWei = this.web3.web3Instance.utils.toWei(this.freezeAmount+"", "ether")
                    this.web3.pledgeApiHandle.methods.lock(freezeAmountWei).send({
                        from: this.web3.coinbase,
                        gas: 210000,
				        gasPrice: 10000000000
                    }, (err, res) => {
                        if(!err) {
                            this.freezeAmount = ""
                            this.freezeInputPopup = false
                        }
                    }).then(res => {
                        this.alert({
                            type: "info",
                            msg: this.$t('message.BPApplicationSubmitted'),
                            timeout: 3000
                        })
                    }).catch(err => {
                        console.log(err)
                    });
                    break
                case "TRX":
                    const freezeAmountSun = this.tronWeb.tronWebInstance.toSun(this.freezeAmount);
                    this.tronWeb.pledgeContract.lock(freezeAmountSun).send({
                    }).then(res => {
                        this.alert({
                            type: "info",
                            msg: this.$t('message.BPApplicationSubmitted'),
                            timeout: 3000
                        })
                        this.freezeAmount = ""
                        this.freezeInputPopup = false
                    }).catch(err => {
                        this.alert({
                            type: "info",
                            msg: "User rejected the signature request.",
                            // msg: err,
                            timeout: 3000
                        })
                    })
                    break
                default: 
                    break
            }
        },
        // 解冻
        unFreezeDo() {
            if(this.unfreezeAmount > this.storeBonusPoolsData.pledgeAb) {
                this.alert({
                    type: "info",
                    msg: this.$t('message.assetsNotEnough'),
                    timeout: 3000
                })
                return
            }
            if(this.unfreezeAmount <= 0) {
                // this.alert({
                //     type: "info",
                //     msg: this.$t('message.BPalert1'),
                //     timeout: 3000
                // })
                return
            }
            let unfreezeAmount = this.unfreezeAmount
            this.$http.post("/app/profit/depledge/" + unfreezeAmount).then(res => {
                if(res.code == 200) {
                    if(this.storeCurrentAddr.platform == "DISPATCHER") {
                        this.getBonusPools()
                        this.unfreezeAmount = ""
                        this.unfreezeInputPopup = false
                        this.alert({
                            type: "info",
                            msg: this.$t('message.BPApplicationSubmitted'),
                            timeout: 3000
                        })
                        return
                    }
                    switch(this.coinType) {
                        case "ETH":
                            let freezeAmountWei = this.web3.web3Instance.utils.toWei(unfreezeAmount+"", "ether")
                            this.web3.pledgeApiHandle.methods.unlock(res.result, freezeAmountWei).send({
                                from: this.web3.coinbase,
                                gas: 210000,
                                gasPrice: 10000000000
                            }, (err, res) => {
                                if(!err) {
                                    this.unfreezeAmount = ""
                                    this.unfreezeInputPopup = false
                                }
                            }).then(res => {
                                this.getBonusPools()
                                this.alert({
                                    type: "info",
                                    msg: this.$t('message.BPApplicationSubmitted'),
                                    timeout: 3000
                                })
                            }).catch(err => {
                                console.log(err)
                                this.rollback("DEPLEDGE", res.result)
                            });
                            break
                        case "TRX":
                            const unfreezeAmountSun = this.tronWeb.tronWebInstance.toSun(this.unfreezeAmount);
                            this.tronWeb.pledgeContract.unlock(res.result, unfreezeAmountSun).send({

                            }).then(res => {
                                this.getBonusPools()
                                this.alert({
                                    type: "info",
                                    msg: this.$t('message.BPApplicationSubmitted'),
                                    timeout: 3000
                                })
                                this.unfreezeAmount = ""
                                this.unfreezeInputPopup = false
                            }).catch(err => {
                                this.alert({
                                    type: "info",
                                    msg: "User rejected the signature request.",
                                    timeout: 3000
                                })
                                this.rollback("DEPLEDGE", res.result)
                            })
                            break
                        default: 
                            break
                    }
                }
            })
        },
        // 撤销
        revocationDo() {
            if(this.storeCurrentAddr.platform == 'DISPATCHER') {
                this.$http.post("/app/profit/pledge_recall").then(res => {
                    if(res.code == 200) {
                        this.getBonusPools()
                        this.alert({
                            type: "info",
                            msg: this.$t('message.BPApplicationSubmitted'),
                            timeout: 3000
                        })
                    }
                })
                return
            }
            if(this.storeCurrentAddr.platform='IMPORT') {
                switch(this.coinType) {
                    case "ETH":
                        this.web3.pledgeApiHandle.methods.cancel().send({
                            from: this.web3.coinbase,
                            gas: 210000,
                            gasPrice: 10000000000
                        }, (err, res) => {
                            if(!err) {

                            }
                        }).then(res => {
                            this.getBonusPools()
                            this.alert({
                                type: "info",
                                msg: this.$t('message.BPApplicationSubmitted'),
                                timeout: 3000
                            })
                        }).catch(err => {
                            console.log(err)
                        });
                        break
                    case "TRX":
                        console.log(this.tronWeb.pledgeContract)
                        this.tronWeb.pledgeContract.cancel().send({
                        }).then(res => {
                            this.alert({
                                type: "info",
                                msg: this.$t('message.BPApplicationSubmitted'),
                                timeout: 3000
                            })
                        }).catch(err => {
                            console.log("placeBetTRX",err)
                            this.alert({
                                type: "info",
                                msg: "User rejected the signature request.",
                                timeout: 3000
                            })
                        })
                        break
                    default: 
                        break
                }
            }
        },
        // 领取分红
        getMoney(type) {
            let addr = ""
            switch(type) {
                case "ETH":
                    addr = this.getAddrETH
                    break
                case "TRX":
                    addr = this.getAddrTRX
                    break
                case "EOS":
                    addr = this.getAddrEOS
                    break
                default:
                    break
            }
            if(this.storeBonusPoolsData.balance[type] <= 0) {   //余额不足
                this.alert({
                    type: "info",
                    msg: this.$t('message.assetsNotEnough'),
                    timeout: 3000
                })
                return
            }
            if(addr.trim() == "") {  //提币地址不能为空
                this.alert({
                    type: "info",
                    msg: this.$t('message.assetsDestAddEmpty'),
                    timeout: 3000
                })
                return
            }
            this.$http.post('/app/profit/draw', {
                "coinType": type,
                "destAddress": addr
            }).then(res => {
                if(res.code == 200) {
                    this.getBonusPools()
                    if(res.result.platform == "IMPORT") {
                        switch(this.coinType) {
                            case "ETH":
                                this.web3.pledgeApiHandle.methods.askForMoney(res.result.recdId, this.web3.coinbase, addr).send({
                                    from: this.web3.coinbase,
                                    gas: 210000,
                                    gasPrice: 10000000000
                                }, (err, res) => {
                                    if(!err) {
                                        
                                    }
                                }).then(res => {
                                    this.alert({
                                        type: "info",
                                        msg: this.$t('message.BPApplicationSubmitted'),
                                        timeout: 3000
                                    })
                                }).catch(err => {
                                    console.log(err)
                                    this.rollback("DRAW", res.result.recdId)
                                })
                                break
                            case "TRX":
                                console.log(this.tronWeb.pledgeContract)
                                this.tronWeb.pledgeContract.askForMoney(res.result.recdId, this.tronWeb.coinbase, addr).send({
                                }).then(res => {
                                    this.alert({
                                        type: "info",
                                        msg: this.$t('message.BPApplicationSubmitted'),
                                        timeout: 3000
                                    })
                                }).catch(err => {
                                    this.alert({
                                        type: "info",
                                        msg: "User rejected the signature request.",
                                        timeout: 3000
                                    })
                                    this.rollback("DRAW", res.result.recdId)
                                })
                                break
                            default: 
                                break
                        }
                    }else {
                        this.alert({
                            type: "info",
                            msg: this.$t('message.BPApplicationSubmitted'),
                            timeout: 3000
                        })
                    }
                }
            }) 
        },
        // 回滚
        rollback(type, id) {
            this.$http.post("/app/profit/cancel", {
                "cancelType": type,
                "recdId": id
            }).then(res => {
                console.log(res)
                this.getBonusPools()
            })
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
        DigitalRoll,
        TimeCountDown   
    }
}
</script>

<style lang="less">
.bonus-pools-popup {
    overflow-y: scroll;
    z-index: 99999999 !important;
    &.isbp {
        .mu-dialog {
            &:before {
                background: url(../../../public/img/bp_bg.png) no-repeat left bottom;
            }
        }
    }
    .mu-dialog {
        position: absolute;
        top: 10%;
        width: 650px;
        background-color: #52476F;
        &:before {
            content: "";
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
            background: url(../../../public/img/bp_bg.png) no-repeat left bottom;
            background-size: cover;
        }
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
                            text-align: left !important;
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
                            position: relative;
                            background-color: #13F693;
                        }
                        &.unfreeze {
                            background-color: #FFD558;
                        }
                    }
                    .btn-wrap {
                        position: relative;
                        i {
                            position: absolute;
                            top: 8px;
                            right: 10px;
                            width: 20px;
                            height: 20px;
                            background: url(../../../public/img/help_icon.png) no-repeat center;
                            background-size: 80%;   
                            cursor: pointer;
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
            .freeze-input-popup {
                .mu-dialog {
                    top: initial;
                    &:before {
                        display: none;
                    }
                    .mu-dialog-body {
                        padding: 20px;
                        .input-wrap {
                            display: flex;
                            margin-top: 10px;
                            div {
                                flex: 1;
                                display: flex;
                                height: 38px;
                                line-height: 38px;
                                background-color: #443A60;
                                border-radius: 4px;
                                overflow: hidden;
                                input {
                                    flex: 1;
                                    background-color: #443A60;
                                    border: none;
                                    outline: none;
                                    height: 38px;
                                    color: #fff;
                                    padding: 0 10px;
                                }
                                span {
                                    padding: 0 10px;
                                }
                            }
                            a {
                                color: #fff;
                                line-height: 38px;
                                padding: 0 0 0 10px;
                                &:hover {
                                    color: #FFC425;
                                }
                            }
                        }
                        .enter {
                            display: block;
                            background-color: #FFC425;
                            color: #1A0D59;
                            text-align: center;
                            width: 70%;
                            line-height: 36px;
                            border-radius: 18px;
                            font-weight: 700;
                            margin: 20px auto 0;
                        }
                        .close-btn {
                            top: 10px;
                            right: 10px;
                        }
                    }
                }
            }
            .instructions-popup {
                .mu-dialog {
                    width: 550px;
                }
                .mu-dialog-body {
                    background: #52476F !important;
                    padding: 20px;
                    h2 {
                        text-align: center;
                        font-size: 20px;
                    }
                    .ctn {
                        margin-top: 20px;
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
                            text-align: left;
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
                            color: #fff;
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
