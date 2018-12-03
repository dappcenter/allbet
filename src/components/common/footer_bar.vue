<template>
    <div class="footerbar nominscreen">
        <div class="content">
            <div class="top">
                <div class="logo">
                    <img src="../../../public/img/allbet01.png" alt="">
                </div>
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
            </div>
            
            <p>The games provided by ALLBET are based on blockchain, fair and transparent. When you start playing these games, please note that online gambling and lottery is an entertainment vehicle 
and that it carries with it a certain degree of financial risk. Players should be aware of this risk, and govern themselves accordingly.</p>
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
    background-color: #030014;
    padding: 0 123px;
    .content {
        .top {
            display: flex;
            align-items: center;
            justify-content: space-between;
            margin: 0 auto;
            border-bottom: 1px solid #241F33;
            padding: 48px 0;
            .logo {
                img {
                    height: 72px;
                }
            }
        }
        
        .linklist {
            a {
                display: inline-block;
                margin-right: 30px;
                position: relative;
                .icon {
                    width: 42px;
                    height: 42px;
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
                    bottom: 52px;
                    left: -67px;
                }
            }
            
        }
    }
    p {
        font-size: 14px;
        color: #D3CDFF;
        padding: 39px 0;
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
