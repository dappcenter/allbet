<template>
    <div class="register-page" :style="{minHeight: $window.innerHeight + 'px'}">
        <div class="top">
            <a href="javascript:;" class="backarrow" @click="$goBack"></a>
            <img class="logo" src="../../../public/img/allbet_mobile.png" alt="">
            <div class="tab">
                <a href="javascript:;" class="phone" @click="registerType = 'phone';getImgCode('REGISTER')" :class="{'active': registerType == 'phone'}">{{$t('message.PopPhoneRegister')}}</a>
                <a href="javascript:;" @click="registerType = 'email';getImgCode('REGISTER')" :class="{'active': registerType == 'email'}">{{$t('message.PopEmailRegister')}}</a>
            </div>
        </div>
        <div class="bottom">
            <!-- 手机号 -->
            <div class="input-wrap" v-if="registerType == 'phone'">
                <label>{{$t('message.PopPhone')}}</label>
                <div class="input-flex prefix">
                    <mu-menu cover :open.sync="prefixMenu">
                        <span color="primary">{{formData.prefix}}</span>
                        <mu-list slot="content">
                            <mu-list-item button v-for="item in prefixs" :key="item" @click="formData.prefix = item;prefixMenu = false">
                                <mu-list-item-title>{{item}}</mu-list-item-title>
                            </mu-list-item>
                        </mu-list>
                    </mu-menu>
                    <input type="text" v-model.trim="formData.phone" :placeholder="$t('message.PopRegisterPhone')">
                </div>
            </div>
            <!-- 邮箱号 -->
            <div class="input-wrap" v-else>
                <label>{{$t('message.PopEmail')}}</label>
                <input type="text" v-model.trim="formData.email" :placeholder="$t('message.PopRegisterEmail')">
            </div>
            <!-- 图形验证码 -->
            <div class="input-wrap">
                <label>{{$t('message.PopGraphic')}}</label>
                <div class="input-flex">
                    <input type="text" v-model="formData.picCode" :placeholder="$t('message.PopGraphicEnter')">
                    <img :src="$window.SERVERPATH + '/open/pic_captcha?type=REGISTER&macCode=' + macCode" alt="" @click="getImgCode('REGISTER')" ref="imgcode">
                </div>
            </div>
            <!-- 短信\邮箱验证码 -->
            <div class="input-wrap">
                <label>{{$t('message.PopCaptcha')}}</label>
                <div class="input-flex">
                    <input type="text" v-if="registerType == 'phone'" v-model="formData.captcha" :placeholder="$t('message.PopInputCaptcha')">
                    <input type="text" v-else v-model="formData.captcha" :placeholder="$t('message.PopInputEmailCaptcha')">
                    <AEFcountDownBtn v-show="registerType == 'phone'" v-model="captchaDisabled" @click.native="getSMScode('REGISTER')"></AEFcountDownBtn>
                    <AEFcountDownBtn v-show="registerType == 'email'" v-model="captchaDisabledEmail" @click.native="getEmailCode('REGISTER')"></AEFcountDownBtn>
                </div>
            </div>
            <!-- 密码 -->
            <div class="input-wrap">
                <label>{{$t('message.PopPassword')}}</label>
                <input type="password" v-model="formData.password" :placeholder="$t('message.PopPasswordPlaceholder')">
            </div>
            <!-- 二次密码 -->
            <div class="input-wrap">
                <label>{{$t('message.PopPasswordConfirm')}}</label>
                <input type="password" v-model="formData.password2" :placeholder="$t('message.PopPassword2Placeholder')">
            </div>
            <!-- 邀请码 -->
            <div class="input-wrap">
                <label>{{$t('message.PopInviteCode')}}</label>
                <input type="text" v-model="formData.inviteCode" :placeholder="$t('message.PopInviteCodePlaceholder')">
            </div>
            <button class="primary-btn" @click="registerDo('phone')">{{$t('message.PopRegister')}}</button>
            <p>
                <router-link to="login" replace>{{$t("message.gotoLogin")}}</router-link>
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
                phone: "",   //手机号
                inviteCode: "", //邀请码
                prefix: "+86",  //区号
                captcha: "",   //短信验证码
                password: "",  //密码
                password2: "",  //2次密码
                email: "",  //邮箱账号
                picCode: "",  //图形验证码
            },
            macCode: new Date().getTime(),
            registerType: "phone",
            captchaDisabled: false,
            captchaDisabledEmail: false,
            prefixMenu: false,
            currentAddr: ""
        }
    },
    created() {
        if(sessionStorage.getItem('inviteCode') && sessionStorage.getItem('inviteCode').trim() != "") {
            if(this.$route.query.inviteCode && this.$route.query.inviteCode != sessionStorage.getItem('inviteCode')) {
                sessionStorage.setItem('inviteCode', this.$route.query.inviteCode || "")
            }
            this.formData.inviteCode = sessionStorage.getItem('inviteCode')
        }else {
            sessionStorage.setItem('inviteCode', this.$route.query.inviteCode || "")
            this.formData.inviteCode = this.$route.query.inviteCode || ""
        }
    },
    methods: {
        //刷新验证码
        getImgCode(type) {
            this.$refs.imgcode.src = this.$window.SERVERPATH + "/open/pic_captcha?type="+ type +"&macCode="+ this.macCode +"&" + Math.random();
        },
        // 获取验证码
        getSMScode(type) {

            if(!this.verifyPhone() || !this.verifyPicCode()) return

            this.captchaDisabled = true  //开始倒计时

            this.$http.post("/open/captcha", {
                "macCode": this.macCode,
                "phone": this.formData.phone,
                "picCode": this.formData.picCode,
                "prefix": this.formData.prefix,
                "type": type
            }).then(res => {
                if(res.code != 200) {
                    this.captchaDisabled = false
                    this.getImgCode(type)
                }
            }).catch(err => {
                this.captchaDisabled = false
            })
        },
        //获取邮箱验证码
        getEmailCode(type) {
            if(!this.verifyEmail() || !this.verifyPicCode()) return
            this.captchaDisabledEmail = true  //开始倒计时
            this.$http.get("/open/email_captcha", {
                params: {
                    "email": this.formData.email,
                    "picCode": this.formData.picCode,
                    "captchaType": type,
                    "macCode": this.macCode
                }
            }).then(res => {
                if(res.code != 200) {
                    this.captchaDisabledEmail = false
                    this.getImgCode(type)
                }
            }).catch(err => {
                this.captchaDisabledEmail = false
            })
        },
        // 发起注册
        registerDo() {
            const type = this.registerType
            let url = "/open/register/phone"
            let obj = {
                "captcha": this.formData.captcha,
                "loginPwd": Md5(this.formData.password),
                "phone": this.formData.phone,
                "prefix": this.formData.prefix,
                "inviteCode": this.formData.inviteCode
            }
            if(type == "email") {
                url = "/open/register/email"
                if(!this.verifyEmail()) return
                obj.email = this.formData.email
            }else {
                if(!this.verifyPhone()) return
            }
            if(!this.verifyCaptcha() || !this.verifyPassword()) return
            this.$http.post(url, obj).then(res => {
                if(res.code == 200) {
                    this.alert({
                        type: "success",
                        msg: res.msg
                    })
                    // 相当于直接登录
                    this.setUserInfo(res.result)
                    this.$goBack()
                }
            })
        },
        // 二次密码验证
        verifyPassword() {
            var regx =/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,12}$/
            if(!regx.test(this.formData.password)) {
                this.alert({
                    type: "info",
                    msg: this.$t('message.PopPassRequest')
                })
                return false
            }
            if(this.formData.password !== this.formData.password2) {
                this.alert({
                    type: "info",
                    msg: this.$t('message.PopPassDiff')
                })
                return false
            }
            return true
        },
        //手机号验证
        verifyPhone() {
            if (this.formData.prefix == '+86' && !(/^1[34578]\d{9}$/.test(this.formData.phone))) {
              this.alert({
                  type: "info",
                  msg: this.$t('message.PopPhoneWrong')
              })
              return false
            }
            if(this.formData.phone == "" || !/^[0-9]*$/.test(this.formData.phone)) {
                this.alert({
                    type: "info",
                    msg: this.$t('message.PopPhoneWrong')
                })
                return false
            }
            return true
        },
        //图形验证码验证
        verifyPicCode() {
            if(this.formData.picCode == "") {
                this.alert({
                    type: "info",
                    msg: this.$t('message.PopGraphicEmpty')
                })
                return false
            }
            return true
        },
        verifyCaptcha() {
            if(this.formData.captcha == "") {
                this.alert({
                    type: "info",
                    msg: this.$t('message.PopCaptchaEmpty')
                })
                return false
            }
            return true
        },
        //邮箱验证
        verifyEmail() {
            if(this.formData.email == "" || !/^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/.test(this.formData.email)) {
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
        registerType(newVal, oldVal){
            this.formData.captcha = ""
            this.formData.picCode = ""
            this.formData.password = ""
            this.formData.password2 = ""
        },
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
.register-page {
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



