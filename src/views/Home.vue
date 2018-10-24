<template>
	<div class="home-page">
	<HeaderBar type="steep"></HeaderBar>
	<div class="main">
		<div class="top">
			<h1>Allbet</h1>
			<h2>{{$t('message.homeAllet')}}</h2>
			<div style="width:70%;margin:30px auto 40px auto;text-align:left;font-size:18px;color:#FEFEFE;">{{$t('message.homeAlletDesc')}}</div>
			<div class="total-bill" v-if="getCurrentAddr.token">
				{{$t('message.homeTotalAt')}}{{this.getCurrentAddr.at}}
			</div>
			<div class="total-bill" v-else @click="openLogin">
				{{$t('message.login')}}
			</div>

            <vue-particles
                color="#2a46bb"
                :particleOpacity="0.7"
                :particlesNumber="60"
                shapeType="circle"
                :particleSize="4"
                linesColor="#5c77e5"
                :linesWidth="1"
                :lineLinked="true"
                :lineOpacity="0.4"
                :linesDistance="150"
                :moveSpeed="2"
                :hoverEffect="true"
                hoverMode="grab"
                :clickEffect="true"
                clickMode="push"
                class="lizi"
            >
            </vue-particles>
		</div>
		<div class="middle">
			<div class="fund-pool">
				<img src="../../public/home/three.png" class="three">
				<div class="fund-number">
					<p>{{result.ethPool}}ETH</p>
					<img src="../../public/home/eth.png" class="eth"><br/>
					<span>{{$t('message.homeETHReserve')}}</span>
				</div>
				<div class="fund-number">
					<p>{{result.dbPool}}AT</p>
					<img src="../../public/home/at.png" class="at"><br/>
					<span>{{$t('message.homeATReserve')}}</span>
				</div>
				<img src="../../public/home/two.png" class="two">
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
					<p><span>{{$t('message.homeExpectedGet')}} {{getAtNumber}} AT</span><span>{{$t('message.homeAutomaticTrading')}}<img src="../../public/home/quote.png" alt="" @click="openHelp"></span></p>
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
					<p style="text-align:center;color:#E95B62;">{{$t('message.homeTokenFee')}}</p>
					<div class="buy-button sell-button" v-if="getCurrentAddr.token" @click="doTrade('卖出')">
						{{$t('message.homeSell')}}
					</div>
					<div class="buy-button sell-button" v-else @click="openLogin">
						{{$t('message.login')}}
					</div>
				</div>
			</div>
			<div class="list">
				<div class="top-button">
					<span @click="getBancorOrders(0)" :class="[selectTap == 0?'selected':'']">{{$t('message.homeRecentPlayers')}}</span>
					<span @click="getBancorOrders(1)" :class="[selectTap == 1?'selected':'']">{{$t('message.homeMyOrders')}}</span>
				</div>
				<div class="content">
					<div class="recent-order" v-if="selectTap == 0">
						<li class="unit"><span>{{$t('message.homePlayer')}}</span><span>ETH</span><span>AT</span><span>{{$t('message.homeAtPrice')}}</span><span>{{$t('message.homeTransactionType')}}</span><span>{{$t('message.homeTransactionTime')}}</span></li>
						<li v-for="item in recentOrderList">
							<span>{{item.address}}</span>
							<span>{{item.tradeType == 'MARKET_BUY'? '- '+item.inAmount:'+ '+item.outAmount}}</span>
							<span>{{item.tradeType == 'MARKET_BUY'?'+ '+item.outAmount:'- '+item.inAmount}}</span>
							<span>{{item.dbPrice}} ETH</span>
							<span>{{tradeType[item.tradeType]}}</span>
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
							<span>{{tradeType[item.tradeType]}}</span>
							<span>{{$fmtDate(item.recdCreateTime, "full")}}</span>
							<span>{{item.recdDoneTime?item.recdDoneTime:'- -'}}</span>
							<span>{{filterState(item)}}</span>
							<span class="chedan" v-if="item.tradeStatus == 'ENTRUST' || item.tradeStatus == 'WAITING'" @click="cancelOrder(item)">{{$t('message.homeWithdrawal')}}</span>
							<span v-else>- -</span>
						</li>
					</div>
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
			ethPrice: this.$t('message.homeMarketPrice'), // 1ETH=??At
			buyEthNumber: '', // 买入??ETh

			sellAtPrice: this.$t('message.homeMarketPrice'), // 1at=??eth
			buyAtNumber: '',// 买入??AT

			result: {},
			selectTap: 0,

			recentOrderList: [], //近期交易列表
			// entrustOrderList: [], //委托单列表
			timer: null,
			tradeType: {
				'MARKET_BUY': this.$t('message.homeBuy'),
				'MARKET_SELL': this.$t('message.homeSell'),
				'PUTUP_BUY': this.$t('message.homeBuy'),
				'PUTUP_SELL': this.$t('message.homeSell'),
			}
		}
	},
	mounted() {

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
				return 1/this.ethMarketPrice * this.buyEthNumber
			}else{
				return 1/this.ethPrice * this.buyEthNumber
			}
		},
		getEthNumber() {
			return this.sellAtPrice == this.$t('message.homeMarketPrice') ? this.ethMarketPrice * this.buyAtNumber : this.sellAtPrice * this.buyAtNumber
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
		filter(item) {
			if (item.tradeType == 'MARKET_BUY') {
				return item.inAmount ? '- '+item.inAmount:'- -'
			} else {
				return item.outAmount?'+ '+item.outAmount:'--'
			}
		},
		filter1(item) {
			if (item.tradeType == 'MARKET_BUY') {
				return item.outAmount ? '+ '+item.outAmount:'- -'
			} else {
				return item.inAmount?'- '+item.inAmount:'--'
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
		getBancorOrders (selectTap) {
			this.recentOrderList = []
			this.selectTap = selectTap
			this.$http.get("/app/home/bancor_orders",{
			params:{
				"onlyMe": selectTap == 1?true:false,
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
				value: ethAmount
			}).on("receipt", function(receipt) {
				that.alert({
					type: "success",
					msg: this.$t('message.homeDone')
				})
			})
			.on("error", function(error) {
				that.alert({
					type: "error",
					msg: this.$t('message.homeFail')
				})
			});
		},
		// 区块链卖at币(实时成交)
		sellToken(oid, atPrice, atAmount, addr) {
			let that = this
			atAmount = this.ethInfo.web3Instance.utils.toWei(atAmount, "ether")

			this.ethInfo.apiHandle.methods.placeSellOrder(oid, atPrice, atAmount).send({
				from: addr,
			}).on("receipt", function(receipt) {
				that.alert({
					type: "success",
					msg: this.$t('message.homeDone')
				})
			})
			.on("error", function(error) {
				that.alert({
					type: "error",
					msg: this.$t('message.homeFail')
				})
			});
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
			min-height: 1000px;
			.top {
                position: relative;
				height: 613px;
				background:linear-gradient(180deg,rgba(0,6,54,1),rgba(57,94,236,1));
				width: 100%;
				text-align: center;
				padding-top: 113px;
				.total-bill {
                    position: relative;
                    z-index: 2;
					width: 320px;
					height: 48px;
					line-height: 48px;
					font-size: 20px;
					background:linear-gradient(90deg,rgba(100,180,239,1),rgba(26,40,217,1));
					border-radius:48px;
					box-shadow:0px 1px 0px 0px rgba(136,201,255,1);
					margin: auto;
                    font-weight: bold;
                    cursor: pointer;
                }
                .lizi {
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                }
			}
			.middle {
				width: 1200px;
                margin: -100px auto 0 auto;
                position: relative;
				.fund-pool {
					display: flex;
					justify-content: space-around;
					background-color: #FFFFFF;
                    height: 250px;
                    box-shadow:0px 0px 2px 0px rgba(230,230,230,1);
                    border-radius:6px;
					.fund-number {
						text-align:center;
						position: relative;
						font-weight: bold;
						p {
							left: 50%;
							top: 45%;
							transform: translate(-50%,-50%);
							font-size: 28px;
							color: #486BF9;
							position: absolute;
						}
					}
					.three {
						width: 95px;
						height: 139px;
						margin-top: 29px;
					}
					.eth {
						width: 252px;
						height: 197px;
					}
					.at {
						width: 271px;
						height: 210px;
					}
					.two {
						width: 64px;
						height: 104px;
						margin-top: 116px;
					}
					span {
						    color: black;
					}
				}
				.buy-sell {
					display: flex;
					color: black;
					justify-content: left;
                    margin: 50px 0 40px 0;
					p {
						margin: 10px 0;
						position: relative;
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
					.buy {
						background-color: #fff;
						width: 48.3%;
						font-size: 16px;
						padding: 30px 30px 0px 30px;
						height: 425px;
                        position: relative;
                        box-shadow:0px 0px 2px 0px rgba(230,230,230,1);
                        border-radius:6px;
						.title{
							font-size: 24px;
							color: #C8C8C8;
							margin: 0 20px 20px 0;
						}
						.price-div {
							border: 1px solid #DCDCDC;
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
								color: #323232;
								font-weight: bold;
							}
							.num {
								width: 54px;
								display: inline-block;
								text-align: center;
								border-right: 1px solid #DCDCDC;
								height: 100%;
							}
							.num-right {
								border-left: 1px solid #DCDCDC;
								width: 54px;
								display: inline-block;
								text-align: center;
								height: 100%;
							}
						}
						.buy-button {
							width: 520px;
							height: 48px;
							background:rgba(93,200,136,1);
							border-radius:24px;
							font-size:18px;
							font-family:PingFang-SC-Bold;
							font-weight:bold;
							color:rgba(255,255,255,1);
							line-height:48px;
							text-align: center;
							position: absolute;
							cursor: pointer;
					    	bottom: 30px;
						}
						.sell-button {
							background-color: #E95B62;
						}
					}
					.sell {
						background-color: #fff;
						margin-left: 40px;
						box-shadow:0px 0px 2px 0px rgba(230,230,230,1);
						border-radius:6px;
						.transparent {
							color: transparent;
						}
					}
				}
				.list {
					background-color: #FFFFFF;
					color: #646464;
					font-size: 18px;
                    margin-bottom: 123px;
                    box-shadow:0px 0px 2px 0px rgba(230,230,230,1);
                    border-radius:6px;

					.top-button {
						font-size: 24px;
						font-weight: bold;
						color: #969696;
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
							color: #323232;
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
							border-bottom: 1px solid #DCDCDC;
							span {
								width: 16.6%;
								&.chedan {
									cursor: pointer;
								}
							}
						}
						.unit {
							padding: 18px 0;
							border-top: 1px solid #DCDCDC;
							border-bottom: 1px solid #DCDCDC;
							text-align: center;
						}
					}
				}
			}
		}
	}
	@media screen and (max-width: 800px) {
		.home-page {
			.fund-pool {
				flex-direction: column;
				padding: 0;
				&>section {
					width: 100%;
				}
			}
		}
	}
</style>
