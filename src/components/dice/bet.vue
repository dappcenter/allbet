<template>
	<section class="module-bet">
		<h2>
			<img src="../../../public/img/dice-6.png" alt="">
			<span>骰子</span>
		</h2>
		<ul>
			<li v-for="item,index in diceList" :class="{'checked' : item.checked}" @click="onDice(index)">
				<img src="../../../public/img/dice-6.png" alt="">
			</li>
		</ul>
		<p class="tip">选择骰子数来进行投注</p>
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
			checkedNum: 1
		}
	},
	mounted() {

		this.setBetInfo({
			diceList: this.diceList,
			amount: this.amount
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
		onDice(i) {
			if(this.checkedNum == 1 && this.diceList[i].checked) return;
			if(this.checkedNum < 5 || this.diceList[i].checked) {
				if(this.diceList[i].checked) {
					this.checkedNum --
				}else {
					this.checkedNum ++
				}
				this.diceList[i].checked = !this.diceList[i].checked
			}
		},
		onAdd() {
			this.amount = (Number(this.amount) + 0.01).toFixed(2)
		},
		onMinus() {
			this.amount = (Number(this.amount) - 0.01).toFixed(2)
		},
		...mapMutations({
			setBetInfo: "SET_DICE_BET_INFO"
		})
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
				diceList: this.diceList,
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

		ul {
			display: flex;
			justify-content: space-between;
			flex-wrap: wrap;
			width: 180px;
			margin: 10px auto;
			li {
				margin-top: 20px;
				img {
					display: block;
					width: 50px;
					margin: 0 auto;
					opacity: .3;
					transition: all .5s;
				}

				&.checked {
					img {
						opacity: 1;
					}
				}
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
