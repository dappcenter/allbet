<template>
    <div class="footerbar">
        <ul>
            <li>
                <h3>我们的游戏</h3>
                <router-link to="dice">投骰子</router-link>
                <router-link to="roller">过山车</router-link>
            </li>
            <li>
                <h3>区块链 & 朋友</h3>
                <a href="javascript:;">您的余额 {{web3.balance}} 以太幣</a>
                <a href="javascript:;">网络：Main net</a>
                <a href="javascript:;">智能合约</a>
            </li>
            <li>
                <h3>特色</h3>
                <a href="javascript:;">GitHub</a>
            </li>
            <li>
                <h3>联系我们</h3>
                <a href="javascript:;">Telegram</a>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    created() {
        this.$store.dispatch("registerWeb3")
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
    border-top: 1px solid #aaa;
    ul {
        display: flex;
        justify-content: center;
        li {
            width: 200px;
            padding: 30px;
            text-align: center;
            h3 {
                font-weight: 200;
                font-size: 16px;
            }
            a {
                display: block;
                font-size: 14px;
                color: #aaa;
                text-decoration: underline;
            }
        }
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
