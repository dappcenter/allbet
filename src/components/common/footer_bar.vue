<template>
    <div class="footerbar">
        <div class="content">
            <div class="top">
                <div class="logo">
                    <img src="../../../public/img/allbet01.png" alt="">
                </div>
                <div class="linklist">
                    <a href="javascript:;" @click="openWhiteBook" :data-text="$t('message.course')">
                        <img class="icon" src="../../../public/img/whitebook_icon.png" alt="">
                    </a>
                    <a href="https://twitter.com/allbet10" data-text="Twitter">
                        <img class="icon" src="../../../public/img/Twitter.png" alt="">
                    </a>
                    <a href="javascript:;" data-text="WeChat">
                        <img class="icon" src="../../../public/img/weixin_icon.png" alt="">
                        <div class="qrcode">
                            <img src="../../../public/img/weixin_qrcode.png" alt="">
                        </div>
                    </a>
                    <a href="https://weibo.com/6773769402/profile?rightmod=1&wvr=6&mod=personinfo" data-text="WeiBo">
                        <img class="icon" src="../../../public/img/Weibo.png" alt="">
                    </a>
                    <a href="https://t.me/allbetAB" data-text="Telegram">
                        <img class="icon" src="../../../public/img/Telegram.png" alt="">
                    </a>
                    <a href="https://www.facebook.com/bet.all.315" data-text="Facebook">
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
import {mapState} from "vuex"
export default {
    created() {
        
    },
    methods: {
        //打开白皮书
        openWhiteBook() {
            if(this.locale == "en-US") {
                window.open("pdf/whitebook_en.pdf")
                try {
                    window.app.openURLOnSystermBrowser(window.location.origin + "/pdf/whitebook_en.pdf")
                } catch (error) {
                }
            }else {
                window.open("pdf/whitebook.pdf")
                try {
                    window.app.openURLOnSystermBrowser(window.location.origin + "/pdf/whitebook.pdf")
                } catch (error) {
                }
            }

        },
    },
    computed: {
        ...mapState({
            web3: state => state.web3Handler.web3,
            locale: state => state.locale
        })
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
                    &:after {
                        content: attr(data-text);
                        position: absolute;
                        top: 45px;
                        left: 0;
                        font-size: 12px;
                        color: #D3CDFF;
                        border: 1px solid #D3CDFF;
                        padding: 2px 4px;
                        white-space: nowrap;
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
        padding: 0 .4rem;
        height: auto;
        .content {
            flex-wrap: wrap;
            height: auto;
            .top {
                padding: .4rem 0;
                .logo {
                    img {
                        height: .72rem;
                    }
                }
                .linklist {
                    display: flex;
                    justify-content: space-between;
                    width: 100%;
                    padding: 0 0 0 1.4rem;
                    a {
                        margin-right: 0;
                        .icon {
                            height: .42rem;
                            width: .42rem;
                        }
                    }
                }
            }
            
            p {
                width: 100%;
                text-align: left;
                padding: .4rem 0;
                font-size: .2rem;
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
