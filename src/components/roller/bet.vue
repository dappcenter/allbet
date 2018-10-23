<template>
	<section class="module-bet">
		<div class="game-content">
			<div class="ctn-top">
				<div class="number-show">
					<div>
						<h3>{{odds}}</h3>
						<span>预测数</span>
					</div>
					<div>
						<h3 class="green">00</h3>
						<span>幸运数</span>
					</div>
				</div>
				<!-- 滑块 -->
				<div class="slider-wrap">
					<div class="scale">
						<span>1%</span>
						<span>25%</span>
						<span>50%</span>
						<span>75%</span>
						<span>100%</span>
					</div>
					<div class="slider" ref="slider">
						<div class="bar" ref="bar"></div>
						<div class="handle" @mousedown="onHandleTouchS" ref="handle"></div>
					</div>
					
				</div>
			</div>
			<!-- 赔率预览 -->
			<ul class="ctn-mdl">
				<li>
					<label>赔率</label>
					<span>{{peilv}}</span>
				</li>
				<li>
					<label>收益</label>
					<span>{{Math.floor((amount*peilv-amount)*1000) / 1000}}</span>
				</li>
				<li>
					<label>概率</label>
					<span>{{odds}}%</span>
				</li>
			</ul>
			<div class="ctn-btm">
				<h4>竞猜数量</h4>
				<div class="flex-wrap">
					<div class="hotkeys">
						<div class="input-wrap">
							<input type="number" v-model="amount">
							<span class="add" @click="onAdd"></span>
							<span class="minus" @click="onMinus"></span>
						</div>
						<span @click="onHotkeys(0.05)">0.05</span>
						<span @click="onHotkeys(0.1)">0.1</span>
						<span @click="onHotkeys(0.15)">0.15</span>
						<span @click="onHotkeys('max')">MAX</span>
					</div>
					<button class="enter" @click="betDo">猜小于{{odds}}</button>
				</div>
				<div class="tips">
					<span class="fl">最小下注数量为 {{rule.minInvest}} ETH</span>
					<span class="fr">建议 Gas Price：9</span>
					<span class="fr">余额：{{currentAddr.eth}} ETH</span>
				</div>
			</div>
			
		</div>
		
	</section>
</template>

<script>
import {mapMutations, mapState} from "vuex"
import {RollerABI} from '../../util/constants/roller.abi'
export default {
    data() {
        return {
            amount: 0.12,
			odds: 2,
			rule: {},
			apiHandle: null
        }
	},
	created() {
		this.getRule()
		setTimeout(() => {
			this.apiHandle = new this.web3.web3Instance.eth.Contract(RollerABI, "0xb438c100a035eb5a66b37a977b990fdde6168ad2");
		}, 2000)
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
                this.amount = this.rule.maxInvest
            }else {
                this.amount = amount
            }
        },
        onAdd() {
            this.amount = (Number(this.amount) + 0.01).toFixed(2)
        },
        onMinus() {
            this.amount = (Number(this.amount) - 0.01).toFixed(2)
        },
        ...mapMutations({
			setBetInfo: "SET_ROLLER_BET_INFO",
			alert: "alert"
        }),
        onHandleTouchS(e) {
            let that = this
            const sliderOffsetL = this.$refs.slider.offsetLeft
            const sliderWidth = this.$refs.slider.clientWidth - 20
            const ofX = e.offsetX
            let moveWidth = 0
            window.onmousemove = function(e) {
                moveWidth = e.clientX - sliderOffsetL - ofX
                moveWidth = moveWidth <= 2 ? 2 : (moveWidth >= sliderWidth ? sliderWidth : moveWidth)
                that.$refs.handle.style.left = moveWidth + "px"
                that.$refs.bar.style.width = moveWidth + "px"
                that.odds = (moveWidth / (sliderWidth / 98)).toFixed(2) < 2 ? 2 : (moveWidth / (sliderWidth / 98)).toFixed()
                that.setBetInfo({
                    odds: that.odds,
                    amount: that.amount
                })
            }
		},
		getRule() {
			this.$http.get('/app/dice/rule').then(res => {
				console.log(res)
				if(res.code == 200) {
					this.rule = res.result
				}
			})
		},
		//下注
		betDo() {
			this.$http.post("/app/dice/dice", {
				"coinAddress": this.currentAddr.coinAddress,
				"coinAmount": this.amount,
				"guessNum": this.odds
			}).then(res => {
				console.log(res)
				if(res.code == 200) {
					this.placeBet(this.odds, 100, res.result.commitLastBlock, res.result.commit, res.result.signData, this.amount)
				}
			})
		},
		/**
		 * 调用合约下注
		 * @param {} rollUnder 下注的数值
		 */
		placeBet(rollUnder, modulo, commitLastBlock, commit, sigData, amount) {
			let that = this
			amount = this.web3.web3Instance.utils.toWei(amount+"", "ether")
			console.log(rollUnder, modulo, commitLastBlock, commit, sigData)
			this.apiHandle.methods.placeBetV1(rollUnder, modulo, commitLastBlock, commit, sigData).send({
				from: this.currentAddr.coinAddress,
				value: amount
			}).on("receipt", function(receipt) {
				that.alert({
					type: "success",
					msg: "交易成功"
				})
			})
			.on("error", function(error) {
				that.alert({
					type: "error",
					msg: "交易失败"
				})
			});
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
	},
	computed: {
		...mapState({
			web3: state => state.web3Handler.web3,
			currentAddr: state => state.user.currentAddr
		}),
		peilv() {
			return Math.floor(98.5/((this.odds*1).toFixed() - 1)*1000) /1000
		}
	}
}
</script>

<style lang="less">
	.module-bet {
		text-align: center;
		-moz-user-select:none; /*火狐*/
		-webkit-user-select:none; /*webkit浏览器*/
		-ms-user-select:none; /*IE10*/
		user-select:none;
		background: url(../../../public/img/game_bg01.png) no-repeat center;
		background-size: cover;		
		overflow: hidden;
		.game-content {
			width: 700px;
			margin: 60px auto;
			background-color: #214AA4;
			border-radius:6px;
			padding: 20px;
			.ctn-top {
				background-color: #183F96;
				overflow: hidden;
				border-radius:6px;
				padding: 20px 40px;
				.number-show {
					display: flex;
					justify-content: space-between;
					div {
						width: 48%;
						height: 100px;
						background-color: #12388D;
						border-radius:6px;
						h3 {
							font-size: 36px;
							&.green {
								color: #99FF7E;
							}
						}
						span {
							font-size: 16px;
							
						}
					}
				}
			}
			.ctn-mdl {
				display: flex;

				background-color: #183F96;
				margin: 40px 0 0 0;
				border-radius:6px;
				padding: 10px 0;
				li {
					flex: 1;
					border-right: 1px solid #0E3282;
					&:last-child {
						border: none;
					}
					label {
						display: block;
					}
					span {
						font-size: 16px;
						font-weight: 700;
					}
				}
			}
			.ctn-btm {
				margin-top: 20px;
				h4 {
					color: #C0CBFF;
					text-align: left;
				}
				.flex-wrap {
					display: flex;
					.hotkeys {	
						flex: 1;
						display: flex;
						align-items: center;
						background-color: #183F96;
						height: 40px;
						border-radius:6px;
						margin-right: 20px;
						span {
							flex: 1;
							color: #B6C3FF;
							font-size: 16px;
						}
						.input-wrap {
							width: 120px;
							background-color: #244EAB;
							height: 34px;
							border-radius: 6px;
							overflow: hidden;
							margin: 0 0 0 3px;
							input {
								width: 100%;
								height: 100%;
								background-color: transparent;
								border: none;
								color: #FEFEFE;
								text-align: center;
								outline: none;
							}
						}
					}
					.enter {
						color: #614C00;
						font-weight: 700;
						height: 40px;
						background-color: #eac82e;
						border: none;
						border-radius:6px;
						width: 140px;
						cursor: pointer;
					}
				}
				.tips {
					font-size: 14px;
					color: #C0CBFF;
					margin-top: 10px;
					overflow: hidden;
					.fl {
						float: left;
					}
					.fr {
						float: right;
						margin-left: 40px;
					}
				}
			}
		}
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
			background-color: #F3434B;
			height: 14px;
			box-shadow: inset 0 1px 0 #2a365a;
			border-radius: 5px;
			margin: 20px 0px 0px;
			.handle {
				position: absolute;
				height: 30px;
				width: 16px;
				background: #ced4e8;
				border-radius: 5px;
				top: -9px;
				left: 2px;
				cursor: pointer;
			}
			.bar {
				background-color: lime;
				height: 14px;
				width: 2px;
				top: 0;
				left: 0;
				border-top-left-radius: 5px;
				border-bottom-left-radius: 5px;
				opacity: 0.75;
				margin-right: 10px;
				box-shadow: 0 0 10px #fff;
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
			margin: 10px 0;
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
