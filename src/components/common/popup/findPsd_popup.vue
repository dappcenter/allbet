<template>
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
</template>

<script>
import {mapState} from "vuex"
import BScroll from 'better-scroll'
export default {
    props: {
        isShowHelp: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            bonusPoolsData: {},
            isShow: false
        }
    },
    watch: {
        isShow(newVal) {
            if(!newVal) {
                this.$emit("change", newVal)
            }
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
                    this.findPassword = false
                }
            })
        },
    },
    model: {
        prop: "isShowHelp",
        event: "change"
    },
}
</script>