<template>
    <div class="headerbar" :class="type">
        <div class="container flex-wrap">
            <router-link tag="div" to="index" class="logo">
                <img src="../../../public/img/LOGO.png" alt="">
            </router-link>
            <menu>
                <router-link to="index">首页</router-link>
                <router-link to="roller">Dice</router-link>
                <a href="javascript:;">分红池</a>
                <a href="javascript:;">邀请</a>
                <a href="javascript:;">新手教程</a>
            </menu>
            <div class="statusbar">
                <div class="address-select">
                    <label>当前地址：</label>
                    <mu-select v-model="normal.value1">
                        <mu-option v-for="option,index in options" :key="option" :label="option" :value="option" :solo="true"></mu-option>
                    </mu-select>
                </div>
                <a href="javascript:;" class="button login">登录</a>
                <a href="javascript:;" class="button login"><img src="../../../public/img/CN.png" />CN</a>
            </div>
        </div>
        <div class="container notice">
            <p>公告：Allbet 开启交易排名赛（北京时间 9 月 27 日 23 点整至 30 日 22:59:59），排名前十玩家会获得 ETH 返奖！</p>
        </div>
        <div class="header-shade" :style="{'opacity': shadeOpacity}"></div>
    </div>
</template>

<script>
/**
 * @param {String} type 传入steep为沉浸模式
 */
export default {
    props: {
        type: {
            default: "normal",
            type: String
        }
    },
    data() {
        return {
            options: [
                '0xHDfasfdasdfjdiuhk', '0xHDdfagasdfajdiuhk'
            ],
            normal: {
                value1: '0xHDfasfdasdfjdiuhk'
            },
            shadeOpacity: 1
        }
    },
    mounted() {
        this.bindScrollEvent()
    },
    watch: {
        type() {
            this.bindScrollEvent()
        }
    },
    methods: {
        bindScrollEvent() {
            let that = this
            if(this.type === "steep") {
                this.shadeOpacity = 0
                document.body.onscroll = function(e) {
                    that.shadeOpacity = this.scrollY/200
                }
            }
        }
    },
    destroyed() {
        //销毁事件
        document.body.onscroll = null
    }
}
</script>


<style lang="less" scoped>
.headerbar {
    position: relative;
    width: 100%;
    z-index: 12;
    &.steep {
        position: fixed;
    }
    .header-shade {
        position: absolute;
        top: 0;
        left: 0;
        bottom: 0;
        width: 100%;
        background-color: #09135E;
        z-index: -1;
    }
    .flex-wrap {
        display: flex;
        align-items: center;
        color: #fff;
        padding: 10px 0;
        margin: 0 auto;
    }
    .logo {
        img {
          display: block;
          width: 40px;
          height: 40px;
        }
    }
    menu {
        flex: 1;
        display: flex;
        align-items: center;
        margin: 0;
        padding: 0;
        a {
            margin-left: 40px;
            font-size: 16px;
            color: #fff;
            &.router-link-active {
                color: #61C2FF;
            }
        }
    }
    .statusbar {
        display: flex;
        font-size: 14px;
        .address-select {
            label {
                
            }
            .mu-input  {
                margin: 0;
                padding: 0 13px;
                background-color: #fff;
                width: 198px;
                height: 30px;
                border-radius: 15px;
                min-height: auto;
            }
        }
        .button {
            width: 90px;
            height: 30px;
            border-radius: 15px;
            line-height: 30px;
            color: #fff;
            text-align: center;
            margin-left: 20px;
            transition: all 2s;
            position: relative;
            z-index: 1;
            img {
                height: 15px;
                vertical-align: sub;
            }
            &:hover {
                &:after {
                    opacity: 0;
                }
            }
            &:before {
                position: absolute;
                -ms-border-radius: 23px;
                border-radius: 23px;
                left: 0;
                top: 0;
                content: "";
                width: 100%;
                height: 100%;
                z-index: -2;
                opacity: 1;
                transition: all .5s ease;
                background-image: -webkit-linear-gradient(left,#46bdf4 0%,#2b56f5 100%);
                background-image: linear-gradient(to right,#46bdf4 0%,#2b56f5 100%);
            }
            &:after {
                position: absolute;
                -ms-border-radius: 23px;
                border-radius: 23px;
                left: 2px;
                top: 2px;
                content: "";
                width: calc(100% - 4px);
                height: calc(100% - 4px);
                z-index: -1;
                opacity: 1;
                background: #051276;
                transition: all .5s ease;
            }
        }
    }
    .notice {
        font-size: 12px;
        color: #FFDE6F;
        text-align: center;
        background: url(../../../public/img/notice_bg.png) no-repeat center;
        background-size: cover;
        line-height: 30px;
    }
}
@media screen and (max-width: 800px){
  
}
</style>
