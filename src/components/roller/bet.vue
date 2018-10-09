<template>
	<section class="module-bet">
		<h2>
			<span>过山车</span>
		</h2>
		<!-- 滑块 -->
		<div class="slider-wrap">
			<div class="slider" ref="slider">
				<div class="bar" ref="bar"></div>
				<div class="handle" @mousedown="onHandleTouchS" ref="handle"></div>
			</div>
			<div class="scale">
				<span>1%</span>
				<span>25%</span>
				<span>50%</span>
				<span>75%</span>
				<span>97%</span>
			</div>
			<p class="tip">调整您的胜率</p>
		</div>
		<!-- 下注 -->
		<div class="hotkeys">
			<span @click="onHotkeys(0.05)">0.05</span>
			<span @click="onHotkeys(0.10)">0.10</span>
			<span @click="onHotkeys(1.00)">1.00</span>
			<span @click="onHotkeys('max')">最大</span>
		</div>
		<div class="input-wrap">
			<span class="add" @click="onAdd"></span>
			<input type="number" v-model="amount">
			<span class="minus" @click="onMinus"></span>
		</div>
		<p class="tip">您的赌注</p>
		<button class="bet-btn">下注！</button>
		<p class="tip">建议的汽油价格(Gas Price): 14</p>
	</section>
</template>

<script>
import {mapMutations} from "vuex"
export default {
	data() {
		return {
			amount: 0.12,
			diceList: [
				{
					id: 1,
					value: 1,
					checked: true
				},
				{
					id: 2,
					value: 2,
					checked: false
				},
				{
					id: 3,
					value: 3,
					checked: false
				},
				{
					id: 4,
					value: 4,
					checked: false
				},
				{
					id: 5,
					value: 5,
					checked: false
				},
				{
					id: 6,
					value: 6,
					checked: false
				}
			],
			checkedNum: 1,
			odds: 1
		}
	},
	mounted() {

		this.setBetInfo({
			diceList: this.diceList,
			amount: this.amount
		})

		window.onmouseup = function() {
			window.onmousemove = null
		}

		this.setBetInfo({
			odds: 1
		})
	},
	methods: {
		onHotkeys(amount) {
			if(amount === 'max') {
				this.amount = 888
			}else {
				this.amount = amount.toFixed(2)
			}
		},
		onAdd() {
			this.amount = (Number(this.amount) + 0.01).toFixed(2)
		},
		onMinus() {
			this.amount = (Number(this.amount) - 0.01).toFixed(2)
		},
		...mapMutations({
			setBetInfo: "SET_ROLLER_BET_INFO"
		}),
		onHandleTouchS(e) {
			let that = this
			const sliderOffsetL = this.$refs.slider.offsetLeft
			const sliderWidth = this.$refs.slider.clientWidth - 20
			const ofX = e.offsetX
			let moveWidth = 0
			window.onmousemove = function(e) {
				moveWidth = e.clientX - sliderOffsetL - ofX
				moveWidth = moveWidth <= 0 ? 0 : (moveWidth >= sliderWidth ? sliderWidth : moveWidth)
				that.$refs.handle.style.left = moveWidth + "px"
				that.$refs.bar.style.width = moveWidth + "px"
				that.odds = (moveWidth / (sliderWidth / 97)).toFixed(2) < 1 ? 1 : (moveWidth / (sliderWidth / 97)).toFixed(2)
				that.setBetInfo({
					odds: that.odds,
					amount: that.amount
				})
			}
		}
	},
	watch: {
		diceList: {
			handler: function(newVal, oldVal) {
				this.setBetInfo({
					diceList: newVal,
					amount: this.amount
				})
			},
			deep: true
		},
		amount(newVal, oldVal) {
			this.setBetInfo({
				odds: this.odds,
				amount: newVal
			})
		}
	}
}
</script>

<style lang="less">
	.module-bet {
		width: 410px;
		text-align: center;
		-moz-user-select:none; /*火狐*/
		-webkit-user-select:none; /*webkit浏览器*/
		-ms-user-select:none; /*IE10*/
		-khtml-user-select:none; /*早期浏览器*/
		user-select:none;
		h2 {
			text-align: center;

			img {
				width: 30px;
				height: 30px;
				vertical-align: middle;
				margin-right: 10px;
			}

			span {
				font-weight: 400;
				font-size: 30px;
				vertical-align: middle;
			}
		}

		.slider {
			position: relative;
			background-color: #667ab7;
			height: 20px;
			box-shadow: inset 0 1px 0 #2a365a;
			border-radius: 5px;
			margin: 30px 50px 0px 50px;
			.handle {
				position: absolute;
				height: 38px;
				width: 20px;
				background: #ced4e8;
				border-radius: 5px;
				top: -9px;
				cursor: pointer;
			}
			.bar {
				background-color: lime;
				height: 20px;
				width: 0;
				top: 0;
				left: 0;
				border-top-left-radius: 5px;
				border-bottom-left-radius: 5px;
				opacity: 0.75;
				margin-right: 10px;
			}
			&:after {
				content: ' ';
				position: absolute;
				bottom: -5px;
				left: 5px;
				width: calc(100% - 10px);
				display: block;
				height: 5px;
				background: repeating-linear-gradient(to right, rgba(255, 255, 255, 0.35) 0, rgba(255, 255, 255, 0.35) 1px, transparent 1px, transparent 5px);
			}
		}
		.scale {
			display: flex;
			justify-content: space-between;
			margin: 10px 50px;
			span {

			}
		}

		.tip {
			text-align: center;
			color: #9a9898;
			font-size: 16px;
			margin-top: 20px;
		}

		.hotkeys {
			display: flex;
			width: 80%;
			margin: 40px auto 0;

			span {
				flex: 1;
				margin: 0 10px;
				width: 65px;
				line-height: 35px;
				border-radius: 6px;
				text-align: center;
				background-color: #5B74AE;
			}
		}

		.input-wrap {
			margin: 20px 0 0 0;

			input {
				background: none;
				border: 1px solid white;
				width: 215px;
				height: 75px;
				border-radius: 8px;
				line-height: 75px;
				text-align: center;
				vertical-align: middle;
				color: white;
				font-family: "Tex Gyre Cursor";
				font-weight: 200;
				font-size: 40px;
				-moz-appearance: textfield;

				&::-webkit-outer-spin-button,
				::-webkit-inner-spin-button {
					-webkit-appearance: none !important;
					margin: 0;
				}
			}

			span {
				border: none;
				text-align: center;
				display: inline-block;
				width: 65px;
				height: 75px;
				vertical-align: middle;
				-webkit-touch-callout: none;
				-webkit-user-select: none;
				color: #fff;
				font-family: "San Francisco Display Thin";
				font-weight: 200;
				font-size: 40px;
				
				&.add {
					background: url(../../../public/img/add.png) no-repeat center;
					background-size: 60%;
				}
				&.minus {
					background: url(../../../public/img/minus.png) no-repeat center;
					background-size: 60%;
				}
			}
		}

		.bet-btn {
			transition: background-position 1s ease, background-size 1s ease;
			background-image: linear-gradient(30deg, #00ffbd 0%, #4cc6d3 20%, #af7bf0 50%, #4cc6d3 80%, #00ffbd 100%);
			box-shadow: 0 0 30px 0 rgba(24, 31, 49, 0.5);
			background-size: 200% 100%;
			background-repeat: repeat;
			transform: translateZ(0);
			color: #fff;
			font-family: "San Francisco Display Thin";
			font-weight: 200;
			font-size: 35px;
			text-align: center;
			border: none;
			border-radius: 8px;
			width: 310px;
			height: 75px;
			cursor: pointer;
			margin-top: 40px;

			&:hover {
				background-position: 50% 0%;
				background-size: 800% 100%;
			}
		}
	}
	@media screen and (max-width: 800px){
		.module-bet {
			h2 {
				display: none;
			}
			.hotkeys {
				margin: 0;
				justify-content: space-around;
				width: 100%;
			}
			.tip {
				margin-top: 0;
			}
			.input-wrap {
				margin: 0;
				input {
					width: 182px;
					height: 35px;
					font-size: 30px;
					line-height: 35px;
				}
				span {
					width: 45px;
					box-sizing: border-box;
					padding: 0;
				}
			}
			.bet-btn {
				font-size: 25px;
				width: 100%;
				height: 50px;
				margin-top: 20px;
			}
		}
	}
</style>
