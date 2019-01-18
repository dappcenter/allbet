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
							<input type="text" v-model="amount" @blur="inputAmountBlur" oninput="value=value.replace(/[^0-9\.]/g,'')" onkeyup="value=value.replace(/[^0-9\.]/g,'')" onpaste="value=value.replace(/[^0-9\.]/g,'')">
							<span>{{coinType}}</span>
						</div>
						<div class="hotkeys">
							<span @click="onHotkeys(2)">2X</span>
							<span @click="onHotkeys(0.5)">1/2</span>
							<span @click="onHotkeys('min')">MIN</span>
							<span @click="onHotkeys('max')">MAX</span>
						</div>
					</div>
				</div>
				<div class="award">
					<p>{{$t('message.GamePlayOutWin')}}
						<!-- <i class="help" :data-text="$t('message.GameFeeHelp' + coinType)"></i> -->
					</p>
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
					<span>{{Math.floor(peilv*10000) / 10000}} x</span>
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
					<div class="luckynum" :class="{'exceed': odds < luckyNum}" ref="luckynum" v-show="isShowResult">88</div>
				</div>
			</div>
			<div class="ctn-btm">
				<!-- 自动下注 -->
				<div class="auto-bet">
					<p class="rule" @click="isShowHelp = true">{{$t("message.GameHowToPlay")}}</p>
					<div class="mid">
						<label>{{$t('message.GameAutoBet')}}</label>
						<span class="switch" :class="{'on' : autoBet}" @click="autoBet = !autoBet"></span>
						<i class="help" :data-text="$t('message.GameAutoBetHelp')"></i>
					</div>
					<a class="trumpet" href="javascript:;"><i :class="{'on': music}" @click="music = !music"></i></a>
				</div>
				<div class="bet-wrap">
					<div class="cell fl nominscreen">
						<img src="../../../public/img/coin/ETH.png" v-show="coinType == 'ETH'">
						<img src="../../../public/img/coin/TRX.png" v-show="coinType == 'TRX'">
						<i v-if="currentAddr.token && currentAddr.assets"><DigitalRoll :value="currentAddr.assets[coinType].amount*1"></DigitalRoll></i>
						<i v-else>0</i> {{coinType}}
					</div>
					<button v-if="currentAddr.token && !timer" class="enter" :class="{'loading': betBtnLoading}" @click="betDo">{{$t("message.GameLuckNum")}} {{odds}}</button>
					<button v-else-if="currentAddr.token && timer" class="enter">{{luckyNum}}</button>
					<button v-else class="enter" @click="openLogin">{{$t("message.login")}}</button>
					<div class="cell fl minscreen">
						<img src="../../../public/img/coin/ETH.png" v-show="coinType == 'ETH'">
						<img src="../../../public/img/coin/TRX.png" v-show="coinType == 'TRX'">
						<i v-if="currentAddr.token && currentAddr.assets"><DigitalRoll :value="currentAddr.assets[coinType].amount*1"></DigitalRoll></i>
						<i v-else>0</i> {{coinType}}
					</div>
					<div class="cell fr" @mouseenter="getBonusPools">
						<img src="../../../public/img/coin/AB.png">
						<i v-if="currentAddr.token"><DigitalRoll :value="currentAddr.bet*1 + contractAB" :decimal="2"></DigitalRoll></i>
						<i v-else>0</i> AB
						<div class="supernatant">
							<span>{{Math.floor(contractAB*100)/100}} AB</span>
							<a href="javascript:;" @click="showBP">{{$t('message.GameGeted')}}：{{Math.floor(bonusPoolsData.ab*100)/100}} AB</a>
						</div>
					</div>
				</div>
			</div>
			<!-- 挖矿数量 -->
			<div class="dig-wrap" v-if="rule.winDig">
				<img src="../../../public/img/ab_icon03.png" alt="">
				<div class="content">
					<h4>{{$t('message.GameBetToGet')}} {{Math.floor((rule.winDig.split(':')[1]/rule.winDig.split(':')[0]*amount)*100)/100}} AB</h4>
					<p>{{$t('message.GameStage')}} {{(rule.totalDig/1000000000*100).toFixed(2)}}%</p>
					<span>{{$t('message.GameDigProportion')}}　 WIN {{rule.winDig.split(':')[0]}} : {{rule.winDig.split(':')[1]}} 　  LOSE {{rule.failDig.split(':')[0]}} : {{rule.failDig.split(':')[1]}}</span>
				</div>
				<i class="help nominscreen" @click="isShowABpopup = true"></i>
				<i class="help minscreen" @click="$router.push('ab')"></i>
			</div>
		</div>
		<!-- 游戏规则 -->
		<GameHelpPopup v-model="isShowHelp"></GameHelpPopup>

		<mu-dialog :open.sync="openWeixinQR" :append-body="false">
            <img src="../../../public/img/weixin_qrcode.png" alt="">
        </mu-dialog>

		<!-- Ab弹框 -->
		<AbPopup v-model="isShowABpopup"></AbPopup>

		<!-- 分红挖矿弹框 -->
		<BonusPoolsPopup v-model="isShowBPpopup"></BonusPoolsPopup>

		<!-- 骰子音乐 -->
		<audio loop="true" hidden="true" ref="diceA" >
			<source src="../../../public/music/a.wav">
		</audio>
		<audio hidden="true" ref="diceB" >
			<source src="../../../public/music/b.wav" loop="false">
		</audio>
		<div>
			<audio controls="controls" hidden="true" autoplay v-for="item in audioList.list">
				<source src="../../../public/music/Tick.mp3" loop="false">
			</audio>
		</div>
	</section>
</template>

<script>
import DigitalRoll from "@/components/common/digitalRoll"
import {mapMutations, mapState} from "vuex"
import {RollerABI} from '../../util/constants/roller.abi'
import PollHttp from "../../util/pollHttp"
import AbPopup from "@/components/common/ab_popup"
import FundraiyPopup from "@/components/common/fundraiy_popup"
import GameHelpPopup from "@/components/common/gamehelp_popup"
import BonusPoolsPopup from "@/components/common/bonusPools_popup"

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
            amount: 100,
			odds: 50,
			rule: {},
			luckyColor: "green",
			luckyNum: "00",
			timer: null,
			getBetResultTimer: null,
			maxNum: 96,
			isShowHelp: false,
			openWeixinQR: false,
			autoBet: false,
			isShowABpopup: false,
			isShowFundraiy: false,
			scroll: null,
			betBtnLoading: false,
			isShowResult: false,
			isShowBPpopup: false,
			audioList: {
				timerID: null,
				list: []
			},
			music: true,
			isIOS: false,
			bonusPoolsData: {
				ab: 0,
				transferred: 0
			},
			contractAB: 0  //合约上的AB
        }
	},
	created() {
		let that = this
		this.getRule()
		window.hd = {}
		this.isIOS = !(!this.$browser || !this.$browser.version.ios)

		if(this.coinType == "TRX") {
			this.amount = 100
		}else {
			this.amount = 0.01
		}
	},
    mounted() {
        this.setBetInfo({
            diceList: this.diceList,
            amount: this.amount
		})
		var that = this
        window.onmouseup = function() {
			window.onmousemove = null
			that.closePopup()
			that.isShowResult = false
		}
		window.ontouchend = function() {
			that.closePopup()
			that.isShowResult = false
			window.ontouchmove = null
		}
		window.ontouchstart = function() {
			that.closePopup()
			that.isShowResult = false
        }
        this.setBetInfo({
            odds: 1
		})
		
    },
    methods: {
		inputAmountBlur() {
			let balance = 0
			this.currentAddr.assets && (balance = Math.floor(this.currentAddr.assets[this.coinType].amount*1000)/1000)
			if(this.amount < this.rule.minInvest) {
				if(this.coinType == "TRX") {
					this.amount = 100
				}else {
					this.amount = 0.01
				}
			}
			if(this.amount > balance) {
				if(balance > this.rule.maxInvest) {
					this.amount = this.rule.maxInvest
				}else {
					if(balance <= 0) {
						if(this.coinType == "TRX") {
							this.amount = 100
						}else {
							this.amount = 0.01
						}
					}else {
						this.amount = balance
					}
				}
			}

		},
		//幸运数跳动
		luckyRun() {
			clearInterval(this.timer)
			this.timer = null
			this.music && this.$refs.diceA.play()
			this.timer = setInterval(() => {
				this.luckyNum = Math.floor(Math.random() * 89) + 10
				this.luckyColor = ["green", "red", "golden"][Math.floor(Math.random() * 2)]
			}, 50)
		},
        onHotkeys(amount) {
			let balance = 0
			this.currentAddr.assets && (balance = Math.floor(this.currentAddr.assets[this.coinType].amount*1000)/1000)
			switch(amount) {
				case 'max':
					if(balance < this.rule.maxInvest && this.currentAddr.assets) {
						this.amount  = balance <= 0 ? this.rule.minInvest : balance
					}else {
						this.amount = this.rule.maxInvest
					}
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
			const sliderWidth = this.$refs.slider.clientWidth - deductWidth - 20
			moveWidth = moveWidth <= 2 ? 2 : (moveWidth >= sliderWidth ? sliderWidth : moveWidth)
			this.$refs.handle.style.left = moveWidth - 9 + "px"
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
			const sliderWidth = this.$refs.slider.clientWidth - deductWidth - 20
			const ofX = e.offsetX
			let moveWidth = 0
            window.onmousemove = function(e) {
                moveWidth = e.clientX - sliderOffsetL - ofX
				moveWidth = moveWidth <= 2 ? 2 : (moveWidth >= sliderWidth ? sliderWidth : moveWidth)
                that.$refs.handle.style.left = moveWidth - 9 + "px"
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
            const sliderWidth = this.$refs.slider.clientWidth - deductWidth - 20
			const ofX = e.touches[0].clientX - this.$refs.handle.offsetLeft
			let moveWidth = 0
			window.ontouchmove  = function(e) {
                moveWidth = e.touches[0].clientX - sliderOffsetL
				moveWidth = moveWidth <= 2 ? 2 : (moveWidth >= sliderWidth ? sliderWidth : moveWidth)
                that.$refs.handle.style.left = moveWidth - 9 + "px"
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
					this.luckyNum = res.result.lastLucky || "00"
				}
			})
		},
		//下注
		betDo() {
			if(this.betBtnLoading) return
			this.isShowResult = false  //隐藏结果显示
			let that = this
			if(!/^\d+(\.\d+)?$/.test(this.amount)) {
				this.alert({
					type: "info",
					msg: this.$t("message.GameAmountErr")
				})
				return
			}
			// 余额检测
			if(this.amount > (this.currentAddr.assets[this.coinType].amount*1)) {
				this.alert({
					type: "info",
					msg: this.$t("message.assetsNotEnough")
				})
				return
			}
			// 金额过下检测
			if(Number(this.amount) < this.rule.minInvest) {
				this.alert({
					type: "info",
					msg: this.$t("message.GameAmountTooLow") + this.rule.minInvest + this.coinType
				})
				return
			}
			// 金额过大检测
			if(this.amount*1 > this.rule.maxInvest*1) {
				this.alert({
					type: "info",
					msg: this.$t("message.GameAmountTooLarge") + this.rule.maxInvest + this.coinType
				})
				return
			}
			this.betBtnLoading = true

			this.$http.post("/app/dice/dice", {
				"coinAddress": this.currentAddr.assets[this.coinType].coinAddress,
				"coinAmount": this.amount,
				"guessNum": this.odds,
				"noLoading": true
			}).then(res => {
				if(res.code == 200) {
					if(res.result.resultType == "DISPATCHER") {  //平台账号
						this.alert({
							type: "success",
							msg: res.msg
						})
						this.luckyRun()
						that.getBetResult(res.result.recdId, res.result.coinAmount)
					}else {   //合约账号
						this.alert({
							type: "info",
							msg: "Please Wait For Wallet to ConfirmTransfer...",
							timeout: 9999999
						})
						switch(res.result.coinType) {
							case "ETH":
								this.placeBet(this.odds, 100, res.result.commitLastBlock, res.result.commit, res.result.signData, res.result.coinAmount, res.result.recdId)
								break;
							case "TRX":
								this.placeBetTRX(this.odds, res.result.recdId, res.result.coinAmount)
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
								msg: "Successful bet.",
								timeout: 9999999
							})
							that.luckyRun()
							that.getBetResult(res.result.recdId, res.result.coinAmount)
						}
					}
				}else {
					this.betBtnLoading = false
				}
			}).catch(err => {
				this.betBtnLoading = false
				// 自动下注
				if(this.autoBet && this.userInfo.token) {
					this.closePopup()
					this.betDo()
				}
			})
		},
		/**
		 * 调用合约下注
		 * @param {} rollUnder 下注的数值
		 */
		placeBet(rollUnder, modulo, commitLastBlock, commit, sigData, amount, recdId) {
			let that = this
			let amountWei = this.web3.web3Instance.utils.toWei(amount+"", "ether")
			this.web3.diceApiHandle.methods.placeBetV1(rollUnder, modulo, commitLastBlock, commit, sigData).send({
				from: this.currentAddr.coinAddress,
				value: amountWei,
				gas: 210000,
				gasPrice: 10000000000
			},(err, res) => {
				if(!err) {
					that.alert({
						type: "info",
						msg: "Bet submitted! Waiting for Ethereum...",
						timeout: 9999999
					})
				}else {
					this.betBtnLoading = false
				}
			}).then(res => {
				that.alert({
					type: "info",
					msg: "Successful bet.",
					timeout: 9999999
				})
				that.luckyRun()
				that.getBetResult(recdId,amount)
			}).catch(err => {
				that.alert({
					type: "info",
					msg: "User rejected the signature request.",
					timeout: 3000
				})
				this.betBtnLoading = false
			})
		},
		/**
		 * TRX下注
		 */
		placeBetTRX(rollUnder, orderId, amount) {
			let that = this
			const feeLimit  = this.tronWeb.tronWebInstance.toSun(1000);
			const callValue = this.tronWeb.tronWebInstance.toSun(amount);
			this.tronWeb.contract.placeBetV1(rollUnder, 100, orderId).send({
				feeLimit:feeLimit,
				callValue:callValue,
				shouldPollResponse:false
			}).then(res => {
				that.alert({
					type: "info",
					msg: "Bet submitted! Waiting for Tron...",
					timeout: 9999999
				})
				that.getBetResult(orderId,amount)
				if(!this.timer) {
					this.luckyRun()
				}
			}).catch(err => {
				console.log("placeBetTRX",err)
				that.betBtnLoading = false
				that.alert({
					type: "info",
					msg: "User rejected the signature request.",
					// msg: err,
					timeout: 3000
				})
			})
		},
		//查询下注结果
		getBetResult(recdId,amount) {
			clearInterval(this.getBetResultTimer)
			this.getBetResultTimer = null
			this.getBetResultTimer = setInterval(() => {
				PollHttp({
					type: 'get',
					url: '/app/dice/bet/' + recdId,
					data: {}
				}).then(res => {
					if(res.code == 200) {
						if(res.result.tradeStatus == "WAITING_SETTLE" && this.coinType == 'TRX') {
							// 下注扣款成功
							this.alert({
								type: "info",
								msg: "Successful bet.",
								timeout: 9999999
							})
							this.betBtnLoading = false
						}else if(res.result.tradeStatus == "DONE" || res.result.tradeStatus == "FAIL") {
							this.betBtnLoading = false
							clearInterval(this.timer)
							this.timer = null
							clearInterval(this.getBetResultTimer)
							this.getBetResultTimer = null
							this.luckyColor = "green"
							if(res.result.tradeStatus == "DONE") {
								this.$refs.diceA.pause()
								this.music && this.$refs.diceB.play()
 								this.$store.commit('closeAlert')
								this.luckyNum = res.result.luckyNum
								this.showBetResult(res.result.luckyNum)
								this.$store.dispatch('updateProperty')
								if(res.result.winFlag == "WIN") {
									this.openWinPopup({
										ab: res.result.abNum,
										rewards: res.result.rewards,
										coinType: res.result.coinType,
										winFlag: "WIN",
										amount: amount,
										luckyNum: res.result.luckyNum
									})
								}else if(res.result.winFlag == "LOSE") {
									this.openWinPopup({
										ab: res.result.abNum,
										rewards: 0,
										coinType: res.result.coinType,
										winFlag: "LOSE",
										amount: amount,
										luckyNum: res.result.luckyNum
									})
								}
								// 自动下注
								setTimeout(() => {
									if(this.autoBet && this.userInfo.token) {
										this.closePopup()
										this.betDo()
									}
								}, 1000)
							}else {
								this.alert({
									type: "info",
									msg: "Frustrated bet."
								})
							}
						}
					}else {
						this.betBtnLoading = false
						clearInterval(this.timer)
						this.timer = null
						clearInterval(this.getBetResultTimer)
						this.getBetResultTimer = null
						this.luckyNum = "00"
						this.luckyColor = "green"
					}
				}).catch(err => {
					this.betBtnLoading = false
					clearInterval(this.timer)
					this.timer = null
					clearInterval(this.getBetResultTimer)
					this.getBetResultTimer = null
					this.luckyColor = "green"
					this.luckyNum = "00"
				})
			}, 1000)
		},
		// 打开预售
		openFundraiy() {
			if(this.coinType == 'TRX' && this.$IsPC()) {
				this.isShowFundraiy = true
			} else if (this.coinType == 'TRX' && !this.$IsPC()) {
				this.$router.push('mobile-fundraiy')
				sessionStorage.setItem('IsFirstEnter', 'YES')
			}
		},
		// 显示下注结果
		showBetResult(resNum) {
			const sliderWidth = this.$refs.slider.clientWidth -20
			const stepWidth = sliderWidth / 100
			this.$refs.luckynum.style.left = stepWidth*resNum - 8 + "px"
			this.$refs.luckynum.innerHTML = resNum
			this.isShowResult = true
		},
		//显示挖矿页面
		showBP() {
			if(this.$IsPC()) {
				this.isShowBPpopup = true
			}else {
				this.$router.push('bonus-pool')
			}
		},
		//获取分红池信息
        getBonusPools() {
            PollHttp({
				type: 'get',
				url: '/app/profit/profit',
				data: {
					coinType: this.coinType
				}
			}).then(res => {
				if(res.code == 200) {
					this.bonusPoolsData.transferred = res.result.transferred || 0
					this.bonusPoolsData.ab = res.result.ab || 0
                }
			})
			try {
				this.coinType == "TRX" && this.tronWeb.tronWebInstance.contract().at(window.TRONABTOKEN, (err, abHandle) => {
					if(err) {
						console.error(err)
					}else {
						abHandle.balanceOf(this.tronWeb.coinbase).call((err, res) => {
							if(err) {
								console.error(err)
							}else {
								this.contractAB = parseInt(res._hex,16)/1000000
							}
						})
						// abHandle.transfer("TPGpTQSuUYDmvfn2NKRL6jVxFduN3UBMmb", "100").send((err, res) => {
						// 	if(err) {
						// 		console.error(err)
						// 	}else {
						// 		this.contractAB = parseInt(res._hex,16)/1000000
						// 	}
						// })
						
					}
				})
				this.coinType == "ETH" && this.web3.ABapiHandle.methods.balanceOf(this.web3.coinbase).call((error, result) => {
					if(!error) {
						this.contractAB = this.web3.web3Instance.utils.fromWei(result, "ether")*1
					} else {
						console.error(error);
					}
				})
			} catch (error) {
				
			}

			// this.web3.ABapiHandle.methods.transfer("0x1688c2806aD8aA1031e0EB0a4ec6E82852fC30c4", "100").send({
			// 	from: this.web3.coinbase
			// }).on("receipt", function(receipt) {
			// 	console.log(receipt)
			// })
			// .on("error", function(error) {
			// 	console.log(error)
			// });
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
			if(this.coinType == "TRX") {
				this.amount = 100
			}else {
				this.amount = 0.01
			}
			this.contractAB = 0
		},
		odds() {
			if(!this.music) return
			this.audioList.list.push(this.odds)
			this.audioList.timerID && clearTimeout(this.audioList.timerID)
			this.audioList.timerID = setTimeout(() => {
				this.audioList.list = []
			}, 400)
		},
		currentAddr() {
			this.getBonusPools()
		},
		music(newVal, oldVal) {
			if(!newVal) {
				this.$refs.diceA.pause()
			}
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
			if(Math.floor(this.amount * this.peilv * 10000) / 10000 < 0) {
				return 0
			}else {
				return Math.floor(this.amount * this.peilv * 10000) / 10000
			}
		}
	},
	components: {
		DigitalRoll,
		AbPopup,
		FundraiyPopup,
		GameHelpPopup,
		BonusPoolsPopup
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
				// overflow: hidden;
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
					p {
						.help {
							display: inline-block;
							position: relative;
							width: 20px;
							height: 20px;
							background: url(../../../public/img/help_icon.png) no-repeat center;
							background-size: 70%;
							cursor: pointer;
							vertical-align: middle;
							&:hover {
								&:after {
									content: attr(data-text);
									position: absolute;
									top: 0px;
									left: 24px;
									width: 240px;
									font-size: 12px;
									background-color: rgba(0, 0, 0, 0.9);
									text-align: left;
									color: #ccc;
									font-size: 15px;
									padding: 10px;
									border-radius: 4px;
									z-index: 9999999;
									font-style: normal;
									word-break: break-all;
								}
							}
						}
					}
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
					margin: 32px 0 0;
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
						cursor: pointer;
						a {
							color: #FFC425;
						}
					}
					.rule {
						width: 200px;
						text-align: left;
						color: #D3CDFF;
					}
					.trumpet {
						display: inline-block;
						width: 200px;
						text-align: right;
						cursor: auto;
						i {
							display: inline-block;
							height: 18px;
							width: 20px;
							background: url(../../../public/img/trumpet_off.png) no-repeat left center;
							background-size: auto 100%;
							cursor: pointer;
							&.on {
								background: url(../../../public/img/trumpet_on.png) no-repeat left center;
								background-size: auto 100%;
							}
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
						&.loading {
							&:after {
								content: "";
								background: url(../../../public/gif/Spinner-1.gif) no-repeat center;
								background-size: 100%;
								display: inline-block;
								width: 2em;
								height: 2em;
								vertical-align: middle;
								margin-top: -1px;
							}
						}
					}
					.cell {
						position: relative;
						flex: 1;
						font-size: 16px;
						text-align: left;
						padding: 10px 0;
						cursor: pointer;
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
						.supernatant {
							position: absolute;
							bottom: 50px;
							right: 0;
							background-color: #54506D;
							text-align: left;
							padding: 12px 20px;
							border-radius: 5px;
							display: none;
							span {
								display: block;
								font-size: 12px;
							}
							a {
								color: #13F693;
								font-size: 14px;
								&:hover {
									text-decoration: underline;
								}
							}
						}
						&:hover {
							.supernatant {
								display: block;
							}
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
					left: calc(50% - 18px);
					cursor: grabbing;
					i {
						position: absolute;
						top: -31px;
						left: -1px;
						color: #161220;
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
				.luckynum {
					position: absolute;
					z-index: -1;
					width: 32px;
					height: 32px;
					background: url(../../../public/img/qipao02.png) no-repeat center;
					background-size: 100% 100%;
					color: #13F693;
					line-height: 35px;
					font-size: 18px;
					&.exceed {
						color: #FE0E4E;
						background: url(../../../public/img/qipao03.png) no-repeat center;
						background-size: 100% 100%;
					}
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
								height: .7rem;
								input {
									flex: 1;
									font-size: .3rem;
									width: 1.5rem;
									height: .7rem;
									line-height: .7rem;
								}
							}
							.hotkeys {
								span {
									height: .7rem;
									font-size: .24rem;
									width: .7rem;
									line-height: .7rem;
								}
							}
						}
					}
					.award {
						margin: .3rem 0 0 0;
						div {
							height: .8rem;
							span {
								font-size: .3rem;
							}
						}
						p {
							.help {
								width: 20px;
								height: 20px;
								background-size: 70%;
								&:hover {
									&:after {
										top: initial;
										bottom: 20px;
										left: -50px;
										width: 240px;
										font-size: 12px;
										font-size: 15px;
										padding: 10px;
										border-radius: 4px;
									}
								}
							}
						}
					}
				}
				.ctn-mdl {
					padding: .2rem 0;
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
						float: left;
						width: 100%;
						.enter {
							display: block;
							width: 3rem;
							height: .64rem;
							margin: 0 auto .2rem;
							outline: none;
							font-size: .24rem;
						}
						.cell {
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
								width: 20px;
							}
							.supernatant {
								bottom: 37px;
							}
						}
					}
					.auto-bet {
						font-size: .12rem;
						.mid {
							label {
								line-height: 24px;
							}
						}
						.rule {
							width: 1rem;
							font-size: .12rem;
						}
						.trumpet {
							width: 1rem;
						}
						p {
							width: 1rem;
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
							font-size: .2rem;
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
