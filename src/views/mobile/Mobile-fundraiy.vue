<template>
  <div class="mobilefundraiy-page" :style="{minHeight: $window.innerHeight + 'px'}">
      <HeaderBar></HeaderBar>
      <div class="main">
        <img class="logo" src="../../../public/img/LOGO-all.png" alt="">
        <a href="javascript:;" class="close-btn" @click="isShow = false"></a>
        <h4>{{$t('message.preTarget')}}</h4>
        <div class="addr-wrap">
            <p>100TRX=200AB</p>
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
                <span>{{pageData.goal}} TRX</span>
            </div>
        </div>
        <div class="input-wrap">
            <input type="text" v-model="amount" :placeholder="$t('message.preTrxNum')" oninput="value=value.replace(/[^0-9]/g,'')" onkeyup="value=value.replace(/[^0-9]/g,'')" onpaste="value=value.replace(/[^0-9]/g,'')" oncontextmenu="value=value.replace(/[^0-9]/g,'')">
            <button @click="send">{{$t('message.preTrxBet')}}</button>
        </div>
        <p class="content">{{$t('message.preSale')}}<br />* {{$t('message.preLess')}}<br />* {{$t('message.preRefuse')}}<br />* {{$t('message.preJoin')}}</p>
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
      </div>
  </div>
</template>

<script>
import HeaderBar from "@/components/common/header_bar"
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
            pageData: {}
        }
    },
    components: {
        HeaderBar,
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
            var that = this
            if(this.amount < 1000) {
                this.alert({
                    type: "info",
                    msg: "单次参与不能小于1000"
                })
                return
            }
            this.storeTronWeb.tronWebInstance.trx.sendTransaction(this.$window.TRONFUNDRAIYADDRESS, this.amount*1000000).then(res => {
				that.alert({
					type: "success",
					msg: "参与成功"
				})
			}).catch(err => {

			})
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
.mobilefundraiy-page {
  background: #52476F url(../../../public/img/coin/fundraiy_bg.png) no-repeat bottom right;
  background-size: cover;
    .main {
        font-size: 0.20rem;
        padding-bottom: 1.2rem;
        .logo {
            display: block;
            height: 0.44rem;
            margin: 0 auto;
            margin-top: 0.6rem;
        }
        h4 {
            color: #E1DDFE;
            font-weight: 400;
            font-size: 0.28rem !important;
            padding: 0.4rem;
            text-align: left;
            margin: 0.4rem auto 0 auto;
        }
        .addr-wrap {
            background:rgba(72,61,101,.6);
            width: 6.7rem;
            margin: 0.6rem auto 1rem auto;
            line-height: 0.38rem;
            user-select: text;
            text-align: center;
            padding: 0.43rem 0;
                font-size: 0.24rem;
        }
        .progress-wrap {
            margin: 0.8rem 0 0.4rem;
            .progress-bg {
                position: relative;
                height: 0.18rem;
                background-color: #483D65;
                border-radius: 8px;
                width: 6.7rem;
                margin: auto;
                .progress-bar {
                    position: absolute;
                    height: 100%;
                    min-width: 0.15rem;
                    border-radius: 8px;
                    background-color: #FFC425;
                    &:after {
                        content: "";
                        position: absolute;
                        right: 0.02rem;
                        top: 0.02rem;
                        width: 0.14rem;
                        height: 0.14rem;
                        background-color: #C79A20;
                        border-radius: 50%;
                    }
                    span {
                        position: absolute;
                        bottom: 0.35rem;
                        left: calc(100% - 0.08rem);
                        transform: translateX(-50%);
                        background-color: #FFC425;
                        padding: 0.02rem;
                        color: #3F355A;
                        white-space: nowrap;
                        border-radius: 2px;
                        text-align: right;
                        font-size: 0.16rem;
                        &:after {
                            content: "";
                            position: absolute;
                            bottom: -0.16rem;
                            left: calc(50% - 0.04rem);
                            border: 4px solid transparent;
                            border-top-color: #FFC425;
                        }
                    }
                }
            }
            .flex-wrap {
                display: flex;
                justify-content: space-between;
                width: 6.7rem;
                margin: auto;

                span {
                    color: #9A93D0;
                    font-size: 0.2rem;
                }
            }
        }
        .input-wrap {
            display: flex;
            background-color: #483D65;
            border-radius: 4px;
            overflow: hidden;
            width: 6.7rem;
            margin: auto;
            margin-top: 0.2rem;
            font-size: 0.24rem;
            // height: 0.40rem;
            input {
                flex: 1;
                height: 0.7rem;
                line-height: 0.7rem;
                background-color: #483D65;
                border: none;
                outline: none;
                padding: 0 0.2rem;
                color: #fff;
                width: 5.4rem;
            }
            button {
                width: 1.6rem;
                background-color: #ffba00;
                color: #3F355A;
                font-weight: 700;
                border: none;
            }
        }
        .close-btn {
            position: absolute;
            right: 0.2rem;
            top: 0.2rem;
            width: 0.25rem;
            height: 0.25rem;
            background: url(../../../public/img/close_icon01.png) no-repeat center;
            background-size: 100%;
        }
        .content {
            text-align: left;
            font-size: 0.24rem;
            margin: 0.8rem auto 0.4rem auto;
            width: 6.7rem;

        }
        .service {
            position: absolute;
            left: 0;
            bottom: 0;
            width: 100%;
            display: flex;
            height: 1rem;
            align-items: center;
            justify-content: space-around;
            background:rgba(46,36,74,.4);
            a {
                position: relative;
                .icon {
                    display: inline-block;
                    width: 0.48rem;
                    vertical-align: middle;
                    margin-right: 0.18rem;
                }
                span {
                    color: #928BC1;
                    font-size: 0.36rem;
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
                    bottom: 0.4rem;
                    right: 0px;
                    img {
                        width: 2rem;
                    }
                }
            }
        }

    }
}
</style>
