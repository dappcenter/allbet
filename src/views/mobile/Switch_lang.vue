<template>
    <div class="switchlang-page">
        <MBheaderBar :title="$t('message.MySetLang')"></MBheaderBar>
        <div class="main">
            <ul>
                <li @click="changeLanguage('zh-CN')">
                    <label>中文</label>
                    <i class="icon" :class="{'on': locale === 'zh-CN'}"></i>
                </li>
                <li @click="changeLanguage('en-US')">
                    <label>English</label>
                    <i class="icon" :class="{'on': locale === 'en-US'}"></i>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
import {mapMutations, mapState} from "vuex"
export default {
    methods: {
        ...mapMutations({
            changeLanguage: "CHANGE_LANGUAGE",
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
        addressList() {
            return this.$store.getters.getUserAddress
        },
    },
}
</script>


<style lang="less">
.switchlang-page {
    .main {
        ul {
            li {
                display: flex;
                height: 1.2rem;
                align-items: center;
                background-color: #202234;
                padding: 0 .4rem;
                border-bottom: 1px solid #10111F;
                &:last-child {
                    border: none;
                }
                label {
                    font-size: .3rem;
                    flex: 1;
                }
                .icon {
                    width: .3rem;
                    height: .3rem;
                    background: url(../../../public/img/my/radio_off.png) no-repeat center;
                    background-size: 100%;
                    &.on {
                        background: url(../../../public/img/my/radio_on.png) no-repeat center;
                        background-size: 100%;
                    }
                }
            }
        }
    }
}
</style>

