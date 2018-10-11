<template>
    <div class="headerbar">
        <div class="container flex-wrap">
            <div class="logo">
                <img src="../../../public/img/LOGO.png" alt="">
            </div>
            <menu>
                <a href="javascript:;">首页</a>
                <a href="javascript:;">Dice</a>
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
    </div>
</template>

<script>
export default {
    data() {
        return {
            options: [
                '0xHDfasfdasdfjdiuhk', '0xHDdfagasdfajdiuhk'
            ],
            normal: {
                value1: '0xHDfasfdasdfjdiuhk'
            }
        }
    }
}
</script>


<style lang="less" scoped>
.headerbar {
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
            &.active {
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
            line-height: 26px;
            color: #fff;
            border: 2px solid #4373ed;
            text-align: center;
            margin-left: 20px;
            img {
                height: 15px;
                vertical-align: sub;
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
