<template>
	<div class="trading-record">
	<HeaderBar></HeaderBar>
	<div class="main">
		<div class="content">
			<p class="title">
				<span>{{$t('message.assetsOfMine')}} > {{$t('message.tradeRecorde')}}</span>
				<span>
					{{$t('message.tradeType')}}:
					<select class="" name="" @change="getTradeRecord" v-model="operation">
						<option value="ALL">{{$t('message.tradeAll')}}</option>
						 <option value="ETH_RECHARGE">{{$t('message.tradeEthRecharge')}}</option>
						 <option value="ETH_WITHDRAW">{{$t('message.tradeEthWithdraw')}}</option>
						 <option value="BANCOR_BUY_AT">{{$t('message.tradeBancorBuyAT')}}</option>
						 <option value="BANCOR_SELL_AT">{{$t('message.tradeBancorSellAT')}}</option>
						 <option value="BANCOR_BUY_ETH">{{$t('message.tradeBancorBuyEth')}}</option>
						 <option value="BANCOR_SELL_ETH">{{$t('message.tradeBancorSellEth')}}</option>
						 <option value="DICE">{{$t('message.tradeDice')}}</option>
						 <option value="DICE_REWARD">{{$t('message.tradeDiceReward')}}</option>
						 <option value="DICE_DIG">{{$t('message.tradeDiceDig')}}</option>
						 <option value="INVITE_BONUS_AB">{{$t('message.tradeInviteBancor')}}</option>
					</select>
					{{$t('message.tradeCoinType')}}:
					<select class="" name="" @change="getTradeRecord" v-model="coinType">
						<option value="ALL">{{$t('message.tradeAll')}}</option>
						 <option value="ETH">ETH</option>
						 <option value="AT">AT</option>
						 <option value="AB">AB</option>
					</select>
				</span>
		</p>
			<li><div>{{$t('message.tradeTime')}}</div><div>{{$t('message.tradeCoinType')}}</div><div>{{$t('message.tradeType')}}</div><div>{{$t('message.homeVolume')}}</div><div>{{$t('message.homeState')}}</div><div>{{$t('message.homeOperation')}}</div></li>
			<li v-for="item in list">
				<div>{{$fmtDate(item.createTime, "full")}}</div>
				<div>{{item.coinType}}</div>
				<div>{{filterState(item)}}</div>
				<div>{{filterAmount(item)}}</div>
				<div>已完成</div>
				<!-- <div class="operation" :class="[item.platform !='DISPATCHER' ? '' : 'transparent']">{{$t('message.tradeDetail')}}</div> -->
				<div class="operation" @click="goDetail(item)">{{item.platform !='DISPATCHER' ? $t('message.tradeDetail'): '- -'}}</div>

			</li>
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
			    <mu-pagination :total="total" :current.sync="current" @change="getPaginationChange"></mu-pagination>
			  </mu-flex>
			</mu-container>
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
		 }
	 },
    created() {
	   this.getTradeRecord()
     },
     components: {
	    HeaderBar,
	    FooterBar,
		},
		methods: {
			// 交易类型的状态
			filterState(item) {
				switch (item.operation) {
					case 'ETH_RECHARGE':
					return this.$t('message.tradeEthRecharge')
					break;
					case 'ETH_WITHDRAW':
					return this.$t('message.tradeEthWithdraw')
					break;
					case 'BANCOR_BUY_AT':
					return this.$t('message.tradeBancorBuyAT')
					break;
					case 'BANCOR_SELL_AT':
					return this.$t('message.tradeBancorSellAT')
					break;
					case 'BANCOR_BUY_ETH':
					return this.$t('message.tradeBancorBuyEth')
					break;
					case 'BANCOR_SELL_ETH':
					return this.$t('message.tradeBancorSellEth')
					break;
					case 'DICE':
					return this.$t('message.tradeDice')
					break;
					case 'DICE_REWARD':
					return this.$t('message.tradeDiceReward')
					break;
					case 'DICE_DIG':
					return this.$t('message.tradeDiceDig')
					break;
					case 'INVITE_BONUS_AB':
					return this.$t('message.tradeInviteBancor')
					break;
				}
			},
			// 数量金额
			filterAmount(item) {
				if (['ETH_RECHARGE', 'BANCOR_BUY_AT', 'BANCOR_BUY_ETH', 'DICE_REWARD', 'DICE_DIG', 'INVITE_BONUS_AB'].indexOf(item.operation) > -1) {
					return '+ ' + item.amount
				} else {
					return '- ' + item.amount
				}
			},
			// 获取我的资产
			getTradeRecord () {
				this.$http.get("/app/user/trade_records",{
					params: {
							"coinType": this.coinType,
							"operation": this.operation,
							"page": this.current,
							'pageSize': 20
					}
				}).then((res) => {
					console.log(res);
					if (res.code == 200) {
						this.list = res.result.list
						this.total = Number(res.result.total)*10
					}
				})
			},

			 // 点击分页
			getPaginationChange() {
				console.log('this.current ',this.current);
        this.getTradeRecord();
      },
			// 详情
			goDetail (item) {
				if (item.platform =='DISPATCHER') return
				this.$http.get("/app/user/trade_records/" + item.businessId,{

				}).then((res) => {
					console.log(res);
					if (res.code == 200) {

					}
				})
			}
		}
 };
</script>

 <style lang="less">
	.trading-record {
		margin: 0 auto;
		.main {
			background-color: #2F59B7;
			padding: 40px 0;
			min-height: 821px;
			.content {
				width: 1200px;
				background-color: #1A439E;
				margin: auto;
				padding: 0 40px;
				.title {
					position: relative;
					padding: 15px 0;
					box-shadow:0px 0px 0px 0px rgba(0,10,86,1);
					color: #fff;
					font-size: 18px;
					span:last-child {
						position: absolute;
						right: 0;
						color: #75C1FF;
						font-size: 16px;
					}
					span {
						select {
							margin-right: 15px;
							width: 120px;
							background-color: #123789;
					    border: 1px solid rgba(47,89,183,1);
					    border-radius: 4px;
					    outline: none;
					    color: white;
							font-size: 12px;
							height: 24px;
						}
					}
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
					border-bottom: 1px solid #123990;
					line-height: 3.5;
					div {
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
					 	color: #75C1FF;
						span {
							margin-left: 10px;
						}
					 }
					 .transparent {
					 	color: transparent;
					 }
				}
			}
		}

	}
	@media screen and (max-width: 800px) {
		.trading-record {
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
