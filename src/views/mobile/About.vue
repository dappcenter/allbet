<template>
    <div class="about-page">
        <MBheaderBar :title="$t('message.MyAbout')"></MBheaderBar>
        <div class="main">
            <img class="logo" src="../../../public/img/LOGO.png" alt="">
            <ul class="menu">
                <a href="https://t.me/allbetAB">
                    <label>Telegram</label>
                    <i class="arrow"></i>
                </a>
                <a href="https://twitter.com/allbet10">
                    <label>Twitter</label>
                    <i class="arrow"></i>
                </a>
                <a href="https://weibo.com/6773769402/profile?rightmod=1&wvr=6&mod=personinfo">
                    <label>{{$t("message.MyWeibo")}}</label>
                    <i class="arrow"></i>
                </a>
                <a href="javascript:;" @click="openWeixinQR = true">
                    <label>{{$t("message.MyWeixin")}}</label>
                    <i class="arrow"></i>
                </a>
            </ul>
        </div>
        <mu-dialog :open.sync="openWeixinQR" :append-body="false">
            <img src="../../../public/img/weixin_qrcode.png" alt="">
        </mu-dialog>
    </div>
</template>

<script>
export default {
    data() {
        return {
            openWeixinQR: false
        }
    }
}
</script>


<style lang="less">
.about-page {
    background-color: #22202C;
    .main {
        .logo {
            display: flex;
            width: 2.6rem;
            margin: .6rem auto;
        }
        .menu {
            padding: 0 .4rem;
            a {
                display: flex;
                align-items: center;
                padding: 0 .42rem;
                height: 1.2rem;
                margin-top: .2rem;
                background-color: #49425C;
                border-radius: .04rem;
                .item-icon {
                    width: .32rem;
                }
                label {
                    flex: 1;
                    font-size: .3rem;
                    color: #CED0EA;
                }
                .arrow {
                    width: .14rem;
                    height: .28rem;
                    background: url(../../../public/img/my/youjiantou@2x.png) no-repeat center;
                    background-size: 100%;
                }
            }
        }
    }
    .mu-dialog-body {
        padding: 0;
        img {
            display: block;
            width: 4rem;
        }
    }
}
</style>
