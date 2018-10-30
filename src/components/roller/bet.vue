<template>
	<section class="module-roller-bet">
		<div class="mask"></div>
		<div class="game-status nominscreen">
			<div class="container">
				<p v-if="diceStatistics.newcomers.length > 0">{{$fmtAccount(diceStatistics.newcomers[0])}} {{$t("message.GameEnter")}}</p>
				<p v-else></p>
				<span>{{$t("message.GameTotalNumber")}}{{diceStatistics.guessCount}}</span>
				<span>{{$t("message.GameTotalIncome")}}{{diceStatistics.earned}} ETH</span>
			</div>
		</div>
		<div class="game-content" ref="gameContent">
			<div class="ctn-top">
				<div class="number-show">
					<div>
						<h3>{{odds}}</h3>
						<span>{{$t("message.GameForecast")}}</span>
					</div>
					<div>
						<h3 :class="luckyColor">{{luckyNum}}</h3>
						<span>{{$t("message.GameLucky")}}</span>
					</div>
				</div>
			</div>
			<!-- 赔率预览 -->
			<ul class="ctn-mdl">
				<li>
					<label>{{$t("message.GameOdds")}}</label>
					<span>{{Math.floor(peilv*1000) / 1000}}</span>
				</li>
				<li class="green">
					<label>{{$t("message.GameIncome")}}</label>
					<span>{{bonus}}</span>
				</li>
				<li>
					<label>{{$t("message.GameProbability")}}</label>
					<span>{{odds-1}}%</span>
				</li>
			</ul>
			<!-- 滑块 -->
			<div class="slider-wrap">
				<div class="scale">
					<span>1</span>
					<span>100</span>
				</div>
				<div class="slider" ref="slider">
					<div class="bar" ref="bar"></div>
					<div class="handle" @mousedown="onHandleTouchS" ref="handle"><i>{{odds}}</i></div>
				</div>
				
			</div>
			<div class="ctn-btm">
				<h4>{{$t("message.GameQiuz")}}<span class="fl">{{$t("message.Gameminimum")}} {{rule.minInvest}} ETH</span></h4>
				<div class="flex-wrap">
					<div class="input-wrap">
						<label>
							<!-- <img src="../../../public/img/eth_icon.png" alt=""> -->
						</label>
						<input type="text" v-model="amount">
						<div class="amount-handle">
							<span class="add" @click="onAdd"></span>
							<span class="minus" @click="onMinus"></span>
						</div>
					</div>
					<div class="hotkeys">
						<span @click="onHotkeys(0.05)">0.05</span>
						<span @click="onHotkeys(0.1)">0.1</span>
						<span @click="onHotkeys(0.15)">0.15</span>
						<span @click="onHotkeys('max')">MAX</span>
					</div>
				</div>
				<div class="bet-wrap">
					<span class="fl nominscreen"><img src="../../../public/img/eth_icon.png"><i v-if="currentAddr.token"><DigitalRoll :value="currentAddr.eth*1"></DigitalRoll></i><i v-else>0</i> ETH</span>
					<button v-if="currentAddr.token" class="enter" @click="betDo">{{$t("message.GameLuckNum")}}{{odds}}</button>
					<button v-else class="enter" @click="openLogin">{{$t("message.login")}}</button>
					<span class="fl minscreen"><img src="../../../public/img/eth_icon.png"><i v-if="currentAddr.token"><DigitalRoll :value="currentAddr.eth*1"></DigitalRoll></i><i v-else>0</i> ETH</span>
					<span class="fr"><img src="../../../public/img/at_icon.png"><i v-if="currentAddr.token"><DigitalRoll :value="currentAddr.bet*1"></DigitalRoll></i><i v-else>0</i> AB</span>
				</div>
			</div>
		</div>
		
	</section>
</template>

<script>
import DigitalRoll from "@/components/common/digitalRoll"
import {mapMutations, mapState} from "vuex"
import {RollerABI} from '../../util/constants/roller.abi'
import PollHttp from "../../util/pollHttp"
export default {
	props: {
		diceStatistics: {
			type: Object,
			default: () => {
				return {
					earned: "",
					guessCount: "",
					newcomers: []
				}
			}
		}
	},
    data() {
        return {
            amount: 0.1,
			odds: 50,
			rule: {},
			apiHandle: null,
			luckyColor: "green",
			luckyNum: "00",
			timer: null,
			getBetResultTimer: null
        }
	},
	created() {
		this.getRule()
		setTimeout(() => {
			if(!this.web3.web3Instance) return
			this.apiHandle = new this.web3.web3Instance.eth.Contract(RollerABI, "0x85f03a884c91fc57e3438532cda60fade63d6af3");
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
		// this.luckyRun()
    },
    methods: {
		//幸运数跳动
		luckyRun() {
			clearInterval(this.timer)
			this.timer = null
			this.timer = setInterval(() => {
				this.luckyNum = Math.floor(Math.random() * 89) + 10
				this.luckyColor = ["green", "red", "golden"][Math.floor(Math.random() * 2)]
			}, 50)
		},
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
			alert: "alert",
			openLogin: "OPEN_LOGIN",
			openWinPopup: "OPEN_WIN_POPUP"
        }),
        onHandleTouchS(e) {
            let that = this
			const sliderOffsetL = this.$refs.slider.offsetLeft + this.$refs.gameContent.offsetLeft
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
					this.luckyNum = res.result.lastLucky || "00"
				}
			})
		},
		//下注
		betDo() {
			if(this.timer) {
				this.alert({
					type: "info",
					msg: "上一轮还在开奖中，请稍等"
				})
				return
			}
			if(!/^\d+(\.\d+)?$/.test(this.amount)) {
				this.alert({
					type: "info",
					msg: "下注金额输入有误"
				})
				return
			}
			if(this.amount < this.rule.minInvest) {
				this.alert({
					type: "info",
					msg: "下注金额不能低于" + this.rule.minInvest + "ETH"
				})
				return
			}
			if(this.amount*1 > this.rule.maxInvest*1) {
				this.alert({
					type: "info",
					msg: "下注金额不能大于" + this.rule.maxInvest + "ETH"
				})
				return
			}

			this.$http.post("/app/dice/dice", {
				"coinAddress": this.currentAddr.coinAddress,
				"coinAmount": this.amount,
				"guessNum": this.odds
			}).then(res => {
				if(res.code == 200) {
					console.log(res)
					if(res.result.resultType == "DISPATCHER") {  //平台账号
						this.alert({
							type: "success",
							msg: res.msg
						})
						this.luckyRun()
						setTimeout(() => {
							clearInterval(this.timer)
							this.timer = null
							this.luckyColor = "green"
							this.luckyNum = res.result.diceResult.luckyNum
							this.$store.dispatch('updateProperty')
							if(res.result.diceResult.winFlag == "WIN") {
								this.openWinPopup({
									ab: res.result.diceResult.abNum,
									eth: res.result.diceResult.rewards
								})
							}
						}, 3000)
					}else {   //合约账号
						this.placeBet(this.odds, 100, res.result.commitLastBlock, res.result.commit, res.result.signData, this.amount, res.result.recdId)
					}
				}
			})
		},
		/**
		 * 调用合约下注
		 * @param {} rollUnder 下注的数值
		 */
		placeBet(rollUnder, modulo, commitLastBlock, commit, sigData, amount, recdId) {
			let that = this
			amount = this.web3.web3Instance.utils.toWei(amount+"", "ether")
			this.apiHandle.methods.placeBetV1(rollUnder, modulo, commitLastBlock, commit, sigData).send({
				from: this.currentAddr.coinAddress,
				value: amount,
				gas: 1000000
			}).on("receipt", function(receipt) {
				that.alert({
					type: "success",
					msg: "下注成功"
				})
				that.luckyRun()
				that.getBetResult(recdId)
			})
			.on("error", function(error) {
				that.alert({
					type: "error",
					msg: "下注失败"
				})
			});
		},
		//查询下注结果
		getBetResult(recdId) {
			this.getBetResultTimer = setInterval(() => {
				PollHttp({
					type: 'get',
					url: '/app/dice/dice/' + recdId,
					data: {}
				}).then(res => {
					if(res.code == 200) {
						if(res.result.tradeStatus == "DONE" || res.result.tradeStatus == "FAIL") {
							clearInterval(this.timer)
							this.timer = null
							clearInterval(this.getBetResultTimer)
							this.luckyColor = "green"
							if(res.result.tradeStatus == "DONE") {
								this.luckyNum = res.result.luckyNum
								this.$store.dispatch('updateProperty')
								if(res.result.winFlag == "WIN") {
									this.openWinPopup({
										ab: res.result.abNum,
										eth: res.result.rewards
									})
								}
							}
						}
					}else {
						clearInterval(this.timer)
						this.timer = null
						clearInterval(this.getBetResultTimer)
						this.luckyColor = "green"
					}
				}).catch(err => {
					clearInterval(this.timer)
					this.timer = null
					clearInterval(this.getBetResultTimer)
					this.luckyColor = "green"
					this.luckyNum = "00"
				})
			}, 1000)
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
			return 98.5/((this.odds*1).toFixed() - 1)
		},
		// 奖金
		bonus() {
			if((this.amount * this.peilv * 0.01) <= 0.0003) {
				return Math.floor((this.amount * this.peilv - 0.0003) * 1000) / 1000
			}else {
				return Math.floor(this.amount * this.peilv * 0.99 * 1000) / 1000
			}
		}
	},
	components: {
		DigitalRoll
	},
	destroyed() {
		clearInterval(this.timer)
		this.timer = null
		this.luckyColor = "green"
		this.luckyNum = "00"
	}
}
</script>

<style lang="less">
	.module-roller-bet {
		position: relative;
		text-align: center;
		-moz-user-select:none; /*火狐*/
		-webkit-user-select:none; /*webkit浏览器*/
		-ms-user-select:none; /*IE10*/
		user-select:none;
		background: url(../../../public/img/bg.jpg) repeat left;
		background-size: 200px;
		overflow: hidden;
		.mask {
			position: absolute;
			width: 100%;
			height: 100%;
			background: -webkit-linear-gradient(rgba(0, 0, 0, 0.5), transparent, rgba(0, 0, 0, 0.9)); /* Safari 5.1 - 6.0 */
			background: -o-linear-gradient(rgba(0, 0, 0, 0.5), transparent, rgba(0, 0, 0, 0.9)); /* Opera 11.1 - 12.0 */
			background: -moz-linear-gradient(rgba(0, 0, 0, 0.5), transparent, rgba(0, 0, 0, 0.9)); /* Firefox 3.6 - 15 */
			background: linear-gradient(rgba(0, 0, 0, 0.5), transparent, rgba(0, 0, 0, 0.9)); /* 标准的语法（必须放在最后） */
		}
		.game-status {
			background-color: #0A1536;
			div {
				display: flex;
				line-height: 40px;
				color: #fff;
				p {
					flex: 1;
					text-align: left;
				}
				span {
					margin-left: 40px;
				}
			}
			
		}
		.game-content {
			position: relative;
			z-index: 2;
			width: 700px;
			margin: 60px auto;
			border-radius:6px;
			padding: 20px;
			.ctn-top {
				background: url(../../../public/img/game_bg02.png) no-repeat center;
				background-size: 100% 100%;
				overflow: hidden;
				border-radius:6px;
				.number-show {
					display: flex;
					justify-content: space-between;
					div {
						flex: 1;
						position: relative;
						h3 {
							font-size: 72px;
							text-shadow: 0 0 10px #fff;
							&.green {
								color: #99FF7E;
							}
							&.red {
								color: #c33;
							}
							&.golden {
								color: #FFDB5B;
							}
						}
						span {
							font-size: 16px;
							position: relative;
							top: -17px;
						}
						&:nth-child(1) {
							&:after {
								content: "";
								position: absolute;
								top: 20%;
								right: 0;
								height: 60%;
								width: 1px;
								background-color: #476FCA;
								box-shadow: 0 0 5px #476FCA;
							}
						}
					}
				}
			}
			.ctn-mdl {
				display: flex;
				background: url(../../../public/img/game_bg02.png) no-repeat center;
				background-size: 100% 100%;
				margin: 10px 0 0 0;
				border-radius:6px;
				padding: 10px 0;
				li {
					flex: 1;
					position: relative;
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
					&:nth-child(1),&:nth-child(2) {
						&:after {
							content: "";
							position: absolute;
							top: 20%;
							right: 0;
							height: 60%;
							width: 1px;
							background-color: #476FCA;
							box-shadow: 0 0 5px #476FCA;
						}
					}
					&.green {
						color: #99FF7E !important;
						text-shadow: 0px 0px 6px #99FF7E !important;
					}
				}
			}
			.ctn-btm {
				margin-top: 20px;
				padding: 0 10px;
				h4 {
					color: #C0CBFF;
					text-align: left;
					width: 340px;
					span {
						float: right;
					}
				}
				.flex-wrap {
					display: flex;
					.input-wrap {
						display: flex;
						background-color: #1D44B6;
						height: 40px;
						border-radius: 6px;
						overflow: hidden;
						margin: 0 0 0 3px;
						label {
							width: 40px;
							background: url(../../../public/img/eth_icon.png) no-repeat center;
							background-size: 60%;
						}
						input {
							width: 260px;
							height: 100%;
							background-color: transparent;
							border: none;
							color: #FEFEFE;
							text-align: center;
							outline: none;
							border-left: 1px solid #4A78DC;
							border-right: 1px solid #4A78DC;
						}
						.amount-handle {
							width: 40px;
							span {
								display: block;
								height: 20px;
								cursor: pointer;
								&.add {
									background: url(../../../public/img/arrow_up.png) no-repeat center 13px;
									background-size: 20%;
								}
								&.minus {
									background: url(../../../public/img/arrow_down.png) no-repeat center 5px;
									background-size: 20%;
								}	
							}
						}
					}
					.hotkeys {	
						flex: 1;
						display: flex;
						align-items: center;
						height: 40px;
						margin-left: 20px;
						span {
							flex: 1;
							background-color: #0F2A77;
							color: #B6C3FF;
							font-size: 16px;
							line-height: 40px;
							margin-left: 10px;
							border-radius:6px;
							cursor: pointer;
						}
					}
				}
				.bet-wrap {
					display: flex;
					justify-content: space-between;
					align-items: center;
					margin-top: 30px;
					button {
						width: 300px;
						height: 40px;
						background-color: #346FEF;
						color: #fff;
						border: none;
						border-radius:4px;
						font-weight: 700;
					}
					span {
						flex: 1;
						font-size: 16px;
						text-align: left;
						img {
							width: 24px;
							vertical-align: top;
							margin-right: 10px;
						}
						i {
							color: #99FF7E;
							font-style: normal;
						}
						&.fr {
							text-align: right;
						}
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
		.slider-wrap {
			padding: 0 10px;
			margin-top: 30px;
			.scale {
				display: flex;
				justify-content: space-between;
				margin: 5px 0;
			}
			.slider {
				position: relative;
				background-color: #F3434B;
				height: 14px;
				box-shadow: inset 0 1px 0 #2a365a;
				border-radius: 7px;
				margin: 5px 0px 0px;
				.handle {
					position: absolute;
					height: 40px;
					width: 16px;
					background: #ced4e8;
					border-radius: 8px;
					top: -13px;
					left: 49%;
					cursor: pointer;
					i {
						position: absolute;
						top: -31px;
						left: -10px;
						color: #1F47A0;
						font-size: 17px;
						font-style: normal;
						width: 36px;
						height: 28px;
						background: url(../../../public/img/qipao.png) no-repeat center;
						background-size: 100%;
					}
				}
				.bar {
					background-color: lime;
					height: 14px;
					width: 50%;
					top: 0;
					left: 0;
					border-top-left-radius: 7px;
					border-bottom-left-radius: 7px;
					opacity: 0.75;
					margin-right: 10px;
					box-shadow: 0 0 10px #fff;
				}
				// &:after {
				// 	content: ' ';
				// 	position: absolute;
				// 	bottom: -5px;
				// 	left: 5px;
				// 	width: calc(100% - 10px);
				// 	display: block;
				// 	height: 5px;
				// 	background: repeating-linear-gradient(to right, rgba(255, 255, 255, 0.35) 0, rgba(255, 255, 255, 0.35) 1px, transparent 1px, transparent 5px);
				// }
			}
		}	
	}
	@media screen and (max-width: 800px){
		.module-roller-bet {
			.game-content {
				width: auto;
				margin: 10px auto;
				.slider-wrap {
					margin: 40px 0;
				}
				.ctn-btm {
					h4 {
						width: auto;
					}
					.flex-wrap {
						flex-wrap: wrap;
						.input-wrap {
							width: 100%;
							margin: 0;
							label {
							}
							input {
								flex: 1;
								font-size: 17px;
								width: 70%;
							}
						}
						.hotkeys {
							margin-left: 0;
							justify-content: space-between;
							width: 100%;
							margin-top: 10px;
							span {
								flex: initial;
								width: 24%;
								margin-left: 0;
							}
						}
					}
					.bet-wrap {
						flex-wrap: wrap;
						margin-top: 40px;
						.enter {
							width: 100%;
							margin-bottom: 18px;
						}
					}
				}
			}
			h2 {
				display: none;
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
