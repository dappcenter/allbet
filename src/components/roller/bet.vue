<template>
	<section class="module-roller-bet">
		<!-- <div class="mask"></div> -->
		<!-- 币种选择 -->
		<ul class="coin-select">
			<li class="online" :class="{'active' : coinType == 'ETH'}" @click="changeCoinType('ETH')">
				<img src="../../../public/img/coin/ETH.png" alt="">
				<span>ETH</span>
			</li>
			<li class="online" :class="{'active' : coinType == 'TRX'}" @click="changeCoinType('TRX')">
				<img src="../../../public/img/coin/TRX.png" alt="">
				<span>TRX</span>
			</li>
			<li class="not-online" :data-text="$t('message.BPSoon')">
				<img src="../../../public/img/coin/EOS.png" alt="">
				<span>EOS</span>
			</li>
			<li class="not-online" :data-text="$t('message.BPSoon')">
				<img src="../../../public/img/coin/AB.png" alt="">
				<span>AB</span>
			</li>
		</ul>
		<div class="game-content" ref="gameContent">
			<div class="ctn-top">
				<div class="bet-input">
					<p>{{$t('message.GameBetAmount')}}</p>
					<div class="flex-wrap">
						<div class="input-wrap">
							<label :class="{'eth': coinType == 'ETH','trx': coinType == 'TRX'}"></label>
							<input type="text" v-model="amount" oninput="value=value.replace(/[^0-9\.]/g,'')" onkeyup="value=value.replace(/[^0-9\.]/g,'')" onpaste="value=value.replace(/[^0-9\.]/g,'')" oncontextmenu="value=value.replace(/[^0-9\.]/g,'')">
							<span>{{coinType}}</span>
						</div>
						<div class="hotkeys">
							<span @click="onHotkeys('min')">MIN</span>
							<span @click="onHotkeys(0.5)">1/2</span>
							<span @click="onHotkeys(2)">2X</span>
							<span @click="onHotkeys('max')">MAX</span>
						</div>
					</div>
				</div>
				<div class="award">
					<p>{{$t('message.GamePlayOutWin')}}</p>
					<div>
						<img src="../../../public/img/coin/ETH.png" alt="" v-show="coinType == 'ETH'">
						<img src="../../../public/img/coin/TRX.png" alt="" v-show="coinType == 'TRX'">
						<span>{{bonus}}</span>
						<i>{{coinType}}</i>
					</div>
				</div>
			</div>
			<!-- 赔率预览 -->
			<ul class="ctn-mdl">
				<li>
					<label>{{$t('message.GameRUTW')}}</label>
					<span>{{odds}} <img src="../../../public/img/arrow_bottom.png" /></span>
				</li>
				<li>
					<label>{{$t("message.GameOdds")}}</label>
					<span>{{Math.floor(peilv*1000) / 1000}} x</span>
				</li>
				<li>
					<label>{{$t("message.GameProbability")}}</label>
					<span>{{odds-1}} <i style="font-size:31px; font-style: normal;">%</i></span>
				</li>
			</ul>
			<!-- 滑块 -->
			<div class="slider-wrap" @touchstart.prevent="">
				<div class="scale">
					<span>1</span>
					<span>100</span>
				</div>
				<div class="slider" ref="slider" @click.stop.self="onHandleClick" @touchstart.stop.self="onHandleTouchS">
					<div class="bar" ref="bar" @click="onHandleClick" @touchstart="onHandleTouchS"></div>
					<div class="handle" @mousedown.prevent="onHandleMouseD" @touchstart.prevent="onHandleTouchS" ref="handle"><i>{{odds}}</i></div>
				</div>
			</div>
			<div class="ctn-btm">
				<!-- 自动下注 -->
				<div class="auto-bet">
					<!-- <p>{{$t("message.GameStatus1")}}<a href="javascript:;">88</a>{{$t("message.GameStatus2")}}</p> -->
					<p class="nominscreen"></p>
					<div class="mid">
						<label>{{$t('message.GameAutoBet')}}</label>
						<span class="switch" :class="{'on' : autoBet}" @click="autoBet = !autoBet"></span>
						<i class="help" :data-text="$t('message.GameAutoBetHelp')"></i>
					</div>
					<a href="javascript:;" class="nominscreen rule" @click="isShowHelp = true">{{$t("message.GameHowToPlay")}}</a>
				</div>
				<div class="bet-wrap">
					<span class="fl nominscreen">
						<img src="../../../public/img/coin/ETH.png" v-show="coinType == 'ETH'">
						<img src="../../../public/img/coin/TRX.png" v-show="coinType == 'TRX'">
						<i v-if="userInfo.token && currentAddr.assets"><DigitalRoll :value="currentAddr.assets[coinType].amount*1"></DigitalRoll></i>
						<i v-else>0</i> {{coinType}}</span>
					<button v-if="userInfo.token" class="enter" @click="betDo">{{$t("message.GameLuckNum")}} {{odds}}</button>
					<!-- <button v-else-if="userInfo.token && coinType == 'TRX'" class="enter" @click="isShowFundraiy = true">正在募资</button> -->
					<button v-else class="enter" @click="openLogin">{{$t("message.login")}}</button>
					
					<span class="fl minscreen">
						<img src="../../../public/img/coin/ETH.png" v-show="coinType == 'ETH'">
						<img src="../../../public/img/coin/TRX.png" v-show="coinType == 'TRX'">
						<i v-if="userInfo.token && currentAddr.assets"><DigitalRoll :value="currentAddr.assets[coinType].amount*1"></DigitalRoll></i>
						<i v-else>0</i> {{coinType}}</span>
					<span class="fr"><img src="../../../public/img/coin/AB.png"><i v-if="userInfo.token"><DigitalRoll :value="currentAddr.bet*1"></DigitalRoll></i><i v-else>0</i> AB</span>
				</div>
			</div>
			<!-- 挖矿数量 -->
			<div class="dig-wrap">
				<img src="../../../public/img/ab_icon03.png" alt="">
				<div class="content">
					<h4>{{$t('message.GameBetToGet')}} {{(1/rule.winDig*amount).toFixed(3)}} AB</h4>
					<p>{{$t('message.GameHigGet')}} {{1/rule.winDig}} x AB </p>
					<span>{{$t('message.GameDigProportion')}}　 WIN 1 : {{1/rule.winDig}} 　  LOSE 1 : {{1/rule.failDig}}</span>
				</div>
				<i class="help nominscreen" @click="isShowABpopup = true"></i>
				<i class="help minscreen" @click="$router.push('ab')"></i>
			</div>
		</div>
		<!-- 游戏规则 -->
		<mu-dialog width="600" :open.sync="isShowHelp" :append-body="false" class="gamerule">
			<a href="javascript:;" class="close-btn" @click="isShowHelp = false"></a>
			<h4>{{$t("message.GameRule")}}</h4>
			<div class="content-text" v-html="$t('message.GameHelp')"></div>
			<div class="btn-wrap">
				<button class="high" @click="isShowHelp = false">{{$t("message.GameKnow")}}</button>
			</div>
		</mu-dialog>

		<mu-dialog :open.sync="openWeixinQR" :append-body="false">
            <img src="../../../public/img/weixin_qrcode.png" alt="">
        </mu-dialog>

		<!-- Ab弹框 -->
		<AbPopup v-model="isShowABpopup"></AbPopup>

		<!-- 募资弹框 -->
		<FundraiyPopup v-model="isShowFundraiy"></FundraiyPopup>
	</section>
</template>

<script>
import DigitalRoll from "@/components/common/digitalRoll"
import {mapMutations, mapState} from "vuex"
import {RollerABI} from '../../util/constants/roller.abi'
import PollHttp from "../../util/pollHttp"
import AbPopup from "@/components/common/ab_popup"
import FundraiyPopup from "@/components/common/fundraiy_popup"

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
			getBetResultTimer: null,
			maxNum: 96,
			isShowHelp: false,
			openWeixinQR: false,
			autoBet: false,
			isShowABpopup: false,
			isShowFundraiy: false
        }
	},
	created() {
		let that = this
		this.getRule()
		setTimeout(() => {
			if(!this.web3.web3Instance) return
			this.apiHandle = new this.web3.web3Instance.eth.Contract(RollerABI, window.ROLLERADDRESS);
		}, 2000)
		window.hd = {}

	},
    mounted() {
        this.setBetInfo({
            diceList: this.diceList,
            amount: this.amount
        })
        window.onmouseup = function() {
            window.onmousemove = null
		}
		window.ontouchend = function() {
            window.ontouchmove = null
        }
        this.setBetInfo({
            odds: 1
		})


		if(this.coinType == 'TRX') {
			this.isShowFundraiy = true
		}
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
			switch(amount) {
				case 'max': 
					this.amount = this.rule.maxInvest
					break;
				case 'min':
					this.amount = this.rule.minInvest
					break;
				case 0.5:
					this.amount = this.amount*0.5 < this.rule.minInvest ? this.rule.minInvest : this.amount*0.5
					break;
				case 2:
					this.amount = this.amount*2 > this.rule.maxInvest ? this.rule.maxInvest : this.amount*2
					break;
				default:
					this.amount = amount
					break;
			}
        },
        onAdd() {
            this.amount = (Number(this.amount) + 0.01).toFixed(2)
        },
        onMinus() {
            this.amount = (Number(this.amount) - 0.01).toFixed(2)
			if (this.amount < 0.01) {
				this.amount = 0.01
			}
        },
        ...mapMutations({
			setBetInfo: "SET_ROLLER_BET_INFO",
			alert: "alert",
			openLogin: "OPEN_LOGIN",
			openWinPopup: "OPEN_WIN_POPUP",
			openConfirm: "OPEN_CONFIRM",
			closePopup: "CLOSE_POPUP",
			changeCoinType: "CHANGE_COINTYPE"
		}),
		onHandleClick(e) {
			let moveWidth = e.offsetX
			const deductWidth = this.$refs.slider.clientWidth/100*(100-this.maxNum)
			const sliderWidth = this.$refs.slider.clientWidth - deductWidth
			moveWidth = moveWidth <= 2 ? 2 : (moveWidth >= sliderWidth ? sliderWidth : moveWidth)
			this.$refs.handle.style.left = moveWidth + "px"
			this.$refs.bar.style.width = moveWidth + 10 + "px"
			this.odds = (moveWidth / (sliderWidth / this.maxNum)).toFixed(2) < 2 ? 2 : (moveWidth / (sliderWidth / this.maxNum)).toFixed()
			this.setBetInfo({
				odds: this.odds,
				amount: this.amount
			})
		},
		onHandleMouseD(e) {
			let that = this
			const sliderOffsetL = this.$refs.slider.offsetLeft + this.$refs.gameContent.offsetLeft
			const deductWidth = this.$refs.slider.clientWidth/100*(100-this.maxNum)
            const sliderWidth = this.$refs.slider.clientWidth - deductWidth
			const ofX = e.offsetX
			let moveWidth = 0
            window.onmousemove = function(e) {
                moveWidth = e.clientX - sliderOffsetL - ofX
				moveWidth = moveWidth <= 2 ? 2 : (moveWidth >= sliderWidth ? sliderWidth : moveWidth)
                that.$refs.handle.style.left = moveWidth + "px"
                that.$refs.bar.style.width = moveWidth + 10 + "px"
                that.odds = (moveWidth / (sliderWidth / that.maxNum)).toFixed(2) < 2 ? 2 : (moveWidth / (sliderWidth / that.maxNum)).toFixed()
                that.setBetInfo({
                    odds: that.odds,
                    amount: that.amount
                })
			}
		},
        onHandleTouchS(e) {
            let that = this
			const sliderOffsetL = this.$refs.slider.offsetLeft + this.$refs.gameContent.offsetLeft
			const deductWidth = this.$refs.slider.clientWidth/100*(100-this.maxNum)
            const sliderWidth = this.$refs.slider.clientWidth - deductWidth
			const ofX = e.touches[0].clientX - this.$refs.handle.offsetLeft
			let moveWidth = 0
			window.ontouchmove  = function(e) {
                moveWidth = e.touches[0].clientX - sliderOffsetL
				moveWidth = moveWidth <= 2 ? 2 : (moveWidth >= sliderWidth ? sliderWidth : moveWidth)
                that.$refs.handle.style.left = moveWidth + "px"
				that.$refs.bar.style.width = moveWidth + 10 + "px"
                that.odds = (moveWidth / (sliderWidth / that.maxNum)).toFixed(2) < 2 ? 2 : (moveWidth / (sliderWidth / that.maxNum)).toFixed()
                that.setBetInfo({
                    odds: that.odds,
                    amount: that.amount
                })
            }
		},
		getRule() {
			this.$http.get('/app/dice/rule', {
				params: {
					coinAddress: this.currentAddr.coinAddress || "",
					coinType: this.coinType
				}
			}).then(res => {
				if(res.code == 200) {
					this.rule = res.result
					this.amount = res.result.minInvest
					this.luckyNum = res.result.lastLucky || "00"
				}
			})
		},
		//下注
		betDo() {
			let that = this
			if(!/^\d+(\.\d+)?$/.test(this.amount)) {
				this.alert({
					type: "info",
					msg: this.$t("message.GameAmountErr")
				})
				return
			}
			if(Number(this.amount) < this.rule.minInvest) {
				this.alert({
					type: "info",
					msg: this.$t("message.GameAmountTooLow") + this.rule.minInvest + "ETH"
				})
				return
			}
			if(this.amount*1 > this.rule.maxInvest*1) {
				this.alert({
					type: "info",
					msg: this.$t("message.GameAmountTooLarge") + this.rule.maxInvest + "ETH"
				})
				return
			}
			console.log("后台dice",new Date().getTime())
			this.$http.post("/app/dice/dice", {
				"coinAddress": this.currentAddr.assets[this.coinType].coinAddress,
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
						that.getBetResult(res.result.recdId)
					}else {   //合约账号
						this.alert({
							type: "info",
							msg: "Please Wait For Wallet to ConfirmTransfer...",
							timeout: 9999999
						})
						switch(res.result.coinType) {
							case "ETH":
								this.placeBet(this.odds, 100, res.result.commitLastBlock, res.result.commit, res.result.signData, this.amount, res.result.recdId)
								break;
							case "TRX":
								this.placeBetTRX(this.odds, res.result.recdId, this.amount)
								break;
						}
						//注册方法与原生交互
						window.hd.betFailed = function(payload) {
							that.alert({
								type: "info",
								msg: "User rejected the signature request.",
								timeout: 3000
							})
						}
						window.hd.betSuccess = function(payload) {
							that.alert({
								type: "info",
								msg: "Successful bet 等待结果",
								timeout: 9999999
							})
							that.luckyRun()
							that.getBetResult(res.result.recdId)
						}
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
					type: "info",
					msg: "Successful bet 等待结果",
					timeout: 9999999
				})
				that.luckyRun()
				that.getBetResult(recdId)
			})
			.on("error", function(error) {
				that.alert({
					type: "info",
					msg: "User rejected the signature request.",
					timeout: 3000
				})
			});
		},
		/**
		 * TRX下注
		 */
		placeBetTRX(rollUnder, orderId, amount) {
			console.log("placeBetTRX",new Date().getTime())
			let that = this
			const feeLimit  = this.tronWeb.tronWebInstance.toSun(10);
			const callValue = this.tronWeb.tronWebInstance.toSun(amount);
			this.tronWeb.contract.placeBetV1(rollUnder, 100, orderId).send({
				feeLimit:feeLimit,
				callValue:callValue,
				shouldPollResponse:false
			}).then(res => {
				that.alert({
					type: "info",
					msg: "Successful bet 等待结果",
					timeout: 9999999
				})
				that.luckyRun()
				that.getBetResult(orderId)
			}).catch(err => {
				that.alert({
					type: "info",
					msg: "User rejected the signature request.",
					timeout: 3000
				})
			})
		},
		//查询下注结果
		getBetResult(recdId) {
			clearInterval(this.getBetResultTimer)
			this.getBetResultTimer = null
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
							this.getBetResultTimer = null
							this.luckyColor = "green"
							if(res.result.tradeStatus == "DONE") {
								this.$store.commit('closeAlert')
								this.luckyNum = res.result.luckyNum
								this.$store.dispatch('updateProperty')
								if(res.result.winFlag == "WIN") {
									this.openWinPopup({
										ab: res.result.abNum,
										rewards: res.result.rewards,
										coinType: res.result.coinType
									})
								}else if(res.result.winFlag == "LOSE") {
									this.noWin(res.result.abNum)
								}
								// 自动下注
								setTimeout(() => {
									if(this.autoBet && this.userInfo.token) {
										this.closePopup()
										this.betDo()
									}
								}, 1000)

							}
						}
					}else {
						clearInterval(this.timer)
						this.timer = null
						clearInterval(this.getBetResultTimer)
						this.getBetResultTimer = null
						this.luckyNum = "00"
						this.luckyColor = "green"
					}
				}).catch(err => {
					clearInterval(this.timer)
					this.timer = null
					clearInterval(this.getBetResultTimer)
					this.getBetResultTimer = null
					this.luckyColor = "green"
					this.luckyNum = "00"
				})
			}, 1000)
		},
		// 预测失败
		noWin(ab) {
			this.openConfirm({
				content: this.$t('message.GameNoWin'),
				other: this.$t('message.GameWinBox2') + ab + "AB",
				btn: [
					{
						type: "high",
						text: this.$t('message.GameWinBox3'),
						cb: () => {
							this.$router.push('roller')
						}
					}
				]
			})
		},
		//帮助弹框
		helpPopup() {
			this.openConfirm({
				title: this.$t("message.GameRule"),
				content: this.$t("message.GameHelp"),
				btn: [
					{
						type: "high",
						text: this.$t("message.GameKnow"),
						cb: () => {
							this.$router.push('roller')
						}
					}
				]
			})
		},
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
		},
		coinType() {
			this.getRule()
		}
	},
	computed: {
		...mapState({
			web3: state => state.web3Handler.web3,
			currentAddr: state => state.user.currentAddr,
			userInfo: state => state.user.userInfo,
			coinType: state => state.user.coinType,
			tronWeb: state => state.tronHandler.tronWeb
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
		DigitalRoll,
		AbPopup,
		FundraiyPopup
	},
	destroyed() {
		clearInterval(this.timer)
		this.timer = null
		this.luckyColor = "green"
		this.luckyNum = "00"
		this.autoBet = false
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
		background: #22202c url(../../../public/img/game_bg01.png) no-repeat center;
		background-size: 100% 100%;
		overflow: hidden;
		.game-status {
			position: relative;
			z-index: 1;
			padding: 0 10px;
			div {
				display: flex;
				justify-content: space-between;
				line-height: 40px;
				color: #fff;
				p {
					flex: 1;
					text-align: left;
					a {
						margin: 0;
					}
				}
				a {
					color: #99FF7E;
					margin-left: 40px;
				}
			}

		}
		.coin-select {
			position: relative;
			z-index: 2;
			display: flex;
			justify-content: space-around;
			padding: 20px;
			width: 722px;
			margin: 0 auto;
			li {
				display: flex;
				align-items: center;
				justify-content: space-around;
				width: 100px;
				height: 32px;
				padding: 0 10px;
				background-color: #54506D;
				border-radius: 2px;
				text-align: center;
				overflow: hidden;
				cursor: pointer;
				img {
					width: 24px;
					height: 24px;
					border-radius: 50%;
					background-color: #41375B;
					vertical-align: middle;
				}
				span {
					font-size: 16px;
					font-weight: 700;
				}
				&.online {
					&:hover {
						background-color: #FFC425;
						img {
							background-color: #B88C16;
						}
						span {
							color: #030014;
						}
					}
				}
				&.not-online {
					position: relative;
					&:hover {
						&:after {
							content: attr(data-text);
							position: absolute;
							width: 100%;
							height: 100%;
							background:#54506D;
							font-size: 16px;
							line-height: 32px;
						}
					}
				}
				&.active {
					background-color: #FFC425;
					img {
						background-color: #B88C16;
					}
					span {
						color: #030014;
					}
				}
			}
		}
		.contact-select {
			position: absolute;
			z-index: 2;
			right: 0;
			top: 200px;
			li {
				width: 80px;
				height: 80px;
				background-color: #2A3C7E;
				border-radius:6px 0px 0px 6px;
				text-align: center;
				overflow: hidden;
				margin-bottom: 10px;
				cursor: pointer;
				img {
					height: 37px;
					margin: 21px auto 0;
				}
				span {
					font-size: 12px;
				}

			}
		}
		.game-content {
			position: relative;
			z-index: 2;
			width: 722px;
			margin: 0 auto;
			border-radius:6px;
			padding: 0 20px 20px;
			.ctn-top {
				display: flex;
				background-size: 100% 100%;
				overflow: hidden;
				p {
					text-align: left;
					color: #676284;
				}
				.bet-input {
					.flex-wrap {
						display: flex;
						background-color: #161220;
						padding: 4px;
						border-radius:4px;
						.input-wrap {
							display: flex;
							align-items: center;
							background-color: #37344D;
							height: 40px;
							border-radius:4px;
							margin-right: 4px;
							label {
								width: 40px;
								height: 40px;
								&.eth {
									background: url(../../../public/img/coin/ETH.png) no-repeat center;
									background-size: 60%;
								}
								&.trx {
									background: url(../../../public/img/coin/TRX.png) no-repeat center;
									background-size: 60%;
								}
							}
							input {
								width: 180px;
								background-color: #37344D;
								border: none;
								color: #fff;
								text-align: center;
								font-size: 22px;
								outline: none;
							}
							span {
								font-size: 14px;
								color: #676284;
								padding: 0 15px;
							}
						}
						.hotkeys {
							display: flex;
							align-items: center;
							color: #676284;
							span {
								border-right: 1px solid #030014;
								font-size: 14px;
								width: 44px;
								height: 40px;
								line-height: 40px;
								cursor: pointer;
								border-radius: 4px;
								&:hover {
									background-color: #37344D;
									color: #fff;
								}
								&:last-child {
									border: none;
								}
							}
						}
					}
				}
				.award {
					flex: 1;
					margin-left: 10px;
					div {
						display: flex;
						align-items: center;
						justify-content: space-between;
						background-color: #161220;
						height: 48px;
						padding: 0 12px;
						border-radius: 4px;
						span {
							font-size: 22px;
						}
						img {
							height: 20px;
						}
						i {
							font-style: normal;
							color: #676284;
						}
					}
				}
			}
			.ctn-mdl {
				display: flex;
				background-color: #161220;
				margin: 10px 0 0 0;
				border-radius:6px;
				padding: 17px 0;
				li {
					flex: 1;
					position: relative;
					border-right: 1px solid #030014;
					&:last-child {
						border: none;
					}
					label {
						display: block;
						color: #676284;
					}
					span {
						font-size: 40px;
						font-weight: 700;
						img {
							width: 18px;
							height: 23px;
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
				h4 {
					color: #C0CBFF;
					text-align: left;
					width: 340px;
					span {
						float: right;
					}
				}
				.auto-bet {
					position: relative;
					display: flex;
					justify-content: space-between;
					align-items: center;
					margin: 23px 0 0;
					color: #D3CDFF;
					.mid {
						display: flex;
						flex: 1;
						justify-content: center;
						.switch {
							position: relative;
							width: 60px;
							height: 24px;
							background-color: #161220;
							border-radius: 12px;
							margin: 0 10px;
							cursor: pointer;
							transition: all 2s;
							&.on {
								background-color: #2EA974;
								&:after {
									margin-left: 36px;
								}
							}
							&:after {
								content: "";
								position: absolute;
								top: 2px;
								left: 2px;
								width: 20px;
								height: 20px;
								border-radius: 50%;
								background-color: #fff;
								transition: all .5s;
							}
						}
						.help {
							position: relative;
							width: 24px;
							height: 24px;
							background: url(../../../public/img/help_icon.png) no-repeat center;
							background-size: 70%;
							cursor: pointer;
							&:hover {
								&:after {
									content: attr(data-text);
									position: absolute;
									bottom: 30px;
									right: -37px;
									width: 240px;
									font-size: 12px;
									background-color: rgba(0, 0, 0, 0.9);
									text-align: left;
									color: #ccc;
									font-size: 15px;
									padding: 10px;
									border-radius: 4px;
									z-index: 5;
									font-style: normal;
								}
							}
						}
					}
					p {
						width: 200px;
						text-align: left;
						a {
							color: #FFC425;
						}
					}
					.rule {
						width: 200px;
						text-align: right;
						color: #D3CDFF;
					}
				}
				.bet-wrap {
					display: flex;
					justify-content: space-between;
					align-items: center;
					margin-top: 30px;
					button {
						width: 300px;
						height: 52px;
						background-color: #FFC425;
						color:#1A0D59;
						border: none;
						border-radius: 26px;
						font-weight: 700;
						font-size: 20px;
						outline: none;
						cursor: pointer;
						&:hover {
							background-color: #ffba00;
						}
					}
					span {
						flex: 1;
						font-size: 16px;
						text-align: left;
						img {
							width: 30px;
							vertical-align: middle;
							margin-right: 10px;
							background-color: #54506D;
							border-radius: 50%;
						}
						i {
							color: #FFC425;
							font-style: normal;
						}
						&.fr {
							text-align: right;
						}
					}
				}
			}
			// 挖矿
			.dig-wrap {
				display: flex;
				align-items: center;
				width: 480px;
				height: 90px;
				background-color: rgba(3,0,20,.7);
				margin: 28px auto 0;
				border-radius: 45px;
				padding: 0 40px;
				img {
					width: 50px;
					height: 50px;
				}
				.content {
					flex: 1;
					text-align: left;
					margin: 0 20px;
					text-align: center;
					h4 {
						font-size: 14px;
					}
					p {
						font-size: 12px;
						color: #FFDE6F;
					}
					span {
						font-size: 10px;
					}
				}
				.help {
					position: relative;
					width: 30px;
					height: 30px;
					background: url(../../../public/img/help_icon.png) no-repeat center;
					background-size: 70%;
					cursor: pointer;
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
			margin-top: 30px;
			.scale {
				display: flex;
				justify-content: space-between;
				margin: 5px 0;
			}
			.slider {
				position: relative;
				background-color: rgba(230,53,80,1);
				height: 14px;
				box-shadow: inset 0 1px 0 #2a365a;
				border-radius: 7px;
				margin: 5px 0px 0px;
				.handle {
					position: absolute;
					height: 36px;
					width: 36px;
					background: rgba(255,255,255,.5);
					border-radius: 50%;
					top: -12px;
					left: 48%;
					cursor: pointer;
					i {
						position: absolute;
						top: -31px;
						left: -1px;
						color: #1F47A0;
						font-size: 17px;
						font-style: normal;
						width: 36px;
						height: 28px;
						background: url(../../../public/img/qipao.png) no-repeat center;
						background-size: 100%;
					}
					&:after {
						position: absolute;
						left: 4px;
						top:4px;
						content: "";
						width: 28px;
						height: 28px;
						border-radius: 50%;
						background-color: #fff;

					}
				}
				.bar {
					background-color: rgba(110,238,161,1);
					height: 14px;
					width: 50%;
					top: 0;
					left: 0;
					border-top-left-radius: 7px;
					border-bottom-left-radius: 7px;
					margin-right: 10px;
					box-shadow: 0 0 7px rgba(179, 255, 222, 1);
				}
			}
		}
		.gamerule {
			text-align: center;
			.mu-dialog {
				border-radius: 4px;
				overflow: hidden;
			}
			.mu-dialog-body {
				position: relative;
				background: #52476F url(../../../public/img/ab_popup_bg.png) no-repeat bottom right;
				// background: #52476F;
        		background-size: 40%;
				.close-btn {
					position: absolute;
					right: 20px;
					top: 20px;
					width: 25px;
					height: 25px;
					background: url(../../../public/img/close_icon01.png) no-repeat center;
					background-size: 100%;
				}
				h4 {
					font-size: 20px;
					color: #fff;
				}
				.content-text {
					margin: 40px 0;
					font-size: 16px;
					text-align: center;
					color: #CCBCF8;
					word-break: break-all;
					height: 300px;
					overflow-y: scroll;
					padding-right: 10px;
					&::-webkit-scrollbar {/*滚动条整体样式*/
							width: 8px;     /*高宽分别对应横竖滚动条的尺寸*/
							height: 8px;
						}
					&::-webkit-scrollbar-thumb {/*滚动条里面小方块*/
							border-radius: 10px;
							background: transparent;
						}
					&::-webkit-scrollbar-track {/*滚动条里面轨道*/
							border-radius: 10px;
							background: transparent;
						}
					a {
						color: #CCBCF8;
						text-decoration: underline;
					}
				}
				.other {
					color: #C8C8C8;
					font-size: 14px;
					margin-bottom: 10px;
				}
			}
			.btn-wrap {
				display: flex;
				justify-content: space-around;
				button {
					width: 40%;
					height: 40px;
					text-align: center;
					border-radius: 4px;
					border: none;
					background-color: #FFC425;
					color: #1A0D59;
					font-weight: 700;
				}
			}
		}
	}
	@media screen and (max-width: 800px){
		.module-roller-bet {
			.coin-select {
				position: relative;
				top: 0;
				padding: 0 .2rem;
				white-space: nowrap;
				overflow-x: scroll;
				margin: .3rem 0 0 0;
				width: auto;
				li {
					display: inline-block;
					width: 1.2rem;
					height: .48rem;
					border-radius: .06rem;
					text-align: center;
					overflow: hidden;
					margin: 0 .1rem 0 0;
					padding: 0;
					img {
						display: inline-block;
						height: .38rem;
						width: .38rem;
						margin: 0;
					}
					span {
						font-size: .2rem;
						margin-left: .1rem;
					}
					&.not-online {
						&:hover {
							&:after {
								left: 0;
								top: 0;
								font-size: .12rem;
								line-height:.48rem;
							}
						}
					}
				}
			}
			.game-content {
				width: auto;
				margin: 0 auto;
				padding: 0 .2rem .2rem;
				.slider-wrap {
					margin: 40px 0;
				}
				.ctn-top {
					display: initial;
					.bet-input {
						margin-top: .3rem;
						.flex-wrap {
							.input-wrap {
								flex: 1;
								height: .52rem;
								input {
									flex: 1;
									font-size: .24rem;
									width: 1.5rem;
									height: .52rem;
									line-height: .52rem;
								}
							}
							.hotkeys {
								span {
									height: .52rem;
									font-size: .24rem;
									width: .7rem;
									line-height: .52rem;
								}
							}
						}
					}
					.award {
						margin: .3rem 0 0 0;
						div {
							height: .6rem;
							span {
								font-size: .24rem;
							}
						}
					}
				}
				.ctn-mdl {
					li {
						label {
							font-size: .18rem;
						}
						span {
							font-size: .42rem;
							img {
								height: .23rem;
								width: .18rem;
							}
							i {
								font-size: .32rem !important;
							}
						}
					}
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
							flex: initial;
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
						display: block;
						margin: .6rem 0;
						overflow: hidden;
						.enter {
							display: block;
							width: 3rem;
							height: .64rem;
							margin: 0 auto .2rem;
							outline: none;
							font-size: .24rem;

						}
						span {
							font-size: .16rem;
							&.fl {
								width: 50%;
								float: left;
							}
							&.fr {
								width: 50%;
								float: right;
								text-align: right;
							}
							img {
								width: .4rem;
							}
						}
					}
				}
				.slider-wrap {
					margin: .5rem 0;
				}
				.dig-wrap {
					width: 100%;
					height: auto;
					padding: .22rem .4rem;
					img {
						width: .64rem;
						height: .64rem;
					}
					.content {
						margin: 0;
						h4 {
							font-size: .18rem;
						}
						p {
							font-size: .16rem;
						}
						span {
							font-size: .14rem;
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
