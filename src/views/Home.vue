<template>
	<div class="home-page">
	<HeaderBar></HeaderBar>
	<div class="main">
		<div class="top">
			<h1>Allbet</h1>
			<h2>基于 Bancor 的实用增强型通证协议,多维 Dapp 游戏生态系统</h2>
			<div style="width:70%;margin:30px auto 40px auto;text-align:left;font-size:18px;color:#FEFEFE;">AT 即 Allbet Token，固定总量1000 万。是 Allbet 生态中代表 Allbet 用户以及开发者权益的应用型通证，也是连接钱包、用户以及项目开发者的重要纽带。发行后所有通证都存储在一个合约控制的 AT 通证池里（非团队所有），同时有一个对应的
				ETH 资金池，用户从通证池购买通证，花费的 ETH 会进入 ETH 资金池（非团队所有）。所有操作都是协议合约直接控制的，
				区块链上信息可查。</div>
			<div class="total-bill">
				我的AT总量：100
			</div>
		</div>
		<div class="middle">
			<div class="fund-pool">
				<img src="../../public/home/three.png" class="three">
				<div class="" style="text-align:center;">
					<img src="../../public/home/eth.png" class="eth"><br/>
					<span>ETH 资金池</span>
				</div>
				<div class="" style="text-align:center;">
					<img src="../../public/home/at.png" class="at"><br/>
					<span>AT 通证池</span>
				</div>
				<img src="../../public/home/two.png" class="two">
			</div>
			<div class="buy-sell">
				<div class="buy">
					<p class="title">买入 AT</p>
					<p><span>可用：456 ETH</span><span>1 ETH = 2000000 AT</span></p>
					<div class="price-div">
						<span class="num">价格</span>
						<div class="price">19.23</div>
						<span class="num-right">CNY</span>
					</div>
					<div class="price-div">
						<span class="num">数量</span>
						<input type="text" placeholder="请输入买入 ETH 数量" class="price">
						<span class="num-right">ETH</span>
					</div>
					<p><span>您将获得 39349 AT</span><span>系统自动交易<img src="../../public/home/quote.png" alt=""></span></p>
					<div class="buy-button">
						买入
					</div>
				</div>
				<div class="buy sell">
					<p class="title">卖出 AT</p>
					<p><span>可用：456 ETH</span><span>1 ETH = 2000000 AT</span></p>
					<div class="price-div">
						<span class="num">价格</span>
						<div class="price">19.23</div>
						<span class="num-right">CNY</span>
					</div>
					<div class="price-div">
						<span class="num">数量</span>
						<input type="text" placeholder="请输入买入 AT数量" class="price">
						<span class="num-right">AT</span>
					</div>
					<p><span>您将获得 39349 AT</span><span>系统自动交易<img src="../../public/home/quote.png" alt=""></span></p>
					<p style="text-align:center;color:#E95B62;">出售将收取 3% 手续费</p>
					<div class="buy-button sell-button">
						卖出
					</div>
				</div>
			</div>
			<div class="list">
				<div class="top-button">
					<span>近期交易</span>
					<span>我的委托单</span>
				</div>
				<div class="content">
					<li class="unit"><span>玩家</span><span>ETH</span><span>AT</span><span>AT价格</span><span>交易类型</span><span>成交时间</span></li>
					<li><span>0xfd……kkdsee</span><span>+2.40000000</span><span>-43555.00</span><span>0.00090000 ETH</span><span>卖出</span><span>2018.09.12 17:32</span></li>
					<li><span>0xfd……kkdsee</span><span>+2.40000000</span><span>-43555.00</span><span>0.00090000 ETH</span><span>卖出</span><span>2018.09.12 17:32</span></li>
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
 export default {
    computed: {
	    betInfo() {
		    return this.$store.getters.getBetRecordData
	    }
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
		max-width: 1600px;
		.main {
			// display: flex;
			// justify-content: space-around;
			// padding: 20px;
			min-height: 1000px;
			.top {
				height: 500px;
				background:linear-gradient(180deg,rgba(0,6,54,1),rgba(57,94,236,1));
				width: 100%;
				text-align: center;
				.total-bill {
					width: 320px;
					height: 48px;
					line-height: 48px;
					font-size: 20px;
					background:linear-gradient(90deg,rgba(100,180,239,1),rgba(26,40,217,1));
					border-radius:48px;
					box-shadow:0px 1px 0px 0px rgba(136,201,255,1);
					margin: auto;
					font-weight: bold;
				}
			}
			.middle {
				background-color: #FFFFFF;
				width: 1200px;
				// height: 250px;
				margin: -100px auto 0 auto;
				.fund-pool {
					display: flex;
					justify-content: space-around;
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
						padding: 30px 30px 100px 30px;
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
								height: 98%;
								text-align: center;
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
							line-height:54px;
							text-align: center;
							position: absolute;
					    bottom: -125px;
						}
						.sell-button {
							background-color: #E95B62;
						}
					}
					.sell {
						background-color: #fff;
						margin-left: 40px;
					}
				}
				.list {
					// height: 500px;
					background-color: #FFFFFF;
					color: #646464;
					font-size: 18px;
					margin-bottom: 123px;
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
			.main {
				flex-direction: column;
				padding: 0;
				&>section {
					width: 100%;
				}
			}
		}
	}
</style>
