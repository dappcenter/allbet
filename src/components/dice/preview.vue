<template>
	<section class="module-preview">
		<div class="ctn ctn1">
			<h4>获胜机会</h4>
			<h3>{{this.betInfo.odds}}%</h3>
		</div>
		<div class="ctn ctn2">
			<h4>赢得投注</h4>
			<h3>1.96×</h3>
			<label class="">您将赢得<DigitaRoll :value="this.betInfo.amount*1.96"></DigitaRoll>以太幣</label>
			<p class="tip">1% 费用，0.001以太幣累积大奖</p>
		</div>
		<div class="ctn ctn3">
			<h4>大奖包括</h4>
			<h3><DigitaRoll :value="1000000"></DigitaRoll> <i>以太幣</i></h3>
			<label>幸运数字是888!</label>
		</div>
	</section>
</template>

<script>
import DigitaRoll from '@/components/common/digitalRoll'
export default {
	data() {
		return {

		}
	},
	mounted() {
	},
	computed: {
		betInfo() {
			return this.$store.getters.getBetRecordData
		}
	},
	components: {
		DigitaRoll
	}
}
</script>


<style lang="less">
.module-preview {
	flex: 1;
	text-align: center;
	.ctn {
		margin-top: 60px;
		h4 {
			margin-bottom: 10px;
			color: #fff;
			font-family: "San Francisco Display Thin";
			font-weight: 200;
			font-size: 18px;
		}
		h3 {
			line-height: 50px;
			color: white;
			font-weight: 200;
			font-size: 40px;
			i {
				font-size: 20px;
				font-style: normal;
			}
		}
		label {
			display: block;
			color: #6BDC6E;
			font-family: "San Francisco Display Thin";
			font-weight: 200;
			font-size: 18px;
		}
		.tip {
			color: lightgray;
			font-family: "San Francisco Display Thin";
			font-weight: 200;
			font-size: 14px;
			display: block;
			padding-top: 0.5em;
		}
	}
	.ctn1 {
		
	}
}
@media screen and (max-width: 800px){
	.module-preview {
		position: relative;
		margin-top: 20px;
		.ctn {
			margin: 0;
			display: inline-block;
			h4 {
				font-size: 14px;
			}
			h3 {
				font-size: 20px;
				line-height: normal;
				i {
					font-size: 14px;
				}
			}
			label {
				font-size: 14px;
			}
		}
		.ctn1 {
			position: absolute;
			left: 50%;
			margin-left: -30px;
			h4 {
				display: none;
			}
			h3 {
				background: rgba(255, 255, 255, 0.25);
				font-size: 13px;
				line-height: 60px;
				width: 60px;
				height: 60px;
				border-radius: 30px;
				box-shadow: 0 0 10px #2a365a;
			}
		}
		.ctn2 {
			width: 50%;
			text-align: left;
			vertical-align: top;
		}
		.ctn3 {
			width: 50%;
			text-align: right;
			vertical-align: top;
		}
	}
}
</style>