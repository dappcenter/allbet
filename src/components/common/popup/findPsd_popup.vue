<template>
    <mu-dialog :open.sync="isShow" :append-body="false" class="register-accout">
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
        <i class="close-btn" @click="isShow = false"></i>
    </mu-dialog>
</template>

<script>
import {mapState, mapMutations} from "vuex"
import AEFcountDownBtn from "@/components/common/countDownBtn"
import Md5 from "../../../assets/js/md5.js"
export default {
    props: {
        isShowHelp: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            isShow: false,
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
            captchaDisabledEmail: false,
            captchaDisabled: false,
            prefixs: ["+86", "+852", "+853", "+886", "+8801", "+8802", "+001", "+44", "+0061"],
            prefixMenu: false,
            macCode: new Date().getTime(),
        }
    },
    watch: {
        isShow(newVal) {
            if(!newVal) {
                this.$emit("change", newVal)
            }
            this.formData.resetType = "PHONE"
            this.formData.picCode = ''
            this.formData.captcha = ''
            this.formData.phone = ''
            this.formData.email = ''
            this.formData.password = ''
            this.formData.password2 = ''
        },
        isShowHelp(newVal) {
            if(newVal) {
                this.isShow = true
            }
        }
    },
    methods: {
        findPasswordDo() {
            let obj = {
                "account": "",
                "captcha": this.formData.captcha,
                "pwd": Md5(this.formData.password),
                "resetType": this.formData.resetType
            }
            if(this.formData.resetType == "PHONE") {
                if(!this.verifyPhone() || !this.verifyCaptcha()) return
                obj.account = this.formData.phone
            }else {
                if(!this.verifyEmail() || !this.verifyCaptcha()) return
                obj.account = this.formData.email
            }
            if(!this.verifyPassword()) return
            this.$http.post("/open/password", obj).then(res => {
                if(res.code == "200") {
                    this.alert({
                        type: "success",
                        msg: res.msg
                    })
                    this.isShow = false
                }
            })
        },
        getImgCode(type) {
            this.$refs.imgcode.src = this.$window.SERVERPATH + "/open/pic_captcha?type="+ type +"&macCode="+ this.macCode +"&" + Math.random();
        },
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
        ...mapMutations({
            alert: "alert"
        })
    },
    model: {
        prop: "isShowHelp",
        event: "change"
    },
    components: {
        AEFcountDownBtn
    }
}
</script>