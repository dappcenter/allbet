<template>
    <div class="headerbar" :class="type">
        <div class="container flex-wrap">
            <router-link tag="div" to="dice" class="logo">
                <img class="nominscreen" src="../../../public/img/LOGO.png" alt="" style="display: block">
                <img class="minscreen" src="../../../public/img/AllBet.png" alt="">
            </router-link>
            <menu class="nominscreen">
                <router-link to="dice"><span>DICE</span></router-link>
                <!-- <router-link to="index"><span>{{$t("message.atDeal")}}</span></router-link> -->
                <a href="javascript:;" @click="displayStatus.abBancor = !displayStatus.abBancor"><span>{{$t("message.abBancor")}}</span></a>
                <a href="javascript:;" @click="displayStatus.bonusPools= !displayStatus.bonusPools"><span>{{$t("message.bonusPool")}}</span></a>
                <router-link to="invite" v-show="addressList.length > 0"><span>{{$t("message.invitation")}}</span></router-link>
                <a href="javascript:;" @click="openWhiteBook"><span>{{$t("message.course")}}</span></a>
            </menu>
            <div class="statusbar">
                <div class="address-select" v-if="addressList.length > 1">
                    <label class="nominscreen">{{$t("message.address")}}：</label>
                    <mu-select 
                        v-model="currentAddr" 
                        :class="{'import': storeCurrentAddr.platform == 'IMPORT', 'dispatcher': storeCurrentAddr.platform == 'DISPATCHER'}"
                        @change="currentAddrChange">
                        <mu-option :class="{'import': item.platform == 'IMPORT', 'dispatcher': item.platform == 'DISPATCHER'}" v-for="item,index in addressList" :key="index" :label="item.coinAddress.replace(/(.{4}).*(.{6})/, '$1....$2')" :value="item.coinAddress" :append-body="false" :solo="true"></mu-option>
                    </mu-select>
                </div>
                <div class="user-center nominscreen" v-if="storeCurrentAddr.coinAddress">
                    <!-- <img src="../../../public/img/user_icon.png" alt=""> -->
                    <span>{{storeCurrentAddr.userName}}</span>
                    <i></i>
                    <div class="router-list">
                        <router-link to="my-assets">{{$t("message.property")}}</router-link>
                        <router-link to="account-security">{{$t("message.accountSecurity")}}</router-link>
                        <a href="javascript:;" @click="removeUserInfo('DISPATCHER')" v-if="storeCurrentAddr.platform == 'DISPATCHER'">{{$t("message.logout")}}</a>
                    </div>
                </div>
                <!-- pc登录按钮 -->
                <a href="javascript:;" class="button login nominscreen" @click="displayStatus.loginSelect = true" v-show="addressList.length <= 0">{{$t("message.login")}}</a>

                <div class="language-select">
                    <a href="javascript:;" class="lang" v-show="locale === 'zh-CN'"><img src="../../../public/img/china_icon.png" /></a>
                    <a href="javascript:;" class="lang" v-show="locale === 'en-US'"><img src="../../../public/img/usa_icon.png" /></a>
                    <div class="pull">
                        <a href="javascript:;" @click="changeLanguage('zh-CN')"><img src="../../../public/img/china_icon.png" /></a>
                        <a href="javascript:;" @click="changeLanguage('en-US')"><img src="../../../public/img/usa_icon.png" /></a>
                    </div>
                </div>
                <!-- mobile登录按钮 -->
                <a href="javascript:;" class="login minscreen" @click="$router.push('my')"></a>
            </div>
        </div>

        <MBheaderNav class="minscreen" :openWhiteBook="openWhiteBook" :switchBonusPools="switchBonusPools" :addressList="addressList"></MBheaderNav>

        <!-- <div class="notice" v-if="notice">
            <ScrollNotice :text="$t('message.notice1')"></ScrollNotice>
        </div> -->
        <div class="header-shade" :style="{'opacity': shadeOpacity}"></div>

        <!-- 登录选择 -->
        <LoginSelectPopup v-model="displayStatus.loginSelect" :showLoginPopup="showLoginPopup"></LoginSelectPopup>

        <!-- 账号登录 -->
        <mu-dialog :open.sync="displayStatus.loginAccount" :append-body="false" class="login-accout">
            <h4>{{$t("message.login")}}</h4>
            <input type="text" v-model.trim="loginForm.account" :placeholder="$t('message.PopLoginPlaceholder')">
            <input type="password" v-model.trim="loginForm.password" :placeholder="$t('message.PopLoginPass')" @keyup.enter="loginDo">
            <button class="primary-btn" @click="loginDo" @keyup.enter="loginDo">{{$t("message.login")}}</button>
            <div class="flex-wrap">
                <p>{{$t('message.noAccount')}}<a href="javascript:;" @click="displayStatus.registerAccount = true;displayStatus.loginAccount = false">{{$t('message.registerNow')}}</a></p>
                <p><a href="javascript:;" @click="findPassword = true; displayStatus.loginAccount = false">{{$t("message.forgetPassword")}}</a></p>
            </div>
            <i class="close-btn" @click="displayStatus.loginAccount = false"></i>
        </mu-dialog>
        <!-- 手机注册账号 -->
        <mu-dialog :open.sync="displayStatus.registerAccount" :append-body="false" class="register-accout">
            <h4>{{$t('message.PopRegister')}}</h4>
            <div class="input-wrap">
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
            <div class="input-wrap">
                <label>{{$t('message.PopGraphic')}}</label>
                <div class="input-flex">
                    <input type="text" v-model="formData.picCode" :placeholder="$t('message.PopGraphicEnter')">
                    <img :src="$window.SERVERPATH + '/open/pic_captcha?type=REGISTER&macCode=' + macCode" alt="" @click="getImgCode('REGISTER')" ref="imgcode">
                </div>
            </div>
            <div class="input-wrap">
                <label>{{$t('message.PopCaptcha')}}</label>
                <div class="input-flex">
                    <input type="text" v-model="formData.captcha" :placeholder="$t('message.PopInputCaptcha')">
                    <AEFcountDownBtn v-model="captchaDisabled" @click.native="getSMScode('REGISTER')"></AEFcountDownBtn>
                </div>
            </div>
            <div class="input-wrap">
                <label>{{$t('message.PopPassword')}}</label>
                <input type="password" v-model="formData.password" :placeholder="$t('message.PopPasswordPlaceholder')">
            </div>
            <div class="input-wrap">
                <label>{{$t('message.PopPasswordConfirm')}}</label>
                <input type="password" v-model="formData.password2" :placeholder="$t('message.PopPassword2Placeholder')">
            </div>
            <div class="input-wrap">
                <label>{{$t('message.PopInviteCode')}}</label>
                <input type="text" v-model="formData.inviteCode" :placeholder="$t('message.PopInviteCodePlaceholder')">
            </div>
            <button class="primary-btn" @click="registerDo('phone')">{{$t('message.PopRegister')}}</button>
            <p><a href="javascript:;" @click="displayStatus.emailRegisterAccount = true; displayStatus.registerAccount = false">{{$t('message.PopEmailRegister')}}</a></p>
            <i class="close-btn" @click="displayStatus.registerAccount = false"></i>
        </mu-dialog>
        <!-- 邮箱注册账号 -->
        <mu-dialog :open.sync="displayStatus.emailRegisterAccount" :append-body="false" class="register-accout">
            <h4>{{$t('message.PopRegister')}}</h4>
            <div class="input-wrap">
                <label>{{$t('message.PopEmail')}}</label>
                <input type="text" v-model.trim="formData.email" :placeholder="$t('message.PopRegisterEmail')">
            </div>
            <div class="input-wrap">
                <label>{{$t('message.PopGraphic')}}</label>
                <div class="input-flex">
                    <input type="text" v-model="formData.picCode" :placeholder="$t('message.PopGraphicEnter')">
                    <img :src="$window.SERVERPATH + '/open/pic_captcha?type=REGISTER&macCode=' + macCode" alt="" @click="getImgCode('REGISTER')" ref="imgcode">
                </div>
            </div>
            <div class="input-wrap">
                <label>{{$t('message.PopCaptcha')}}</label>
                <div class="input-flex">
                    <input type="text" v-model="formData.captcha" :placeholder="$t('message.PopInputCaptcha')">
                    <AEFcountDownBtn v-model="captchaDisabled" @click.native="getEmailCode('REGISTER')"></AEFcountDownBtn>
                </div>
            </div>
            <div class="input-wrap">
                <label>{{$t('message.PopPassword')}}</label>
                <input type="password" v-model="formData.password" :placeholder="$t('message.PopPasswordPlaceholder')">
            </div>
            <div class="input-wrap">
                <label>{{$t('message.PopPasswordConfirm')}}</label>
                <input type="password" v-model="formData.password2" :placeholder="$t('message.PopPassword2Placeholder')">
            </div>
            <!-- 邀请码 -->
            <div class="input-wrap">
                <label>{{$t('message.PopInviteCode')}}</label>
                <input type="text" v-model="formData.inviteCode" :placeholder="$t('message.PopInviteCodePlaceholder')">
            </div>
            <button class="primary-btn" @click="registerDo('email')">{{$t('message.PopRegister')}}</button>
            <p><a href="javascript:;" @click="displayStatus.registerAccount = true; displayStatus.emailRegisterAccount = false">{{$t('message.PopPhoneRegister')}}</a></p>
            <i class="close-btn" @click="displayStatus.emailRegisterAccount = false"></i>
        </mu-dialog>
        <!-- 找回密码 -->
        <mu-dialog :open.sync="findPassword" :append-body="false" class="register-accout">
            <h4>{{$t('message.PopFindPass')}}</h4>
            <div class="input-wrap" v-show="formData.resetType == 'PHONE'">
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
            <div class="input-wrap" v-show="formData.resetType == 'EMAIL'">
                <label>{{$t('message.PopEmail')}}</label>
                <input type="text" v-model.trim="formData.email" :placeholder="$t('message.PopRegisterEmail')">
            </div>

            <div class="input-wrap">
                <label>{{$t('message.PopGraphic')}}</label>
                <div class="input-flex">
                    <input type="text" v-model="formData.picCode" :placeholder="$t('message.PopGraphicEnter')">
                    <img :src="$window.SERVERPATH + '/open/pic_captcha?type=CHANGE_PWD&macCode=' + macCode" alt="" @click="getImgCode('CHANGE_PWD')" ref="imgcode">
                </div>
            </div>

            <div class="input-wrap" v-show="formData.resetType == 'PHONE'">
                <label>{{$t('message.PopCaptcha')}}</label>
                <div class="input-flex">
                    <input type="text" v-model="formData.captcha" :placeholder="$t('message.PopInputCaptcha')">
                    <AEFcountDownBtn v-model="captchaDisabled" @click.native="getSMScode('CHANGE_PWD')"></AEFcountDownBtn>
                </div>
            </div>
            <div class="input-wrap" v-show="formData.resetType == 'EMAIL'">
                <label>{{$t('message.PopCaptcha')}}</label>
                <div class="input-flex">
                    <input type="text" v-model="formData.captcha" :placeholder="$t('message.PopInputCaptcha')">
                    <AEFcountDownBtn v-model="captchaDisabledEmail" @click.native="getEmailCode('CHANGE_PWD')"></AEFcountDownBtn>
                </div>
            </div>

            <div class="input-wrap">
                <label>{{$t('message.PopNewPassword')}}</label>
                <input type="password" v-model="formData.password" :placeholder="$t('message.PopPasswordPlaceholder')">
            </div>
            <div class="input-wrap">
                <label>{{$t('message.PopPasswordConfirm')}}</label>
                <input type="password" v-model="formData.password2" :placeholder="$t('message.PopPassword2Placeholder')">
            </div>
            <button class="primary-btn" @click="findPasswordDo">{{$t('message.PopConfirm')}}</button>
            <p>
                <a href="javascript:;" @click="switchFindPassword('EMAIL')" v-show="formData.resetType == 'PHONE'">{{$t('message.PopEmailFind')}}</a>
                <a href="javascript:;" @click="switchFindPassword('PHONE')" v-show="formData.resetType == 'EMAIL'">{{$t('message.PopPhoneFind')}}</a>
            </p>
            <i class="close-btn" @click="findPassword = false"></i>
        </mu-dialog>

        <!-- 分红池 -->
        <BPPopup v-model="displayStatus.bonusPools"></BPPopup>
        
        <!-- AB代币 -->
        <AbPopup v-model="displayStatus.abBancor"></AbPopup>

        <!-- <RegisterPop :registerAccount="displayStatus.registerAccount"></RegisterPop> -->
    </div>
</template>

<script>
/**
 * @param {String} type 传入steep为沉浸模式
 */
import {mapMutations, mapState} from "vuex"
import Md5 from "../../assets/js/md5.js"
import AEFcountDownBtn from "@/components/common/countDownBtn"
import VERIFY from "../../util/verify"
import ScrollNotice from "@/components/common/scrollNotice"
import RegisterPop from "@/components/account/register"
import MBheaderNav from "@/components/common/mobile/mb_header_nav"
import AbPopup from "@/components/common/ab_popup"
import BPPopup from "@/components/common/bonusPools_popup"
import LoginSelectPopup from "@/components/account/login_select_popup"
export default {
    props: {
        type: {
            default: "normal",
            type: String
        },
        notice: {
            default: true,
            type: Boolean
        }
    },
    data() {
        return {
            prefixs: ["+86", "+852", "+853", "+886", "+8801", "+8802", "+001", "+44", "+0061"],
            currentAddr: "",
            shadeOpacity: 1,
            findPassword: false,   //找回密码
            prefixMenu: false,
            displayStatus: {
                loginAccount: false,
                loginSelect: false,   //登录对话框
                registerAccount: false,  //手机注册账号
                emailRegisterAccount: false,  //邮箱注册账号
                bonusPools: false,   //分红池
                abBancor: false, //AB代币
            },
            loginForm: {
                "account": "",
                "password": "",
                "emailLogin": {
                    "email": ""
                },
                "loginPwd": "",
                "loginType": "Phone",
                "phoneLogin": {
                    "phone": "",
                    "prefix": "+86"
                }
            },
            formData: {
                phone: "",   //手机号
                inviteCode: "", //邀请码
                prefix: "+86",  //区号
                captcha: "",   //短信验证码
                password: "",  //密码
                password2: "",  //2次密码
                email: "",  //邮箱账号
                picCode: "",  //图形验证码
                resetType: "PHONE"  //找回密码type
            },
            countDownTimer: null,   //短信倒计时
            btnText: this.$t('message.PopGetCaptcha'),  //发送短信按钮文字
            s: 60,  //短信倒计时时间
            macCode: new Date().getTime(),
            captchaDisabled: false, //找回密码验证码倒计时（手机）
            captchaDisabledEmail: false,   //找回密码验证码倒计时（邮箱）
            isShowFoldMunu: false,
            bonusPoolsData: {}
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
    mounted() {
        this.bindScrollEvent()
        if(this.currentAddr == "" && this.storeCurrentAddr) {
            this.currentAddr = this.storeCurrentAddr.coinAddress
            if(this.storeCurrentAddr.token) {
                this.$store.dispatch('updateProperty')
            }
        }
    },
    watch: {
        type() {
            this.bindScrollEvent()
        },
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
        isShowLoginBox() {
            this.displayStatus.loginSelect = true
        },
        displayStatus: {
            handler: function() {
                this.formData = Object.assign(this.formData, {
                    phone: "",   //手机号
                    captcha: "",   //短信验证码
                    password: "",  //密码
                    password2: "",  //2次密码
                    email: "",  //邮箱账号
                    picCode: "", //图形验证码
                })
                this.loginForm.account = ""
                this.loginForm.password = ""
                this.captchaDisabled = false
                if(this.displayStatus.loginSelect) {
                    this.displayStatus.loginAccount = false   //登录对话框
                    this.displayStatus.registerAccount = false  //手机注册账号
                    this.displayStatus.emailRegisterAccount = false  //邮箱注册账号
                    this.findPassword = false

                }
                this.isShowFoldMunu = false
            },
            deep: true
        },
        storeCurrentAddr(newVal) {
            if(newVal.coinAddress) {
                this.currentAddr = newVal.coinAddress
            }
        },
    },
    methods: {
        // 切换地址
        currentAddrChange(addr) {
            console.log("地址切换了",addr)
            this.addressList.forEach(value => {
                if(value.coinAddress == addr) {
                    this.setCurrentAddr(value)
                    this.$store.dispatch('updateProperty')
                }
            })
        },
        getImgCode(type) {
            this.$refs.imgcode.src = this.$window.SERVERPATH + "/open/pic_captcha?type="+ type +"&macCode="+ this.macCode +"&" + Math.random();
        },
        //页面滚动事件
        bindScrollEvent() {
            let that = this
            if(this.type === "steep") {
                this.shadeOpacity = 0
                document.body.onscroll = function(e) {
                    that.shadeOpacity = this.scrollY/200
                }
            }
        },
        // 获取验证码
        getSMScode(type) {
            if(this.btnText != this.$t('message.PopGetCaptcha')) return
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
        registerDo(type) {
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
                    this.displayStatus.registerAccount = false
                    this.displayStatus.emailRegisterAccount = false
                    // 相当于直接登录
                    this.setUserInfo(res.result)
                }
            })
        },
        //登录
        loginDo() {
            const reg = /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/
            if(this.loginForm.account == "" || this.loginForm.password == "") {
                this.alert({
                    type: "info",
                    msg: this.$t('message.PopAccountPassEmpty')
                })
                return
            }
            if(reg.test(this.loginForm.account)) {
                this.loginForm.loginType = "Email"
                this.loginForm.emailLogin.email = this.loginForm.account
            }else {
                this.loginForm.loginType = "Phone"
                this.loginForm.phoneLogin.phone = this.loginForm.account
            }
            this.loginForm.loginPwd = Md5(this.loginForm.password)
            this.$http.post("/open/login", this.loginForm).then(res => {
                if(res.code == 200) {
                    this.alert({
                        type: "success",
                        msg: this.$t('message.loginSuccess')
                    })
                    this.displayStatus.loginAccount = false
                    this.setUserInfo(res.result)
                }
            })
        },
        findPasswordDo() {
            let obj = {
                "account": "",
                "captcha": this.formData.captcha,
                "pwd": Md5(this.formData.password),
                "resetType": this.formData.resetType
            }
            if(this.formData.resetType == "PHONE") {
                if(!this.verifyPhone()) return
                obj.account = this.formData.phone
            }else {
                if(!this.verifyEmail()) return
                obj.account = this.formData.email
            }
            if(!this.verifyPassword()) return
            this.$http.post("/open/password", obj).then(res => {
                if(res.code == "200") {
                    this.alert({
                        type: "success",
                        msg: res.msg
                    })
                    this.findPassword = false
                }
            })
        },
        switchFindPassword(type) {
            this.formData.resetType = type
            this.formData.picCode = ''
            this.formData.captcha = ''
            this.formData.phone = ''
            this.formData.email = ''
            this.formData.password = ''
            this.formData.password2 = ''
            this.getImgCode("CHANGE_PWD")
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
            if(this.formData.phone == "") {
                this.alert({
                    type: "info",
                    msg: this.$t('message.PopPhoneEmpty')
                })
                return false
            }
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
        //HD钱包登录
        hdLogin(type) {
            this.displayStatus.loginSelect = false
            if(window.web3) {
                // this.openConfirm({
                //     content: this.$t('message.PopHdLogin'),
                //     btn: [
                //         {
                //             text: this.$t('message.PopClose')
                //         }
                //     ]
                // })
                this.$store.dispatch("registerWeb3");
            }else {
                this.openConfirm({
                    content: this.$t('message.PopTipsDesc'),
                    btn: [
                        {
                            text: this.$t('message.PopInstallation'),
                            cb: () => {
                                this.openMetamask()
                            }
                        },
                        {
                            type: "high",
                            text: this.$t('message.PopAccountLogin'),
                            cb: () => {
                                if(type == "mobile") {
                                    this.$router.push('login')
                                }else {
                                    this.displayStatus.loginSelect = false
                                    this.displayStatus.loginAccount = true
                                }
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
                try {
                    window.app.openURLOnSystermBrowser(window.location.origin + "pdf/whitebook_en.pdf")
                } catch (error) {
                }
            }else {
                window.open("pdf/whitebook.pdf")
                try {
                    window.app.openURLOnSystermBrowser(window.location.origin + "/pdf/whitebook.pdf")
                } catch (error) {
                }
            }

        },
        //打开metamask教程
        openMetamask() {
            if(this.locale == "en-US") {
                window.open("pdf/metamask_en.pdf")
            }else {
                window.open("pdf/metamask.pdf")
            }
        },
        switchBonusPools() {
            this.displayStatus.bonusPools = !this.displayStatus.bonusPools
        },
        showLoginPopup() {
            this.displayStatus.loginAccount = true
            this.displayStatus.loginSelect = false
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
            userInfo: state => state.user.userInfo,
            isShowLoginBox: state => state.dialogs.loginBox,
            storeCurrentAddr: state => state.user.currentAddr,
            lastCurAddrPf: state => state.user.lastCurAddrPf,
            storeWeb3: state => state.web3Handler.web3
        }),
        addressList() {
            return this.$store.getters.getUserAddress
        }
    },
    components: {
        AEFcountDownBtn,
        ScrollNotice,
        RegisterPop,
        MBheaderNav,
        AbPopup,
        BPPopup,
        LoginSelectPopup
    },
    destroyed() {
        //销毁事件
        document.body.onscroll = null
    }
}
</script>

<style lang="less">
.headerbar {
    position: relative;
    width: 100%;
    z-index: 20181212;
    &.steep {
        position: fixed;
    }
    .header-shade {
        position: absolute;
        top: 0;
        left: 0;
        bottom: 0;
        width: 100%;
        background-color: #030014;
        z-index: -1;
    }
    .flex-wrap {
        display: flex;
        align-items: center;
        color: #fff;
        padding: 0px 0;
        margin: 0 auto;
    }
    .logo {
        img {
          height: 50px;
        }
    }
    menu {
        flex: 1;
        display: flex;
        align-items: center;
        margin: 0;
        padding: 0;
        a {
            position: relative;
            margin-left: 24px;
            font-size: 16px;
            color: #FEFEFE;
            line-height: 58px;
            padding: 0 5px;
            span {
                position: relative;
                z-index: 2;
            }
            &.router-link-active {
                color: #D3CDFF;
                border-bottom: 2px solid #D3CDFF;
            }
        }
    }
    .statusbar {
        display: flex;
        align-items: center;
        font-size: 14px;
        .address-select {
            overflow: hidden;
            .mu-input  {
                margin: 0;
                padding: 0 13px;
                background-color: #fff;
                width: 158px;
                height: 30px;
                border-radius: 15px;
                min-height: auto;
            }
        }
        .user-center {
            color: #fff;
            margin-left: 30px;
            position: relative;
            cursor: pointer;
            z-index: 1212;
            img {
                height: 27px;
                vertical-align: middle;
            }
            span {
                display: inline-block;
                font-size: 14px;
                vertical-align: middle;
                margin: 0 0 0 10px;
            }
            i {
                display: inline-block;
                width: 30px;
                height: 30px;
                background: url(../../../public/img/sanjiao.png) no-repeat center;
                background-size: 80%;
                vertical-align: middle;
                transition: all .2s;
            }
            .router-list {
                position: absolute;
                top: 30px;
                left: 0;
                width: 178px;
                background-color: #fff;
                display: none;
                a {
                    display: block;
                    line-height: 40px;
                    font-size: 16px;
                    color: #323232;
                    padding: 0 17px;
                    &.router-link-active {
                        background-color: #C7DAFF;
                    }
                    &:hover {
                        background-color: #C7DAFF;
                    }
                }
            }
            &:hover {
                i {
                    transform: rotate(180deg)
                }
                .router-list {
                    display: block;
                }
            }
        }
        .button {
            width: 64px;
            height: 30px;
            border-radius: 2px;
            line-height: 30px;
            color: #030014;
            text-align: center;
            font-weight: 700;
            margin-left: 20px;
            transition: all 2s;
            position: relative;
            z-index: 1;
            background-color: #FFC425;
            img {
                height: 15px;
                vertical-align: sub;
                margin-right: 10px;
            }
            &:hover {
                &:after {
                    opacity: 0;
                }
            }
        }
        // 语言按钮
        .language-select {
            position: relative;
            cursor: pointer;
            height: 60px;
            margin-left: 16px;
            .lang {
                display: block;
                img {
                    display: block;
                    width: 43px;
                    margin: 14px 0 0 14px;
                }
            }
            .pull {
                position: absolute;
                top: 60px;
                left: 0;
                display: none;
                background-color: #42385E;
                a {
                    display: block;
                    margin: 0;
                    padding: 10px 14px;
                    &:hover {
                        background-color: #52476F;
                    }
                    img {
                        display: block;
                        width: 43px;
                    }
                }
            }
            &:hover {
                .pull {
                    display: block;
                }
            }
        }
        .login {
            &.minscreen {
                background: url(../../../public/img/my/user_icon.png) no-repeat center;
                background-size: 100%;
                width: 30px;
                height: 30px;
                margin: 2px .2rem 0 .2rem;
            }
        }
    }
    .notice {
        font-size: 12px;
        color: #FFDE6F;
        text-align: center;
        background: url(../../../public/img/notice_bg.png) no-repeat center;
        background-size: cover;
        line-height: 30px;
        height: 30px;
        overflow: hidden;
        width: 100%;
        background:rgba(73,111,255,.2);
    }
    .mu-dialog-wrapper {
        padding: 30px;
        .mu-dialog-body {
            position: relative;
            background-color: #52476F;
            color: #CCBCF8;
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
        h4 {
            text-align: center;
            font-size: 20px;
        }
        .mu-dialog {
            max-width: initial !important;
            border-radius: 4px;
            overflow: hidden;
            .primary-btn {
                display: block;
                width: 300px;
                height: 40px;
                margin: 20px auto 0;
                color: #1A0D59;
                font-size: 16px;
                font-weight: 700;
                cursor: pointer;
                background-color: #FFC425;
                box-shadow:0px 0px 0px 0px rgba(199,218,255,0.75);
                border-radius:4px;
                border: none;
                &.hd {
                    background:linear-gradient(90deg,rgba(84,190,202,1),rgba(61,143,242,1));
                }
            }
        }
        &.login-accout {
            .mu-dialog-body {
                width: 420px;
                button {
                    margin-top: 40px;
                    
                }
            }
            h4 {
                margin-bottom: 60px;
            }
            input {
                display: block;
                width: 100%;
                background:#443A60;
                color: #8378A3;
                border: none;
                border-radius:4px;
                height: 40px;
                margin-top: 20px;
                text-align: center;
                font-size: 14px;
                outline: none;
            }
            .flex-wrap {
                display: flex;
                justify-content: space-between;
                font-size: 14px;
                margin-top: 40px;
                p {
                    color: #CCBCF8;
                    a {
                        color: #FFC425;
                    }
                }
            }
            
        }
        &.register-accout {
            h4 {
                margin-bottom: 40px;
            }
            .input-wrap {
                display: flex;
                align-items: center;
                font-size: 14px;
                margin-top: 20px;
                overflow: hidden;
                label {
                    width: 80px;
                }
                input {
                    flex: 1;
                    width: 60%;
                    height:40px;
                    background:#443A60;
                    border: none;
                    border-radius:4px;
                    padding: 0 10px;
                    color: #fff;
                    outline: none;
                }
                .input-flex {
                    flex: 1;
                    display: flex;
                    overflow: hidden;
                    a {
                        background-color: #5AA0EE;
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
                        background:#443A60;
                        border:none;
                        border-radius:4px;
                        .mu-menu {
                            line-height: 40px;
                            padding: 0 10px;
                            border-right: 1px solid #625681;
                            font-weight: 700;
                        }
                        input {
                            border: none;

                        }
                    }

                }

            }
            p {
                font-size: 14px;
                text-align: center;
                margin-top: 10px;
                a {
                    color: #CCBCF8;
                }
            }
            .primary-btn {
                margin: 40px auto 0;
                background-color: #FFC425;
            }
        }
    }
}
@media screen and (max-width: 800px){
    .headerbar {
        .logo {
            flex: 1;
        }
        .statusbar {
            .address-select {
                .mu-input  {
                    background-color: #434358;
                    margin: 0;
                    padding: 0 0 0 13px;
                    width: 140px;
                    height: 25px;
                    border-radius: 15px;
                    min-height: auto;
                    margin-top: 4px;
                    .mu-select-action {
                        color: #fff;
                    }
                }
            }
            .user-center {
                margin-left: 0;
            }
            // 语言按钮
            .lang {
                margin: 5px 10px 0 10px;
                img {
                    width: 24px;
                }
            }
        }
        .fold-menu {
            position: absolute;
            width: 100%;
            top: 80px;
            left: 0;
            padding: 0 20px;
            background-color: rgba(3,7,19,.9);
            ul {
                li {
                    line-height: 50px;
                    border-bottom: 1px solid #243FAB;
                    a {
                        position: relative;
                        margin-left: 24px;
                        font-size: 16px;
                        color: #FEFEFE;
                        line-height: 50px;
                        span {
                            position: relative;
                            z-index: 2;
                        }
                        &.router-link-active {
                            color: #fff;
                            text-shadow: 0 0 20px #1371FF;
                            -webkit-text-stroke: 0.2px #1371FF;
                            &:after {
                                content: "";
                                position: absolute;
                                left: -25%;
                                top: 0;
                                width: 150%;
                                height: 50px;
                                background: url(../../../public/img/btn_bg01.png) no-repeat center;
                                background-size: 100%;
                            }
                        }
                    }
                    .mu-input  {
                        margin: 0;
                        padding: 0 13px;
                        background-color: #fff;
                        width: 158px;
                        height: 30px;
                        border-radius: 15px;
                        min-height: auto;
                        margin-left: 20px;
                    }
                }
            }
            .lang-wrap {
                display: flex;
                justify-content: space-around;
                padding: 30px 0;
                .button {
                    width: 90px;
                    height: 30px;
                    border-radius: 15px;
                    line-height: 30px;
                    color: #fff;
                    text-align: center;
                    margin-left: 20px;
                    transition: all 2s;
                    position: relative;
                    z-index: 1;
                    img {
                        height: 15px;
                        vertical-align: sub;
                        margin-right: 10px;
                    }
                    &:hover {
                        &:after {
                            opacity: 0;
                        }
                    }
                    &.active {
                        &:after {
                            opacity: 0;
                        }
                    }
                    &:before {
                        position: absolute;
                        -ms-border-radius: 23px;
                        border-radius: 23px;
                        left: 0;
                        top: 0;
                        content: "";
                        width: 100%;
                        height: 100%;
                        z-index: -2;
                        opacity: 1;
                        transition: all .5s ease;
                        background-image: -webkit-linear-gradient(left,#46bdf4 0%,#2b56f5 100%);
                        background-image: linear-gradient(to right,#46bdf4 0%,#2b56f5 100%);
                    }
                    &:after {
                        position: absolute;
                        -ms-border-radius: 23px;
                        border-radius: 23px;
                        left: 2px;
                        top: 2px;
                        content: "";
                        width: calc(100% - 4px);
                        height: calc(100% - 4px);
                        z-index: -1;
                        opacity: 1;
                        background: #051276;
                        transition: all .5s ease;
                    }
                }
            }
        }
        .mu-dialog-wrapper {
            left: 0;
            bottom: 0;
            right: 0;
            top:0;
            .mu-dialog-body {
                padding: 10px;
                .primary-btn {
                    width: 100%;
                }
            }
            &.register-accout {
                h4 {
                    margin-bottom: 20px;
                }
                .input-wrap {
                    label {
                        width: 80px;
                    }
                }
            }
            &.login-select {
                .mu-dialog {
                    .primary-btn {
                        &.minscreen {
                            display: block;
                        }
                    }
                }
            }
        }
    }
}
</style>
