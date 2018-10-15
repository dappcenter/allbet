<template>
	<div class="my-assets">
	<HeaderBar></HeaderBar>
	<div class="main">
		<div class="content">
			<p class="title"><span>我的资产</span><span>交易记录</span></p>
			<li><div>币种</div><div>数量</div><div>操作</div></li>
			<li><div>ETH</div><div>0.98</div><div class="operation"><span>充币</span><span>提币</span></div></li>
			<div class="charge">
				<img src="" alt="">
				<div>
					<p>充币地址：</p>
					<p class="address">0xFBb1b73C4f0BDa4f67dcA266ce6Ef42f520fBB98<span class="copy">复制</span></p>
					<p>温馨提示：请勿向上述地址充值任何非 ETH 资产，否则资产将不可找回。</p>
				</div>
			</div>
			<div class="mention">
				<p>提币地址:</p>
				<div class="input-div">
					<input type="text" name="" value="">
					ETH
				</div>
				<p>数量:<span>可用：0.456ETH</span></p>
				<div class="input-div">
					<input type="text" name="" value="">
					ETH
				</div>
				<div class="poundage">
					<div class="">
						<p>手续费</p>
						<div class="input-div">
							<input type="text" name="" value="">
							ETH
						</div>
					</div>
					<div class="">
						<p>到账金额</p>
						<div class="input-div">
							<input type="text" name="" value="">
							ETH
						</div>
					</div>
				</div>
				<p class="attention">
					<span>温馨提示：请确保提笔地址无误，否则资产将不可找回。</span><span class="take-out">提币</span>
				</p>
			</div>
			<li><div>AT</div><div>0.9</div><div class="operation"><span>购买</span><span>出售</span></div></li>
			<li><div>BET</div><div>0.9</div><div>--</div></li>
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
		 }
	 },
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
	.my-assets {
		margin: 0 auto;
		.main {
			background-color: #13207A;
			padding: 40px 0;
			.content {
				width: 1200px;
				background-color: #09135E;
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

					}
				}
				.charge {
					display: flex;
					align-items: flex-end;
					justify-content: flex-start;
					background-color: #071051;
					padding: 27px 0 27px 40px;
					font-size: 14px;
					color: #5060C2;
					border: 1px solid #1C298A;
					img {
						width:108px;
						height:108px;
						display: inline-block;
						background-color: white;
						margin-right: 19px;
					}
					.address {
						font-size: 20px;
						color: #fff;
						font-weight:bold;
						margin: 13px 0;
						.copy {
							font-size:16px;
							font-family:PingFang-SC-Medium;
							font-weight:500;
							color:rgba(117,193,255,1);
							margin-left: 20px;
						}
					}
				}
				.mention {
					padding: 0 20px 60px 20px;
					background:rgba(7,16,81,1);
					border:1px solid rgba(28,41,138,1);
					p {
						font-size:14px;
						font-family:PingFang-SC-Medium;
						font-weight:500;
						color:rgba(80,96,194,1);
						margin: 29px 0 10px 0;
					}
					.input-div {
						height:48px;
						background:rgba(9,19,94,1);
						border:1px solid rgba(28,41,138,1);
						border-radius:4px;
						input {
							background-color: transparent;
							border: none;
							outline: none;
							width: 95%;
							height: 100%;
							padding-left: 20px;
							font-family:PingFang-SC-Bold;
							font-weight:bold;
							color:rgba(255,255,255,1);
						}
					}
					.poundage {
						display: flex;
						div {
							width: 50%;
							.input-div {
								height:48px;
								background:rgba(9,19,94,1);
								border:1px solid rgba(28,41,138,1);
								border-radius:4px;
								width: 100%;
								input {
									background-color: transparent;
									border: none;
									outline: none;
									width: 90%;
									height: 100%;
									padding-left: 20px;
									font-family:PingFang-SC-Bold;
									font-weight:bold;
									color:rgba(255,255,255,1);
								}
							}
						}
						div:first-child {
							margin-right: 15px;
						}
					}
					.attention {
						position: relative;
						.take-out {
							width:265px;
							height:48px;
							background:linear-gradient(90deg,rgba(100,180,239,1),rgba(57,94,236,1));
							border-radius:4px;
							text-align: center;
							line-height: 48px;
							font-size:16px;
							font-family:PingFang-SC-Bold;
							font-weight:bold;
							display: inline-block;
							position: absolute;
							right: 0;
						}
					}
				}
				li {
					display: flex;
					align-items: center;
					justify-content: center;
					border-bottom: 1px solid #1C298A;
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
		.my-assets {
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
