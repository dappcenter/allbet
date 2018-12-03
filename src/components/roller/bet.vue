<template>
	<section class="module-roller-bet">
		<div class="mask"></div>
		<!-- 币种选择 -->
		<ul class="coin-select">
			<li :class="{'active' : coinType == 'ETH'}" @click="changeCoinType('ETH')">
				<i class="eth">
					<img src="../../../public/img/coin/ETH01.png" alt="">
				</i>
				<span>ETH</span>
			</li>
			<!-- <li :class="{'active' : coinType == 'TRX'}" @click="changeCoinType('TRX')">
				<i class="trx">
					<img src="../../../public/img/coin/TRX01.png" alt="">
				</i>
				<span>TRX</span>
			</li> -->
			<li>
				<i class="eos">
					<img src="../../../public/img/coin/EOS01.png" alt="">
				</i>
				<span>{{$t("message.BPSoon")}}</span>
			</li>
			<li>
				<i class="trx">
					<img src="../../../public/img/coin/TRX01.png" alt="">
				</i>
				<span>{{$t("message.BPSoon")}}</span>
			</li>
			<li>
				<i class="ab">
					<img src="../../../public/img/coin/AB01.png" alt="">
				</i>
				<span>{{$t("message.BPSoon")}}</span>
			</li>
			<li>
				<i class="sac">
					<img src="../../../public/img/coin/SAC01.png" alt="">
				</i>
				<span>{{$t("message.BPSoon")}}</span>
			</li>
		</ul>
		<!-- 联系方式 -->
		<ul class="contact-select nominscreen">
			<li class="active" @click="$window.open('https://t.me/allbetAB')">
				<img src="../../../public/img/telegram-plane@2x.png" alt="">
			</li>
			<li @click="openWeixinQR = true">
				<img src="../../../public/img/gongzhonghao@2x.png" alt="">
			</li>
		</ul>
		<div class="game-content" ref="gameContent">
			<div class="game-status nominscreen">
				<div class="">
					<!-- <p>{{$t("message.GameStatus1")}}<a href="javascript:;">88</a>{{$t("message.GameStatus2")}}</p> -->
					<!-- <span>{{$t("message.GameTotalNumber")}}{{diceStatistics.guessCount}}</span> -->
					<!-- <span>{{$t("message.GameTotalIncome")}}{{diceStatistics.earned}} ETH</span> -->
					<p></p>
					<a href="javascript:;" @click="isShowHelp = true">{{$t("message.GameHowToPlay")}}</a>
				</div>
			</div>
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
					<span>{{Math.floor(peilv*1000) / 1000}}x</span>
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
				<h4>{{$t("message.GameQiuz")}}<span class="fl">{{$t("message.Gameminimum")}} {{rule.minInvest}} {{coinType}}</span></h4>
				<div class="flex-wrap">
					<div class="input-wrap">
						<label :class="{'eth': coinType == 'ETH','trx': coinType == 'TRX'}"></label>
						<input type="text" v-model="amount" oninput="value=value.replace(/[^0-9\.]/g,'')" onkeyup="value=value.replace(/[^0-9\.]/g,'')" onpaste="value=value.replace(/[^0-9\.]/g,'')" oncontextmenu="value=value.replace(/[^0-9\.]/g,'')">
						<div class="amount-handle">
							<span class="add" @click="onAdd"></span>
							<span class="minus" @click="onMinus"></span>
						</div>
					</div>
					<div class="hotkeys">
						<span @click="onHotkeys((rule.minInvest + (rule.maxInvest-rule.minInvest)*0.2).toFixed(2))">{{(rule.minInvest + (rule.maxInvest-rule.minInvest)*0.2).toFixed(2)}}</span>
						<span @click="onHotkeys((rule.minInvest + (rule.maxInvest-rule.minInvest)*0.5).toFixed(2))">{{(rule.minInvest + (rule.maxInvest-rule.minInvest)*0.5).toFixed(2)}}</span>
						<span @click="onHotkeys((rule.minInvest + (rule.maxInvest-rule.minInvest)*0.8).toFixed(2))">{{(rule.minInvest + (rule.maxInvest-rule.minInvest)*0.8).toFixed(2)}}</span>
						<span @click="onHotkeys('max')">MAX</span>
					</div>
				</div>
				<!-- 自动下注 -->
				<div class="auto-bet">
					<label>自动投注:</label>
					<span class="switch" :class="{'on' : autoBet}" @click="autoBet = !autoBet"></span>
					<i class="help" :data-text="$t('message.GameAutoBetHelp')"></i>
				</div>
				<div class="bet-wrap">
					<span class="fl nominscreen">
						<img src="../../../public/img/eth_icon.png" v-show="coinType == 'ETH'">
						<img src="../../../public/img/coin/TRX.png" v-show="coinType == 'TRX'">
						<i v-if="userInfo.token && currentAddr.assets"><DigitalRoll :value="currentAddr.assets[coinType].amount*1"></DigitalRoll></i>
						<i v-else>0</i> {{coinType}}</span>
					<button v-if="userInfo.token" class="enter" @click="betDo">{{$t("message.GameLuckNum")}}{{odds}}</button>
					<button v-else class="enter" @click="openLogin">{{$t("message.login")}}</button>
					<span class="fl minscreen">
						<img src="../../../public/img/eth_icon.png" v-show="coinType == 'ETH'">
						<img src="../../../public/img/coin/TRX.png" v-show="coinType == 'TRX'">
						<i v-if="userInfo.token && currentAddr.assets"><DigitalRoll :value="currentAddr.assets[coinType].amount*1"></DigitalRoll></i>
						<i v-else>0</i> {{coinType}}</span>
					<span class="fr"><img src="../../../public/img/ab_icon03.png"><i v-if="userInfo.token"><DigitalRoll :value="currentAddr.bet*1"></DigitalRoll></i><i v-else>0</i> AB</span>
				</div>
			</div>
			<!-- 挖矿数量 -->
			<div class="dig-wrap nominscreen">
				<img src="../../../public/img/ab_icon03.png" alt="">
				<div class="content">
					<h4>下注立刻获得 {{1/rule.winDig*amount}} AB</h4>
					<p>现在投注最高可获得投注货币 {{1/rule.winDig}} x AB </p>
					<span>挖矿比例 Winer：1 : {{1/rule.winDig}}   Loser：1 : {{1/rule.failDig}}</span>
				</div>
				<i class="help" @click="isShowABpopup = true"></i>
			</div>
		</div>
		<!-- 游戏规则 -->
		<mu-dialog width="600" :open.sync="isShowHelp" :append-body="false" class="confirm">
			<a href="javascript:;" class="close-btn" @click="isShowHelp = false"></a>
			<h4>{{$t("message.GameRule")}}</h4>
			<p class="content-text" v-html="$t('message.GameHelp')"></p>
			<div class="btn-wrap">
				<button class="high" @click="isShowHelp = false">{{$t("message.GameKnow")}}</button>
			</div>
		</mu-dialog>

		<mu-dialog :open.sync="openWeixinQR" :append-body="false">
            <img src="../../../public/img/weixin_qrcode.png" alt="">
        </mu-dialog>

		<!-- Ab弹框 -->
		<AbPopup v-model="isShowABpopup"></AbPopup>
	</section>
</template>

<script>
import DigitalRoll from "@/components/common/digitalRoll"
import {mapMutations, mapState} from "vuex"
import {RollerABI} from '../../util/constants/roller.abi'
import PollHttp from "../../util/pollHttp"
import AbPopup from "@/components/common/ab_popup"

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

		console.log(this.tronWeb)
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
			this.$refs.bar.style.width = moveWidth + "px"
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
                that.$refs.bar.style.width = moveWidth + "px"
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
				that.$refs.bar.style.width = moveWidth + "px"
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
			if(this.timer) {
				this.alert({
					type: "info",
					msg: this.$t("message.GameWait")
				})
				return
			}
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
								type: "error",
								msg: that.$t("message.GameBetErr")
							})
						}
						window.hd.betSuccess = function(payload) {
							that.alert({
								type: "success",
								msg: that.$t("message.GameBetSuc")
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
					type: "success",
					msg: that.$t("message.GameBetSuc")
				})
				that.luckyRun()
				that.getBetResult(recdId)
			})
			.on("error", function(error) {
				// that.alert({
				// 	type: "error",
				// 	msg: that.$t("message.GameBetErr")
				// })
			});
		},
		/**
		 * TRX下注
		 */
		placeBetTRX(rollUnder, orderId, amount) {
			let that = this
			const feeLimit  = this.tronWeb.tronWebInstance.toSun(10);
			const callValue = this.tronWeb.tronWebInstance.toSun(amount);
			this.tronWeb.contract.placeBetV1(rollUnder, 100, orderId).send({
				feeLimit:feeLimit,
				callValue:callValue,
				shouldPollResponse:false
			}).then(res => {
				that.alert({
					type: "success",
					msg: that.$t("message.GameBetSuc")
				})
				that.luckyRun()
				that.getBetResult(orderId)
			}).catch(err => {
				// that.alert({
				// 	type: "error",
				// 	msg: that.$t("message.GameBetErr")
				// })
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
								this.luckyNum = res.result.luckyNum
								this.$store.dispatch('updateProperty')
								if(res.result.winFlag == "WIN") {
									console.log(res)
									this.openWinPopup({
										ab: res.result.abNum,
										rewards: res.result.rewards + " " + res.result.coinType
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
		AbPopup
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
		background: url(../../../public/img/bg.jpg) repeat center;
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
			position: absolute;
			z-index: 2;
			left: 0;
			top: 80px;
			li {
				width: 80px;
				height: 80px;
				background-color: #2A3C7E;
				border-radius:0px 6px 6px 0px;
				text-align: center;
				overflow: hidden;
				margin-bottom: 10px;
				cursor: pointer;
				i {
					display: block;
					width: 40px;
					height: 40px;
					border-radius: 50%;
					margin: 12px auto 2px;
					background-color: #1D2F71;
					img {
						height: 30px;
						margin: 5px auto 0;
					}
				}
				span {
					font-size: 12px;
				}
				&.active {
					background:linear-gradient(140deg,rgba(100,180,239,1),rgba(57,94,236,1));
					i {
						background-color: #4387DD;
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
			width: 700px;
			margin: 0 auto;
			border-radius:6px;
			padding: 0 20px 20px;
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
							&.eth {
								background: url(../../../public/img/eth_icon.png) no-repeat center;
								background-size: 60%;
							}
							&.trx {
								background: url(../../../public/img/coin/TRX.png) no-repeat center;
								background-size: 60%;
							}
						}
						input {
							width: 260px;
							height: 100%;
							background-color: #152E79;
							border: none;
							color: #FEFEFE;
							text-align: center;
							outline: none;
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
				.auto-bet {
					position: relative;
					display: flex;
					justify-content: center;
					align-items: center;
					margin: 23px 0 0;
					.switch {
						position: relative;
						width: 60px;
						height: 24px;
						background-color: #2A3C7E;
						border-radius: 12px;
						margin: 0 10px;
						cursor: pointer;
						transition: all 2s;
						&.on {
							background-color: lime;
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
				.bet-wrap {
					display: flex;
					justify-content: space-between;
					align-items: center;
					margin-top: 30px;
					button {
						width: 300px;
						height: 40px;
						background-color: #64B4EF;
						color: #fff;
						border: none;
						border-radius:4px;
						font-weight: 700;
						cursor: pointer;
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
			// 挖矿
			.dig-wrap {
				display: flex;
				align-items: center;
				width: 480px;
				height: 90px;
				background-color: #1E2E69;
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
					margin: 0 40px;
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
			}
		}
		.confirm {
			text-align: center;
			.mu-dialog {
			border-radius: 4px;
			overflow: hidden;
			}
			.mu-dialog-body {
				position: relative;
				background: rgba(33, 71, 151, 1);
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
				color: #fff;
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
				border-radius: 6px;
				border: none;
				background-color: #458ad8;
				color: #fff;
				&.high {
				background: linear-gradient(
					90deg,
					rgba(100, 180, 239, 1),
					rgba(57, 94, 236, 1)
				);
				color: #fff;
				border: none;
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
				padding: 0 20px;
				white-space: nowrap;
				overflow-x: scroll;
				margin: .3rem 0 0 0;
				li {
					display: inline-block;
					width: 1.8rem;
					height: auto;
					background-color: #2A3C7E;
					border-radius: .06rem;
					text-align: center;
					overflow: hidden;
					padding: .1rem 0;
					margin: 0 .1rem 0 0;
					i {
						display: inline-block;
						width: .5rem;
						height: .5rem;
						border-radius: 50%;
						background-color: #1D2F71;
						margin: 0;
						vertical-align: middle;
						img {
							height: .4rem;
							margin: .05rem 0 0;

						}
					}
					span {
						font-size: .16rem;
						vertical-align: middle;
						margin-left: .1rem;
					}
				}
			}
			.game-content {
				width: auto;
				margin: 0 auto;
				padding: 0 20px 20px;
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
						flex-wrap: wrap;
						margin-top: 20px;
						.enter {
							width: 100%;
							margin-bottom: 18px;
							outline: none;
						}
						span {
							flex: initial;
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
