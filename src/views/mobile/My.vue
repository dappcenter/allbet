<template>
    <div class="my-page">
        <MBheaderBar :title="$t('message.my')"></MBheaderBar>
        <div class="top">
            <img src="../../../public/img/my/user_icon.png" alt="">
            <p v-if="storeCurrentAddr.coinAddress">{{storeCurrentAddr.userName}}</p>
            <router-link to="login" v-else>{{$t('message.login')}}/{{$t("message.PopRegister")}}</router-link>
        </div>
        <ul class="menu">
            <router-link to="my-assets" tag="li" v-if="storeCurrentAddr.coinAddress">
                <img class="item-icon" src="../../../public/img/my/wallet_icon.png" alt="">
                <label>{{$t("message.property")}}</label>
                <i class="arrow"></i>
            </router-link>
            <router-link to="account-security" tag="li" v-if="storeCurrentAddr.coinAddress">
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
        <button class="logout" @click="removeUserInfo('DISPATCHER')" v-if="storeCurrentAddr.platform == 'DISPATCHER'">{{$t("message.logout")}}</button>
    </div>
</template>

<script>
import {mapState, mapMutations} from "vuex"
export default {
    methods: {
        ...mapMutations({
            removeUserInfo: "REMOVE_USERINFO",
        })
    },
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
    background-color: #22202C;
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
    .logout {
        display: block;
        width: 3.2rem;
        height: .72rem;
        color: #484B76;
        border: .02rem solid rgba(52,52,74,1);
        border-radius: .06rem;
        background-color: transparent;
        margin: .4rem auto;
        font-size: .32rem;
    }
}
</style>
