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
                <a href="javascript:;">{{$t("message.invitation")}}</a>
                <a href="javascript:;">{{$t("message.course")}}</a>
            </menu>
            <div class="statusbar">
                <div class="address-select">
                    <label>{{$t("message.address")}}：</label>
                    <mu-select v-model="normal.value1">
                        <mu-option v-for="option,index in options" :key="option" :label="option" :value="option" :solo="true"></mu-option>
                    </mu-select>
                </div>
                <a href="javascript:;" class="button login" @click="loginSelect = true">{{$t("message.login")}}</a>
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
            <input type="text" placeholder="请输入您的手机号或者邮箱">
            <input type="password" placeholder="请输入您登录密码">
            <button>{{$t("message.login")}}</button>
            <div class="flex-wrap">
                <p>没有账号？<a href="javascript:;" @click="registerAccount = true;loginAccount = false">现在注册</a></p>
                <p><a href="javascript:;">忘记密码</a></p>
            </div>
        </mu-dialog>
        <!-- 账号注册 -->
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
            <button @click="registerDo">注册</button>
            <p><a href="javascript:;">邮箱注册</a></p>
        </mu-dialog>
    </div>
</template>

<script>
/**
 * @param {String} type 传入steep为沉浸模式
 */
import {mapMutations} from "vuex"
export default {
    props: {
        type: {
            default: "normal",
            type: String
        }
    },
    data() {
        return {
            prefixs: ["+86", "+96", "+1234"],
            options: [
                '0xHDfasfdasdfjdiuhk', '0xHDdfagasdfajdiuhk'
            ],
            normal: {
                value1: '0xHDfasfdasdfjdiuhk'
            },
            shadeOpacity: 1,
            loginSelect: false,   //登录对话框
            loginAccount: false,
            registerAccount: false,
            prefixMenu: false,
            registerForm: {
                "picCode": "",
                "captcha": "",
                "loginPwd": "",
                "phone": "",
                "prefix": "+86",
                "s": 60,
                "btnText": "获取验证码",
                "timer": null
            }
        }
    },
    mounted() {
        this.bindScrollEvent()

    },
    watch: {
        type() {
            this.bindScrollEvent()
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
        getSMScode() {
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
        // 发起注册
        registerDo() {
            if(this.registerForm.phone == "") {
                this.alert({
                    type: "info",
                    msg: "手机号码不能为空"
                })
                return
            }
            if(this.registerForm.captcha == "") {
                this.alert({
                    type: "info",
                    msg: "短信验证码不能为空"
                })
                return
            }
            if(this.registerForm.loginPwd == "") {
                this.alert({
                    type: "info",
                    msg: "密码不能为空"
                })
                return
            }
            this.$http.post("/open/register/phone", this.registerForm).then(res => {
                console.log(res)
                if(res.code == 200) {
                    this.alert({
                        type: "success",
                        msg: res.msg
                    })
                    this.registerAccount = false
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
        ...mapMutations({
            changeLanguage: "CHANGE_LANGUAGE",
            alert: "alert"
        })
    },
    computed: {
        locale() {
            return this.$store.state.locale
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
            margin-left: 40px;
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
