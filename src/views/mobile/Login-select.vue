<template>
    <div class="loginselect-page" :style="{minHeight: $window.innerHeight + 'px'}">
      <MBheaderBar title="登陆"></MBheaderBar>
      <h3>{{$t('message.PopLoginSelectTitleMobile')}}</h3>
      <div class="content-text" v-html="$t('message.PopLoginSelectMobile' + coinType)"></div>
      <!-- <p class="other">{{$t('message.PopLoginText1')}}</p>
      <button @click="showLoginPopup">{{$t('message.login')}} / {{$t('message.PopRegister')}}</button> -->
      <p class="other">{{$t('message.PopLoginText1')}}<a href="javascript:;" @click="showLoginPopup"> {{$t('message.login')}} / {{$t('message.PopRegister')}}</a></p>
    </div>
</template>

<script>
import {mapMutations, mapState} from "vuex"
export default {
    data() {
        return {}
    },
    methods: {
      showLoginPopup () {
        this.$router.replace('login')
      },
        //HD钱包登录
        hdLogin(type) {
            if(window.web3) {
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
                window.open("pdf/whitepaper_en.pdf")
            }else {
                window.open("pdf/whitepaper.pdf")
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
        }),

            coinType() {
                return this.$store.state.user.coinType
            }
    }
}
</script>


<style lang="less">
.loginselect-page {
  background:linear-gradient(140deg,rgba(122,113,189,1),rgba(146,94,199,1));
        h3 {
            text-align: center;
            font-size: 24px;
                margin-top: 1.3rem;
                color: #FFFFFF;
        }
        .content-text {
            margin: 50px 0;
            font-size: 14px;
            color: #E3DFFF;
            word-break: break-all;
            padding: 0 0.5rem;
            a {
                color: #E3DFFF;
                text-decoration: underline;
            }
        }
        button {
            display: block;
            border: none;
            outline: none;
            font-size: 0.16rem;
            color: #FEFEFE;
            width: 1.8rem;
            height: 0.42rem;
            border-radius: 0.2rem;
            margin: 0 auto;
            cursor: pointer;
            background:linear-gradient(90deg,rgba(175,163,255,1),rgba(199,144,255,1));
            box-shadow:0px 1px 3px 0px rgba(126,79,181,0.75);
        }
        .other {
            font-size: 12px;
            color: #422462;
            text-align: center;
            margin-top: 20px;
            a {
                color: #FFC425;
            }
        }
        .close-btn {
            position: absolute;
            top: 20px;
            right: 20px;
            width: 28px;
            height: 28px;
            background: url(../../../public/img/win_box/close.png) no-repeat center;
            background-size: 100%;
            cursor: pointer;
        }

}
</style>
