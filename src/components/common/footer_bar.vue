<template>
    <div class="footerbar">
        <div class="container">
            <div class="linklist">
                <a href="https://twitter.com/allbet10">
                    <img class="icon" src="../../../public/img/Twitter.png" alt="">
                </a>
                <a href="javascript:;">
                    <img class="icon" src="../../../public/img/weixin_icon.png" alt="">
                    <div class="qrcode">
                        <img src="../../../public/img/weixin_qrcode.png" alt="">
                    </div>
                </a>
                <a href="https://weibo.com/6773769402/profile?rightmod=1&wvr=6&mod=personinfo">
                    <img class="icon" src="../../../public/img/Weibo.png" alt="">
                </a>
                <a href="https://t.me/allbetAB">
                    <img class="icon" src="../../../public/img/Telegram.png" alt="">
                </a>
                <a href="https://www.facebook.com/bet.all.315">
                    <img class="icon" src="../../../public/img/facebook.png" alt="">
                </a>
            </div>
            <p>Copyright © 2018.allbet.io</p>
        </div>
    </div>
</template>

<script>
export default {
    created() {
        
    },
    computed: {
        web3() {
            return this.$store.state.web3Handler.web3
        }
    }
}
</script>


<style lang="less">
.footerbar {
    background-color: #041527;
    height: 60px;
    .container {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin: 0 auto;
        height: 60px;
        .linklist {
            a {
                display: inline-block;
                margin-right: 40px;
                position: relative;
                .icon {
                    width: 30px;
                    height: 30px;
                }
                &:hover {
                    .qrcode {
                        display: block;
                    }
                }
                .qrcode {
                    position: absolute;
                    display: none;
                    img {
                        width: 170px;
                    }
                    bottom: 42px;
                    left: -67px;
                }
            }
            
        }
    }
    p {
        font-size: 16px;
        color: #fff;
    }
}
@media screen and (max-width: 800px){
    .footerbar {
        padding: 22px 0;
        height: auto;
        .container {
            flex-wrap: wrap;
            height: auto;
            .linklist {
                display: flex;
                justify-content: space-between;
                width: 100%;
                padding: 0 40px;
                a {
                    margin-right: 0;
                }
            }
            p {
                width: 100%;
                text-align: center;
                margin-top: 20px;
            }
        }
        
        ul {
            flex-wrap: wrap;
            padding-bottom: 30px;
            li {
                width: 50%;
                padding: 0;
                text-align: left;
                margin-top: 30px;
                &:nth-child(2n) {
                    text-align: right;
                }
            }
        }
    }
}
</style>
