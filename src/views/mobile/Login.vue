<template>
    <div class="login-page">
        <div class="top">
            <a href="javascript:;" class="backarrow" @click="$goBack"></a>
            <img class="logo" src="../../../public/img/allbet_mobile.png" alt="">
            <div class="tab">
                <a href="javascript:;" class="phone" @click="formData.loginType = 'Phone';formData.password = ''" :class="{'active': formData.loginType == 'Phone'}">{{$t('message.loginPhone')}}</a>
                <a href="javascript:;" @click="formData.loginType = 'Email';formData.password = ''" :class="{'active': formData.loginType == 'Email'}">{{$t('message.loginEmail')}}</a>
            </div>
        </div>
        <div class="bottom">
            <!-- 手机号 -->
            <div class="input-wrap" v-if="formData.loginType == 'Phone'">
                <label>{{$t('message.PopPhone')}}</label>
                <input type="tel" v-model.trim="formData.phoneLogin.phone" :placeholder="$t('message.PopRegisterPhone')">
            </div>
            <!-- 邮箱号 -->
            <div class="input-wrap" v-else>
                <label>{{$t('message.PopEmail')}}</label>
                <input type="text" v-model.trim="formData.emailLogin.email" :placeholder="$t('message.PopRegisterEmail')">
            </div>
            <!-- 密码 -->
            <div class="input-wrap">
                <label>{{$t('message.PopPassword')}}</label>
                <input type="password" v-model="formData.password" :placeholder="$t('message.PopPasswordPlaceholder')">
            </div>
            
            <button class="primary-btn" @click="loginDo()">{{$t('message.login')}}</button>
            <p>
                <router-link to="findpwd">{{$t("message.forgetPassword")}}</router-link>
                <router-link to="register" replace>{{$t("message.noAccount")}}</router-link>
            </p>
        </div>
    </div>
</template>

<script>
import {mapMutations, mapState} from "vuex"
import AEFcountDownBtn from "@/components/common/countDownBtn"
import Md5 from "../../assets/js/md5.js"
export default {
    props: ['registerAccount'],
    data() {
        return {
            prefixs: ["+86", "+852", "+853", "+886", "+8801", "+8802", "+001", "+44", "+0061"],
            formData: {
                "emailLogin": {
                    "email": ""
                },
                "password": "",
                "loginPwd": "",
                "loginType": "Phone",
                "phoneLogin": {
                    "phone": "",
                    "prefix": "+86"
                }
            },
            macCode: new Date().getTime(),
            registerType: "phone",
            captchaDisabled: false,
            prefixMenu: false,
            currentAddr: ""
        }
    },
    watch: {
        addressList(newVal) {
            let v = null
            if(newVal.length > 0) {
                let b = false
                newVal.forEach((val, idx) => {
                    if(val.coinAddress == this.storeCurrentAddr.coinAddress) {
                        b = true
                        this.setCurrentAddr(val)
                    }
                    if(val.coinAddress == this.storeWeb3.coinbase) {
                        v = val
                    }
                    
                })
                if(!b) {
                    if(v) {
                        this.currentAddr = v.coinAddress
                        this.setCurrentAddr(v)
                    }else {
                        this.currentAddr = newVal[0].coinAddress
                        this.setCurrentAddr(newVal[0])
                    }
                }
                
            }
        },
        currentAddr(newVal) {
            this.addressList.forEach(value => {
                if(value.coinAddress == newVal) {
                    this.setCurrentAddr(value)
                }
            })
        },
    },
    methods: {
        //登录
        loginDo() {
            const reg = /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/
            if(this.formData.loginType == "Phone") {
                if(!this.verifyPhone()) return
            }else {
                if(!this.verifyEmail()) return
            }
            if(this.formData.password == "") {
                this.alert({
                    type: "info",
                    msg: this.$t('message.PopAccountPassEmpty')
                })
                return
            }
            this.formData.loginPwd = Md5(this.formData.password)
            this.$http.post("/open/login", this.formData).then(res => {
                if(res.code == 200) {
                    this.alert({
                        type: "success",
                        msg: this.$t('message.loginSuccess')
                    })
                    this.setUserInfo(res.result)
                    this.$goBack()
                }
            })
        },
        //手机号验证
        verifyPhone() {
            // if (this.formData.prefix == '+86' && !(/^1[34578]\d{9}$/.test(this.formData.phone))) {
            //   this.alert({
            //       type: "info",
            //       msg: this.$t('message.PopPhoneWrong')
            //   })
            //   return false
            // }
            if(this.formData.phoneLogin.phone == "" || !/^[0-9]*$/.test(this.formData.phoneLogin.phone)) {
                this.alert({
                    type: "info",
                    msg: this.$t('message.PopPhoneWrong')
                })
                return false
            }
            return true
        },
        //邮箱验证
        verifyEmail() {
            if(this.formData.emailLogin.email == "" || !/^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/.test(this.formData.emailLogin.email)) {
                this.alert({
                    type: "info",
                    msg: this.$t('message.PopEmailWrong')
                })
                return false
            }
            return true
        },
        ...mapMutations({
            alert: "alert",
            setUserInfo: "SET_USERINFO",
            setCurrentAddr: "SET_CURRENTADDR"
        })
    },
    computed: {
        ...mapState({
            userInfo: state => state.user.userInfo,
            storeCurrentAddr: state => state.user.currentAddr,
            lastCurAddrPf: state => state.user.lastCurAddrPf,
            storeWeb3: state => state.web3Handler.web3
        }),
        addressList() {
            return this.$store.getters.getUserAddress
        }
    },
    components: {
        AEFcountDownBtn
    }
}
</script>

<style lang="less">
.login-page {
    background-color: #191A2A;
    .top {
        position: relative;
        background: url(../../../public/img/bg04.png) no-repeat center;
        background-size: cover;
        overflow: hidden;
        .backarrow {
            position: absolute;
            height: .5rem;
            width: .5rem;
            background: url(../../../public/img/arrow_back01.png) no-repeat center;
            background-size: 80%;
            top: .2rem;
            left: .2rem;
        }
        .logo {
            width: 3.7rem;
            display: block;
            margin: .7rem auto .1rem;
        }
        .tab {
            display: flex;
            a {
                flex: 1;
                text-align: center;
                color: #63647F;
                font-size: .32rem;
                padding: .4rem 0;
                position: relative;
                &:first-child {
                    &:before {
                        content: "";
                        position: absolute;
                        width: 1px;
                        height: .3rem;
                        top: 50%;
                        right: 0;
                        transform: translateY(-50%);
                        background-color: #7A7B91;
                    }
                }
                &.active {
                    color: #fff;
                    &:after {
                        content: "";
                        position: absolute;
                        bottom: 0;
                        left: 50%;
                        transform: translateX(-50%);
                        border: .14rem solid transparent;
                        border-bottom-color: #191A2A;
                    }   
                }
            }
        }
    }
    .bottom {
        background-color: #191A2A;
        overflow: hidden;
        padding: 0 .4rem;
        
        .input-wrap {
            display: flex;
            align-items: center;
            font-size: 14px;
            margin-top: 20px;
            overflow: hidden;
            label {
                width: 1.4rem;
                color: #7A7B91;
                font-size: .3rem;
                margin-right: .1rem;
            }
            input {
                flex: 1;
                width: 60%;
                height:40px;
                background:#131422;
                border:1px solid #393A50;
                border-radius:4px;
                padding: 0 10px;
                color: #fff;
            }
            .input-flex {
                flex: 1;
                display: flex;
                overflow: hidden;
                a {
                    background-color: #131422;
                    box-shadow:0px 0px 0px 0px rgba(199,218,255,0.75);
                    line-height: 40px;
                    margin-left: 10px;
                    width: 90px;
                    text-align: center;
                    font-size: 14px;
                    color: #fff;
                    border-radius: 4px;
                }
                img {
                    height: 40px;
                    width: 90px;
                    margin-left: 10px;
                }
                &.prefix {
                    background:#131422;
                    border:1px solid #393A50;
                    border-radius:4px;
                    .mu-menu {
                        line-height: 40px;
                        padding: 0 10px;
                        border-right: 1px solid #393A50;
                        font-weight: 700;
                    }
                    input {
                        border: none;

                    }
                }

            }
        }
        .primary-btn {
            display: block;
            line-height: .9rem;
            width: 100%;
            border: none;
            font-size: .3rem;
            color: #fff;
            text-align: center;
            border-radius: .06rem;
            margin-top: .6rem;
            background:linear-gradient(90deg,rgba(69,182,245,1),rgba(45,92,245,1));
            &.disabled {
                background-color: #393A50;
            }
        }
        p {
            display: flex;
            justify-content: space-between;
            padding: .3rem 0;
            text-align: center;
            a {
                font-size: .24rem;
                color: #6A89C4;
            }
        }
        
    }
}
</style>



