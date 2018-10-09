<template>
    <div class="roller-page">
        <HeaderBar></HeaderBar>
        <div class="main">
            <Bet></Bet>
			<Preview :betInfo="betInfo"></Preview>
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
export default {
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
        Record
    }
}
</script>


<style lang="less">
.roller-page {
    margin: 0 auto;
    padding: 0 20px;
    max-width: 1600px;
    .main {
        display: flex;
        justify-content: space-around;
        padding: 20px;
        min-height: 1000px;
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
