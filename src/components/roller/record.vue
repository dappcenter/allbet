<template>
	<section class="module-roller-record">
		<div class="nav">
			<a href="javascript:;" class="tl" :class="{'active' : boardType == 'RECENT'}" @click="getData('RECENT')">{{$t("message.GamesPlayers")}}</a>
			<a href="javascript:;" class="" :class="{'active' : boardType == 'GANGSTER'}" @click="getData('GANGSTER')">{{$t("message.GameBig")}}</a>
			<a href="javascript:;" class="" :class="{'active' : boardType == 'LUCKY'}" @click="getData('LUCKY')">{{$t("message.GameLuckyList")}}</a>
			<a href="javascript:;" class="tr" :class="{'active' : boardType == 'ME'}" @click="getData('ME')" v-show="currentAddr.token">{{$t("message.GameRecord")}}</a>
		</div>
		<div class="myinfo" v-show="boardType == 'ME'">
			<span class="fl">{{$t("message.GameParticipation")}} <i>{{diceBasis.totalParticipate || 0}}</i></span>
			<span class="fr">AB: <i>{{diceBasis.totalAb || 0}}</i></span>
			<span class="fr">{{$t("message.GameProfit")}}<i>{{diceBasis.totalEarn || 0}}</i>{{coinType}}</span>
			<span class="fr nominscreen">{{$t("message.GameTips1")}}</span>
		</div>
		<div class="table-record">
			<div class="t-head">
				<span>{{$t("message.GamePlay")}}</span>
				<span class="tl">{{$t("message.GameTime")}}</span>
				<span class="nominscreen">{{$t("message.GameBetNum")}}</span>
				<span class="nominscreen">{{$t("message.GameForecast")}}</span>
				<span class="nominscreen">{{$t("message.GameLucky")}}</span>
				<span class="nominscreen">{{$t("message.GameOdds")}}</span>
				<span class="tr">{{$t("message.GameReward")}}</span>
				<span class="nominscreen">AB</span>
			</div>
			<div class="t-body">
				<ul class="list-content win" :class="{'lose': item.winFlag == 'LOSE'}" v-for="item in recordsList">
					<li class="user" :class="{'green': item.odds >= rule.luckyManOdds && item.winFlag == 'WIN'}">
						<span>{{item.coinAddress.replace(/(.{4}).*(.{6})/, "$1....$2")}}</span>
					</li>
					<li class="tl">
						<span>{{$fmtDate(item.createTime, "time")}}</span>
						<!-- <span class="minscreen">{{$fmtDate(item.createTime, "time")}}</span> -->
					</li>
					<li class="nominscreen">
						<span>{{item.coinAmount}} {{coinType}}</span>
					</li>
					<li class="nominscreen">
						<span>{{item.guess}}</span>
					</li>
					<li class="nominscreen">
						<span>{{item.luckyNum}}</span>
					</li>
					<li class="nominscreen">
						<span>{{item.odds}}</span>
					</li>
					<li class="golden tr">
						<span v-if="item.rewards > 0">{{item.rewards}} {{coinType}}</span>
						<span v-else>--</span>
					</li>
					<li class="nominscreen">
						<span>{{item.abNum}} AB</span>
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
			boardType: "RECENT",
			rule: {},
			timer: null,
			diceBasis: {}
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
		currentAddr() {
			this.getData(this.boardType)
		},
		coinType() {
			this.getRule()
		}
	},
	computed: {
		...mapState({
			currentAddr: state => state.user.currentAddr,
			coinType: state => state.user.coinType
		})
	},
	methods: {
		getData(type) {
			this.boardType = type
			let coinAddress = null
			if(this.currentAddr.assets) {
				coinAddress = this.currentAddr.assets[this.coinType].coinAddress
			}
			if(!coinAddress && this.boardType == "ME") {
				this.boardType = "RECENT"
			}
			this.$http.get('/app/dice/board', {
				params: {
					boardType: this.boardType,
					coinAddress: coinAddress,
					coinType: this.coinType,
					page: 1,
					pageSize: this.boardType == "ME" ? 10000 : 30
				}
			}).then(res => {
				if(res.code == 200) {
					this.recordsList = res.result.records.list
					this.diceBasis = res.result.diceBasis
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
				this.boardType = "RECENT"
				return
			}
			PollHttp({
				type: 'get',
				url: '/app/dice/board',
				data: {
					boardType: this.boardType,
					coinAddress: coinAddress,
					coinType: this.coinType,
					page: 1,
					pageSize: this.boardType == "ME" ? 10000 : 30
				}
			}).then(res => {
				if(res.code == 200) {
					this.recordsList = res.result.records.list
					this.diceBasis = res.result.diceBasis
					this.$emit('setDiceStatistics', res.result.diceStatistics)
				}else {
				}
			})
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
.module-roller-record {
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
			width: 100px;
			margin: 0 60px;
			text-align: center;
			font-weight: 700;
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
		background:rgba(17,28,66,.5);
		overflow: hidden;
		padding: 0px 10px;
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
			color: #FFC425;
			text-shadow: 0px 0px 6px #FFC425 !important;
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
						background: rgba(19,246,147,.3) url(../../../public/img/rich_ch.png) no-repeat left top;
						background-size: 53px 53px;
					}
					&.lucky {
						background: rgba(19,246,147,.3) url(../../../public/img/lucky_ch.png) no-repeat left top;
						background-size: 53px 53px;
					}
				}
				&.lose {
					background-color:rgba(254,14,78,.3);
					border-top: 1px solid rgba(254,14,78,1);
					&.rich {
						background: rgba(254,14,78,.3) url(../../../public/img/rich_ch.png) no-repeat left top;
						background-size: 53px 53px;
					}
				}
				
				li {
					flex: 1;
					text-align: center;
					line-height: 59px;
					overflow: hidden;
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
						text-shadow: 0px 0px 6px #99FF7E !important;
					}
					&.golden {
						color: #FFDB5B;
						// text-shadow: 0px 0px 6px #FFFC00;
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
	.module-roller-record {
		padding: 0 20px;
		.tl {
			text-align: left !important;
		}
		.tr {
			text-align: right !important;
		}
		.nav {
			justify-content: space-between;
			height: auto;
			a {
				margin: 0;
				line-height: 60px;
			}
		}
		.myinfo {
			padding: 0;
		}
		.t-head {
			padding: 0;
			height: 40px;
		}
		.t-body {
			.list-content {
				padding: 0;
				font-size: 10px;
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
</style>
