<template>
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
                <img :src="$window.SERVERPATH + '/open/pic_captcha?type=REGISTER&macCode=' + macCode" alt="" @click="getImgCode" ref="imgcode">
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
            <label>{{$t('message.PopInviteCode')}}</label>
            <input type="text" v-model="formData.inviteCode" :placeholder="$t('message.PopInviteCodePlaceholder')">
        </div>
        <div class="input-wrap">
            <label>{{$t('message.PopPassword')}}</label>
            <input type="password" v-model="formData.password" :placeholder="$t('message.PopPasswordPlaceholder')">
        </div>
        <div class="input-wrap">
            <label>{{$t('message.PopPasswordConfirm')}}</label>
            <input type="password" v-model="formData.password2" :placeholder="$t('message.PopPassword2Placeholder')">
        </div>
        <button class="primary-btn" @click="registerDo('phone')">{{$t('message.PopRegister')}}</button>
        <p><a href="javascript:;" @click="displayStatus.emailRegisterAccount = true; displayStatus.registerAccount = false">{{$t('message.PopEmailRegister')}}</a></p>
    </mu-dialog>
</template>

<script>
import AEFcountDownBtn from "@/components/common/countDownBtn"
export default {
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
        }
    },
    components: {
        AEFcountDownBtn
    }
}
</script>


<style lang="less">

</style>

