<template>
    <mu-dialog :open.sync="registerAccount" :append-body="false" class="register-accout">
        <h4>{{$t('message.PopRegister')}}</h4>
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
                <img :src="$window.SERVERPATH + '/open/pic_captcha?type=REGISTER&macCode=' + macCode" alt="" @click="getImgCode" ref="imgcode">
            </div>
        </div>
        <!-- 短信\邮箱验证码 -->
        <div class="input-wrap">
            <label>{{$t('message.PopCaptcha')}}</label>
            <div class="input-flex">
                <input type="text" v-model="formData.captcha" :placeholder="$t('message.PopInputCaptcha')">
                <AEFcountDownBtn v-if="registerType == 'phone'" v-model="captchaDisabled" @click.native="getSMScode('REGISTER')"></AEFcountDownBtn>
                <AEFcountDownBtn v-else v-model="captchaDisabled" @click.native="getEmailCode('REGISTER')"></AEFcountDownBtn>
            </div>
        </div>
        <!-- 邀请码 -->
        <div class="input-wrap">
            <label>{{$t('message.PopInviteCode')}}</label>
            <input type="text" v-model="formData.inviteCode" :placeholder="$t('message.PopInviteCodePlaceholder')">
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
        <button class="primary-btn" @click="registerDo('phone')">{{$t('message.PopRegister')}}</button>
        <p>
            <a href="javascript:;" v-if="registerType == 'email'" @click="registerType = 'phone'">{{$t('message.PopPhoneRegister')}}</a>
            <a href="javascript:;" v-else @click="registerType = 'email'">{{$t('message.PopEmailRegister')}}</a>
        </p>
    </mu-dialog>
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
                resetType: "PHONE"  //找回密码type
            },
            macCode: new Date().getTime(),
            registerType: "phone",
            captchaDisabled: false,
            prefixMenu: false
        }
    },
    methods: {
        //刷新验证码
        getImgCode() {
            this.$refs.imgcode.src = this.$window.SERVERPATH + "/open/pic_captcha?type=REGISTER&macCode="+ this.macCode +"&" + Math.random();
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
                    this.getImgCode()
                }
            }).catch(err => {
                this.captchaDisabled = false
            })
        },
        //获取邮箱验证码
        getEmailCode(type) {
            if(!this.verifyEmail() || !this.verifyPicCode()) return
            this.captchaDisabled = true  //开始倒计时
            this.$http.get("/open/email_captcha", {
                params: {
                    "email": this.formData.email,
                    "picCode": this.formData.picCode,
                    "captchaType": type
                }
            }).then(res => {
                if(res.code != 200) {
                    this.captchaDisabled = false
                    this.getImgCode()
                }
            }).catch(err => {
                this.captchaDisabled = false
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
                    this.displayStatus.registerAccount = false
                    this.displayStatus.emailRegisterAccount = false
                    // 相当于直接登录
                    this.setUserInfo(res.result)
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
            alert: "alert"
        })
    },
    components: {
        AEFcountDownBtn
    }
}
</script>


<style lang="less">

</style>

