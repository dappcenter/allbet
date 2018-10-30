<template>
	<section class="module-record">
		<div class="nav">
			<a href="javascript:;" class="white" :class="{'active' : boardType == 'RECENT'}" @click="getData('RECENT')">{{$t("message.GamesPlayers")}}</a>
			<a href="javascript:;" class="golden" :class="{'active' : boardType == 'GANGSTER'}" @click="getData('GANGSTER')">{{$t("message.GameBig")}}</a>
			<a href="javascript:;" class="green" :class="{'active' : boardType == 'LUCKY'}" @click="getData('LUCKY')">{{$t("message.GameLuckyList")}}</a>
			<a href="javascript:;" :class="{'active' : boardType == 'ME'}" @click="getData('ME')" v-show="currentAddr.token">{{$t("message.GameRecord")}}</a>
		</div>
		<div class="myinfo" v-show="boardType == 'ME'">
			<span class="fl">{{$t("message.GameParticipation")}} <i>{{diceBasis.totalParticipate}}</i>次</span>
			<span class="fr">AB: <i>{{diceBasis.totalAb}}</i></span>
			<span class="fr">{{$t("message.GameProfit")}}<i>{{diceBasis.totalEarn}}</i>ETH</span>
		</div>
		<div class="t-head">
			<span>{{$t("message.GameTime")}}</span>
			<span>{{$t("message.GamePlay")}}</span>
			<span>{{$t("message.GameBetNum")}}</span>
			<span>{{$t("message.GameForecast")}}</span>
			<span>{{$t("message.GameLucky")}}</span>
			<span>{{$t("message.GameOdds")}}</span>
			<span>{{$t("message.GameReward")}}</span>
			<span>AB</span>
		</div>
		<div class="t-body">
			<ul class="list-content" v-for="item in recordsList">
				<li class="">
					<span>{{$fmtDate(item.createTime, "full")}}</span>
				</li>
				<li class="user" :class="{'green': item.odds >= rule.luckyManOdds && item.winFlag == 'WIN', 'golden': item.coinAmount >= rule.gangsterAmount}">
					<span>{{item.coinAddress.replace(/(.{4}).*(.{6})/, "$1....$2")}}</span>
				</li>
				<li class="">
					<span>{{item.coinAmount}} ETH</span>
				</li>
				<li class="">
					<span>{{item.guess}}</span>
				</li>
				<li class="">
					<span>{{item.luckyNum}}</span>
				</li>
				<li class="">
					<span>{{item.odds}}</span>
				</li>
				<li class="golden">
					<span v-if="item.rewards > 0">{{item.realRewards}} ETH</span>
					<span v-else></span>
				</li>
				<li class="">
					<span>{{item.abNum}} AB</span>
				</li>
			</ul>
		</div>
	</section>
</template>

<script>
import {mapState} from 'vuex'
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
		}
	},
	computed: {
		...mapState({
			currentAddr: state => state.user.currentAddr
		})
	},
	methods: {
		getData(type) {
			this.boardType = type
			this.$http.get('/app/dice/board', {
				params: {
					boardType: type,
					coinAddress: this.currentAddr.coinAddress,
					page: 1,
					pageSize: 30
				}
			}).then(res => {
				if(res.code == 200) {
					this.recordsList = res.result.records.list
					this.diceBasis = res.result.diceBasis
				}
			})
		},
		getRule() {
			this.$http.get('/app/dice/rule').then(res => {
				if(res.code == 200) {
					this.rule = res.result
				}
			})
		},
		getDataPoll() {
			if(!this.currentAddr.coinAddress) return
			PollHttp({
				type: 'get',
				url: '/app/dice/board',
				data: {
					boardType: this.boardType,
					coinAddress: this.currentAddr.coinAddress,
					page: 1,
					pageSize: 30
				}
			}).then(res => {
				if(res.code == 200) {
					this.recordsList = res.result.records.list
					this.diceBasis = res.result.diceBasis
					this.$emit('setDiceStatistics', res.result.diceStatistics)
				}
			})
		}
	},
	destroyed() {
		clearInterval(this.timer)
	}
}
</script>


<style lang="less">
.module-record {
    box-sizing: border-box;
	position: relative;
	background: url(../../../public/img/game_bg03.jpg) repeat-y top;
	background-size: 100%;
	.nav {
		display: flex;
		justify-content: center;
		font-size: 18px;
		height: 90px;
		background: -webkit-linear-gradient(rgba(0, 0, 0, 0.9), transparent); /* Safari 5.1 - 6.0 */
		background: -o-linear-gradient(rgba(0, 0, 0, 0.9), transparent); /* Opera 11.1 - 12.0 */
		background: -moz-linear-gradient(rgba(0, 0, 0, 0.9), transparent); /* Firefox 3.6 - 15 */
		background: linear-gradient(rgba(0, 0, 0, 0.9), transparent); /* 标准的语法（必须放在最后） */
		border-bottom: 1px solid #101F4E;
		a {
			color: #D2D2D2;
			line-height: 90px;
			width: 100px;
			margin: 0 60px;
			text-align: center;
			&.active {
				color: #fff;
				font-weight: 700;
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
		padding: 0px 120px;
		.fl {
			float: left;
		}
		.fr {
			float: right;
			margin-left: 40px;
		}
		i {
			color: #99FF7E;
			text-shadow: 0px 0px 6px #99FF7E !important;
			font-style: normal;
		}
	}
	.t-head {
		display: flex;
		align-items: center;
		color: #D2D2D2;
		font-size: 18px;
		height: 64px;
		padding: 0 120px;
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
		.list-content {
			display: flex;
			font-size: 18px;
			padding: 0px 120px;
			position: relative;
			.user {
				text-shadow: 0px 0px 6px #FFF;
			}
			li {
				flex: 1;
				text-align: center;
				line-height: 64px;
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
					text-shadow: 0px 0px 6px #FFDB5B;
				}
				span {
					display: block;
					width: 100%;
					overflow: hidden;
					text-overflow: ellipsis;
					white-space: nowrap;
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
	.module-record {
		
	}
}
</style>