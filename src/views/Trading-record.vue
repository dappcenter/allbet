<template>
	<div class="trading-record">
	<HeaderBar></HeaderBar>
	<div class="main">
		<div class="content">
			<p class="title">
				<span>我的资产 >交易记录</span>
				<span>
					交易类型:
					<select class="" name="" @change="getTradeRecord" v-model="operation">
						<option value="ALL">全部</option>
						 <option value="ETH_RECHARGE">ETH充币</option>
						 <option value="ETH_WITHDRAW">ETH提币</option>
						 <option value="BANCOR_BUY">BANCOR币买入</option>
						 <option value="BANCOR_SELL">BANCOR币卖出</option>
						 <option value="INVITE_BONUS_AB">邀请得币</option>
					</select>
					币种类型:
					<select class="" name="" @change="getTradeRecord" v-model="coinType">
						<option value="ALL">全部</option>
						 <option value="ETH">ETH</option>
						 <option value="AT">AT</option>
						 <option value="AB">AB</option>
					</select>
				</span>
		</p>
			<li><div>时间</div><div>币种</div><div>类型</div><div>数量</div><div>状态</div><div>操作</div></li>
			<li v-for="item in list">
				<div>{{item.createTime}}</div>
				<div>{{item.coinType}}</div>
				<div>平台提币</div>
				<div>{{item.amount}}</div>
				<div>已完成</div>
				<div class="operation" v-show="item.platform !='DISPATCHER'">详情</div>
			</li>
			<div class="charge">
				<div class="desc address">
					<p class="left">提币地址：<span>0xFBb1b73C4f0BDa4f67dcA266ce6Ef42f520fBB98</span></p>
					<p class="right">手续费：<span>0.00500000</span></p>
				</div>
				<div class="desc time">
					<p class="left">区块链交易ID：<span>0xFBb1b73C4f0BDa4f67dcA266ce6Ef42f520o093fsdfeinbla9324</span></p>
					<p class="right">钱包处理时间：<span>2018.10.13 15:38:34</span></p>
				</div>
			</div>
			<li><div>2018.10.13 15:38:34</div><div>ETH</div><div>平台提币</div><div>-0.98000000</div><div>已完成</div><div class="operation">详情</div></li>
			<li><div>2018.10.13 15:38:34</div><div>ETH</div><div>平台提币</div><div>-0.98000000</div><div>已完成</div><div class="operation">详情</div></li>
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
						this.total = Number(res.result.total)
						this.current = res.result.pageNum
					}
				})
			},
			getPaginationChange(val, currentPage) {
				console.log('currentPage',currentPage);
        this.filterForm.pageSize = val;
				this.current = currentPage
        this.getTradeRecord();
      },
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
