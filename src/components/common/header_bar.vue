<template>
    <div class="headerbar" :class="type">
        <div class="container flex-wrap">
            <router-link tag="div" to="index" class="logo">
                <img src="../../../public/img/LOGO.png" alt="">
            </router-link>
            <menu>
                <router-link to="index">{{$t("message.home")}}</router-link>
                <router-link to="roller">Dice</router-link>
                <a href="javascript:;">{{$t("message.bonusPool")}}</a>
                <router-link to="invite">{{$t("message.invitation")}}</router-link>
                <a href="javascript:;">{{$t("message.course")}}</a>
            </menu>
            <div class="statusbar">
                <div class="address-select" v-show="addressList.length > 0">
                    <label>{{$t("message.address")}}：</label>
                    <mu-select v-model="currentAddr">
                        <mu-option v-for="item,index in addressList" :key="index" :label="item.coinAddress" :value="item.coinAddress" :solo="true"></mu-option>
                    </mu-select>
                </div>
                <div class="user-center" v-show="storeCurrentAddr.userName">
                    <img src="../../../public/img/user_icon.png" alt="">
                    <span>{{storeCurrentAddr.userName}}</span>
                    <i></i>
                    <div class="router-list">
                        <router-link to="my-assets">{{$t("message.property")}}</router-link>
                        <router-link to="account-security">{{$t("message.accountSecurity")}}</router-link>
                        <a href="javascript:;" @click="removeUserInfo" v-show="userInfo.assets">{{$t("message.logout")}}</a>
                    </div>
                </div>
                <a href="javascript:;" class="button login" @click="loginSelect = true" v-show="addressList.length <= 0">{{$t("message.login")}}</a>
                <a href="javascript:;" class="button lang" @click="changeLanguage('zh-CN')" v-show="locale === 'en-US'"><img src="../../../public/img/CN.png" />CN</a>
                <a href="javascript:;" class="button lang" @click="changeLanguage('en-US')" v-show="locale === 'zh-CN'"><img src="../../../public/img/US.png" />EN</a>
            </div>
        </div>
        <div class="container notice">
            <p>公告：Allbet 开启交易排名赛（北京时间 9 月 27 日 23 点整至 30 日 22:59:59），排名前十玩家会获得 ETH 返奖！</p>
        </div>
        <div class="header-shade" :style="{'opacity': shadeOpacity}"></div>
        <!-- 登录选择 -->
        <mu-dialog :open.sync="loginSelect" :append-body="false" class="login-select">
            <h4>{{$t("message.login")}}</h4>    
            <img src="../../../public/img/github.png" alt="">
            <button @click="loginAccount = true;loginSelect = false">{{$t("message.accountLogin")}}</button>
            <button class="hd">{{$t("message.hdWalletLogin")}}</button>
            <p>{{$t("message.notRegister")}}<a href="javascript:;" @click="registerAccount = true;loginSelect = false">{{$t("message.nowRegister")}}</a></p>
        </mu-dialog>
        <!-- 账号登录 -->
        <mu-dialog :open.sync="loginAccount" :append-body="false" class="login-accout">
            <h4>{{$t("message.login")}}</h4>    
            <input type="text" v-model.trim="loginForm.account" placeholder="请输入您的手机号或者邮箱">
            <input type="password" v-model.trim="loginForm.password" placeholder="请输入您登录密码">
            <button @click="loginDo">{{$t("message.login")}}</button>
            <div class="flex-wrap">
                <p>没有账号？<a href="javascript:;" @click="registerAccount = true;loginAccount = false">现在注册</a></p>
                <p><a href="javascript:;">{{$t("message.forgetPassword")}}</a></p>
            </div>
        </mu-dialog>
        <!-- 手机注册账号 -->
        <mu-dialog :open.sync="registerAccount" :append-body="false" class="register-accout">
            <h4>注册</h4>    
            <div class="input-wrap">
                <label>账号</label>
                <div class="input-flex prefix">
                    <mu-menu cover :open.sync="prefixMenu">
                        <span color="primary">{{registerForm.prefix}}</span>
                        <mu-list slot="content">
                            <mu-list-item button v-for="item in prefixs" :key="item" @click="registerForm.prefix = item;prefixMenu = false">
                                <mu-list-item-title>{{item}}</mu-list-item-title>
                            </mu-list-item>
                        </mu-list>
                    </mu-menu>
                    <input type="text" v-model.trim="registerForm.phone" placeholder="请输入您的手机号码">
                </div>
            </div>
            <div class="input-wrap">
                <label>图形码</label>
                <div class="input-flex">
                    <input type="text" v-model="registerForm.picCode" placeholder="请输入图形验证码">
                    <img :src="$window.SERVERPATH + '/open/pic_captcha?type=REGISTER&macCode=macCode'" alt="" @click="getImgCode" ref="imgcode">
                </div>
            </div>
            <div class="input-wrap">
                <label>验证码</label>
                <div class="input-flex">
                    <input type="text" v-model="registerForm.captcha" placeholder="请输入短信验证码">
                    <a href="javascript:;" @click="getSMScode">{{registerForm.btnText}}</a>
                </div>
            </div>
            <div class="input-wrap">
                <label>密码</label>
                <input type="password" v-model="registerForm.loginPwd" placeholder="字母数字组成，不超过12位">
            </div>
            <div class="input-wrap">
                <label>确认密码</label>
                <input type="text" v-model="registerForm.loginPwd2" placeholder="请再次输入您的密码">
            </div>
            <button @click="registerDo('phone')">注册</button>
            <p><a href="javascript:;" @click="emailRegisterAccount = true; registerAccount = false">邮箱注册</a></p>
        </mu-dialog>
        <!-- 邮箱注册账号 -->
        <mu-dialog :open.sync="emailRegisterAccount" :append-body="false" class="register-accout">
            <h4>注册</h4>    
            <div class="input-wrap">
                <label>账号</label>
                <input type="text" v-model.trim="emailRegisterForm.phone" placeholder="请输入您的邮箱">
            </div>
            <div class="input-wrap">
                <label>图形码</label>
                <div class="input-flex">
                    <input type="text" v-model="emailRegisterForm.picCode" placeholder="请输入图形验证码">
                    <img :src="$window.SERVERPATH + '/open/pic_captcha?type=REGISTER&macCode=macCode'" alt="" @click="getImgCode" ref="imgcode">
                </div>
            </div>
            <div class="input-wrap">
                <label>验证码</label>
                <div class="input-flex">
                    <input type="text" v-model="emailRegisterForm.captcha" placeholder="请输入邮箱验证码">
                    <a href="javascript:;" @click="getEmailCode">{{emailRegisterForm.btnText}}</a>
                </div>
            </div>
            <div class="input-wrap">
                <label>密码</label>
                <input type="password" v-model="emailRegisterForm.loginPwd" placeholder="字母数字组成，不超过12位">
            </div>
            <div class="input-wrap">
                <label>确认密码</label>
                <input type="text" v-model="emailRegisterForm.loginPwd2" placeholder="请再次输入您的密码">
            </div>
            <button @click="registerDo('email')">注册</button>
            <p><a href="javascript:;" @click="registerAccount = true; emailRegisterAccount = false">手机注册</a></p>
        </mu-dialog>
        <!-- 找回密码 -->
        <mu-dialog :open.sync="findPassword" :append-body="false" class="register-accout">
            <h4>找回密码</h4>    
            <div class="input-wrap" v-show="findPsdForm.resetType == 'PHONE'">
                <label>手机号</label>
                <input type="text" v-model.trim="findPsdForm.account" placeholder="请输入您的手机号">
            </div>
            <div class="input-wrap" v-show="findPsdForm.resetType == 'EMAIL'">
                <label>邮箱号</label>
                <input type="text" v-model.trim="findPsdForm.account" placeholder="请输入您的邮箱账号">
            </div>

            <div class="input-wrap">
                <label>图形码</label>
                <div class="input-flex">
                    <input type="text" v-model="findPsdForm.picCode" placeholder="请输入图形验证码">
                    <img :src="$window.SERVERPATH + '/open/pic_captcha?type=REGISTER&macCode=macCode'" alt="" @click="getImgCode" ref="imgcode">
                </div>
            </div>

            <div class="input-wrap" v-show="findPsdForm.resetType == 'PHONE'">
                <label>验证码</label>
                <div class="input-flex">
                    <input type="text" v-model="findPsdForm.captcha" placeholder="请输入短信验证码">
                    <a href="javascript:;" @click="getEmailCode">{{findPsdForm.btnText}}</a>
                </div>
            </div>
            <div class="input-wrap" v-show="findPsdForm.resetType == 'EMAIL'">
                <label>验证码</label>
                <div class="input-flex">
                    <input type="text" v-model="findPsdForm.captcha" placeholder="请输入邮箱验证码">
                    <a href="javascript:;" @click="getEmailCode">{{findPsdForm.btnText}}</a>
                </div>
            </div>

            <div class="input-wrap">
                <label>新密码</label>
                <input type="password" v-model="findPsdForm.pwd" placeholder="字母数字组成，不超过12位">
            </div>
            <div class="input-wrap">
                <label>确认密码</label>
                <input type="text" v-model="findPsdForm.pwd2" placeholder="请再次输入您的密码">
            </div>
            <button @click="findPasswordDo">确定</button>
            <p>
                <a href="javascript:;" @click="findPsdForm.resetType = 'EMAIL'" v-show="findPsdForm.resetType == 'PHONE'">邮箱找回</a>
                <a href="javascript:;" @click="findPsdForm.resetType = 'PHONE'" v-show="findPsdForm.resetType == 'EMAIL'">手机号找回</a>
            </p>
        </mu-dialog>
    </div>
</template>

<script>
/**
 * @param {String} type 传入steep为沉浸模式
 */
import {mapMutations} from "vuex"
import Md5 from "../../../public/js/md5.js"
import { setTimeout } from 'timers';
export default {
    props: {
        type: {
            default: "normal",
            type: String
        }
    },
    data() {
        return {
            prefixs: ["+86", "+852", "+853", "+886", "+8801", "+8802", "+001", "+44", "+0061"],
            currentAddr: "",
            shadeOpacity: 1,
            loginSelect: false,   //登录对话框
            loginAccount: false,
            registerAccount: false,
            emailRegisterAccount: false,  //邮箱注册账号
            findPassword: true,   //找回密码
            prefixMenu: false,
            registerForm: {  //手机号注册
                "picCode": "",
                "captcha": "",
                "loginPwd": "",
                "loginPwd2": "",
                "phone": "",
                "prefix": "+86",
                "s": 60,
                "btnText": "获取验证码",
                "timer": null
            },
            emailRegisterForm: {  //邮箱注册
                "picCode": "",
                "captcha": "",
                "loginPwd": "",
                "loginPwd2": "",
                "email": "",
                "s": 60,
                "btnText": "获取验证码",
                "timer": null
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
            findPsdForm: {
                "account": "",
                "captcha": "string",
                "pwd2": "",
                "pwd": "string",
                "resetType": "PHONE",
                "prefix": "+86",
                "s": 60,
                "btnText": "获取验证码",
                "timer": null
            }
        }
    },
    mounted() {
        this.bindScrollEvent()

        if(this.currentAddr == "" && this.$store.state.user.currentAddr) {
            this.currentAddr = this.$store.state.user.currentAddr.coinAddress
        }

    },
    watch: {
        type() {
            this.bindScrollEvent()
        },
        addressList(newVal) {
            if(newVal.length > 0) {
                this.currentAddr = newVal[0].coinAddress
                this.setCurrentAddr(newVal[0])
            }
        },
        currentAddr(newVal) {
            this.addressList.forEach(value => {
                if(value.coinAddress == newVal) {
                    this.setCurrentAddr(value)
                }
            })
        },
        isShowLoginBox() {
            this.loginSelect = true
        }
    },
    methods: {
        getImgCode() {
            this.$refs.imgcode.src = this.$window.SERVERPATH + "/open/pic_captcha?type=REGISTER&macCode=macCode&" + Math.random();
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
        getSMScode(formData) {
            if(this.registerForm.btnText != "获取验证码") return
            if(this.registerForm.phone == "") {
                this.alert({
                    type: "info",
                    msg: "手机号码不能为空"
                })
                return
            }
            if(this.registerForm.picCode == "") {
                this.alert({
                    type: "info",
                    msg: "图像验证码不能为空"
                })
                return
            }
            this.registerSMScountDown()
            this.$http.post("/open/captcha", {
                "macCode": "macCode",
                "phone": this.registerForm.phone,
                "picCode": this.registerForm.picCode,
                "prefix": this.registerForm.prefix,
                "type": "REGISTER"
            }).then(res => {
                console.log(res)
                if(res.code != 200) {
                    clearTimeout(this.registerForm.timer)
                    this.registerForm.btnText = '获取验证码'
                }
            }).catch(err => {
                clearTimeout(this.registerForm.timer)
                this.registerForm.btnText = '获取验证码'
            })
        },
        //获取邮箱验证码
        getEmailCode() {
            if(this.emailRegisterForm.btnText != "获取验证码") return
            if(this.emailRegisterForm.email == "") {
                this.alert({
                    type: "info",
                    msg: "邮箱账号不能为空"
                })
                return
            }
            if(this.emailRegisterForm.picCode == "") {
                this.alert({
                    type: "info",
                    msg: "图像验证码不能为空"
                })
                return
            }
            this.emailRegisterCountDown()
            this.$http.post("/open/email_captcha", {
                "email": this.emailRegisterForm.email,
                "picCode": this.emailRegisterForm.picCode,
                "captchaType ": "REGISTER"
            }).then(res => {
                console.log(res)
                if(res.code != 200) {
                    clearTimeout(this.emailRegisterForm.timer)
                    this.emailRegisterForm.btnText = '获取验证码'
                }
            }).catch(err => {
                clearTimeout(this.emailRegisterForm.timer)
                this.emailRegisterForm.btnText = '获取验证码'
            })
        },
        // 发起注册
        registerDo(type) {
            let url = "/open/register/phone"
            let obj = this.registerForm
            if(type == "email") {
                url = "/open/register/email"
                obj = this.emailRegisterForm
            }
            if(type == "phone" && obj.phone == "") {
                this.alert({
                    type: "info",
                    msg: "手机号码不能为空"
                })
                return
            }
            if(type == "email" && obj.email == "") {
                this.alert({
                    type: "info",
                    msg: "邮箱账号不能为空"
                })
                return
            }
            if(obj.captcha == "") {
                this.alert({
                    type: "info",
                    msg: "验证码不能为空"
                })
                return
            }
            if(obj.loginPwd == "") {
                this.alert({
                    type: "info",
                    msg: "密码不能为空"
                })
                return
            }
            
            this.$http.post(url, obj).then(res => {
                console.log(res)
                if(res.code == 200) {
                    this.alert({
                        type: "success",
                        msg: res.msg
                    })
                    this.registerAccount = false
                    this.emailRegisterAccount = false
                    this.loginAccount = true
                }
            })
        },
        //短信验证码倒计时
        registerSMScountDown() {
            if(this.registerForm.s > 0) {
                this.registerForm.s--
                this.registerForm.btnText = this.registerForm.s + 's'
                this.registerForm.timer = setTimeout(this.registerSMScountDown, 1000);
            }else {
                this.registerForm.s = 60
                this.registerForm.btnText = '获取验证码'
            }
        },
        //邮箱验证码倒计时
        emailRegisterCountDown() {
            if(this.emailRegisterForm.s > 0) {
                this.emailRegisterForm.s--
                this.emailRegisterForm.btnText = this.emailRegisterForm.s + 's'
                this.emailRegisterForm.timer = setTimeout(this.emailRegisterCountDown, 1000);
            }else {
                this.emailRegisterForm.s = 60
                this.emailRegisterForm.btnText = '获取验证码'
            }
        },

        //登录
        loginDo() {
            const reg = /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/
            if(this.loginForm.account == "" || this.loginForm.password == "") {
                this.alert({
                    type: "info",
                    msg: "账号密码不能为空"
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
                        msg: res.msg
                    })
                    this.loginAccount = false
                    this.setUserInfo(res.result)
                }
            })
        },
        findPasswordDo() {
            console.log(this.findPsdForm)
            return
            this.$http.post("/open/password", this.findPsdForm).then(res => {
                console.log(res)
            })
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
        locale() {
            return this.$store.state.locale
        },
        addressList() {
            return this.$store.getters.getUserAddress
        },
        userInfo() {
            return this.$store.state.user.userInfo
        },
        isShowLoginBox() {
            return this.$store.state.dialogs.loginBox
        },
        storeCurrentAddr() {
            return this.$store.state.user.currentAddr
        }
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
        background-color: #09135E;
        z-index: -1;
    }
    .flex-wrap {
        display: flex;
        align-items: center;
        color: #fff;
        padding: 10px 0;
        margin: 0 auto;
    }
    .logo {
        img {
          display: block;
          width: 40px;
          height: 40px;
        }
    }
    menu {
        flex: 1;
        display: flex;
        align-items: center;
        margin: 0;
        padding: 0;
        a {
            margin-left: 24px;
            font-size: 16px;
            color: #fff;
            &.router-link-active {
                color: #61C2FF;
            }
        }
    }
    .statusbar {
        display: flex;
        font-size: 14px;
        .address-select {
            label {
                
            }
            .mu-input  {
                margin: 0;
                padding: 0 13px;
                background-color: #fff;
                width: 198px;
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
    .notice {
        font-size: 12px;
        color: #FFDE6F;
        text-align: center;
        background: url(../../../public/img/notice_bg.png) no-repeat center;
        background-size: cover;
        line-height: 30px;
    }
    .mu-dialog-wrapper {
        left: initial;
        bottom: initial;
        right: 40px;
        top: 40px;
        padding: 30px;
        h4 {
            text-align: center;
            color: #646464;
            font-size: 20px;
        }
        .mu-dialog {
            max-width: initial !important;
            button {
                display: block;
                width: 240px;
                height: 40px;
                margin-top: 20px;
                cursor: pointer;
                background:linear-gradient(90deg,rgba(100,180,239,1),rgba(57,94,236,1));
                box-shadow:0px 0px 0px 0px rgba(199,218,255,0.75);
                border-radius:4px;
                color: #fff;
                border: none;
                &.hd {
                    background:linear-gradient(90deg,rgba(84,190,202,1),rgba(61,143,242,1));
                }
            }
        }
        
        &.login-select {
            .mu-dialog {
                img {
                    display: block;
                    margin: 50px auto;
                    height: 100px;
                }
                
                p {
                    text-align: center;
                    margin-top: 40px;
                    a {
                        color: #5480D9;
                    }
                }
            }
        }
        &.login-accout {
            h4 {
                margin-bottom: 60px;
            }
            input {
                display: block;
                width: 100%;
                border:1px solid rgba(220,220,220,1);
                border-radius:4px;
                height: 40px;
                margin-top: 20px;
                text-align: center;
                font-size: 14px;
            }
            .flex-wrap {
                display: flex;
                justify-content: space-between;
                font-size: 14px;
                margin-top: 40px;
                p {
                    color: #969696;
                    a {
                        color: #5480D9;
                    }
                }
            }
            button {
                margin-top: 40px;
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
                label {
                    width: 60px;
                }
                input {
                    flex: 1;
                    height:40px;
                    background:rgba(255,255,255,1);
                    border:1px solid rgba(220,220,220,1);
                    border-radius:4px;
                    padding: 0 10px;
                }
                .input-flex {
                    flex: 1;
                    display: flex;
                    input {

                    }
                    a {
                        background:linear-gradient(90deg,rgba(100,180,239,1),rgba(57,94,236,1));
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
                        background:rgba(255,255,255,1);
                        border:1px solid rgba(220,220,220,1);
                        border-radius:4px;
                        .mu-menu {
                            line-height: 40px;
                            padding: 0 10px;
                            border-right: 1px solid rgba(220,220,220,1);
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
                    color: #5480D9;
                }
            }
            button {
                margin: 40px auto 0;
            }
        }
    }
}
@media screen and (max-width: 800px){
  
}
</style>
