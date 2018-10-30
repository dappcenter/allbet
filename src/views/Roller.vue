<template>
    <div class="roller-page">
        <HeaderBar></HeaderBar>
        <div class="main" :style="{minHeight: $window.innerHeight - 150 + 'px'}">
            <Bet :diceStatistics="diceStatistics"></Bet>
			<Record @setDiceStatistics="setDiceStatistics"></Record>
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
            disabled: false,
            diceStatistics: {
                earned: "",
                guessCount: "",
                newcomers: []
            }
        }
    },
    methods: {
        setDiceStatistics(playload) {
            this.diceStatistics = playload || {
                earned: "",
                guessCount: "",
                newcomers: []
            }
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
        background: url(../../public/img/game_bg03.jpg) repeat-y top;
	    background-size: 100%;
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
