<template>
    <mu-dialog :open.sync="isShow" :append-body="false" class="fundraiy-popup" :overlay-close="false">
        <img class="logo" src="../../../public/img/LOGO.png" alt="">
        <a href="javascript:;" class="close-btn" @click="isShow = false"></a>
        <h4>{{$t('message.preTarget')}}</h4>
        <div class="addr-wrap">
            <p>1 TRX = 20 AB</p>
            <p>{{$t('message.preTotalAb')}}</p>
            <p>{{$t('message.preAddress')}}{{$window.TRONFUNDRAIYADDRESS}}</p>
        </div>
        <div class="progress-wrap">
            <div class="progress-bg">
                <div class="progress-bar" :style="{'width': pageData.achieve/pageData.goal*100 + '%'}">
                    <span>{{pageData.achieve}}</span>
                </div>
            </div>
            <div class="flex-wrap">
                <span>0 TRX</span>
                <span>50,000,000 TRX</span>
            </div>
        </div>
        <div class="input-wrap">
            <input type="text" v-model="amount" :placeholder="$t('message.preTrxNum')" oninput="value=value.replace(/[^0-9]/g,'')" onkeyup="value=value.replace(/[^0-9]/g,'')" onpaste="value=value.replace(/[^0-9]/g,'')" oncontextmenu="value=value.replace(/[^0-9]/g,'')">
            <button @click="send">{{$t('message.preTrxBet')}}</button>
        </div>
        <p class="content">
            {{$t('message.preSale')}}<br />
            * {{$t('message.preLess')}}<br />
            * {{$t('message.preRefuse')}}<br />
            * {{$t('message.preJoin')}}<br />
            * {{$t('message.preJoin2')}}<br />
            * {{$t('message.preJoin3')}}<br /><br />
            {{$t('message.preHelp')}}</p>

        <div class="service">
            <a href="https://t.me/allbetAB" target="_blank">
                <img class="icon" src="../../../public/img/Telegram03.png" alt="">
                <span>Telegram</span>
            </a>
            <a href="javascript:;">
                <img class="icon" src="../../../public/img/weixin_icon03.png" alt="">
                <span>WeChat</span>
                <div class="qrcode">
                    <img src="../../../public/img/weixin_qrcode.png" alt="">
                </div>
            </a>
        </div>
    </mu-dialog>
</template>

<script>
import {mapMutations} from "vuex"

export default {
    props: {
        isShowPopup: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            isShow: false,
            amount: "",
            pageData: {},
        }
    },
    mounted() {
        this.getPageData()
    },
    computed: {
        storeTronWeb() {
            return this.$store.state.tronHandler.tronWeb
        }
    },
    methods: {
        send() {
            if(!this.storeTronWeb.coinbase) {
                this.alert({
                    type: "info",
                    msg: this.$t("message.preTips1")
                })
                return;
            }
            var that = this
            if(this.amount < 1000) {
                this.alert({
                    type: "info",
                    msg: this.$t('message.preTooLow') + "1000"
                })
                return
            }
            if(this.amount > this.storeTronWeb.balance) {
                this.alert({
					type: "success",
					msg: this.$t('message.assetsNotEnough')
                })
                return
            }
            if(localStorage.getItem('APPFROM') === 'cobo') {
                // this.contractSend(this.amount)
            }else {
                this.storeTronWeb.tronWebInstance.trx.sendTransaction(this.$window.TRONFUNDRAIYADDRESS, this.amount*1000000).then(res => {
                    console.log(res)
                    if(res.result === true) {
                        that.alert({
                            type: "success",
                            msg: that.$t('message.preCanYu')
                        })
                    }
                    
                }).catch(err => {

                })
            }
            
        },
        getPageData() {
            this.$http.get("open/crow_funding_meta", {
                params: {
                    coinType: "TRX"
                }
            }).then(res => {
                console.log(res)
                if(res.code == 200) {
                    this.pageData = res.result
                }
            })
        },
        // 合约转账
        contractSend(amount) {
            let that = this
			const feeLimit  = this.storeTronWeb.tronWebInstance.toSun(10);
			const callValue = this.storeTronWeb.tronWebInstance.toSun(amount);
			this.storeTronWeb.fundraiy.raise().send({
				feeLimit:feeLimit,
				callValue:callValue,
				shouldPollResponse:false
			}).then(res => {
				console.log(res)
				that.alert({
                    type: "success",
                    msg: that.$t('message.preCanYu')
                })
			}).catch(err => {
				console.log(err)
			})
        },
        ...mapMutations({
            alert: "alert"
        })
    },
    watch: {
        isShow(newVal) {
            if(!newVal) {
                this.$emit("change", newVal)
            }
        },
        isShowPopup(newVal) {
            if(newVal) {
                this.isShow = true
            }
        }
    },
    model: {
        prop: "isShowPopup",
        event: "change"
    }
}
</script>


<style lang="less">
.fundraiy-popup {
    z-index: 20181248 !important;
    overflow-y: scroll;
    .mu-dialog {
        position: absolute;
        top: 10%;
        width: 540px;
        border-radius: 6px;
        overflow: hidden;
    }
    .mu-dialog-body {
        position: relative;
        color: #CCBCF8;
        background: #52476F url(../../../public/img/fundraiy_bg.png) no-repeat center;
        background-size: 100% 100%;
        font-size: 14px;
        padding-bottom: 70px;
        .logo {
            display: block;
            height: 33px;
            margin: 0 auto;
        }
        h4 {
            color: #E1DDFE;
            font-weight: 400;
            font-size: 16px !important;
            margin-top: 10px;
        }
        .addr-wrap {
            background:rgba(72,61,101,.6);
            width: 80%;
            margin: 20px auto;
            line-height: 25px;
            user-select: text;
            text-align: center;
            padding: 10px 0;
        }
        .progress-wrap {
            margin: 80px 0 30px;
            .progress-bg {
                position: relative;
                height: 16px;
                background-color: #483D65;
                border-radius: 8px;
                .progress-bar {
                    position: absolute;
                    height: 100%;
                    min-width: 10%;
                    border-radius: 8px;
                    background-color: #FFC425;
                    &:after {
                        content: "";
                        position: absolute;
                        right: 2px;
                        top: 2px;
                        width: 12px;
                        height: 12px;
                        background-color: #C79A20;
                        border-radius: 50%;
                    }
                    span {
                        position: absolute;
                        bottom: 26px;
                        left: calc(100% - 8px);
                        transform: translateX(-50%);
                        background-color: #FFC425;
                        padding: 0px 5px;
                        color: #3F355A;
                        white-space: nowrap;
                        border-radius: 2px;
                        &:after {
                            content: "";
                            position: absolute;
                            bottom: -8px;
                            left: calc(50% - 4px);
                            border: 4px solid transparent;
                            border-top-color: #FFC425;
                        }
                    }
                }
            }
            .flex-wrap {
                display: flex;
                justify-content: space-between;
                span {
                    color: #9A93D0;
                    font-size: 14px;
                }
            }
        }
        .input-wrap {
            display: flex;
            background-color: #483D65;
            border-radius: 4px;
            overflow: hidden;
            margin-top: 20px;
            input {
                flex: 1;
                height: 34px;
                background-color: #483D65;
                border: none;
                outline: none;
                padding: 0 20px;
                color: #fff;
            }
            button {
                width: 104px;
                background-color: #ffba00;
                color: #3F355A;
                font-weight: 700;
                border: none;
            }
        }
        .close-btn {
            position: absolute;
            right: 20px;
            top: 20px;
            width: 25px;
            height: 25px;
            background: url(../../../public/img/close_icon01.png) no-repeat center;
            background-size: 100%;
        }
        .content {
            text-align: left;
            font-size: 12px;
            margin: 36px 0 24px 0;
        }
        .service {
            position: absolute;
            left: 0;
            bottom: 0;
            width: 100%;
            display: flex;
            height: 60px;
            align-items: center;
            justify-content: space-around;
            background:rgba(46,36,74,.4);
            a {
                position: relative;
                .icon {
                    display: inline-block;
                    width: 32px;
                    vertical-align: middle;
                    margin-right: 10px;
                }
                span {
                    color: #928BC1;
                    font-size: 24px;
                    vertical-align: middle;
                }
                &:hover {
                    .qrcode {
                        display: block;
                    }
                }
                .qrcode {
                    display: none;
                    position: absolute;
                    bottom: 40px;
                    right: 0px;
                    img {
                        width: 200px;
                    }
                }
            }
        }
    }
}
</style>
