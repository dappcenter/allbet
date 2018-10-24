<template>
    <div class="roller-page">
        <HeaderBar></HeaderBar>
        <div class="main" :style="{minHeight: $window.innerHeight - 150 + 'px'}">
            <Bet></Bet>
			<Record></Record>
        </div>
        <FooterBar></FooterBar>
    </div>
</template>

<script>
import HeaderBar from "@/components/common/header_bar"
import Bet from "@/components/roller/bet"
import Preview from "@/components/dice/preview"
import Record from "@/components/roller/record"
import FooterBar from "@/components/common/footer_bar"
import AEFcountDownBtn from "@/components/common/countDownBtn"

export default {
    data() {
        return {
            disabled: false
        }
    },
    computed: {
        betInfo() {
            return this.$store.state.roller.betInfo
        }
    },
    components: {
        HeaderBar,
        FooterBar,
        Bet,
        Preview,
        Record,
        AEFcountDownBtn
    }
}
</script>


<style lang="less">
.roller-page {
    margin: 0 auto;
    .main {
        background-color: #2F59B7;
    }
}
@media screen and (max-width: 800px) {
    .roller-page {
        .main {
            flex-direction: column;
            padding: 0;
            &>section {
                width: 100%;
            }
        }
    }
}
</style>
