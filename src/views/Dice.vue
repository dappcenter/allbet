<template>
	<div class="dice-page">
		<HeaderBar type="steep"></HeaderBar>
		<div class="main">
			<Bet></Bet>
			<Preview :betInfo="betInfo"></Preview>
			<Record></Record>
		</div>
		<FooterBar ref="ft"></FooterBar>
	</div>
</template>

<script type="text/javascript">
import HeaderBar from "@/components/common/header_bar"
import Bet from "@/components/dice/bet"
import Preview from "@/components/dice/preview"
import Record from "@/components/dice/record"
import FooterBar from "@/components/common/footer_bar"
import { setInterval } from 'timers';
export default {
    computed: {
	    betInfo() {
		    return this.$store.getters.getBetRecordData
	    }
    },
    components: {
	    HeaderBar,
	    Bet,
	    Preview,
	    Record,
	    FooterBar
    }
};
</script>

<style lang="less">
	.dice-page {
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
		.dice-page {
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
