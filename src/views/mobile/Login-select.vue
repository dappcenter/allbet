<template>
    <div class="loginselect-page">
        <a class="cancel" href="javascript:;" @click="$goBack">{{$t("message.PopCancel")}}</a>
        <img class="logo" src="../../../public/img/logo03.png" alt="">
        <div class="btn-warp">
            <button class="primary-btn" @click="$router.replace('login')">{{$t("message.accountLogin")}}</button>
            <button class="primary-btn hd" @click="hdLogin">{{$t("message.hdWalletLogin")}}</button>
            <p>
                {{$t("message.notRegister")}}
                <!-- mobile注册 -->
                <a href="javascript:;" @click="$router.replace('register')">{{$t("message.nowRegister")}}</a>
            </p>
        </div>
    </div>
</template>

<script>
import {mapMutations, mapState} from "vuex"
export default {
    data() {
        return {}
    },
    methods: {
        //HD钱包登录
        hdLogin(type) {
            if(window.web3) {
                // this.openConfirm({
                //     content: this.$t('message.PopHdLogin'),
                //     btn: [
                //         {
                //             text: this.$t('message.PopClose')
                //         }
                //     ]
                // })
                // 注册web3
                this.$store.dispatch("registerWeb3");
            }else {
                this.openConfirm({
                    content: this.$t('message.PopTipsDesc'),
                    btn: [
                        {
                            text: this.$t('message.PopInstallation'),
                            cb: () => {
                                this.openWhiteBook()
                            }
                        },
                        {
                            type: "high",
                            text: this.$t('message.PopAccountLogin'),
                            cb: () => {
                                this.$router.replace('login')
                            }
                        }
                    ]
                })
            }
        },
        //打开白皮书
        openWhiteBook() {
            if(this.locale == "en-US") {
                window.open("pdf/whitebook_en.pdf")
            }else {
                window.open("pdf/whitebook.pdf")
            }
        },
        ...mapMutations({
            changeLanguage: "CHANGE_LANGUAGE",
            alert: "alert",
            setUserInfo: "SET_USERINFO",
            setCurrentAddr: "SET_CURRENTADDR",
            removeUserInfo: "REMOVE_USERINFO",
            openConfirm: "OPEN_CONFIRM",
            openLogin: "OPEN_LOGIN"
        })
    },
    computed: {
        ...mapState({
            locale: state => state.locale,
        })
    }
}
</script>


<style lang="less">
.loginselect-page {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    .cancel {
        position: absolute;
        font-size: .28rem;
        color: #C4E5FF;
        padding: .3rem;
    }
    .logo {
        display: block;
        width: 3.7rem;
        margin: 1.8rem auto 0;
    }
    .btn-warp {
        position: absolute;
        width: 100%;
        bottom: 0;
        left: 0;
        button {
            display: block;
            width: 90%;
            height: .9rem;
            background:linear-gradient(90deg,rgba(69,182,245,1),rgba(45,92,245,1));
            border-radius: .06rem;
            margin: .4rem auto 0;
            color: #fff;
            font-size: .32rem;
            border: none;
            &.hd {
                background:linear-gradient(90deg,rgba(0,193,204,1),rgba(0,144,250,1));
            }
        }
        p {
            text-align: center;
            margin: .6rem 0;
        }
    }
}
</style>
