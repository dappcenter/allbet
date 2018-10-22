<template>
    <div class="aef-countdownbtn">
        <button :disabled="disabled" :class="{'disabled' : disabled}">{{btnText}}</button>
    </div>
</template>

<script>
export default {
    props: {
        disabled: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            btnText: "获取验证码",
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
                this.btnText = "获取验证码"
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
                this.btnText = "获取验证码"
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
        line-height: 40px;
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
    }
}
</style>


