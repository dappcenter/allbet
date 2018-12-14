<template>
    <div class="roker-page">
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
import Bet from "@/components/roker/bet"
import Record from "@/components/roker/record"
import FooterBar from "@/components/common/footer_bar"
export default {
    components: {
        HeaderBar,
        Bet,
        Record,
        FooterBar
    }
}
</script>
