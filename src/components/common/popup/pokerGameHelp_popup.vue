<template>
    <mu-dialog width="600" :open.sync="isShow" :append-body="false" class="pokergamehelp-popup" :overlay-close="false">
        <a href="javascript:;" class="close-btn" @click="isShow = false"></a>
        <h4>{{$t("message.GameRule")}}</h4>
        <div class="content-text nominscreen" v-html="$t('message.GameHelp')" ref="contentText"></div>
        <div class="content-text minscreen" v-html="$t('message.GameHelpMobile')" ref="contentText"></div>
        <div class="btn-wrap">
            <button class="high" @click="isShow = false">{{$t("message.GameKnow")}}</button>
        </div>
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
            }else {
                setTimeout(() => {
                    if(this.$refs.contentText && !this.$IsPC()) {
                        this.scroll = new BScroll(this.$refs.contentText, {
                            click: true,
                            taps: true
                        })
                    }
                }, 1000)
            }
        },
        isShowHelp(newVal) {
            if(newVal) {
                this.isShow = true
            }
        }
    },
    model: {
        prop: "isShowHelp",
        event: "change"
    },
}
</script>

<style lang="less">
.pokergamehelp-popup {
    text-align: center;
    // overflow-y: scroll;
    // -webkit-overflow-scrolling: touch;
    .mu-dialog {
        border-radius: 4px;
        overflow: hidden;
        // position: absolute;
        // top: 10%;
    }
    .mu-dialog-body {
        position: relative;
        background: #52476F url(../../../public/img/ab_popup_bg.png) no-repeat bottom right;
        padding: 24px 24px 20px 24px;
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
        h4 {
            font-size: 20px;
            color: #fff;
        }
        .content-text {
            margin: 40px 0;
            font-size: 16px;
            text-align: center;
            color: #CCBCF8;
            word-break: break-all;
            height: 300px;
            overflow-y: scroll;
            -webkit-overflow-scrolling: touch;
            &::-webkit-scrollbar {/*滚动条整体样式*/
                    width: 8px;     /*高宽分别对应横竖滚动条的尺寸*/
                    height: 8px;
                }
            &::-webkit-scrollbar-thumb {/*滚动条里面小方块*/
                    border-radius: 10px;
                    background: transparent;
                }
            &::-webkit-scrollbar-track {/*滚动条里面轨道*/
                    border-radius: 10px;
                    background: transparent;
                }
            a {
                color: #CCBCF8;
                text-decoration: underline;
            }
        }
        .other {
            color: #C8C8C8;
            font-size: 14px;
            margin-bottom: 10px;
        }
    }
    .btn-wrap {
        display: flex;
        justify-content: space-around;
        button {
            width: 40%;
            height: 40px;
            text-align: center;
            border-radius: 4px;
            border: none;
            background-color: #FFC425;
            color: #1A0D59;
            font-weight: 700;
        }
    }
}
@media screen and (max-width: 800px){
    .gamehelp-popup {
        z-index: 20191212 !important;
        .mu-dialog {
            width: 90% !important;
            max-width: 95%;
            .mu-dialog-body {
                .content-text {
                    margin: .4rem 0;
                    font-size: .24rem;
                    overflow-y: hidden;
                }
            }
        }
        
    }
}
</style>
