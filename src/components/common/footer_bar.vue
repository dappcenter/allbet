<template>
    <div class="footerbar">
        <div class="container">
            <div class="linklist">
                <a href="javascript:;">
                    <img src="../../../public/img/Twitter.png" alt="">
                </a>
                <a href="javascript:;">
                    <img src="../../../public/img/Discord.png" alt="">
                </a>
                <a href="javascript:;">
                    <img src="../../../public/img/Weibo.png" alt="">
                </a>
                <a href="javascript:;">
                    <img src="../../../public/img/Telegram.png" alt="">
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
    background-color: #191B29;
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
                img {
                    width: 30px;
                    height: 30px;
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
