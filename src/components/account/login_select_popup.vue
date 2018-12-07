<template>
    <mu-dialog :open.sync="isShow" :append-body="false" class="login-select-popup">
        <h3>{{$t('message.PopLoginSelectTitle')}}</h3>
        <div class="content-text" v-html="$t('message.PopLoginSelect' + coinType)"></div>
        <button @click="isShow = false">{{$t('message.PopConfirm')}}</button>
        <p class="other">{{$t('message.PopLoginText1')}}<a href="javascript:;" @click="showLoginPopup">{{$t('message.login')}} / {{$t('message.PopRegister')}}</a></p>
        <i class="close-btn" @click="isShow = false"></i>
    </mu-dialog>
</template>

<script>
export default {
    props: {
        isShowPopup: {
            type: Boolean,
            default: false
        },
        showLoginPopup: {
            type: Function
        }
    },
    data() {
        return {
            isShow: false
        }
    },
    watch: {
        isShow(newVal) {
            if(!newVal) {
                this.$emit("change", newVal)
            }
        },
        isShowPopup(newVal) {
            this.isShow = newVal
        }
    },
    computed: {
        coinType() {
            return this.$store.state.user.coinType
        }
    },
    model: {
        prop: "isShowPopup",
        event: "change"
    }
}
</script>

<style lang="less">
.login-select-popup {
    border-radius:12px;
    .mu-dialog-body {
        position: relative;
        width: 480px;
        background:linear-gradient(140deg,rgba(122,113,189,1),rgba(146,94,199,1));
        h3 {
            text-align: center;
            font-size: 24px;
        }
        .content-text {
            margin: 50px 0;
            font-size: 14px;
            color: #E3DFFF;
            word-break: break-all;
            a {
                color: #E3DFFF;
                text-decoration: underline;
            }
        }
        button {
            display: block;
            border: none;
            outline: none;
            font-size: 16px;
            color: #FEFEFE;
            width: 120px;
            height: 42px;
            border-radius: 21px;
            margin: 0 auto;
            cursor: pointer;
            background:linear-gradient(90deg,rgba(175,163,255,1),rgba(199,144,255,1));
            box-shadow:0px 1px 3px 0px rgba(126,79,181,0.75);
        }
        .other {
            font-size: 12px;
            color: #422462;
            text-align: center;
            margin-top: 20px;
            a {
                color: #D3CDFF;
            }
        }
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
    
}
</style>
