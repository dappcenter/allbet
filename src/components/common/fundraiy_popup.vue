<template>
    <mu-dialog :open.sync="isShow" :append-body="false" class="fundraiy-popup">
        <a href="javascript:;" class="close-btn" @click="isShow = false"></a>
        <h4>募资活动</h4>
        <input type="number" v-model="amount" placeholder="请输入">
        <button @click="send">确定</button>
        <p class="content">预售方案：<br />*合约地址：TKQAg1jg1cmyP7acxQRe4a9uXJ3SCyeEvJ<br />* 单次参与预售，不小于1000TRX<br />* 不接受交易所地址，否则您将接收不到AB<br />* 参与5万门槛预售的额外补偿5%AB，预计XXXX时间发放</p>
    </mu-dialog>
</template>

<script>
import {mapMutations} from "vuex"
export default {
    props: {
        isShowPopup: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            isShow: false,
            amount: ""
        }
    },
    mounted() {
        console.log(this.storeTronWeb)
    },
    computed: {
        storeTronWeb() {
            return this.$store.state.tronHandler.tronWeb
        }
    },
    methods: {
        send() {
            var that = this
            if(this.amount < 1000) {
                this.alert({
                    type: "info",
                    msg: "单次参与不能小于1000"
                })
                return
            }
            this.storeTronWeb.tronWebInstance.trx.sendTransaction("TKQAg1jg1cmyP7acxQRe4a9uXJ3SCyeEvJ", this.amount*1000000).then(res => {
				that.alert({
					type: "success",
					msg: "参与成功"
				})
			}).catch(err => {
				
			})
        },
        ...mapMutations({
            alert: "alert"
        })
    },
    watch: {
        isShow(newVal) {
            if(!newVal) {
                this.$emit("change", newVal)
            }
        },
        isShowPopup(newVal) {
            console.log(111)
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
.fundraiy-popup {
    z-index: 20181248 !important;
    .mu-dialog {
        width: 580px;
        border-radius: 6px;
        overflow: hidden;
    }
    .mu-dialog-body {
        position: relative;
        color: #CCBCF8;
        background: #52476F url(../../../public/img/ab_popup_bg.png) no-repeat bottom right;
        background-size: 40%;
        .close-btn {
            position: absolute;
            right: 20px;
            top: 20px;
            width: 25px;
            height: 25px;
            background: url(../../../public/img/close_icon01.png) no-repeat center;
            background-size: 100%;
        }
        .content {
            text-align: left;
        }

    }
}
</style>

