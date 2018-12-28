<template>
	<div class="trading-record">
	<HeaderBar></HeaderBar>
	<div class="main" :style="{minHeight: $window.innerHeight - 150 + 'px'}">
		<div class="content">
			<div class="title">
				<nav><router-link to="my-assets">{{$t('message.assetsOfMine')}} ></router-link> {{$t('message.tradeRecorde')}}</nav>
				<div class="control">
					<div class="select-wrap">
						<label>{{$t('message.tradeType')}}:</label>
						<select class="" name="" @change="selectChange" v-model="operation">
							<option value="ALL">{{$t('message.tradeAll')}}</option>
							<option value="RECHARGE">{{$t('message.tradeEthRecharge')}}</option>
							<option value="WITHDRAW">{{$t('message.tradeEthWithdraw')}}</option>
							<option value="BANCOR_BUY_AT">{{$t('message.tradeBancorBuy')}}</option>
							<option value="BANCOR_SELL_AT">{{$t('message.tradeBancorSell')}}</option>
							<option value="DICE">{{$t('message.tradeDice')}}</option>
							<option value="DICE_REWARD">{{$t('message.tradeDiceReward')}}</option>
							<option value="DICE_DIG">{{$t('message.tradeDiceDig')}}</option>
							<option value="INVITE_BONUS_DICE_AB">{{$t('message.tradeInviteBancor')}}</option>
							<option value="INVITE_BONUS_AB">{{$t('message.tradeRegisterIncentives')}}</option>
							<option value="RECHARGE_AMOUNT_GIFT">{{$t('message.tradeRechargeAmountGift')}}</option>
							<option value="DICE_TIME_GIFT">{{$t('message.tradeDiceTimeGift')}}</option>
							<option value="DICE_AMOUNT_GIFT">{{$t('message.tradeDiceAmountGift')}}</option>
						</select>
					</div>
					<div class="select-wrap">
						<label>{{$t('message.tradeCoinType')}}:</label>
						<select class="" name="" @change="selectChange" v-model="coinType">
							<option value="ALL">{{$t('message.tradeAll')}}</option>
							<option value="ETH">ETH</option>
							<!-- <option value="AT">AT</option> -->
							<option value="AB">AB</option>
							<option value="TRX">TRX</option>
						</select>
					</div>
				</div>
			</div>
			<li class="head-title">
				<div>{{$t('message.tradeTime')}}</div>
				<div class="nominscreen">{{$t('message.tradeCoinType')}}</div>
				<div>{{$t('message.tradeType')}}</div>
				<div class="vol">{{$t('message.homeVolume')}}</div>
				<div class="nominscreen">{{$t('message.homeState')}}</div>
				<div class="">{{$t('message.homeOperation')}}</div>
			</li>
			<div class="padding">
				<li class="" v-for="item in list">
					<span class="nominscreen">{{$fmtDate(item.createTimestamp, "full")}}</span>
					<span class="minscreen">{{$fmtDate(item.createTimestamp, "month")}}</span>
					<div class="nominscreen">{{item.coinType}}</div>
					<div>{{filterState(item)}}</div>
					<div class="vol">{{item.amount}}</div>
					<div class="nominscreen">{{$t("message.tradeDone")}}</div>
					<div class="operation btn" v-if="['RECHARGE', 'WITHDRAW'].indexOf(item.realOperation) > -1 && item.platform =='DISPATCHER'" @click="goDetail(item)">{{$t('message.tradeDetail')}}</div>
					<div class="operation" v-else>- -</div>
				</li>
			</div>
			<!-- <div class="charge">
				<div class="desc address">
					<p class="left">{{$t('message.assetsCoinAddress')}}：<span>0xFBb1b73C4f0BDa4f67dcA266ce6Ef42f520fBB98</span></p>
					<p class="right">{{$t('message.assetsHandlingFee')}}：<span>0.00500000</span></p>
				</div>
				<div class="desc time">
					<p class="left">{{$t('message.tradeBlockchain')}}：<span>0xFBb1b73C4f0BDa4f67dcA266ce6Ef42f520o093fsdfeinbla9324</span></p>
					<p class="right">{{$t('message.tradeProcessingTime')}}：<span>2018.10.13 15:38:34</span></p>
				</div>
			</div> -->
			<mu-container>
			  <mu-flex justify-content="center">
			    <mu-pagination :total="total" :pageCount="5" :page-size="20" :current.sync="current" @change="getTradeRecord"></mu-pagination>
			  </mu-flex>
			</mu-container>

			<mu-dialog :open.sync="tradingDetail" :append-body="false" class="register-accout">
				<p v-if="itemDetail.realOperation == 'RECHARGE'">{{$t('message.tradeEthRecharge')}}</p>
				<p v-else>{{$t('message.tradeEthWithdraw')}}</p>

				<!-- 充币地址 -->
				<li v-if="itemDetail.realOperation == 'RECHARGE'">
					<span>{{$t('message.assetsRechargeAddress')}}:</span>
					<div>{{detailData.coinAddress}}</div>
				</li>
				<!-- AT价格 -->
				<!-- <li v-if="detailData.bancorPrice">
					<span>{{$t('message.homeAtPrice')}}:</span>
					<div>{{detailData.bancorPrice}}</div>
				</li> -->
				<!-- 提币地址 -->
				<li v-if="itemDetail.realOperation == 'WITHDRAW'">
					<span>{{$t('message.assetsCoinAddress')}}:</span>
					<div>{{detailData.destAddress}}</div>
				</li>
				<!-- 区块链交易ID -->
				<li v-if="detailData.txId">
					<span>{{$t('message.tradeBlockchain')}}:</span>
					<div>{{detailData.txId}}</div>
				</li>
				<!-- 手续费 -->
				<li v-if="itemDetail.realOperation != 'RECHARGE'">
					<span>{{$t('message.tradePlatform')}}:</span>
					<div>{{detailData.fee}} {{detailData.transferCoinType}}</div>
				</li>
				<!-- 处理时间 -->
				<li v-if="detailData.createTimestamp">
					<span>{{$t('message.tradeProcessingTime')}}:</span>
					<div>{{$fmtDate(itemDetail.createTimestamp, 'full')}}</div>
				</li>
			</mu-dialog>
		</div>
	</div>
	<FooterBar ref="ft"></FooterBar>
</div>

</template>

<script>
import HeaderBar from "@/components/common/header_bar"
import FooterBar from "@/components/common/footer_bar"
export default {
	data () {
		return {
			ethPrice: 15.3,
			current: 1,
			list: [],
			total: 1,
			coinType: "ALL",
			operation: "ALL",
			address: "", //提币地址
			handlingFee: "", //手续费
			tradeId: "", //手续费
			dealingTime: "", //钱包处理时间
			tradingDetail: false, // 交易详情
			detailData: {},
			itemDetail: {}, // 点击详情item的值
		}
	},
	mounted() {
		if(this.currentAddr.token) {
			this.getTradeRecord()
		}
	},
    components: {
		HeaderBar,
		FooterBar,
	},
	watch: {
		currentAddr(newVal) {
			if(newVal.token) {
				this.getTradeRecord()
			}
		}
	},
	computed: {
		currentAddr() {
			return this.$store.state.user.currentAddr
		}
	},
	methods: {
		// 交易类型的状态
		filterState(item) {
			switch (item.realOperation) {
				case 'RECHARGE':   //平台充币
					return this.$t('message.tradeEthRecharge')
				break;
				case 'WITHDRAW':  //平台提现
					return this.$t('message.tradeEthWithdraw')
				break;
				case 'BANCOR_BUY_AT': //购买(单位AT)
					return this.$t('message.tradeBancorBuy')
				break;
				case 'BANCOR_SELL_AT':  //出售(单位AT)
					return this.$t('message.tradeBancorSell')
				break;
				case 'DICE':  //游戏下注
					return this.$t('message.tradeDice')
				break;
				case 'DICE_REWARD':  //游戏奖金
					return this.$t('message.tradeDiceReward')
				break;
				case 'DICE_DIG':  //挖矿奖励
					return this.$t('message.tradeDiceDig')
				break;
				case 'INVITE_BONUS_DICE_AB':  //邀请奖励
					return this.$t('message.tradeInviteBancor')
				break;
				case 'INVITE_BONUS_AB':  //注册奖励
					return this.$t('message.tradeRegisterIncentives')
				break;
				case 'RECHARGE_AMOUNT_GIFT':  //单次充值满送
					return this.$t('message.tradeRechargeAmountGift')
				break;
				case 'DICE_TIME_GIFT':  //单天投注次数满送
					return this.$t('message.tradeDiceTimeGift')
				break;
				case 'DICE_AMOUNT_GIFT':  //单天投注金额满送
					return this.$t('message.tradeDiceAmountGift')
				break;
			}
		},
		// 数量金额
		filterAmount(item) {
			if (['ETH_RECHARGE', 'BANCOR_BUY_AT', 'BANCOR_BUY_ETH', 'DICE_REWARD', 'DICE_DIG', 'INVITE_BONUS_AB', 'INVITE_BONUS_DICE_AB', 'AT_RECHARGE', 'BANCOR_SELL_AT', 'BANCOR_SELL_ETH'].indexOf(item.operation) > -1) {
				return '+ ' + item.amount
			} else {
				return '- ' + item.amount
			}
		},
		// 获取我的交易记录
		getTradeRecord () {
			this.$http.get("/app/user/trade_records",{
				params: {
					"coinType": this.coinType,
					"operation": this.operation,
					"page": this.current,
					'pageSize': 20,
					"coinAddress": this.currentAddr.coinAddress
				}
			}).then((res) => {
				if (res.code == 200) {
					this.list = res.result.list
					this.total = res.result.total*1
				}
			})
		},
		// 详情
		goDetail (item) {
			this.itemDetail = item
			if (item.platform !='DISPATCHER') return
			this.$http.get("/app/user/trade_records/" + item.id,{

			}).then((res) => {
				console.log(res);
				if (res.code == 200) {
					this.detailData = res.result || {}
					this.tradingDetail = true
				}
			})
		},
		selectChange() {
			this.current = 1
			this.getTradeRecord()
		}
	}
}
</script>

<style lang="less">
	.trading-record {
		margin: 0 auto;
		.main {
			background-color: #22202C;
			padding: 40px 0;
			.content {
				width: 1200px;
				background-color: #49425C;
				margin: auto;
				// padding: 0 40px;
				.title {
					display: flex;
			    	justify-content: left;
					padding: 15px 40px;
					box-shadow:0px 0px 0px 0px rgba(0,10,86,1);
					color: #D3CDFF;
					font-size: 16px;
					nav{
						flex: 1;
						a {
							color: #A29ADF !important;
						}
					}
					.control {
						display: flex;
						.select-wrap {
							margin-left: 15px;
							label {
								font-size: 16px;
								margin-right: 5px;
							}
							select {
								width: 120px;
								background-color: #322A46;
								border: none;
								border-radius: 4px;
								outline: none;
								color: white;
								font-size: 12px;
								height: 24px;
							}
						}
					}
				}
				li span {
					width: 33.3%;
				}
				.charge {
					background-color: #123789;
					padding: 0 19px;
					font-size: 14px;
					color: #4A69B1;
					.desc {
						display: flex;
						align-items: flex-end;
						justify-content: flex-start;
						padding: 10px 0;
						span {
							color: #fff;
						}
						.left {
							width: 60%;
						}
						.right {
							flex: 1;
							text-align: right;
						}
					}
					.address {
						border-bottom: 1px solid #0C2F7D;
					}
				}
				li {
					display: flex;
					align-items: center;
					justify-content: center;
					border-bottom: 1px solid #2F2840;
					line-height: 3.5;
					&>div {
						width: 33.3%;
						text-align: center;
					}
					div:first-child {
						text-align: left;
					}
					div:last-child {
						text-align: right;
					}
					 .operation {
					 	color: #FFDB5B;
						span {
							margin-left: 10px;
						}
						&.btn {
							cursor: pointer;
						}
					 }
					 .transparent {
					 	color: transparent;
					 }
				}
				.padding {
					 padding: 0 40px;
				}
				.head-title {
					background-color: #3F3753;
					font-size: 14px;
					color: #9882D0;
					padding: 0 40px;
					line-height: 2.5;
					border-bottom: 1px solid transparent;
				}
				.align-items-start {
					    padding: 15px 0;
				}
				.mu-pagination-item.mu-button.is-current {
					background-color: transparent;

				}
				.mu-pagination li {
					border-bottom: 1px solid transparent !important;
				}
				.mu-dialog {
					width: 42%;
				}
				.mu-dialog-body {
					background-color: #52476F;
					color: #CCBCF8;
					p {
						font-size:20px;
						font-weight:bold;
						text-align: center;
						padding: 10px;
						margin-bottom: 10px;
					}
					li {
						font-size: 14px;
						display: flex;
						justify-content: flex-start;
						align-items: center;
						border-bottom: none;
						margin-top: 5px;
						span {
							text-align: left;
							width: 38%;
						}
						div {
							text-align: right;
							flex: 1;
							word-wrap: break-word;
							line-height: initial;
						}
					}
					// padding: 10px;
				}
			}
		}
	}
	@media screen and (max-width: 800px) {
		.trading-record {
			.main {
				.content {
					width: 90%;
					padding: 0 10px;
					.title {
						display: block;
						padding: 15px 0px;
						nav{
							width: 100%;
							margin-bottom: 10px;
						}
						.control {
							justify-content: space-between;
							.select-wrap {
								margin-left: 0;
								label {
									display: block;
									font-size: 12px;
								}
								select {
									width: 120px;
									border-radius: 4px;
									outline: none;
									color: white;
									font-size: 10px;
									height: 24px;
								}
							}
						}
					}
					.head-title {
						padding: 5px;
						background-color: transparent;
					}
					.padding {
						padding: 0 5px;
						font-size: 12px;
					}
					li {
						.vol {
							text-align: right;
						}
					}
					.mu-dialog  {
						width: 80%;
						.mu-dialog-body {
							padding: 10px;
							li {
								flex-direction: column;
								line-height: inherit;
								span {
									width: 100%;
									 margin: 15px 0 5px 0;
								}
								div {
									width: 100%;
									text-align: left;
									word-break: break-all;
									line-height: 1.5;
								}
							}
						}
					}
				}
			}
		}
	}
</style>
