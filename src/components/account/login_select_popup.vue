<template>
    <mu-dialog :open.sync="isShow" :append-body="false" class="login-select-popup">
        <h3>请登录 Chrome 插件钱包</h3>
        <div class="content-text" v-html="$t('message.PopLoginSelectETH')"></div>
        <button @click="isShow = false">确认</button>
        <p class="other">快速体验游戏，<a href="javascript:;">登录 / 注册</a></p>
        <i class="close-btn" @click="isShow = false"></i>
    </mu-dialog>
</template>

<script>
export default {
    props: {
        isShowPopup: {
            type: Boolean,
            default: false
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
            if(newVal) {
                this.isShow = true
            }
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
            a {
                color: #E3DFFF;
            }
        }
        button {
            display: block;
            background-color: #D3CDFF;
            border: none;
            outline: none;
            font-size: 16px;
            color: #1A0D59;
            width: 120px;
            height: 42px;
            border-radius: 2px;
            margin: 0 auto;
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
