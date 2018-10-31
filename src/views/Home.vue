<template>
	<div class="home-page">
	<HeaderBar type="steep"></HeaderBar>
	<div class="main">
		<!-- <div class="mask"></div> -->
		<div class="top">
			<h1><img src="../../public/img/LOGO.png" alt=""></h1>
			<h2>{{$t('message.homeAllet')}}</h2>
			<div class="info" style="width:70%;margin:30px auto 40px auto;font-size:18px;color:#FEFEFE;">{{$t('message.homeAlletDesc')}}</div>
			<div class="total-bill" v-if="getCurrentAddr.token">
				{{$t('message.homeTotalAt')}}{{this.getCurrentAddr.at}}
			</div>
			<div class="total-bill" v-else @click="openLogin">
				{{$t('message.login')}}
			</div>
		</div>
		<div class="middle">
			<div class="middle-title">{{$t('message.homeReservePool')}}</div>
			<div class="buy-sell">
				<div class="fund-number">
					<img src="../../public/home/eth-icon.png" class="img1">
					<div class="">
						<p>{{result.ethPool}}ETH</p>
						<span>{{$t('message.homeETHReserve')}}</span>
					</div>
				</div>
				<div class="fund-number fund-sepc">
					<img src="../../public/home/at-icon.png" class="img2">
					<div class="">
						<p>{{result.dbPool}}AT</p>
						<span>{{$t('message.homeATReserve')}}</span>
					</div>
				</div>
			</div>
			<div class="buy-sell">
				<div class="buy">
					<p class="title">{{$t('message.homeBuyAT')}}</p>
					<p><span :class="[getCurrentAddr.token?'':'transparent']">{{$t('message.homeAvailable')}}{{this.getCurrentAddr.eth}} ETH</span><span>1 AT = {{ethMarketPrice}} ETH</span></p>
					<div class="price-div">
						<span class="num">{{$t('message.homePrice')}}</span>
						<input type="text" :placeholder="$t('message.homePricePlacholder')" class="price" v-model.trim="ethPrice" @focus="priceFocus('ethPrice')" @blur="priceOnblur('ethPrice')">
						<span class="num-right">ETH</span>
					</div>
					<div class="price-div">
						<span class="num">{{$t('message.homeVolume')}}</span>
						<input type="number" :placeholder="$t('message.homeInputETH')" class="price" v-model="buyEthNumber">
						<span class="num-right">ETH</span>
					</div>
					<p><span>{{$t('message.homeExpectedGet')}} {{getAtNumber}} AT</span><span>{{$t('message.homeAutomaticTrading')}}<img src="../../public/home/quote.png" alt="" @click="openHelp1"></span></p>
					<div class="buy-button" v-if="getCurrentAddr.token" @click="doTrade('买入')">
						{{$t('message.homeBuy')}}
					</div>
					<div class="buy-button" v-else @click="openLogin">
						{{$t('message.login')}}
					</div>
				</div>
				<div class="buy sell">
					<p class="title">{{$t('message.homeSellAT')}}</p>
					<p><span :class="[getCurrentAddr.token?'':'transparent']">{{$t('message.homeAvailable')}}{{this.getCurrentAddr.at}} AT</span><span>1 AT = {{ethMarketPrice}} ETH</span></p>
					<div class="price-div">
						<span class="num">{{$t('message.homePrice')}}</span>
						<input type="text" :placeholder="$t('message.homePricePlacholder')" class="price" v-model.trim="sellAtPrice" @focus="priceFocus('sellAtPrice')" @blur="priceOnblur('sellAtPrice')">
						<span class="num-right">ETH</span>
					</div>
					<div class="price-div">
						<span class="num">{{$t('message.homeVolume')}}</span>
						<input type="number" :placeholder="$t('message.homeInputAT')" class="price" v-model="buyAtNumber">
						<span class="num-right">AT</span>
					</div>
					<p><span>{{$t('message.homeExpectedGet')}} {{getEthNumber}} ETH</span><span>{{$t('message.homeAutomaticTrading')}}<img src="../../public/home/quote.png" alt="" @click="openHelp"></span></p>
					<p style="text-align:center;color:#97ADFF;font-size:16px;margin-top: 34px;">{{$t('message.homeTokenFee')}}</p>
					<div class="buy-button sell-button" v-if="getCurrentAddr.token" @click="doTrade('卖出')">
						{{$t('message.homeSell')}}
					</div>
					<div class="buy-button sell-button" v-else @click="openLogin">
						{{$t('message.login')}}
					</div>
				</div>
			</div>
		</div>
	</div>
	<div class="list-wrapper">
		<div class="list">
			<div class="top-button">
				<span @click="getBancorOrders(0)" :class="[selectTap == 0?'selected':'']">{{$t('message.homeRecentPlayers')}}</span>
				<span @click="getBancorOrders(1)" :class="[selectTap == 1?'selected':'']">{{$t('message.homeMyOrders')}}</span>
			</div>
			<div class="content">
				<div class="recent-order" v-if="selectTap == 0">
					<li class="unit"><span>{{$t('message.homePlayer')}}</span><span class="nominscreen">{{$t('message.homeVolume')}}(ETH)</span><span>{{$t('message.homeVolume')}}(AT)</span><span>{{$t('message.homeAtPrice')}}</span><span class="nominscreen">{{$t('message.homeTransactionType')}}</span><span>{{$t('message.homeTransactionTime')}}</span></li>
					<li v-for="item in recentOrderList">
						<span>{{item.address}}</span>
						<span class="nominscreen">{{item.tradeType == 'MARKET_BUY'? '- '+item.inAmount:'+ '+item.outAmount}}</span>
						<span>{{item.tradeType == 'MARKET_BUY'?'+ '+item.outAmount:'- '+item.inAmount}}</span>
						<span>{{item.dbPrice}} ETH</span>
						<span :class="['nominscreen',item.tradeType.indexOf('SELL') > -1 ? 'red':'green']">{{filterTradeType(item)}}</span>
						<span>{{$fmtDate(item.recdDoneTime, "full")}}</span>
					</li>
				</div>
				<div class="my-order" v-else>
					<li class="unit"><span>{{$t('message.homePlayer')}}</span><span>ETH</span><span>AT</span><span>{{$t('message.homeAtPrice')}}</span><span>{{$t('message.homeTransactionType')}}</span><span>{{$t('message.homeCreateTime')}}</span><span>{{$t('message.homeTransactionTime')}}</span><span>{{$t('message.homeState')}}</span><span>{{$t('message.homeOperation')}}</span></li>
					<li v-for="item in recentOrderList">
						<span>{{item.address}}</span>
						<span>{{filter(item)}}</span>
						<span>{{filter1(item)}}</span>
						<span>{{item.dbPrice}} ETH</span>
						<span :class="[item.tradeType.indexOf('SELL') > -1 ? 'red':'green']">{{filterTradeType(item)}}</span>
						<span>{{$fmtDate(item.recdCreateTime, "full")}}</span>
						<span>{{item.recdDoneTime?$fmtDate(item.recdDoneTime, 'full'):'- -'}}</span>
						<span>{{filterState(item)}}</span>
						<span class="chedan" v-if="item.tradeStatus == 'ENTRUST'" @click="cancelOrder(item)">{{$t('message.homeWithdrawal')}}</span>
						<span v-else>- -</span>
					</li>
				</div>
			</div>
		</div>
	</div>
	<FooterBar ref="ft"></FooterBar>
</div>

</template>

<script>
import HeaderBar from "@/components/common/header_bar"
import FooterBar from "@/components/common/footer_bar"
import {mapMutations} from "vuex"
import {DappABI} from "../util/constants/dapp.abi.js"
import { setTimeout, clearInterval } from 'timers';
 export default {
	 data () {
		 return {
			ethMarketPrice: '', // 市面上 1at=??eth
			ethPrice: '', // 1ETH=??At
			buyEthNumber: '', // 买入??ETh

			sellAtPrice: '', // 1at=??eth
			buyAtNumber: '',// 买入??AT

			result: {},
			selectTap: 0,

			recentOrderList: [], //近期交易列表
			// entrustOrderList: [], //委托单列表
			timer: null,

		}
	},
	mounted() {
		this.ethPrice = this.$t('message.homeMarketPrice')
		this.sellAtPrice = this.$t('message.homeMarketPrice')
	},
  computed: {
		ethInfo() {
			return this.$store.state.web3Handler.web3
		},
		userInfo() {
			return this.$store.state.user.userInfo
		},
		getCurrentAddr() {
			return this.$store.state.user.currentAddr
		},
		getAtNumber() {
			if(this.ethPrice == this.$t('message.homeMarketPrice')) {
				return (1/this.ethMarketPrice * this.buyEthNumber).toFixed(8)
			}else{
				return (1/this.ethPrice * this.buyEthNumber).toFixed(8)
			}
		},
		getEthNumber() {
			return this.sellAtPrice == this.$t('message.homeMarketPrice') ? (this.ethMarketPrice * this.buyAtNumber).toFixed(8) : (this.sellAtPrice * this.buyAtNumber).toFixed(8)
		},
		locale () {
			return this.$store.state.locale
		}
  },
	created () {
		this.getInfo()
		this.getBancorOrders(this.selectTap)
		this.getMarketAtPrice()
	},
	watch: {
		getCurrentAddr() {
			this.getBancorOrders(this.selectTap)
		},
		locale() {
			this.ethPrice = this.$t('message.homeMarketPrice')
			this.sellAtPrice = this.$t('message.homeMarketPrice')
		}
	},
	methods: {
		//价格输入框失焦判断
		priceOnblur(type) {
			this[type] = this[type] == "" ? this.$t('message.homeMarketPrice') : this[type]
		},
		//价格输入聚焦判断
		priceFocus(type) {
			this[type] = this[type] == this.$t('message.homeMarketPrice') ? "" : this[type]
		},
		filterTradeType(item){
			switch (item.tradeType) {
				case 'MARKET_BUY':
				return this.$t('message.homeBuy')
				break;
				case 'MARKET_SELL':
				return this.$t('message.homeSell')
				break;
				case 'PUTUP_BUY':
				return this.$t('message.homeBuy')
				break;
				case 'PUTUP_SELL':
				return this.$t('message.homeSell')
				break;
			}
		},
		filter(item) {
			if (item.tradeType == 'MARKET_BUY' || item.tradeType == 'PUTUP_BUY') {
				return item.inAmount?'- '+item.inAmount:'--'
			} else {
				return item.outAmount ? '+ '+item.outAmount:'- -'
			}
		},
		filter1(item) {
			if (item.tradeType == 'MARKET_BUY' || item.tradeType == 'PUTUP_BUY') {
				return item.outAmount?'+ '+item.outAmount:'--'
			} else {
				return item.inAmount ? '- '+item.inAmount:'- -'
			}
		},
		filterState(item) {
			switch (item.tradeStatus) {
				case 'ENTRUST':
				return this.$t('message.homeEntrust')
				break;
				case 'DONE':
				return this.$t('message.homeDone')
				break;
				case 'WAITING':
				return this.$t('message.homeWaiting')
				break;
				case 'CANCEL':
				return this.$t('message.homeCancel')
				break;
				case 'FAIL':
				return this.$t('message.homeFail')
				break;
			}
		},
		// 获取奖金池&AT数量
		getInfo () {
			this.$http.get("/app/home/summary_basis",{

			}).then((res) => {
				if (res.code == 200) {
					this.result = res.result || {}
				}
			})
		},
		// 获取交易记录
		getBancorOrders(selectTap) {
			this.recentOrderList = []
			this.selectTap = selectTap
			if (selectTap == 1 && !this.getCurrentAddr.token)  return
			this.$http.get("/app/home/bancor_orders",{
			params:{
				"onlyMe": selectTap == 1?true:false,
				"coinAddress": this.getCurrentAddr.coinAddress,
				"page": 1,
				"pageSize":20,
			}
			}).then((res) => {
				if (res.code == 200) {
					const recentOrderList = res.result.list
					recentOrderList.forEach((value,key) => {
						let addr = value.address
						value.address = value.address.substr(0,4) + '.....' +addr.substr(addr.length - 6,addr)
					})
					this.recentOrderList = recentOrderList
				}
			})
		},
		// 获取AT市价
		getMarketAtPrice () {
			this.$http.get("/app/bancor/price",{

			}).then((res) => {
				console.log(res);
				if (res.code == 200) {
					this.ethMarketPrice = res.result.toFixed(8)
				}
			})
		},
		// 买入卖出交易(此方法只能是用账号登陆时使用)
		doTrade (type) {
			let postData = {}
			postData.address = this.getCurrentAddr.coinAddress
			postData.tokenName = 'AT'
			if (type == '买入') {
				if (this.getAtNumber <= 0 || (this.ethPrice <= 0 && this.ethPrice != "")) {
					this.alert({
						type: "info",
						msg: this.$t('message.homeInputErro')
					})
					return
				}
				postData.amount = this.buyEthNumber
				postData.tradeType = this.ethPrice == this.$t('message.homeMarketPrice') ? 'MARKET_BUY':'PUTUP_BUY'
				if (this.ethPrice != this.$t('message.homeMarketPrice') && this.ethPrice != "") {
					if(!/^\d+(\.\d+)?$/.test(this.ethPrice)) {
						this.alert({
							type: "error",
							msg: this.$t('message.homePriceErro')
						})
						return
					}
					postData.price = (this.ethPrice*1).toFixed(8)
				}
			} else if (type == '卖出') {
				if (this.getEthNumber <= 0 || (this.sellAtPrice <= 0 && this.sellAtPrice != "")) {
					this.alert({
						type: "info",
						msg: this.$t('message.homeInputErro')
					})
					return
				}
				postData.amount = this.buyAtNumber
				postData.tradeType = this.sellAtPrice == this.$t('message.homeMarketPrice') ? 'MARKET_SELL':'PUTUP_SELL'
				if (this.sellAtPrice != this.$t('message.homeMarketPrice') && this.sellAtPrice != "") {
					if(!/^\d+(\.\d+)?$/.test(this.sellAtPrice)) {
						this.alert({
							type: "error",
							msg: this.$t('message.homePriceErro')
						})
						return
					}
					postData.price = (this.sellAtPrice*1).toFixed(8)
				}
			}
			if(postData.price) {
				if(postData.price < this.ethMarketPrice*0.9) {
					this.openConfirm({
						content: this.$t('message.homePriceLower'),
						btn: [
							{
								text: this.$t('message.homeCancelTrade')
							},
							{
								type: "high",
								text: this.$t('message.homeContinueTrade'),
								cb: () => {
									this.placeOrder(postData, type)
								}
							}
						]
					})
				}else if(postData.price > this.ethMarketPrice*1.1) {
					this.openConfirm({
						content: this.$t('message.homePriceHiger'),
						btn: [
							{
								text: this.$t('message.homeCancelTrade')
							},
							{
								type: "high",
								text: this.$t('message.homeContinueTrade'),
								cb: () => {
									this.placeOrder(postData, type)
								}
							}
						]
					})
				}else {
					this.placeOrder(postData, type)
				}
			}else {
				this.placeOrder(postData, type)
			}
		},
		//下单
		placeOrder(postData, type) {
			this.$http.post("/app/bancor/order", postData).then((res) => {
				console.log(res);
				if (res.code == 200) {
					// 买卖成功，更新各种币的数量
					if (res.result.platform == 'IMPORT') {
						// 走去中心化平台
						if(type == "买入") {
							this.buyToken(res.result.orderId, postData.price || this.ethMarketPrice, postData.amount, postData.address)
						}else {
							this.sellToken(res.result.orderId, postData.price || this.ethMarketPrice, postData.amount, postData.address)
						}
					} else {
						this.$store.dispatch('updateProperty')
						this.alert({
							type: "success",
							msg: res.msg
						})
					}
				}
			})
		},
		// 撤单
		cancelOrder (item) {
			if (item.tradeStatus == 'DONE' || item.tradeStatus == 'CANCEL') return
			this.$http.post("/app/bancor/order/cancel/"+item.entrustId+"/"+this.getCurrentAddr.coinAddress).then((res) => {
				if (res.code == 200) {
					this.alert({
						type: "success",
						msg: this.$t('message.homeCancel')
					})
					// 撤单成功，更改状态&更新各种币的数量
					this.getBancorOrders(this.selectTap)
				}
			})
		},
		// 区块链转账(实时成交)
		buyToken(oid, atPrice, ethAmount, addr) {
			let that = this
			ethAmount = this.ethInfo.web3Instance.utils.toWei(ethAmount, "ether")
			this.ethInfo.apiHandle.methods.placeBuyOrder(oid, atPrice, ethAmount).send({
				from: addr,
				value: ethAmount,
				gas: 1000000
			}).on("receipt", function(receipt) {
				that.alert({
					type: "success",
					msg: that.$t('message.homeDone')
				})
			})
			.on("error", function(error) {
				that.alert({
					type: "error",
					msg: that.$t('message.homeFail')
				})
				that.cancelOrder({entrustId: oid})
			});
		},
		// 区块链卖at币(实时成交)
		sellToken(oid, atPrice, atAmount, addr) {
			let that = this
			atAmount = this.ethInfo.web3Instance.utils.toWei(atAmount, "ether")
			this.ethInfo.apiHandle.methods.placeSellOrder(oid, atPrice, atAmount).send({
				from: addr,
				gas: 1000000
			}).on("receipt", function(receipt) {
				that.alert({
					type: "success",
					msg: that.$t('message.homeDone')
				})
			})
			.on("error", function(error) {
				that.alert({
					type: "error",
					msg: that.$t('message.homeFail')
				})
				that.cancelOrder({entrustId: oid})
			});
		},
		openHelp1() {
			this.openConfirm({
				content: this.$t('message.homeLower'),
				btn: [{
					text: this.$t('message.PopClose')
				}]
			})
		},
		openHelp() {
			this.openConfirm({
				content: this.$t('message.homeHigher'),
				btn: [{
					text: this.$t('message.PopClose')
				}]
			})
		},
		//input聚焦去除市价文字
		...mapMutations({
			alert: "alert",
			openLogin: "OPEN_LOGIN",
			openConfirm: "OPEN_CONFIRM"
		})
	},
	components: {
	    HeaderBar,
	    FooterBar,
	}
 };
</script>

 <style lang="less">
	.home-page {
		margin: 0 auto;
		.main {
			// position: relative;
			text-align: center;
			-moz-user-select:none; /*火狐*/
			-webkit-user-select:none; /*webkit浏览器*/
			-ms-user-select:none; /*IE10*/
			user-select:none;
			background: url(../../public/img/bg.jpg) repeat left;
			background-size: 200px;
			.mask {
				position: absolute;
				width: 100%;
				height: 100%;
				background: -webkit-linear-gradient(rgba(0, 0, 0, 0.5), transparent, rgba(0, 0, 0, 0.5)); /* Safari 5.1 - 6.0 */
				background: -o-linear-gradient(rgba(0, 0, 0, 0.5), transparent, rgba(0, 0, 0, 0.5)); /* Opera 11.1 - 12.0 */
				background: -moz-linear-gradient(rgba(0, 0, 0, 0.5), transparent, rgba(0, 0, 0, 0.5)); /* Firefox 3.6 - 15 */
				background: linear-gradient(rgba(0, 0, 0, 0.5), transparent, rgba(0, 0, 0, 0.5)); /* 标准的语法（必须放在最后） */
			}
			.top {
        		position: relative;
				width: 100%;
				text-align: center;
				padding-top: 113px;
				padding-bottom: 72px;
				h1 {
					margin: 0;
					img {
						height: 84px;
					}
				}
				.total-bill {
          			position: relative;
          			z-index: 2;
					line-height: 64px;
					font-size: 24px;
					margin: auto;
          			cursor: pointer;
					width:480px;
					height:64px;
					background:linear-gradient(90deg,rgba(100,180,239,1),rgba(57,94,236,1));
					border-radius:4px;
                }
                .lizi {
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
				}
				.info {
					text-align: justify;
				}
			}
			.middle {
				width: 1200px;
        		margin: auto;
        		// position: relative;
				background:rgba(2,11,89,0.75);
				border-radius:24px 24px 0px 0px;
				padding-top: 42px;
				// height: 699px;
				.middle-title {
					font-size:28px;
					font-family:PingFang-SC-Bold;
					font-weight:bold;
					color:rgba(255,255,255,1);
					margin-bottom: 60px;
				}
				.buy-sell {
					display: flex;
					color: black;
					justify-content: left;
					p {
						margin: 10px 0;
						position: relative;
						color: #97ADFF;
						text-align: left;
						img {
							width: 17px;
							height: 17px;
							vertical-align: middle;
							margin-left: 9px;
						}
						span:last-child
						{
							position: absolute;
							right:0;
						}
					}
					.fund-number {
						text-align:center;
						font-weight: bold;
						width:520px;
						height:128px;
						border:1px solid rgba(110, 141, 255, 1);
						border-radius:4px;
						display: flex;
						align-items: center;
						justify-content: center;
						margin-left: 30px;

						.img1 {
							width: 73px;
							height: 96px;
						}
						.img2 {
							width: 83px;
							height: 85px;
						}
						div {
							p {
								font-size: 28px;
								color: #fff;
							}
							span {
										color: #6E7BDE;
										color: 16px;
							}
						}
					}
					.fund-sepc {
						  margin-left: 97px;
					}
					.buy {
						width: 48.3%;
						font-size: 16px;
						padding: 30px 30px 48px 30px;
						// height: 425px;
            			// position: relative;
            border-radius:6px;

						.title{
							font-size: 24px;
							color: #C8C8C8;
							margin: 20px 20px 20px 0;
							text-align: left;
						}
						.price-div {
							border: 1px solid #6E8DFF;
							border-radius: 6px;
							height: 48px;
					    	line-height: 48px;
							margin-top: 20px;
							.price {
								display: inline-block;
								width: 78%;
								border: none;
								outline: none;
								height: 100%;
								text-align: center;
								vertical-align: top;
								color: #fff;
								font-weight: bold;
								background: transparent;
							}
							.num {
								width: 54px;
								display: inline-block;
								text-align: center;
								border-right: 1px solid #6E8DFF;
								height: 100%;
								color: #8A97FF;
							}
							.num-right {
								border-left: 1px solid #6E8DFF;
								width: 54px;
								display: inline-block;
								text-align: center;
								height: 100%;
								color: #8A97FF;
							}
						}
						.buy-button {
							width: 520px;
							height: 48px;
							background:rgba(93,200,136,1);
							border-radius:4px;
							font-size:18px;
							font-family:PingFang-SC-Bold;
							font-weight:bold;
							color:rgba(255,255,255,1);
							line-height:48px;
							text-align: center;
							// position: absolute;
							cursor: pointer;
							margin-top: 67px;
					    // bottom: -149px;
						}
						.sell-button {
							background-color: #E95B62;
							margin-top: 0px;
						}
					}
					.sell {
						margin-left: 40px;
						border-radius:6px;
						.transparent {
							color: transparent;
						}
					}
				}

			}
		}
		.list-wrapper {
			padding: 30px 149px 5px 149px;
			background: linear-gradient(to bottom, #142b73, #030713, #030713, #030713, #142b73);
		}
		.list {
			color: #646464;
			font-size: 18px;
			margin-bottom: 123px;
			border-radius:6px;

			.top-button {
				font-size: 20px;
				font-weight: bold;
				color: #6986F4;
				display: flex;
				align-items: center;
				justify-content: center;
				// height: 90px;
				padding: 20px 0;
				span {
					display: inline-block;
					width: 50%;
					text-align: center;
					cursor: pointer;
				}
				.selected {
					color: #fff;
				}
			}
			.content {
				font-size: 16px;
				padding: 0 0 50px 0;
				li {
					display: flex;
					justify-content: center;
					text-align: center;
					align-items: center;
					padding: 8px 0;
					border-bottom: 1px solid #26276c;
					color: #fff;
					span {
						width: 16.6%;
						&.chedan {
							cursor: pointer;
						}
						&:first-child {
							text-align: left;
						}
						&:last-child {
							text-align: right;
						}
					}
				}
				.unit {
					padding: 18px 0;
					border-top: 1px solid #26276c;
					border-bottom: 1px solid #26276c;
					text-align: center;
					color: #6986F4;
				}
				.red {
					color: #E95B62;
			    text-shadow: 0px 0px 6px #E95B62;
				}
				.green {
					color: #5DC888;
			    text-shadow: 0px 0px 6px #5DC888;
				}
			}
		}
	}
	@media screen and (max-width: 800px) {
		.home-page {
			.main {
				.top {
					h2 {
						width: 80%;
						margin: auto;
					}
					.info {
						width: 90% !important;
						margin: auto;
					}
					.total-bill {
						width: 90%;
					}
				}
				.middle {
					width: 100%;
					.buy-sell {
						flex-wrap: wrap;
						    justify-content: center;
						.fund-number {
							margin: 0;
							width: 90%;
						}
						.fund-sepc {
							margin:20px auto 0px !important;
						}
						.buy {
							width: 100%;
							padding: 30px 10px 48px 10px;
							.price-div {
								    width: 100%;
										.num {
											width: 15%;
										}
										.price {
											width: 70%;
										}
										.num-right {
											width: 15%;
										}
							}
							.buy-button {
								width: 100%;

							}
						}
						.sell {
							margin-left: 0;
						}
					}
				}
			}
			.list-wrapper {
				padding: 30px 10px 5px 10px;
				.content {
					li span {
						width: 25% !important;
					}
				}
			}
		}
	}
</style>
