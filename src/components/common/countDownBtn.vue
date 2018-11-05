<template>
    <div class="aef-countdownbtn">
        <button :disabled="disabled" :class="{'disabled' : disabled}"><i v-show="disabled">{{btnText}}</i><i v-show="!disabled">{{$t('message.PopGetCaptcha')}}</i></button>
    </div>
</template>

<script>
/**
 * 获取短信码倒计时组件
 * @param {Boolean} model 按钮是否可点击
 * @author shanks
 * @date 2018-10-2
 */
export default {
    props: {
        disabled: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            btnText: this.$t('message.PopGetCaptcha'),
            s: 61,
            timer: null
        }
    },
    model: {
        prop: "disabled",
        event: "change"
    },
    watch: {
        disabled(newVal) {
            if(newVal) {
                this.start()
            }else {
                window.clearTimeout(this.timer)
                this.s = 61
                this.btnText = this.$t('message.PopGetCaptcha')
            }
        }
    },
    methods: {
        start() {
            window.clearTimeout(this.timer)
            if(this.s > 1) {
                this.s--
                this.btnText = this.s + "s"
                this.timer = window.setTimeout(this.start, 1000)
            }else {
                this.$emit("change", false)
                this.s = 61
                this.btnText = this.$t('message.PopGetCaptcha')
            }
        }
    }
}
</script>

<style lang="less">
.aef-countdownbtn {
    button {
        background: -webkit-gradient(linear, left top, right top, from(#64b4ef), to(#395eec));
        background: linear-gradient(90deg, #64b4ef, #395eec);
        -webkit-box-shadow: 0px 0px 0px 0px rgba(199, 218, 255, 0.75);
        box-shadow: 0px 0px 0px 0px rgba(199, 218, 255, 0.75);
        line-height: 36px;
        margin-left: 10px;
        width: 90px;
        text-align: center;
        font-size: 14px;
        color: #fff;
        border-radius: 4px;
        cursor: pointer;
        border: none;
        &.disabled {
            cursor: auto;
        }
        i {
            font-style: normal;
        }
    }
}
</style>
