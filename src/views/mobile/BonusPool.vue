<template>
  <div class="bonusPool-page">
      <MBheaderBar :title="$t('message.BPbonusPools')"></MBheaderBar>
    <div class="content">
        <div class="top-btn">
          <div :class="[topBtnIndex == 0 ? 'select' : '']" @click="selectBtn(0)">{{$t('message.bonusPool')}}</div>
          <div :class="[topBtnIndex == 1 ? 'select' : '']" @click="selectBtn(1)">{{$t('message.BPmyBalance')}}</div>
        </div>
        <div class="part1" v-show="topBtnIndex == 0">
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
                            <h3><DigitalRoll :value="Math.floor(Number(storeBonusPoolsData.profitPool.ETH)*100)/100" :decimal="4"></DigitalRoll> ETH</h3>
                        </div>
                        <div class="cell-top">
                            <label>{{$t('message.BPmyErnings')}}</label>
                            <h3><DigitalRoll :value="Math.floor(Number(storeBonusPoolsData.profitPredict.ETH)*100)/100" :decimal="4"></DigitalRoll> ETH</h3>
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
            <div class="tip2">
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
        <div class="part2" v-show="topBtnIndex == 1">
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
                        <span>1,343,354,555.34 EOS</span>
                        <a href="javascript:;" @click="active = 'EOS'" v-show="active != 'EOS'">领取</a>
                    </div>
                    <div class="addr-wrap" v-show="active == 'EOS'">
                        <input type="text" placeholder="接收地址">
                        <a href="javascript:;">{{$t('message.PopConfirm')}}</a>
                    </div>
                    <div class="tip" v-show="active == 'EOS'">
                        <p>注：1、请确保您的地址正确，资产一旦转出不可追回；2、到账时间受网络影响，预计 2 小时内发出请耐心等待。</p>
                    </div>
                </li> -->
            </ul>
        </div>
    </div>
    </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import HeaderBar from "@/components/common/header_bar"
import DigitalRoll from "@/components/common/digitalRoll"
import TimeCountDown from "@/components/common/timeCountDown2"
import PollHttp from "../../util/pollHttp"
export default {
  props: {
    isShowBPpopup: {
      type: Boolean,
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
        topBtnIndex: 0,
        freezeInputPopup: false,
        unfreezeInputPopup: false,
        active: "",
        instructionsPopup: false,
        unfreezeAmount: "",
        freezeAmount: "",
        getAddrETH: "",
        getAddrTRX: "",
        getAddrEOS: ""
    };
  },
  watch: {
    isShow(newVal) {
      if (!newVal) {
        this.$emit("change", newVal);
      }else {
          this.getBonusPools()
      }
    },
    isShowBPpopup(newVal) {
      if (newVal) {
        this.isShow = true;
      }
    }
  },
  model: {
    prop: "isShowBPpopup",
    event: "change"
  },
  mounted() {
    this.getBonusPools()
    if(this.$route.query.ab) {
        this.topBtnIndex = 1
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
        if(this.storeCurrentAddr.platform='IMPORT') {
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
            return 0
        }
    }
  },
  methods: {
    selectBtn(i) {
      this.topBtnIndex = i
    },
    //获取分红池信息
    getBonusPools() {
        PollHttp({
            type: "get",
            url: "/app/profit/profit",
            data: {
                coinType: this.coinType
            }
        }).then(res => {
            console.log("profit",res)
            if(res.code == 200) {
                res.trxPool < 0 && (res.trxPool = 0)
                res.ethPool < 0 && (res.ethPool = 0)
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
            from: this.web3.coinbase
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
        if(this.freezeAmount > this.storeBonusPoolsData.pledgeAb) {
            this.alert({
                type: "info",
                msg: this.$t('message.assetsNotEnough'),
                timeout: 3000
            })
            return
        }
        if(this.freezeAmount <= 0) {
            // this.alert({
            //     type: "info",
            //     msg: this.$t('message.BPalert1'),
            //     timeout: 3000
            // })
            return
        }
        console.log(111)
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
                            }else {
                                this.rollback("DEPLEDGE", res.result)
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
      HeaderBar,
      DigitalRoll,
      TimeCountDown
  }
};
</script>

<style lang="less">
.bonusPool-page {
  background-color: #22202c;
    .mb-headerbar {
        position: sticky;
        top: 0;
        z-index: 1212;
    }
  .content {
    .top-btn {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      border-bottom: 1px solid #49425C;
      div {
        width: 50%;
        text-align: center;
        padding: 0.33rem 0;
        font-size: 0.32rem;
        color: #D3CDFF;
      }
      .select {
        border-bottom: 1px solid #fff;
        color: #fff;
      }
    }
    .part1{
        padding: 0 .3rem;
        .progress-wrap {
            margin-bottom: 0.4rem;
            margin-top: .4rem;
            h4 {
                font-size: 0.28rem;
                font-weight: 400;
                text-align: center;
            }
            .progress-bar {
                position: relative;
                height: 0.4rem;
                background-color: #58516D;
                border-radius: 0.2rem;
                overflow: hidden;
                margin: 0.2rem 0 0.2rem;
                text-align: center;
                line-height: 0.35rem;
                span {
                    position: absolute;
                    left: 0;
                    top: 0;
                    background-color: #FFC425;
                    height: 100%;
                    box-shadow: 0 0 10px #FFC425;
                }
                i {
                    font-size: 0.18rem;
                    color: #EAC1FF;
                    font-style: normal;
                    line-height: 0.3rem;
                    font-weight: 300;
                }
            }
            p {
                color: #D3CDFF;
                text-align: center;
                font-size: 0.24rem;
            }
        }
        .jackpot-wrap {
            padding: 0 .2rem;
            background-color: #58516D;
            overflow: hidden;
            border-radius: 6px;
            h2 {
                padding: .2rem 0;
                font-size: .14rem;
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
                padding: .1rem 0;
                border-radius:4px;
                background:rgba(233,86,120,.8);
                margin-bottom: .2rem;
                .coin-logo {
                    flex: 1;
                    text-align: center;
                    margin-left: .2rem;
                    img {
                        width: .8rem;
                        height: .8rem;
                        display: block;
                        margin: 0 auto .1rem;
                        background-color: #B72F4D;
                        border-radius: 50%;

                    }
                    span {
                        font-size: .16rem;
                    }
                }
                .item-r {
                    flex: 1;
                    .cell-top {
                        label {
                            font-size: .14rem;
                        }
                        &:first-child {
                            border-bottom: 1px solid #B72F4D;
                        }
                    }
                    h3 {
                        text-align: left;
                        font-size: .3rem;
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
            background-color: #58516D;
            border-radius: 4px;
            margin-top: .4rem;
            padding: .3rem .4rem .4rem;
            .item {
                text-align: center;
                margin-top: .4rem;
                label {
                    display: block;
                    margin: .2rem 0;
                }
                span {
                    display: block;
                    background-color: #242130;
                    line-height: .7rem;
                    border-radius: 4px;
                }
                a {
                    display: block;
                    margin: .2rem auto;
                    width: 1.8rem;
                    height: .6rem;
                    line-height: .6rem;
                    background-color: #FFD558;
                    border-radius: .3rem;
                    color: #68286C;
                    font-size: .2rem;
                    font-weight: 700;
                    &.freeze {
                        background-color: #13F693;
                    }
                }
                .btn-wrap {
                    position: relative;
                    i {
                        position: absolute;
                        top: .1rem;
                        right: 24%;
                        width: .4rem;
                        height: .4rem;
                        background: url(../../../public/img/help_icon02.png) no-repeat center;
                        background-size: 80%;   
                        cursor: pointer;
                    }
                }
                i {
                    font-style: normal;
                }
            }
        }
        .freeze-status {
            background-color: #58516D;
            margin-top: 10px;
            border-radius: 6px;
            padding: 20px;
            label {
                display: block;
                text-align: center;
            }
            .freeze-amount {
                display: flex;
                align-items: center;
                margin-top: 10px;
                span {
                    flex: 1;
                    display: block;
                    background-color: #242130;
                    line-height: .7rem;
                    border-radius: 4px;
                    padding: 0 .2rem;
                    i {
                        font-size: 12px;
                        font-style: normal;
                    }
                }
                a {
                    display: block;
                    margin: 0 0 0 .2rem;
                    width: 1.8rem;
                    height: .6rem;
                    line-height: .6rem;
                    background-color: #FFD558;
                    border-radius: .3rem;
                    color: #68286C;
                    font-size: .2rem;
                    font-weight: 700;
                    text-align: center;
                }
            }
        }
        .tip2 {
            color: #d3cdff;
            margin-bottom: 0.3rem;
            margin-top: 0.4rem;
            font-size: 0.24rem;
            text-align: center;
            padding: 0 0.4rem;
            p {
            padding-bottom: 0.6rem;
            }
        }
        .freeze-input-popup {
            .mu-dialog {
                top: initial;
                border-radius: .04rem;
                overflow: hidden;
                max-width: 90%;
                &:before {
                    display: none;
                }
                .mu-dialog-body {
                    padding: 20px;
                    background-color: #58516D;
                    position: relative;
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
                        position: absolute;
                        top: .2rem;
                        right: .2rem;
                        width: .4rem;
                        height: .4rem;
                        background: url(../../../public/img/close_icon02.png) no-repeat center !important;
                        background-size: 100% !important;
                        cursor: pointer;
                    }
                }
            }
        }
        .instructions-popup {
            .mu-dialog {
                width: 90%;
                max-width: 90%;
                border-radius: .04rem;
                overflow: hidden;
            }
            .mu-dialog-body {
                background: #52476F !important;
                padding: .3rem;
                color: #fff;
                position: relative;
                h2 {
                    text-align: center;
                    font-size: .3rem;
                }
                .ctn {
                    margin-top: .2rem;
                    font-size: .2rem;
                }
                .close-btn {
                    position: absolute;
                    top: .2rem;
                    right: .2rem;
                    width: .4rem;
                    height: .4rem;
                    background: url(../../../public/img/close_icon02.png) no-repeat center !important;
                    background-size: 100% !important;
                    cursor: pointer;
                }
            }
        }
    }
    .part2 {
        padding: 0.2rem 0.4rem 0 0.4rem;
        ul {
            li {
                background:#58516D;
                border-radius: 4px;
                margin-top: .2rem;
                .balance {
                    display: flex;
                    align-items: center;
                    padding: .2rem 0;
                    img {
                        height: .5rem;
                        margin: 0 .2rem;
                    }
                    span {
                        flex: 1;
                        border-left: 1px solid rgba(104,40,108,.2);
                        line-height: .6rem;
                        padding: 0 .2rem;
                    }
                    a {
                        width: 1.2rem;
                        text-align: center;
                        border-radius: .3rem;
                        line-height: .6rem;
                        background-color: #FFD558;
                        color: #68286C;
                        font-size: .2rem;
                        font-weight: 700;
                        margin-right: .2rem;
                    }
                }
                .addr-wrap {
                    display: flex;
                    align-items: center;
                    margin: 0 .2rem;
                    padding: .2rem 0;
                    border-top: 1px solid rgba(104,40,108,.2);
                    input {
                        width: 80%;
                        height: .6rem;
                        border-radius: .3rem;
                        background-color: #343045;
                        outline: none;
                        border: none;
                        color: #998DB5;
                        padding: .1rem .2rem;
                    }
                    a {
                        background-color:#13F693;
                        text-align: center;
                        width: 1.2rem;
                        text-align: center;
                        border-radius: .3rem;
                        line-height: .6rem;
                        font-weight: 700;
                        font-size: .2rem;
                        margin-left: .2rem;
                        color: #0F643F;
                    }
                }
                .tip {
                    margin: 0 .2rem;
                    padding: .2rem 0;
                    border-top: 1px solid rgba(104,40,108,.2);
                    color: #FFD5DF;
                    font-size: .14rem;
                }
            }
        }     
    }
  }
}
</style>
