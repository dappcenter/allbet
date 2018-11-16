<template>
    <div class="my-page">
        <MBheaderBar :title="$t('message.my')"></MBheaderBar>
        <div class="top">
            <img src="../../../public/img/my/user_icon.png" alt="">
            <p v-if="storeCurrentAddr.userName">{{storeCurrentAddr.userName}}</p>
            <router-link to="loginselect" v-else>登录/注册</router-link>
        </div>
        <ul class="menu">
            <router-link to="my-assets" tag="li">
                <img class="item-icon" src="../../../public/img/my/wallet_icon.png" alt="">
                <label>{{$t("message.property")}}</label>
                <i class="arrow"></i>
            </router-link>
            <router-link to="account-security" tag="li">
                <img class="item-icon" src="../../../public/img/my/zhaq_icon.png" alt="">
                <label>{{$t("message.accountSecurity")}}</label>
                <i class="arrow"></i>
            </router-link>
            <router-link to="switchlang" tag="li">
                <img class="item-icon" src="../../../public/img/my/switch_lang_icon.png" alt="">
                <label>{{$t("message.MySwitchLang")}}</label>
                <i class="arrow"></i>
            </router-link>
            <router-link to="about" tag="li">
                <img class="item-icon" src="../../../public/img/my/face_icon.png" alt="">
                <label>{{$t("message.MyAbout")}}</label>
                <i class="arrow"></i>
            </router-link>
        </ul>
    </div>
</template>

<script>
import {mapState} from "vuex"
export default {
    computed: {
        ...mapState({
            locale: state => state.locale,
            userInfo: state => state.user.userInfo,
            isShowLoginBox: state => state.dialogs.loginBox,
            storeCurrentAddr: state => state.user.currentAddr,
            lastCurAddrPf: state => state.user.lastCurAddrPf,
            storeWeb3: state => state.web3Handler.web3
        }),
    }
}
</script>

<style lang="less">
.my-page {
    .top {
        padding: .8rem 0;
        text-align: center;
        img {
            display: block;
            margin: 0 auto .2rem;
            width: 1.2rem;
        }
        a {
            font-size: .3rem;
            color: #3E9CF5;
        }
        p {
            color: #797A8C;
        }
    }
    .menu {
        border-top: 1px solid #10101A;
        li {
            display: flex;
            align-items: center;
            padding: 0 .42rem;
            height: 1.2rem;
            border-bottom: 1px solid #10101A;
            .item-icon {
                width: .32rem;
            }
            label {
                flex: 1;
                font-size: .3rem;
                color: #CED0EA;
                margin-left: .23rem;
            }
            .arrow {
                width: .14rem;
                height: .28rem;
                background: url(../../../public/img/my/youjiantou@2x.png) no-repeat center;
                background-size: 100%;
            }
        }
    }
}
</style>


