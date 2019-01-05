<template>
	<section class="module-poker-record">
		<div class="nav">
			<a href="javascript:;" class="tl" :class="{'active' : boardType == 'RECENT'}" @click="getData('RECENT')">{{$t("message.GamesPlayers")}}</a>
			<a href="javascript:;" :class="{'active' : boardType == 'GANGSTER'}" @click="getData('GANGSTER')">{{$t("message.GameBig")}}</a>
			<a href="javascript:;" :class="{'active' : boardType == 'LUCKY'}" @click="getData('LUCKY')">{{$t("message.GameLuckyList")}}</a>
			<a href="javascript:;" class="tr" :class="{'active' : boardType == 'ME'}" @click="getData('ME')" v-show="currentAddr.token">{{$t("message.GameRecord")}}</a>
		</div>
		<div class="myinfo" v-show="boardType == 'ME'">
			<span class="fl">{{$t("message.GameParticipation")}} <i>{{diceBasis.totalParticipate || 0}}</i></span>
			<span class="fr">AB: <i>{{diceBasis.totalAb || 0}}</i></span>
			<span class="fr">{{$t("message.GameProfit")}}<i>{{diceBasis.totalEarn || 0}}</i>{{coinType}}</span>
			<span class="fr nominscreen">{{$t("message.GameTips1")}}</span>
		</div>
		<div class="table-record nominscreen">
			<div class="t-head">
				<span>{{$t("message.GamePlay")}}</span>
				<span class="tl">{{$t("message.GameTime")}}</span>
				<span class="nominscreen">{{$t("message.GameBetNum")}}</span>
				<span class="nominscreen">{{$t('message.PokerSuits')}}</span>
				<span class="nominscreen">{{$t('message.PokerResults')}}</span>
				<span class="tr">{{$t("message.GameReward")}}</span>
				<span class="nominscreen">AB</span>
			</div>
			<div class="t-body">
				<ul class="list-content" :class="{'lose': item.winFlag == 'LOSE','win': item.winFlag == 'WIN','lucky': item.odds >= rule.luckyManOdds, 'rich': item.coinAmount >= rule.gangsterAmount}" v-for="item in displayedList">
					<li class="user">
						<span>{{item.coinAddress.replace(/(.{4}).*(.{4})/, "$1....$2")}}</span>
					</li>
					<li class="tl">
						<span>{{$fmtDate(item.updateTimestamp, "time")}}</span>
					</li>
					<li>
						<span>{{item.coinAmount}}</span>
					</li>
					<li class="multi-row">
						<div class="hs" v-if="item.pokerType != 0">
							<img v-for="pt in item.pokerType.split(',')" :src="'img/poker/cardtype'+ pt +'.png'" alt="">
						</div>
						<div class="num">{{pokerNumTranslation(item.pokerNumber)}}</div>
					</li>
					<li class="multi-row">
						<div class="hs">
							<img :src="'img/poker/cardtype'+ luckyNumTranslation(item.luckyNum)[0] +'.png'" alt="">
						</div>
						<div class="num">{{luckyNumTranslation(item.luckyNum)[1]}}</div>
					</li>
					<li class="golden tr">
						<span v-if="item.rewards > 0">{{Math.floor(item.rewards*10000)/10000}}</span>
					</li>
					<li>
						<span>{{Math.floor(item.abNum*100)/100}}</span>
					</li>
				</ul>
			</div>
		</div>
		<!-- 移动端 -->
		<div class="table-record minscreen">
			<div class="t-head">
				<span>{{$t("message.GamePlay")}}</span>
				<!-- <span>{{$t("message.GameTime")}}</span> -->
				<span>{{$t("message.GameBetNum")}}</span>
				<span class="tr">{{$t("message.GameReward")}}</span>
			</div>
			<div class="t-body">
				<ul class="list-content" :class="{'lose': item.winFlag == 'LOSE','win': item.winFlag == 'WIN','lucky': item.odds >= rule.luckyManOdds, 'rich': item.coinAmount >= rule.gangsterAmount}" v-for="item in displayedList">
					<li class="user">
						<span>{{item.coinAddress.replace(/(.{4}).*(.{4})/, "$1....$2")}}</span>
					</li>
					<!-- <li>
						<span>{{$fmtDate(item.updateTimestamp, "time")}}</span>
					</li> -->
					<li>
						<span>{{item.coinAmount}}</span>
					</li>
					<li class="golden tr">
						<span v-if="item.rewards > 0">{{Math.floor(item.rewards*10000)/10000}}</span>
					</li>
				</ul>
			</div>
		</div>
	</section>
</template>

<script>
import {mapState, mapMutations} from 'vuex'
import PollHttp from "../../util/pollHttp"
export default {
    data() {
        return {
			unfold: -1,
			recordsList: [],
			displayedList: [],
			boardType: "RECENT",
			rule: {},
			timer: null,
			diceBasis: {
				totalAb: 0
			},
			lastRecord: "",
			updateListTimer: null
        }
	},
	created() {
		this.getRule()
		this.getData(this.boardType)
		this.timer = window.setInterval(() => {
			this.getDataPoll()
		}, 3000)
	},
	watch: {
		coinType() {
			this.getRule()
		}
	},
	computed: {
		...mapState({
			currentAddr: state => state.user.currentAddr,
			coinType: state => state.user.coinType,
		})
	},
	methods: {
		getData(type) {
			this.boardType = type
			this.lastRecord = ""
			let coinAddress = null
			if(this.currentAddr.assets) {
				coinAddress = this.currentAddr.assets[this.coinType].coinAddress
			}
			if(!coinAddress && this.boardType == "ME") {
				this.recordsList = []
				this.displayedList = []
				return
			}
			this.$http.get('/app/dice/board', {
				params: {
					boardType: this.boardType,
					coinAddress: coinAddress,
					coinType: this.coinType,
					page: 1,
					gameType: "POKER",
					pageSize: this.boardType == "ME" ? 10000 : 30,
					last: ""
				}
			}).then(res => {
				if(res.code == 200) {
					this.recordsList = []
					this.displayedList = res.result.records.list
					this.diceBasis = res.result.diceBasis
					res.result.records.list[0] && (this.lastRecord = res.result.records.list[0].updateTimestamp)
					this.updateList()
				}
			})
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
				}
			})
		},
		getDataPoll() {
			let coinAddress = null
			if(this.currentAddr.assets) {
				coinAddress = this.currentAddr.assets[this.coinType].coinAddress
			}
			if(!coinAddress && this.boardType == "ME") {
				this.recordsList = []
				this.displayedList = []
				return
			}
			let boardType = this.boardType
			if(this.lastRecord == "") return
			PollHttp({
				type: 'get',
				url: '/app/dice/board',
				data: {
					boardType: this.boardType,
					coinAddress: coinAddress,
					coinType: this.coinType,
					page: 1,
					gameType: "POKER",
					pageSize: this.boardType == "ME" ? 10000 : 30,
					last: this.lastRecord
				}
			}).then(res => {
				if(res.code == 200) {
					boardType == this.boardType && res.result.records && (this.recordsList = res.result.records.list.concat(this.recordsList))
					this.diceBasis = res.result.diceBasis
					boardType == this.boardType && res.result.records.list[0] && (this.lastRecord = res.result.records.list[0].updateTimestamp)
					this.$emit('setDiceStatistics', res.result.diceStatistics)
				}else {
				}
			})
		},
		updateList() {
			clearTimeout(this.updateListTimer)
			if(this.recordsList.length > 0) {
				if(this.displayedList.length >= 30) {
					this.displayedList.pop()
				}
				let addItem = this.recordsList.pop()
				addItem && this.displayedList.unshift(addItem)
			}
			this.updateListTimer = setTimeout(() => {
				this.updateList()
			}, 300)
		},
		// 幸运数转译
		luckyNumTranslation(luckyNum) {
			const arr1 = ["A", "B", "C", "D"]
			const arr2 = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"]
			let n = luckyNum%13
			n = n == 0 ? 13 : n
			let t = Math.ceil(luckyNum/13%4)
			t = t == 0 ? 4 : t
			return [arr1[t-1], arr2[n-1]]
		},
		// 卡牌数字转译
		pokerNumTranslation(pokerNum) {
			const arr1 = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"]
			let arr2 = pokerNum.split(',')
			let arr3 = []
			arr2.forEach((val, idx) => {
				arr3.push(arr1[val-1])
			})
			return arr3.join(" ")
		},
		...mapMutations({
			alert: "alert"
		})
	},
	destroyed() {
		clearInterval(this.timer)
	}
}
</script>


<style lang="less">
.module-poker-record {
    box-sizing: border-box;
	position: relative;
	background-color: #161220;
	background-size: 100%;
	.nav {
		display: flex;
		justify-content: center;
		font-size: 20px;
		height: 72px;
		line-height: 72px;
		a {
			color: #54506D;
			margin: 0 60px;
			text-align: center;
			font-weight: 700;
			&:hover {
				color: #fff;
			}
			&.active {
				color: #fff;
				border-bottom: 2px solid #fff;
			}
			&.white {
				text-shadow: 0px 0px 6px #FFF;
			}
			&.green {
				color: #99FF7E !important;
				text-shadow: 0px 0px 6px #99FF7E !important;
			}
			&.golden {
				color: #FFDB5B;
				text-shadow: 0px 0px 6px #FFDB5B;
			}
		}
	}
	.myinfo {
		line-height: 40px;
		background:#0C0A1B;
		overflow: hidden;
		padding: 0px 50px;
		max-width: 1100px;
		margin: 0 auto;
		.fl {
			float: left;
		}
		.fr {
			float: right;
			margin-left: 40px;
		}
		i {
			color: #FFFC00;
			text-shadow: 0px 0px 6px #FFFC00 !important;
			font-style: normal;
		}
	}
	.table-record {
		max-width: 1100px;
		margin: 0 auto;
		font-family: sans-serif;
		padding-bottom: 120px;
		.t-head {
			display: flex;
			align-items: center;
			color: #D2D2D2;
			font-size: 16px;
			height: 55px;
			font-weight: 700;
			background-color: #030014;
			padding: 0 50px;
			span {
				flex: 1;
				text-align: center;
				&:first-child {
					flex: 1;
					text-align: left;
				}
				&:last-child {
					flex: 1;
					text-align: right;
				}
				i {
					display: block;
					width: 25px;
					height: 25px;
					background: url("../../../public/img/flower.png") no-repeat center;
					background-size: 80%;
				}
			}
		}
		.t-body {
			background-color: rgba(3,0,20,.4);
			padding-bottom: 40px;
			.list-content {
				display: flex;
				font-size: 16px;
				position: relative;
				padding: 0 50px;
				font-weight: 700;
				&.win {
					background-color:rgba(19,246,147,.3);
					border-top: 1px solid rgba(19,246,147,1);
					&.rich {
						background: rgba(19,246,147,.3) url(../../../public/img/HIGH.svg) no-repeat left top;
						background-size: 50px 50px;
					}
					&.lucky {
						background: rgba(19,246,147,.3) url(../../../public/img/RARE.svg) no-repeat left top;
						background-size: 53px 53px;
					}
				}
				&.lose {
					background-color:rgba(254,14,78,.3);
					border-top: 1px solid rgba(254,14,78,1);
					&.rich {
						background: rgba(254,14,78,.3) url(../../../public/img/HIGH.svg) no-repeat left top;
						background-size: 53px 53px;
					}
				}

				li {
					flex: 1;
					text-align: center;
					line-height: 59px;
					overflow: hidden;
					&.multi-row {
						display: flex;
						flex-direction: column;
						justify-content: center;
						line-height: normal;
						.hs {
							img {
								width: 15px;
								margin: 0 2px;
							}
						}
						.num {
							font-size: 12px;
						}
					}
					&:first-child {
						flex: 1;
						text-align: left;
					}
					&:last-child {
						flex: 1;
						text-align: right;
					}
					&.white {
						text-shadow: 0px 0px 6px #FFF;
					}
					&.green {
						color: #99FF7E !important;
					}
					&.golden {
						color: #FFFC00;
					}
					span {
						display: block;
						width: 100%;
						overflow: hidden;
						text-overflow: ellipsis;
						white-space: nowrap;
					}
					.minscreen {
						display: none;
					}
				}
			}
		}
	}

	.slide-fade-enter-active {
		transition: all .3s ease;
	}
	.slide-fade-leave-active {
		transition: all .2s cubic-bezier(1.0, 0.5, 0.8, 1.0);
	}
	.slide-fade-enter, .slide-fade-leave-to
		/* .slide-fade-leave-active for below version 2.1.8 */ {
		transform: translateX(10px);
		opacity: 0;
	}
}
@media screen and (max-width: 800px){
	.module-poker-record {
		padding: 0 .2rem;
		.tl {
			text-align: left !important;
		}
		.tr {
			text-align: right !important;
		}
		.nav {
			justify-content: space-between;
			height: auto;
			font-size: .24rem;
			a {
				margin: 0;
				line-height: 1rem;
				padding: 0 .1rem;
			}
		}
		.myinfo {
			padding: 0;
			line-height: .8rem;
			font-size: .18rem;
			.fr {
				margin-left: .4rem;
			}
		}
		.table-record {
			padding-bottom: .5rem;
			.t-head {
				padding: 0 .4rem;
				height: .8rem;
				font-size: .24rem;
				.tl {
					text-align: center !important;
				}
			}
			.t-body {
				.list-content {
					padding: 0 .4rem;
					font-size: 10px;
					.tl {
						text-align: center !important;
					}
					&.win {
						&.rich {
							background: rgba(19,246,147,.3) url(../../../public/img/HIGH.svg) no-repeat left top;
							background-size: .53rem .53rem;
						}
						&.lucky {
							background: rgba(19,246,147,.3) url(../../../public/img/RARE.svg) no-repeat left top;
							background-size: .53rem .53rem;
						}
					}
					&.lose {
						&.rich {
							background: rgba(254,14,78,.3) url(../../../public/img/HIGH.svg) no-repeat left top;
							background-size: .53rem .53rem;
						}
					}
					li {
						line-height: 40px;
						.minscreen {
							display: block;
						}
					}
				}
			}
		}

	}
}
</style>
