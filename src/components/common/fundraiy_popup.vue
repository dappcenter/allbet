<template>
    <mu-dialog :open.sync="isShow" :append-body="false" class="fundraiy-popup" :overlay-close="false">
        <img class="logo" src="../../../public/img/LOGO.png" alt="">
        <a href="javascript:;" class="close-btn" @click="isShow = false"></a>
        <h4>一个致力于打造最全游戏品类，最棒游戏体验的 DAPP 游戏平台。</h4>
        <div class="addr-wrap">
            <p>100TRX=280AB</p>
            <p>AB Token 本次预售仅限 40,000,000 TRX</p>
            <p>合约地址：{{$window.TRONFUNDRAIYADDRESS}}</p>
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
            <input type="text" v-model="amount" placeholder="输入 TRX 数量" oninput="value=value.replace(/[^0-9\.]/g,'')" onkeyup="value=value.replace(/[^0-9\.]/g,'')" onpaste="value=value.replace(/[^0-9\.]/g,'')" oncontextmenu="value=value.replace(/[^0-9\.]/g,'')">
            <button @click="send">投入TRX</button>
        </div>
        <p class="content">预售方案：<br />* 单次参与预售，不小于1000TRX<br />* 不接受交易所地址，否则您将接收不到AB<br />* 参与 50,000 门槛预售的额外补偿 5%AB ，如有疑问请加入社群。</p>
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
            pageData: {}
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
.fundraiy-popup {
    z-index: 20181248 !important;
    .mu-dialog {
        width: 600px;
        border-radius: 6px;
        overflow: hidden;
    }
    .mu-dialog-body {
        position: relative;
        color: #CCBCF8;
        background: #52476F url(../../../public/img/fundraiy_bg.png) no-repeat bottom right;
        background-size: 100%;
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
            line-height: 38px;
            user-select: text;
            text-align: center;
        }
        .progress-wrap {
            margin: 80px 0 40px;
            .progress-bg {
                position: relative;
                height: 16px;
                background-color: #483D65;
                border-radius: 8px;
                .progress-bar {
                    position: absolute;
                    height: 100%;
                    min-width: 50px;
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
                        padding: 5px;
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
                height: 48px;
                background-color: #483D65;
                border: none;
                outline: none;
                padding: 0 20px;
                color: #fff;
            }
            button {
                width: 120px;
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
            margin: 20px 0 0 0;
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

