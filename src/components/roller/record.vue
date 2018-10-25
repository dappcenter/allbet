<template>
	<section class="module-record">
		<div class="nav">
			<a href="javascript:;" :class="{'active' : boardType == 'RECENT'}" @click="getData('RECENT')">最新玩家</a>
			<a href="javascript:;" :class="{'active' : boardType == 'GANGSTER'}" @click="getData('GANGSTER')">大佬榜</a>
			<a href="javascript:;" :class="{'active' : boardType == 'LUCKY'}" @click="getData('LUCKY')">幸运榜</a>
			<a href="javascript:;" :class="{'active' : boardType == 'ME'}" @click="getData('ME')" v-show="currentAddr.token">我的战绩</a>
		</div>
		<div class="t-head">
			<span>时间</span>
			<span>玩家</span>
			<span>下注数量</span>
			<span>预测数</span>
			<span>幸运数</span>
			<span>赔率</span>
			<span>奖金</span>
			<span>AB</span>
		</div>
		<div class="t-body">
			<ul class="list-content" v-for="item in recordsList">
				<li class="">
					<span>{{$fmtDate(item.createTime, "full")}}</span>
				</li>
				<li class="user" :class="{'green': item.odds > rule.luckyManOdds && item.winFlag == 'WIN', 'golden': item.coinAmount > rule.gangsterAmount}">
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
				<li class="">
					<span v-if="item.rewards > 0">{{item.rewards}} ETH</span>
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
			timer: null
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
					pageSize: 10
				}
			}).then(res => {
				if(res.code == 200) {
					this.recordsList = res.result.records.list
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
			PollHttp({
				type: 'get',
				url: '/app/dice/board',
				data: {
					boardType: this.boardType,
					coinAddress: this.currentAddr.coinAddress,
					page: 1,
					pageSize: 10
				}
			}).then(res => {
				if(res.code == 200) {
					this.recordsList = res.result.records.list
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
	// background: #303f69;
    // box-shadow: 0 0 30px 0 rgba(0, 0, 0, 0.2);
    box-sizing: border-box;
	position: relative;
	background: #000;
	background-image: -webkit-linear-gradient(top,rgba(255,255,255,0) 0%,rgba(255,255,255,1) 100%);
	background-image: -moz-linear-gradient(top,rgba(255,255,255,0) 0%,rgba(255,255,255,1) 100%);
	background-image: -o-linear-gradient(top,rgba(255,255,255,0) 0%,rgba(255,255,255,1) 100%);
	background-image: linear-gradient(top,rgba(255,255,255,0) 0%,rgba(255,255,255,1) 100%);
	.nav {
		display: flex;
		justify-content: center;
		font-size: 18px;
		height: 90px;
		border-bottom: 1px solid #1F388F;
		background-color: #2F59B7;
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
		}
	}
	.t-head {
		display: flex;
		align-items: center;
		color: #D2D2D2;
		font-size: 18px;
		height: 64px;
		background-color: #2F59B7;
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
			background-color: #2F59B7;
			&:nth-child(2n) {
				background-color: #1A439E;
			}
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
				}
			}
			&:hover {
				background: rgba(91, 116, 174);
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
		background: transparent;
    	box-shadow: initial;
		.topbar {
			padding: 0;
		}
		.t-head {
			padding: 0;
		}
		.t-body {
			padding: 0;
			overflow: hidden;
			border-bottom: 0;
			.list-content {
				width: 100%;
				padding: 4px 0;
			}
		}
	}
}
</style>