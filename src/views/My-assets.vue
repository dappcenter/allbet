<template>
	<div class="my-assets">
	<HeaderBar></HeaderBar>
	<div class="main" :style="{minHeight: $window.innerHeight - 150 + 'px'}">
		<div class="content">
			<p class="title"><span>{{$t('message.assetsOfMine')}}</span><span @click="goRecord">{{$t('message.assetsTransactionRecord')}}</span></p>
			<ul>
				<li><div>{{$t('message.assetsCurrency')}}</div><div>{{$t('message.assetsQuantity')}}</div><div>{{$t('message.homeOperation')}}</div></li>
				<li>
					<div>ETH</div><div>{{(currentAddr.eth*1).toFixed(3)}}</div>
					<!-- 平台账号开放充提 -->
					<div class="operation" v-show="currentAddr.platform == 'DISPATCHER'">
						<span @click="chargeBill">{{$t('message.assetsRechargeCurrency')}}</span>
						<span  @click="mentionBill" v-show="currentAddr.platform != 'IMPORT'">{{$t('message.assetsExtractCoins')}}</span>
					</div>
					<div class="operation" v-show="currentAddr.platform != 'DISPATCHER'">
						<span>--</span>
					</div>
				</li>
				<div class="charge"  v-show="displayStatus.showChargeBill && currentAddr.platform == 'DISPATCHER'">
					<div src="" alt="" id="qrcode1"></div>
					<div class="charge-desc">
						<p>{{$t('message.assetsRechargeAddress')}}：</p>
						<div class="address"><div id="copy_text">{{currentAddr.coinAddress}}</div>
							<span class="copy" ref="copy" data-clipboard-action="copy" data-clipboard-target="#copy_text" @click="copy">{{$t('message.assetsCopy')}}</span>
						</div>
						<p>{{$t('message.assetsTips')}}</p>
					</div>
				</div>
				<div class="mention" v-show="displayStatus.showMentionBill && currentAddr.platform == 'DISPATCHER'">
					<p>{{$t('message.assetsCoinAddress')}}:</p>
					<div class="input-div">
						<input type="text" v-model="formData.destAddress">
					</div>
					<p class="available"><span>{{$t('message.assetsQuantity')}}:</span><span>{{$t('message.homeAvailable')}}{{currentAddr.eth}} ETH</span></p>
					<div class="input-div">
						<input type="text" v-model="formData.amount">
						ETH
					</div>
					<!-- <div class="poundage">
						<div class="">
							<p>{{$t('message.assetsHandlingFee')}}</p>
							<div class="input-div">
								<input type="text" name="" value="">
								ETH
							</div>
						</div>
						<div class="">
							<p>{{$t('message.assetsArrivalAmount')}}</p>
							<div class="input-div">
								<input type="text" name="" value="">
								ETH
							</div>
						</div>
					</div> -->
					<p class="attention">
						<span>{{$t('message.assetsTips2')}}</span><span class="take-out" @click="withdrawDo('ETH')">{{$t('message.assetsExtractCoins')}}</span>
					</p>
				</div>
				<li>
					<div>AT</div>
					<div>{{currentAddr.at}}</div>
					<!-- 平台账号开放充提 -->
					<div class="operation" v-show="currentAddr.platform == 'DISPATCHER'">
						<span @click="chargeAt">{{$t('message.assetsRechargeCurrency')}}</span>
						<span @click="mentionAt">{{$t('message.assetsExtractCoins')}}</span>
					</div>
					<div class="operation" v-show="currentAddr.platform != 'DISPATCHER'">
						<span>--</span>
					</div>
				</li>
				<div class="charge"  v-show="displayStatus.showChargeAt && currentAddr.platform == 'DISPATCHER'">
					<div src="" alt="" id="qrcode2"></div>
					<div class="charge-desc">
						<p>{{$t('message.assetsRechargeAddress')}}：</p>
						<div class="address"><div id="copy_text2">{{currentAddr.coinAddress}}</div>
							<span class="copy" ref="copy2" data-clipboard-action="copy" data-clipboard-target="#copy_text2" @click="copy2">{{$t('message.assetsCopy')}}</span>
						</div>
						<p>{{$t('message.assetsTipsAT')}}</p>
					</div>
				</div>
				<div class="mention" v-show="displayStatus.showMentionAt && currentAddr.platform == 'DISPATCHER'">
					<p>{{$t('message.assetsCoinAddress')}}:</p>
					<div class="input-div">
						<input type="text" v-model="formData.destAddress">
					</div>
					<p class="available"><span>{{$t('message.assetsQuantity')}}:</span><span>{{$t('message.homeAvailable')}}{{currentAddr.at}} AT</span></p>
					<div class="input-div">
						<input type="text" v-model="formData.amount">
						AT
					</div>
					<!-- <div class="poundage">
						<div class="">
							<p>{{$t('message.assetsHandlingFee')}}</p>
							<div class="input-div">
								<input type="text" name="" value="">
								ETH
							</div>
						</div>
						<div class="">
							<p>{{$t('message.assetsArrivalAmount')}}</p>
							<div class="input-div">
								<input type="text" name="" value="">
								ETH
							</div>
						</div>
					</div> -->
					<p class="attention">
						<span>{{$t('message.assetsTips2')}}</span><span class="take-out" @click="withdrawDo('AT')">{{$t('message.assetsExtractCoins')}}</span>
					</p>
				</div>
				<li><div>AB</div><div>{{currentAddr.bet}}</div><div style="color:#FFDB5B;">--</div></li>
			</ul>
		</div>
	</div>
	<FooterBar ref="ft"></FooterBar>
</div>

</template>

<script>
import QRCode from 'qrcodejs2'
import Clipboard from 'clipboard';
import HeaderBar from "@/components/common/header_bar"
import FooterBar from "@/components/common/footer_bar"
import {mapMutations, mapState} from "vuex"
 export default {
	 data () {
		 return {
			displayStatus: {
				showChargeBill: false,
				showMentionBill: false,
				showChargeAt: false,
				showMentionAt: false,
			},
			formData: {
				"amount": "",
				"destAddress": "",
			}
		 }
	 },
    computed: {
		...mapState({
			currentAddr: state => state.user.currentAddr
		})
    },
     components: {
	    HeaderBar,
	    FooterBar,
	},
	watch: {
		// 检测地址切换
		currentAddr() {
			document.getElementById("qrcode1").innerHTML = ''
			document.getElementById("qrcode2").innerHTML = ''
			if(this.currentAddr.coinAddress) {
				this.makeQrCode()
			}
		},
		displayStatus: {
			handler: function() {
				this.formData = Object.assign(this.formData, {
					"amount": "",
					"destAddress": "",
				})
			},
			deep: true
		},
	},
	created () {
		// this.getAssets()
	},
	mounted () {
		this.copyBtn = new Clipboard(this.$refs.copy)
		this.copyBtn2 = new Clipboard(this.$refs.copy2)
		if(this.currentAddr.coinAddress) {
			this.makeQrCode()
		}
	},
	methods: {
		makeQrCode () {
			var qrcode2 = new QRCode(document.getElementById("qrcode2"), {
				width: 130,
				height: 130,
			});
			qrcode2.makeCode(this.currentAddr.coinAddress);
			var qrcode = new QRCode(document.getElementById("qrcode1"), {
				width: 130,
				height: 130,
			});
			qrcode.makeCode(this.currentAddr.coinAddress);
		},
		goRecord () {
			this.$router.push('trading-record')
		},
		//提币
		withdrawDo(type) {
			if ((this.formData.destAddress + '').trim() == '') {
				this.alert({
						type: "info",
						msg: this.$t('message.assetsDestAddEmpty')
				})
				return false
			}
			if ((this.formData.amount + '').trim() == '' || Number(this.formData.amount) <= 0) {
				this.alert({
						type: "info",
						msg: this.$t('message.assetsMentionAmount')
				})
				return false
			}
			if ((type == 'ETH' && Number(this.currentAddr.eth) < Number(this.formData.amount)) || (type == 'AT' && Number(this.currentAddr.at) < Number(this.formData.amount))) {
				this.alert({
						type: "info",
						msg: this.$t('message.assetsNotEnough')
				})
				return false
			}
			if (this.currentAddr.coinAddress == this.formData.destAddress) {
				this.alert({
					type: "info",
					msg: this.$t('message.assetsNoMe')
				})
				return false
			}
			this.$http.post('/app/transfer/withdraw', {
				"amount": this.formData.amount,
				"coinAddress": this.currentAddr.coinAddress,
				"destAddress": this.formData.destAddress,
				"withdrawType": type
			}).then( res => {
				if (res.code == 200) {
					this.formData.destAddress = ''
					this.formData.amount = ''
					this.$store.dispatch('updateProperty')
					this.alert({
						type: "success",
						msg: res.msg
					})
				}
			})
		},
		copy () {
			let clipboard = this.copyBtn
			clipboard.on('success', () => {
					this.alert({
							type: "success",
							msg: this.$t('message.assetsSuccessCopy')
					})
			})
			clipboard.on('error', () => {
					this.alert({
							type: "success",
							msg: this.$t('message.assetsFailCopy')
					})
			})
		},
		copy2 () {
			let clipboard = this.copyBtn2
			clipboard.on('success', () => {
					this.alert({
							type: "success",
							msg: this.$t('message.assetsSuccessCopy')
					})
			})
			clipboard.on('error', () => {
					this.alert({
							type: "success",
							msg: this.$t('message.assetsFailCopy')
					})
			})
		},
		chargeBill() {
			this.displayStatus.showChargeBill = !this.displayStatus.showChargeBill
			this.displayStatus.showMentionBill = false
			this.displayStatus.showMentionAt = false
			this.displayStatus.showChargeAt = false
		},
		mentionBill() {
			this.displayStatus.showMentionBill = !this.displayStatus.showMentionBill
			this.displayStatus.showChargeBill = false
			this.displayStatus.showMentionAt = false
			this.displayStatus.showChargeAt = false
		},
		chargeAt(){
			this.displayStatus.showChargeAt = !this.displayStatus.showChargeAt
			this.displayStatus.showMentionAt = false
			this.displayStatus.showMentionBill = false
			this.displayStatus.showChargeBill = false

		},
		mentionAt(){
			this.displayStatus.showMentionAt = !this.displayStatus.showMentionAt
			this.displayStatus.showChargeAt = false
			this.displayStatus.showMentionBill = false
			this.displayStatus.showChargeBill = false
		},
		...mapMutations({
			alert: "alert",
		})
 	}
}
</script>

 <style lang="less">
	.my-assets {
		margin: 0 auto;
		.main {
			background-color: #040810;
			padding: 40px 0;
			.content {
				width: 1200px;
				background-color: #193570;
				margin: auto;
				.title {
					position: relative;
					padding: 15px 40px;
					box-shadow:0px 0px 0px 0px rgba(0,10,86,1);
					color: #fff;
					font-size: 18px;
					overflow: hidden;
					span:last-child {
						float: right;
						color: #FFDB5B;
						font-size: 16px;
						cursor: pointer;
					}
				}
				ul {
					background-color: #172F61;
					padding: 0 40px;
				}
				.charge {
					display: flex;
					align-items: flex-end;
					justify-content: flex-start;
					background-color: #132a59;
					padding: 27px 0 27px 40px;
					font-size: 14px;
					color: #4A69B1;
					border: 1px solid #1C3B7C;
					img {
						width:130px;
						height:130px;
						display: inline-block;
						background-color: white;
						margin-right: 19px;
						border: 1px solid white;
					}
					.address {
						font-size: 20px;
						color: #fff;
						font-weight:bold;
						margin: 13px 0;
						div {
							display: inline-block;
						}
						.copy {
							font-size:16px;
							font-family:PingFang-SC-Medium;
							font-weight:500;
							color:#FFDB5B;
							margin-left: 20px;
						}
					}
				}
				.mention {
					padding: 0 20px 60px 20px;
					background:#132A59;
					border:1px solid #1c3b7c;
					p {
						font-size:14px;
						font-family:PingFang-SC-Medium;
						font-weight:500;
						color:#4A69B1;
						margin: 29px 0 10px 0;
					}
					.input-div {
						height:48px;
						background:#0F2551;
						border:1px solid #1c3b7c;
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
					.available {
						display: flex;
						span:first-child {
							width: 20%;
							text-align: left;
						}
						span:last-child {
							flex: 1;
							text-align: right;
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
							cursor: pointer;
							color: #fff;
						}
					}
				}
				li {
					display: flex;
					align-items: center;
					justify-content: center;
					border-bottom: 1px solid #1c3b7c;
					line-height: 3.5;
					div {
						width: 33.3%;
						text-align: center;
					}
					div:first-child {
						text-align: left;
						flex: 1;
					}
					div:last-child {
						text-align: right;
						width: 40%;
					}
					.operation {
						color: #FFDB5B;
						text-align: right;
						width: 40%;
						span {
							margin-left: 10px;
							cursor: pointer;
						}
					}
				}
				li:first-child {
					color: #A0ADFF;
				}
			}
		}

	}
	@media screen and (max-width: 800px) {
		.my-assets {
			.main {
				.content {
					width: 100%;
					.title {
						padding: 10px;
					}
					ul {
						padding: 0 10px;
					}
					.charge {
						flex-direction: column;
				    width: 100%;
						align-items: flex-start;
						padding: 27px 0 27px 10px;
						.charge-desc {
					    width: 100%;
							p:first-child {
								margin-top: 15px;
							}
							.address {
								font-size: 16px;
								width: 100%;
								div {
									display: block;
							    word-break: break-all;
								}
								.copy {
									margin-left: 0;
								}
							}
						}
					}
					.mention {
						padding: 0 10px 30px 10px;
						.input-div {
							input {
								width: 87%;
							}
						}
						.take-out {
							width: 100% !important;
							position: static !important;
							margin-top: 20px;
						}
					}
				}
			}
		}
	}
</style>
