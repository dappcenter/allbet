<template>
    <div class="roker-page">
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
import Bet from "@/components/poker/bet"
import Record from "@/components/poker/record"
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
