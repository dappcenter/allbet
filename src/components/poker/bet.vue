<template>
    <div class="module-poker-bet">
        <div class="content-wrap">
            <div class="view-top">
                <div class="number-area nominscreen">
                    <div class="watermark">
                        <span>{{$t('message.PokerFigure')}}</span>
                        <span>{{$t("message.PokerBettingArea")}}</span>
                    </div>
                    <div class="poker-box">
						<li v-for="(item,index) in pokerSelectedList" :key="index" @click="homingPoker(item,index)">
							<img :src="'img/poker/poker_'+item+'.png'" alt="">
						</li>
                    </div>
					<!-- <a href="javascript:;" class="reset" @click="reset('num')">重置</a> -->
                </div>
                <div class="kj-area">
                    <div class="odds">
                        <h3>{{$t('message.PokerKJQ')}}</h3>
                        <div>
                            <label>{{$t("message.PokerPL")}}</label>
                            <span>{{Math.floor(peilv*10000)/10000}}x</span>
                        </div>
                    </div>
                    <div class="poker">
                        <img class="back" src="../../../public/img/poker/kj_poker.png" alt="">
						<img class="front" src="../../../public/img/poker/full/p1.png" alt="">
                    </div>
					<a href="javascript:;" class="reset show" @click="reset"></a>
                </div>
				<!-- 移动端 -->
				<div class="number-area minscreen">
                    <div class="watermark">
                        <span>{{$t('message.PokerFigure')}}</span>
                        <span>{{$t("message.PokerBettingArea")}}</span>
                    </div>
                    <div class="poker-box">
                      <li v-for="(item,index) in pokerSelectedList" :key="index" @click="homingPoker(item,index)">
                          <img :src="'img/poker/poker_'+item+'.png'" alt="">
                      </li>
                    </div>
					<!-- <a href="javascript:;" class="reset" @click="reset('num')">重置</a> -->
                </div>
                <div class="number-area hs-area">
                    <div class="watermark">
                        <span>{{$t("message.PokerHS")}}</span>
                        <span>{{$t("message.PokerBettingArea")}}</span>
                    </div>
                    <div class="poker-box">
                      <li v-for="(item,index) in cardSelectedList" :key="index" @click="homingCard(item,index)">
                          <img :src="'img/poker/card'+item+'.png'" alt="">
                      </li>
                    </div>
					<!-- <a href="javascript:;" class="reset" @click="reset">重置</a> -->
                </div>
            </div>
            <div class="view-btm">
                <div class="poker-area">
                    <ul>
                        <li v-for="(item,index) in pokerList" :key="index" @click="movePoker(item,index)">
                            <img v-show="item !== ''" :src="'img/poker/poker_'+item+'.png'" alt="">
                        </li>
                    </ul>
                </div>
                <div class="hs-area">
                    <ul>
                      <li v-for="(item,index) in cardList" :key="index" @click="moveCard(item,index)">
                          <img v-show="item !== ''" :src="'img/poker/card'+item+'.png'">
                      </li>
                    </ul>
                </div>
            </div>
        </div>
        <div class="bet-handler">
            <div class="game-content" ref="gameContent">
                <div class="ctn-top">
                    <div class="bet-input">
                        <p>{{$t('message.GameBetAmount')}}</p>
                        <div class="flex-wrap">
                            <div class="input-wrap">
								<div class="cointype-select">
									<i class="icon" :class="{'eth': coinType == 'ETH', 'trx': coinType == 'TRX'}"></i>
									<i class="arrow"></i>
									<ul>
										<li @click="changeCoinType('ETH')">
											<img src="../../../public/img/coin/ETH.png" alt="">
											<label for="">ETH</label>
										</li>
										<li @click="changeCoinType('TRX')">
											<img src="../../../public/img/coin/TRX.png" alt="">
											<label for="">TRX</label>
										</li>
									</ul>
								</div>
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
                        <p>{{$t('message.GamePlayOutWin')}}</p>
                        <div>
                            <img src="../../../public/img/coin/ETH.png" alt="" v-show="coinType == 'ETH'">
                            <img src="../../../public/img/coin/TRX.png" alt="" v-show="coinType == 'TRX'">
                            <span>{{bonus}}</span>
                            <i>{{coinType}}</i>
                        </div>
                    </div>
                </div>
                <div class="ctn-btm">
					<div class="auto-bet">
						<div class="mid">
							<label>{{$t('message.GameAutoBet')}}</label>
							<span class="switch" :class="{'on' : autoBet}" @click="autoBet = !autoBet"></span>
							<i class="help" :data-text="$t('message.GameAutoBetHelp')"></i>
						</div>
					</div>
                    <div class="bet-wrap">
                        <span class="fl nominscreen">
                            <img src="../../../public/img/coin/ETH.png" v-show="coinType == 'ETH'">
                            <img src="../../../public/img/coin/TRX.png" v-show="coinType == 'TRX'">
                            <i v-if="currentAddr.token && currentAddr.assets"><DigitalRoll :value="currentAddr.assets[coinType].amount*1"></DigitalRoll></i>
                            <i v-else>0</i> {{coinType}}</span>
                        <button class="enter" @click="betDo">{{$t('message.BPSoon')}}</button>
                        <span class="fl minscreen">
                            <img src="../../../public/img/coin/ETH.png" v-show="coinType == 'ETH'">
                            <img src="../../../public/img/coin/TRX.png" v-show="coinType == 'TRX'">
                            <i v-if="currentAddr.token && currentAddr.assets"><DigitalRoll :value="currentAddr.assets[coinType].amount*1"></DigitalRoll></i>
                            <i v-else>0</i> {{coinType}}</span>
                        <span class="fr"><img src="../../../public/img/coin/AB.png"><i v-if="userInfo.token"><DigitalRoll :value="currentAddr.bet*1"></DigitalRoll></i><i v-else>0</i> AB</span>
                    </div>
                </div>
                <!-- 挖矿数量 -->
                <div class="dig-wrap" v-if="rule.winDig">
                    <img src="../../../public/img/poker/ab.png" alt="">
                    <div class="content">
                        <h4>{{$t('message.GameBetToGet')}} {{Math.floor((rule.winDig.split(':')[1]/rule.winDig.split(':')[0]*amount)*100)/100}} AB</h4>
						<p>{{$t('message.GameStage')}} {{(rule.totalDig/1000000000*100).toFixed(2)}}%</p>
                        <span>{{$t('message.GameDigProportion')}}　 WIN {{rule.winDig.split(':')[0]}} : {{rule.winDig.split(':')[1]}} 　  LOSE {{rule.failDig.split(':')[0]}} : {{rule.failDig.split(':')[1]}}</span>
                    </div>
                    <i class="help nominscreen" @click="isShowABpopup = true"></i>
                    <i class="help minscreen" @click="$router.push('ab')"></i>
                </div>

            </div>
            <!-- Ab弹框 -->
            <AbPopup v-model="isShowABpopup"></AbPopup>
    </div>
    </div>
</template>

<script>
import DigitalRoll from "@/components/common/digitalRoll"
import {mapMutations, mapState} from "vuex"
import {RollerABI} from '../../util/constants/roller.abi'
import PollHttp from "../../util/pollHttp"
import AbPopup from "@/components/common/ab_popup"
import FundraiyPopup from "@/components/common/fundraiy_popup"
import GameHelpPopup from "@/components/common/gamehelp_popup"

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
			pokerList: [],
			pokerSelectedList: [],
			cardList: [1,2,3,4],
			cardSelectedList: [],
			coinTypeSelectShow: false,
			music: false
        }
	},
	created() {
		let that = this
		this.getRule()
		window.hd = {}
		for (var i = 1;i<=13;i++) {
			this.pokerList.push(i)
		}
	},
    mounted() {
        this.setBetInfo({
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
		if(this.coinType == 'TRX' && this.$IsPC()) {
			this.isShowFundraiy = true
		} else if (this.coinType == 'TRX' && !this.$IsPC() && sessionStorage.getItem('IsFirstEnter') != 'YES') {
			this.$router.push('mobile-fundraiy')
			sessionStorage.setItem('IsFirstEnter', 'YES')
		}

    },
    methods: {
		// 点击牌移动
		movePoker (item, index) {
			if(item == '') return
			if(this.cardSelectedList.length == 4 && this.pokerSelectedList.length >= 12 ) {
				this.alert({
					type: "info",
					msg: this.$t('message.PokerTips3')
				})
				return
			}
      		if(this.cardSelectedList.length == 0 && this.pokerSelectedList.length >= 12 ) {
				this.alert({
					type: "info",
					msg: this.$t('message.PokerTips1')
				})
				return
			}
			this.pokerList.splice(index,1,"")
			this.pokerSelectedList.push(item)
		},
		// 点击牌归位
		homingPoker (item, index) {
			if (this.cardSelectedList.length >= 4 && this.pokerSelectedList.length <= 1 ) {
				this.alert({
					type: "info",
					msg: this.$t('message.PokerTips5')
				})
				return
      		}
      		this.pokerSelectedList.splice(index,1)
			this.pokerList.splice(item-1,1,item)
		},
		// 点击花色
		moveCard (item, index) {
			if (item == '') return
			if ((this.cardSelectedList.length >= 3 || this.cardSelectedList.length == 0) && this.pokerSelectedList.length >= 13 ) {
				this.alert({
					type: "info",
					msg: this.$t('message.PokerTips3')
				})
				return
			}
			if (this.cardSelectedList.length >= 3 && this.pokerSelectedList.length == 0 ) {
				this.alert({
				type: "info",
				msg: this.$t('message.PokerTips2')
				})
				return
			}
			this.cardList.splice(index,1,'')
			this.cardSelectedList.push(item)
		},
		// 点击花色归位
		homingCard (item, index) {
			console.log(this.cardList,this.cardSelectedList);
			if (this.cardSelectedList.length == 1 && this.pokerSelectedList.length >= 13 ) {
				this.alert({
				type: "info",
				msg: this.$t('message.PokerTips4')
				})
				return
			}
      		this.cardSelectedList.splice(index,1)
			this.cardList.splice(item-1,1,item)
		},
		inputAmountBlur() {
			if(this.amount < this.rule.minInvest) {
				this.amount = this.rule.minInvest
			}
			if(this.amount > this.rule.maxInvest) {
				this.amount = this.rule.maxInvest
			}
		},
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
        ...mapMutations({
			setBetInfo: "SET_ROLLER_BET_INFO",
			alert: "alert",
			openLogin: "OPEN_LOGIN",
			openWinPopup: "OPEN_WIN_POPUP",
			openConfirm: "OPEN_CONFIRM",
			closePopup: "CLOSE_POPUP",
			changeCoinType: "CHANGE_COINTYPE"
		}),
		getRule() {
			this.$http.get('/app/dice/rule', {
				params: {
					coinAddress: this.currentAddr.coinAddress || "",
					coinType: this.coinType
				}
			}).then(res => {
				console.log("getRule",res)
				if(res.code == 200) {
					this.rule = res.result
					this.amount = res.result.minInvest
					this.luckyNum = res.result.lastLucky || "00"
				}
			})
		},
		//下注
		betDo() {
			this.alert({
				type: "info",
				msg: this.$t("message.BPSoon")
			})
			return
			let that = this
			if(!/^\d+(\.\d+)?$/.test(this.amount)) {
				this.alert({
					type: "info",
					msg: this.$t("message.GameAmountErr")
				})
				return
			}
			if(this.amount > this.currentAddr.assets[this.coinType].amount) {
				this.alert({
					type: "info",
					msg: this.$t("message.assetsNotEnough")
				})
				return
			}
			if(Number(this.amount) < this.rule.minInvest) {
				this.alert({
					type: "info",
					msg: this.$t("message.GameAmountTooLow") + this.rule.minInvest + this.coinType
				})
				return
			}
			if(this.amount*1 > this.rule.maxInvest*1) {
				this.alert({
					type: "info",
					msg: this.$t("message.GameAmountTooLarge") + this.rule.maxInvest + this.coinType
				})
				return
			}

		},
		/**
		 * 调用合约下注
		 * @param {} rollUnder 下注的数值
		 */
		placeBet(rollUnder, modulo, commitLastBlock, commit, sigData, amount, recdId) {
			let that = this
			amount = this.web3.web3Instance.utils.toWei(amount+"", "ether")

			this.web3.diceApiHandle.methods.placeBetV1(rollUnder, modulo, commitLastBlock, commit, sigData).send({
				from: this.currentAddr.coinAddress,
				value: amount,
				gas: 210000,
				gasPrice: 10000000000
			},(err, res) => {
				if(!err) {
					that.alert({
						type: "info",
						msg: "Bet submitted! Waiting for Ethereum...",
						timeout: 9999999
					})
				}
			}).then(res => {
				that.alert({
					type: "info",
					msg: "Successful bet.",
					timeout: 9999999
				})
				// that.luckyRun()
				that.getBetResult(recdId)
			}).catch(err => {
				that.alert({
					type: "info",
					msg: "User rejected the signature request.",
					timeout: 3000
				})
			})
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
					type: "info",
					msg: "Bet submitted! Waiting for Tron...",
					timeout: 9999999
				})
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
						if(res.result.tradeStatus == "WAITING_SETTLE") {
							// 下注扣款成功
							this.alert({
								type: "info",
								msg: "Successful bet.",
								timeout: 9999999
							})
						}else if(res.result.tradeStatus == "DONE" || res.result.tradeStatus == "FAIL") {
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
							}else {
								this.alert({
									type: "info",
									msg: "Frustrated bet."
								})
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
		// 打开预售
		openFundraiy() {
			if(this.coinType == 'TRX' && this.$IsPC()) {
				this.isShowFundraiy = true
			} else if (this.coinType == 'TRX' && !this.$IsPC()) {
				this.$router.push('mobile-fundraiy')
				sessionStorage.setItem('IsFirstEnter', 'YES')
			}
		},
		// 重置
		reset(type) {
			this.pokerList = [1,2,3,4,5,6,7,8,9,10,11,12,13]
			this.pokerSelectedList = []
			this.cardList = [1,2,3,4]
			this.cardSelectedList = []
		}
    },
    watch: {
        amount(newVal, oldVal) {
            this.setBetInfo({
                odds: this.odds,
                amount: newVal
            })
		},
		coinType() {
			this.getRule()
		},
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
			if(this.pokerSelectedList.length == 0 && this.cardSelectedList.length == 0) {
				return 0
			}
			return (13/(this.pokerSelectedList.length == 0 ? 13 : this.pokerSelectedList.length)) * (4/(this.cardSelectedList.length == 0 ? 4 : this.cardSelectedList.length)) * 0.985
		},
		// 奖金
		bonus() {
			if(Math.floor(this.amount * this.peilv * 1000) / 1000 < 0) {
				return 0
			}else {
				return Math.floor(this.amount * this.peilv * 1000) / 1000
			}
		}
	},
	components: {
		DigitalRoll,
		AbPopup,
		FundraiyPopup,
		GameHelpPopup
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
.module-poker-bet {
    background: url(../../../public/img/poker/roker_bet_bg.png) repeat center;
    .content-wrap {
        max-width: 1200px;
		margin: 0 auto;
		user-select: none;
        .view-top {
            display: flex;
            height: 260px;
            border-right: 1px dashed #0F4C34;
			border-left: 1px dashed #0F4C34;
			position: sticky;
			top: 0;
			z-index: 2;
			background: url(../../../public/img/poker/roker_bet_bg.png) repeat center;
			border-bottom: 3px solid #0F4C34;
            .number-area {
                position: relative;
                flex: 1;
                display: flex;
                align-items: center;
                justify-content: center;

                .watermark {
                    position: absolute;
                    top: 48px;
                    right: 69px;
                    font-size: 50px;
                    color: #0F4A33;
                    text-align: right;
                    font-weight: 700;
                    span {
                        display: block;
                        white-space: nowrap;
                    }
                }
                .poker-box {
                    position: relative;
                    display: flex;
                    align-items: center;
                    flex-wrap: wrap;
					max-width: 100%;
                    li {
                      margin-left: -42px;
                    }
                    li:first-child {
                      margin-left: 0;
                    }
                    li:nth-child(8){
                      margin-left: 0;
                    }
                    img {
                        width: 76px;
						display: block;
						cursor: pointer;
                    }
				}
				.reset {
					position: absolute;
					bottom: 20px;
					right: 20px;
					width:60px;
					height:32px;
					border:2px solid rgba(255,196,37,1);
					border-radius:16px;
					font-size: 14px;
					color: #FFC425;
					line-height: 28px;
					font-weight: 700;
					text-align: center;
				}
            }
            .kj-area {
				position: relative;
                display: flex;
                align-items: center;
                border-left: 1px dashed rgba(15,76,52,1);
                border-right: 1px dashed rgba(15,76,52,1);
                padding: 0 60px;
                .odds {
                    text-align: center;
					margin-right: 42px;
                    h3 {
                        font-size: 48px;
                        color: #0F4A33;
                    }
                    div {
                        color: #FFC425;
                        background-color: #0C422D;
                        height: 100px;
                        width: 300px;
                        border-radius: 60px;
                        text-align: center;
						overflow: hidden;
						box-shadow: 0 0 10px #0C422D;
                        label {
                            display: block;
                            font-size: 18px;
                            margin-top: 14px;
                        }
                        span {
                            display: block;
                            font-size: 40px;
                            line-height: 40px;
                        }
                    }
                }
                .poker {
					position: relative;
					height: 198px;
					width: 140px;
                    img {
						position: absolute;
                        display: block;
						height: 100%;
						width: 100%;
						backface-visibility: hidden;
						transform-style: preserve-3d;
  						transition: ease-in-out 600ms;
					}
					.front {
						transform: rotateY(-180deg);
					}
					.back {
						
					}
					&:hover {
						.front {
							transform: rotateY(0deg);
						}
						.back {
							transform: rotateY(180deg);
						}
					}
				}
				.reset {
					position: absolute;
					left: 5%;
					top: 5%;
					width: 40px;
					height: 40px;
					background: #0F4A33 url('../../../public/img/poker/reset_icon.png') no-repeat center;
					background-size: 60%;
					border-radius:4px;
					box-shadow: 0 0 10px #0F4A33;
					transition: all .5s;
					// transform: scale(0);
					&:active {
						transform: rotate(360deg);
					}
					// &.show {
					// 	transform: scale(1);
					// }
				}
            }
            .hs-area {
                position: relative;
                flex: 1;
                display: flex;
                align-items: center;
                .poker-box {
                  li {
                    margin-left: -15px;
                  }
                  img {
                      width: 84px;
                      display: block;
                      z-index: 100;
                  }
                }
                .watermark {
                    position: absolute;
                    top: 48px;
                    left: 69px;
                    font-size: 50px;
                    color: #0F4A33;
                    text-align: left;
                    font-weight: 700;
                    span {
                        display: block;
                        white-space: nowrap;
                    }
				}
				.reset {
					left: 20px;
				}
			}
			.minscreen {
				display: none;
			}
        }
        .view-btm {
            display: flex;
            border-bottom: 3px solid #0F4C34;

            .poker-area {
                width: 665px;
                border-left: 1px dashed #0F4C34;
                background: url(../../../public/img/poker/allbet.png) repeat left;
                ul {
                    display: flex;
                    flex-wrap: wrap;
                    justify-content: center;
                    li {
                        width: 20%;
                        height: 170px;
                        padding: 20px 0;
                        border-right: 1px solid #0F4C34;
                        border-bottom: 1px solid #0F4C34;
                        &:nth-child(5n) {
                            border-right: none;
                        }
                        &:nth-child(11),&:nth-child(12),&:nth-child(13) {
                            border-bottom: none;
                        }
                        &:last-child {
                            border-right: none;
                        }
                        img {
                            display: block;
                            position: relative;
                            margin: 0 auto;
                            width: 92px;
                            height: 128px;
                            border-radius: 10px;
                            transition: all .2s linear;
                            cursor: pointer;
                            &:hover {
                                box-shadow: 0 0 10px #212020;
                                transform: translate3d(0, -2px, 0);
                            }
                        }
                    }
                }
            }
            .hs-area {
                flex: 1;
                border-left: 3px solid #0F4C34;
                background: url(../../../public/img/poker/allbet02.png) repeat top center;
                background-size: 532px 260px;
                ul {
                    display: flex;
                    flex-wrap: wrap;
                    li {
                        width: 255px;
                        height: 255px;
                        border-right: 1px solid #0F4C34;
                        border-bottom: 1px solid #0F4C34;
                        width: 50%;
                        &:nth-child(2n) {
                            border-right: 1px dashed #0F4C34;
                        }
                        &:nth-child(3),&:nth-child(4) {
                            border-bottom: none;
                        }
                        img {
                            display: block;
                            width: 137px;
                            transition: all .2s linear;
                            cursor: pointer;
                            border-radius: 50%;
                            margin: 59px auto 0;
                            &:hover {
                                box-shadow: 0 0 10px #212020;
                                transform: translate3d(0, -2px, 0);
                            }
                        }
                    }
                }
            }
        }
    }
    .bet-handler {
        margin-top: 20px;
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
				p {
					text-align: left;
					color: #CAFFE9;
				}
				.bet-input {
					.flex-wrap {
						display: flex;
						background-color: #0F4C34;
						padding: 4px;
						border-radius:4px;
						.input-wrap {
							display: flex;
							align-items: center;
							background-color: #1B6B4A;
							height: 40px;
							border-radius:4px;
							margin-right: 4px;
							.cointype-select {
								position: relative;
								height: 100%;
								cursor: pointer;
								padding-right: 20px;
								.icon {
									display: inline-block;
									width: 30px;
									height: 100%;
									&.eth {
										background: url(../../../public/img/coin/ETH.png) no-repeat center;
										background-size: 90% auto;	
									}
									&.trx {
										background: url(../../../public/img/coin/TRX.png) no-repeat center;
										background-size: 90% auto;	
									}
								}
								.arrow {
									position: absolute;
									right: 4px;
									top: calc(50% - 8px);
									width: 16px;
									height: 16px;
									background: url(../../../public/img/sanjiao.png) no-repeat center;
									background-size: 100% 100%;
								}
								&:after {
									position: absolute;
									content: "";
									width: 1px;
									height: 50%;
									right: 0;
									top: 25%;
									background-color: #0F4C34;
								}
								&:hover {
									ul {
										display: block;
									}
								}
								ul {
									position: absolute;
									z-index: 12;
									top: 40px;
									background-color: #14533A;
									box-shadow: 0 0 10px #14533A;
									display: none;
									li {
										width: 66px;
										height: 40px;
										line-height: 40px;
										text-align: center;
										cursor: pointer;
										img {
											display: inline-block;
											width: 20px;
											vertical-align: middle;
										}
										&:hover {
											background-color: #1B6B4A;
										}
										label {
											cursor: pointer;
										}
									}
								}
							}
							input {
								width: 180px;
								background-color: #1B6B4A;
								border: none;
								color: #fff;
								text-align: center;
								font-size: 22px;
								outline: none;
							}
							span {
								font-size: 14px;
								color: #CAFFE9;
								padding: 0 15px;
							}
						}
						.hotkeys {
							display: flex;
							align-items: center;
							color: #CAFFE9;
							span {
                                position: relative;
								font-size: 14px;
								width: 44px;
								height: 40px;
								line-height: 40px;
								cursor: pointer;
                                border-radius: 4px;
                                text-align: center;
                                &:after {
                                    content: "";
                                    position: absolute;
                                    right: 0;
                                    top: 10px;
                                    height: 20px;
                                    width: 1px;
                                    background-color: #06301F;
                                }
								&:hover {
									background-color: #1B6B4A;
									color: #fff;
								}
								&:last-child {
                                    border: none;
                                    &:after {
                                        display: none;
                                    }
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
						background-color: #0F4C34;
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
							color: #CAFFE9;
						}
					}
				}
			}
			.ctn-mdl {
				display: flex;
				background-color: #0F4C34;
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
						color: #CAFFE9;
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
							background-color: #0F4C34;
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
							background: url(../../../public/img/poker/help_icon.png) no-repeat center;
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
							background-color: #0F4C34;
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
				background-color: rgba(15,76,52,.7);
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
					background: url(../../../public/img/poker/help_icon.png) no-repeat center;
					background-size: 70%;
					cursor: pointer;
				}
			}
		}
    }
}
@media screen and (max-width: 800px){
	.module-poker-bet {
		.content-wrap {
			.view-top {
				display: block;
				height: auto;
				overflow: hidden;
				.kj-area {
					padding: 0;
					border: none;
					width: 100%;
					height: 3rem;
					border-bottom: .04rem solid #0F4C34;
					justify-content: center;
					.odds {
						h3 {
							font-size: .48rem;
						}
						div {
							height: 1.2rem;
							width: 3rem;
							label {
								font-size: .14rem;
								margin-top: .14rem;
							}
							span {
								font-size: .4rem;
								line-height: .6rem;
							}


						}
					}
					.poker {
						height: 1.98rem;
						width: 1.4rem;
					}
					.reset {
						width: .6rem;
						height: .6rem;
					}
				}
				.number-area {
					display: block;
					float: left;
					height: 3rem;
					width: 50%;
					border-right:1px dashed rgba(15,76,52,1);
					.watermark {
						top: 50%;
						left: 50%;
						right: initial;
						transform: translate(-50%, -50%);
						font-size: .5rem;
					}
					.poker-box {
						padding: .1rem;
						li {
							margin-left: -0.6rem;
							img {
								width: 1rem;
							}
						}
					}
					.reset {
						position: absolute;
						bottom: .2rem;
						right: .2rem;
						width: .8rem;
						height:22px;
						border-radius:11px;
						font-size: 12px;
						color: #FFC425;
						line-height: 18px;
						font-weight: 700;
						text-align: center;
					}
					&.hs-area {
						.poker-box {
							justify-content: center;
							margin-top: .8rem;
						}
						.reset {
							left: .2rem;
						}
					}
				}
			}
			.view-btm {
				display: block;
				.poker-area {
					width: 100%;
					border-bottom: 1px solid #0F4C34;
					border-left: 0;
					background: url(../../../public/img/poker/allbet.png) no-repeat center;
					background-size: 100% auto;
					ul {
						li {
							height: 1.5rem;
							padding: 0;
							img {
								width: .92rem;
								height: 1.28rem;
								margin-top: .11rem;
								border-radius: .1rem;
							}
						}
					}
				}
				.hs-area {
					border-left: 0;
					ul {
						li {
							width: 25%;
							height: 1.8rem;
							border-bottom: 0;
							img {
								width: 1.4rem;
								margin: .2rem auto;
							}
						}
					}
				}
			}
		}
		.bet-handler {
			.game-content {
				width: auto;
				margin: 0 auto;
				padding: 0 .2rem .2rem;
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
									&:after {
										top: 15%;
										height: 70%;
									}
									&:hover {
										background-color: #1B6B4A;
										color: #fff;
									}
									&:last-child {
										border: none;
										&:after {
											display: none;
										}
									}
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
								width: 20px;
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
		}
	}
}
</style>
