<template>
    <mu-dialog :open.sync="isShow" :append-body="false" class="bonus-pools-popup">
        <h4>{{$t('message.BPbonusPools')}}</h4>
        <p class="tip1">{{$t('message.BPtip')}}</p>
        <div class="coin-wrap eth">
            <div class="coin-logo">
                <img src="../../../public/img/coin/ETH.png" />
                <span>{{$t('message.BPcurrentAmount')}}</span>
            </div>
            <h3>{{Number(bonusPoolsData.ethPool) > 0 ? Number(bonusPoolsData.ethPool).toFixed(8) : 0}} ETH</h3>
        </div>
        <div class="coin-wrap eth">
            <div class="coin-logo">
                <img src="../../../public/img/coin/TRX.png" />
                <span>{{$t('message.BPcurrentAmount')}}</span>
            </div>
            <h3>{{Number(bonusPoolsData.trxPool) > 0 ? Number(bonusPoolsData.trxPool).toFixed(8) : 0}} TRX</h3>
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
        <p class="tip2">{{$t("message.BPtip2")}}</p>
        <div class="tip3">
            <p v-if="storeCurrentAddr.bet">{{$t("message.BPab")}}：{{storeCurrentAddr.bet || 0}} AB</p>
            <!-- <p>当前 AB 币流通量：100000000 AB</p> -->
        </div>
        <i class="close-btn" @click="isShow = false"></i>
    </mu-dialog>
</template>

<script>
import {mapState} from "vuex"
export default {
    props: {
        isShowBPpopup: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            bonusPoolsData: {},
            isShow: false
        }
    },
    watch: {
        isShow(newVal) {
            if(!newVal) {
                this.$emit("change", newVal)
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
    },
    computed: {
        ...mapState({
            storeCurrentAddr: state => state.user.currentAddr
        })
    },
    methods: {
        //获取分红池信息
        getBonusPools() {
            this.$http.get('/app/profit/profit').then(res => {
                if(res.code == 200) {
                    this.bonusPoolsData = res.result
                }
            })
        },
    }
}
</script>

<style lang="less">
.bonus-pools-popup {
    left: 0;
    bottom: 0;
    right: 0;
    top: 0;
    .mu-dialog {
        width: 40%;
        background-color: transparent;
    }
    .mu-dialog-body {
        background: url(../../../public/img/bonus-pools.png) no-repeat center;
        background-size: 100% 100%;
        color: #fff !important;
        h4 {
            color: #FFD558;
        }
        .tip1 {
            color: #FFD558;
            margin-bottom: 30px;
            margin-top: 10px;
            font-size: 16px;
            text-align: center;
        }
        .tip2 {
            color: #FFD558;
            margin-bottom: 30px;
            margin-top: 40px;
            font-size: 14px;
            text-align: center;
            border-bottom: 1px solid #E18F5E;
        }
        .tip3 {
            text-align: center;
            font-size: 16px;
        }
        .coin-wrap {
            display: flex;
            align-items: center;
            justify-content: space-around;
            padding: 10px 20px;
            border-radius:4px;
            background:#E95678;
            margin-top: 10px;
            .coin-logo {
                text-align: center;
                margin-left: 20px;
                img {
                    width: 62px;
                    height: 62px;
                    display: block;
                    margin: 0 auto 10px;
                    background-color: #CD3A5A;
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
            li {
                display: flex;
                align-items: center;
                justify-content: space-between;
                background-color: #DB705E;
                width: 49%;
                margin-top: 10px;
                padding: 20px 40px;
                border-radius: 4px;
                img {
                    width: 62px;
                    background-color: #C54537;
                    border-radius: 50%;
                }
                span {
                    font-size: 18px;
                    color: #fff;
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

