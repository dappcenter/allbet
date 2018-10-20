<template>
	<div class="home-page">
	<HeaderBar type="steep"></HeaderBar>
	<div class="main">
		<div class="top">
			<h1>Allbet</h1>
			<h2>基于 Bancor 的实用增强型通证协议,多维 Dapp 游戏生态系统</h2>
			<div style="width:70%;margin:30px auto 40px auto;text-align:left;font-size:18px;color:#FEFEFE;">AT 即 Allbet Token，固定总量1000 万。是 Allbet 生态中代表 Allbet 用户以及开发者权益的应用型通证，也是连接钱包、用户以及项目开发者的重要纽带。发行后所有通证都存储在一个合约控制的 AT 通证池里（非团队所有），同时有一个对应的
				ETH 资金池，用户从通证池购买通证，花费的 ETH 会进入 ETH 资金池（非团队所有）。所有操作都是协议合约直接控制的，
				区块链上信息可查。</div>
			<div class="total-bill" v-if="getCurrentAddr.token">
				我的AT总量：{{this.getCurrentAddr.at}}
			</div>
			<div class="total-bill" v-else @click="openLogin">
				登陆
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
					<span>ETH 资金池</span>
				</div>
				<div class="fund-number">
					<p>{{result.dbPool}}AT</p>
					<img src="../../public/home/at.png" class="at"><br/>
					<span>AT 通证池</span>
				</div>
				<img src="../../public/home/two.png" class="two">
			</div>
			<div class="buy-sell">
				<div class="buy">
					<p class="title">买入 AT</p>
					<p><span :class="[getCurrentAddr.token?'':'transparent']">可用：{{this.getCurrentAddr.eth}} ETH</span><span>1 AT = {{ethMarketPrice}} ETH</span></p>
					<div class="price-div">
						<span class="num">价格</span>
						<input type="text" placeholder="请输入 价格" class="price" v-model="ethPrice" @change="changeAtNumber">
						<span class="num-right">ETH</span>
					</div>
					<div class="price-div">
						<span class="num">数量</span>
						<input type="text" placeholder="请输入买入 ETH 数量" class="price" v-model="buyEthNumber" @change="changeAtNumber">
						<span class="num-right">ETH</span>
					</div>
					<p><span>您将获得 {{getAtNumber}} AT</span><span>系统自动交易<img src="../../public/home/quote.png" alt=""></span></p>
					<div class="buy-button" v-if="getCurrentAddr.token" @click="doTrade('买入')">
						买入
					</div>
					<div class="buy-button" v-else @click="openLogin">
						登陆
					</div>
				</div>
				<div class="buy sell">
					<p class="title">卖出 AT</p>
					<p><span :class="[getCurrentAddr.token?'':'transparent']">可用：{{this.getCurrentAddr.at}} AT</span><span>1 AT = {{ethMarketPrice}} ETH</span></p>
					<div class="price-div">
						<span class="num">价格</span>
						<input type="text" placeholder="请输入 价格" class="price" v-model="sellAtPrice" @change="changeEthNumber">
						<span class="num-right">ETH</span>
					</div>
					<div class="price-div">
						<span class="num">数量</span>
						<input type="text" placeholder="请输入买入 AT数量" class="price" v-model="buyAtNumber" @change="changeEthNumber">
						<span class="num-right">AT</span>
					</div>
					<p><span>您将获得 {{getEthNumber}} ETH</span><span>系统自动交易<img src="../../public/home/quote.png" alt=""></span></p>
					<p style="text-align:center;color:#E95B62;">出售将收取 3% 手续费</p>
					<div class="buy-button sell-button" v-if="getCurrentAddr.token" @click="doTrade('卖出')">
						卖出
					</div>
					<div class="buy-button sell-button" v-else @click="openLogin">
						登陆
					</div>
				</div>
			</div>
			<div class="list">
				<div class="top-button">
					<span @click="clickTap(0)" :class="[selectTap == 0?'selected':'']">近期交易</span>
					<span @click="clickTap(1)" :class="[selectTap == 1?'selected':'']">我的委托单</span>
				</div>
				<div class="content">
					<div class="recent-order" v-if="selectTap == 0">
						<li class="unit"><span>玩家</span><span>ETH</span><span>AT</span><span>AT价格</span><span>交易类型</span><span>成交时间</span></li>
						<li v-for="item in recentOrderList">
							<span>{{item.address}}</span>
							<span>{{item.tradeType == 'MARKET_BUY'? '+ '+item.inAmount:'- '+item.outAmount}}</span>
							<span>{{item.tradeType == 'MARKET_BUY'?'- '+item.outAmount:'+ '+item.inAmount}}</span>
							<span>{{item.dbPrice}} ETH</span>
							<span>{{item.tradeType == 'MARKET_BUY'?'买入':'卖出'}}</span>
							<span>{{item.recdDoneTime}}</span>
						</li>
					</div>
					<div class="my-order" v-else>
						<li class="unit"><span>玩家</span><span>ETH</span><span>AT</span><span>AT价格</span><span>交易类型</span><span>创建时间</span><span>完成时间</span><span>状态</span><span>操作</span></li>
						<li v-for="item in recentOrderList">
							<span>{{item.address}}</span>
							<span>{{filter(item)}}</span>
							<span>{{filter1(item)}}</span>
							<span>{{item.dbPrice}} ETH</span>
							<span>{{item.tradeType == 'MARKET_BUY'?'买入':'卖出'}}</span>
							<span>{{item.recdCreateTime}}</span>
							<span>{{item.recdDoneTime?item.recdDoneTime:'- -'}}</span>
							<span>{{filterState(item)}}</span>
							<span @click="cancelOrder(item)">{{item.tradeStatus != 'DONE' && item.tradeStatus != 'CANCEL'?'撤单':'- -'}}</span>
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
			ethPrice: "市价", // 1ETH=??At
			buyEthNumber: '', // 买入??ETh
			getAtNumber: 0, // 获得AT的数量

			sellAtPrice: '市价', // 1at=??eth
			buyAtNumber: '',// 买入??AT
			getEthNumber: 0,// 获得ETH的数量

			result: {},
			selectTap: 0,

			recentOrderList: [], //近期交易列表
			// entrustOrderList: [], //委托单列表
			timer: null
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
			}
    },
    components: {
	    HeaderBar,
	    FooterBar,
	},
	created () {
		this.getInfo()
		this.getBancorOrders(this.selectTap)
		this.getMarketAtPrice()
	},
	mounted() {

	},
	methods: {
		filter(item) {
			if (item.tradeType == 'MARKET_BUY') {
				return item.inAmount ? '+ '+item.inAmount:'- -'
			} else {
				return item.outAmount?'- '+item.outAmount:'--'
			}
		},
		filter1(item) {
			if (item.tradeType == 'MARKET_BUY') {
				return item.outAmount ? '- '+item.outAmount:'- -'
			} else {
				return item.inAmount?'+ '+item.inAmount:'--'
			}
		},
		filterState(item) {
			switch (item.tradeStatus) {
				case 'ENTRUST':
				return '委托中'
				break;
				case 'DONE':
				return '交易成功'
				break;
				case 'WAITING':
				return '等待中'
				break;
				case 'CANCEL':
				return '撤单成功'
				break;
			}
		},
		changeAtNumber() {
				this.getAtNumber = this.ethPrice == '市价' ? (1/this.ethMarketPrice).toFixed(8) * this.buyEthNumber : (1/this.ethPrice).toFixed(8) * this.buyEthNumber
		},
		changeEthNumber() {
				this.getEthNumber = this.sellAtPrice == '市价' ? this.ethMarketPrice * this.buyAtNumber : this.sellAtPrice * this.buyAtNumber
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
		// 获取近期交易
		getBancorOrders (selectTap) {
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
					// console.log('this.recentOrderList', this.recentOrderList);
				}
			})
		},
		// 切换tap
		clickTap (i) {
			this.selectTap = i
			this.getBancorOrders(this.selectTap)
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
				if (this.getAtNumber <= 0) return
				postData.amount = this.buyEthNumber
				postData.tradeType = this.ethPrice == '市价'?'MARKET_BUY':'PUTUP_BUY'
				if (this.ethPrice != '市价') {
					postData.price = (1/this.ethPrice).toFixed(8)
				}
			} else if (type == '卖出') {
				if (this.getEthNumber <= 0) return
				postData.amount = this.buyAtNumber
				postData.tradeType = this.sellAtPrice == '市价'?'MARKET_SELL':'PUTUP_SELL'
				if (this.sellAtPrice != '市价') {
					postData.price = this.sellAtPrice
				}
			}
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
			// 走中心化平台撤单
			if (item.platform == 'DISPATCHER') {
				this.$http.post("/app/bancor/order/cancel/"+item.entrustId).then((res) => {
					console.log(res);
					if (res.code == 200) {
						this.alert({
								type: "success",
								msg: "撤单成功！"
						})
						// 撤单成功，更改状态&更新各种币的数量
						this.getBancorOrders(this.selectTap)
					}
				})
			} else {
				// 走区块链平台撤单

			}
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
					msg: "交易成功"
				})
			})
			.on("error", function(error) {
				that.alert({
					type: "error",
					msg: "交易失败"
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
					msg: "交易成功"
				})
			})
			.on("error", function(error) {
				that.alert({
					type: "error",
					msg: "交易失败"
				})
			});
		},
		...mapMutations({
			alert: "alert",
			openLogin: "OPEN_LOGIN"
		})
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
