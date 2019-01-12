<template>
  <div class="bonusPool-page">
      <MBheaderBar :title="$t('message.BPbonusPools')"></MBheaderBar>
    <div class="content">
        <div class="top-btn">
          <div :class="[topBtnIndex == 0 ? 'select' : '']" @click="selectBtn(0)">{{$t('message.bonusPool')}}</div>
          <div :class="[topBtnIndex == 1 ? 'select' : '']" @click="selectBtn(1)">我的余额</div>
        </div>
        <div class="part1" v-show="topBtnIndex == 0">
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
                        <span>分红倒计时：<TimeCountDown :time="1549080000000"></TimeCountDown></span>
                    </div>
                    <div class="item-r">
                        <div class="cell-top">
                            <label>当前奖池累计：</label>
                            <h3><DigitalRoll :value="Math.floor(Number(storeBonusPoolsData.ethPool)*100)/100" :decimal="2"></DigitalRoll> ETH</h3>
                        </div>
                        <div class="cell-top">
                            <label>我的预期收益：</label>
                            <h3><DigitalRoll :value="Math.floor(Number(storeBonusPoolsData.pledgePredictETH)*100)/100" :decimal="2"></DigitalRoll> ETH</h3>
                        </div>
                    </div>
                </div>
                <div class="coin-wrap eth">
                    <div class="coin-logo">
                        <img src="../../../public/img/coin/TRX.png" />
                        <span>分红倒计时：<TimeCountDown :time="1549080000000"></TimeCountDown></span>
                    </div>
                    <div class="item-r">
                        <div class="cell-top">
                            <label>当前奖池累计：</label>
                            <h3><DigitalRoll :value="Math.floor(Number(storeBonusPoolsData.trxPool)*100)/100" :decimal="2"></DigitalRoll> TRX</h3>
                        </div>
                        <div class="cell-top">
                            <label>我的预期收益：</label>
                            <h3><DigitalRoll :value="Math.floor(Number(storeBonusPoolsData.pledgePredictTRX)*100)/100" :decimal="2"></DigitalRoll> TRX</h3>
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
                    <div class="btn-wrap">
                        <a href="javascript:;" class="freeze" @click="freezeInputPopup = true">冻结</a>
                        <i data-text="冻结说明" @click="instructionsPopup = true"></i>
                    </div>
                </div>
                <div class="item">
                    <label>已冻结 (AB)</label>
                    <span>348485.43</span>
                    <a href="javascript:;" class="unfreeze" @click="unfreezeInputPopup = true">解冻</a>
                </div>
            </div>
            <div class="tip2">
                <p class="">注：AB 解冻后需 24 小时才可到账。</p>
            </div>
            <!-- 冻结数量输入 -->
            <mu-dialog :append-body="false" width="360" :open.sync="freezeInputPopup" class="freeze-input-popup">
                <p>可冻结余额：10.89 AB</p>
                <div class="input-wrap">
                    <div>
                        <input type="text">
                        <span>AB</span>
                    </div>
                    <a href="javascript:;">ALL</a>
                </div>
                <a href="javascript:;" class="enter">确定</a>
                <i class="close-btn" @click="freezeInputPopup = false"></i>
            </mu-dialog>

            <!-- 解冻数量输入 -->
            <mu-dialog :append-body="false" width="360" :open.sync="unfreezeInputPopup" class="freeze-input-popup">
                <p>可解冻数量：10.89 AB</p>
                <div class="input-wrap">
                    <div>
                        <input type="text">
                        <span>AB</span>
                    </div>
                    <a href="javascript:;">ALL</a>
                </div>
                <a href="javascript:;" class="enter">确定</a>
                <i class="close-btn" @click="unfreezeInputPopup = false"></i>
            </mu-dialog>

            <!-- 质押说明 -->
            <mu-dialog :append-body="false" :open.sync="instructionsPopup" class="instructions-popup">
                <h2>质押说明</h2>
                <div class="ctn"><p>
                    1.冻结以及解冻AB最低数量为1个。每次分红期间不能进行冻结与解冻操作。<br /><br />
                    2.必须是冻结中的AB才能获得分红。每次分红倒计时结束之前冻结的AB均可以获得这次分红（建议至少提前几分钟）。<br /><br />
                    3.提取和冻结AB均会消耗少量TRX（预计每次0.5-0.8个TRX），建议不要频繁操作。<br /><br />
                    4.以最后一次解冻时间为准，解冻AB需要24小时后到账钱包，解冻中的AB不能获得分红。<br /><br />
                    5.由于采用智能合约自动分红，tronscan目前不支持智能合约交易查询，我们确保分红都会即时到账。</p>
                </div>
                <i class="close-btn" @click="instructionsPopup = false"></i>
            </mu-dialog>
        </div>
        <div class="part2" v-show="topBtnIndex == 1">
            <ul>
                <li>
                    <div class="balance">
                        <img src="../../../public/img/coin/ETH.png" alt="">
                        <span>1,343,354,555.34 ETH</span>
                        <a href="javascript:;" @click="active = 'ETH'" v-show="active != 'ETH'">领取</a>
                    </div>
                    <div class="addr-wrap" v-show="active == 'ETH'">
                        <input type="text" placeholder="接收地址">
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
                        <input type="text" placeholder="接收地址">
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
                        <input type="text" placeholder="接收地址">
                        <a href="javascript:;">确定</a>
                    </div>
                    <div class="tip" v-show="active == 'EOS'">
                        <p>注：1、请确保您的地址正确，资产一旦转出不可追回；2、到账时间受网络影响，预计 2 小时内发出请耐心等待。</p>
                    </div>
                </li>
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
      instructionsPopup: false
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
