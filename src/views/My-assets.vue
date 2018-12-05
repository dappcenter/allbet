<template>
	<div class="my-assets">
	<HeaderBar></HeaderBar>
	<div class="main" :style="{minHeight: $window.innerHeight - 150 + 'px'}">
		<div class="content">
			<p class="title"><span>{{$t('message.assetsOfMine')}}</span><span @click="$router.push('trading-record')">{{$t('message.assetsTransactionRecord')}}</span></p>
			<li class="thead"><div>{{$t('message.assetsCurrency')}}</div><div>{{$t('message.assetsQuantity')}}</div><div>{{$t('message.homeOperation')}}</div></li>
			<ul>

				<!-- ---- ETH ---- -->
				<div v-show="currentAddr.mainCoin !== 'TRX'">
					<li>
						<div>ETH</div><div>{{(currentAddr.eth*1).toFixed(3)}}</div>
						<!-- 平台账号开放充提 -->
						<div class="operation" v-show="currentAddr.platform == 'DISPATCHER'">
							<span @click="showCharge = showCharge == 'chargeETH' ? '' : 'chargeETH'">{{$t('message.assetsRechargeCurrency')}}</span>
							<span  @click="showCharge = showCharge == 'mentionETH' ? '' : 'mentionETH'" v-show="currentAddr.platform != 'IMPORT'">{{$t('message.assetsExtractCoins')}}</span>
						</div>
						<div class="operation" v-show="currentAddr.platform != 'DISPATCHER'">
							<span>--</span>
						</div>
					</li>
					<div class="charge" v-show="showCharge == 'chargeETH' && currentAddr.platform == 'DISPATCHER'">
						<div src="" alt="" id="qrcode1"></div>
						<div class="charge-desc">
							<p>{{$t('message.assetsRechargeAddress')}}：</p>
							<div class="address">
								<div id="copy_text">{{currentAddr.coinAddress}}</div>
								<span class="copy" ref="copy" data-clipboard-action="copy" data-clipboard-target="#copy_text" @click="copy(copyBtn)">{{$t('message.assetsCopy')}}</span>
							</div>
							<p class="warnings">{{$t('message.assetsTips')}}</p>
						</div>
					</div>
					<div class="mention" v-show="showCharge == 'mentionETH' && currentAddr.platform == 'DISPATCHER'">
						<p>{{$t('message.assetsCoinAddress')}}:</p>
						<div class="input-div">
							<input type="text" v-model="formData.destAddress">
						</div>
						<p class="available"><span>{{$t('message.assetsQuantity')}}:</span><span>{{$t('message.homeAvailable')}}{{currentAddr.eth}} ETH</span></p>
						<div class="input-div">
							<input type="text" v-model="formData.amount" oninput="value=value.replace(/[^0-9\.]/g,'')" onkeyup="value=value.replace(/[^0-9\.]/g,'')" onpaste="value=value.replace(/[^0-9\.]/g,'')" oncontextmenu="value=value.replace(/[^0-9\.]/g,'')">
							ETH
						</div>
						<!-- 手续费 -->
						<div class="poundage" v-if="feeData">
							<div class="">
								<p>{{$t('message.assetsHandlingFee')}}</p>
								<div class="input-div">
									<input type="text" name="" :value="feeData.ETH" disabled>
									ETH
								</div>
							</div>
							<div class="">
								<p>{{$t('message.assetsArrivalAmount')}}</p>
								<div class="input-div">
									<input type="text" name="" :value="formData.amount - feeData.ETH < 0 ? 0 : (formData.amount - feeData.ETH).toFixed(8)" disabled>
									ETH
								</div>
							</div>
						</div>
						<p class="attention">
							<span class="warnings">{{$t('message.assetsTips2')}}</span><span class="take-out" @click="withdrawDo('ETH')">{{$t('message.assetsExtractCoins')}}</span>
						</p>
					</div>
				</div>


				<!-- ---- AT ---- -->
				<li>
					<div>AT</div>
					<div>{{currentAddr.at}}</div>
					<!-- 平台账号开放充提 -->
					<div class="operation" v-show="currentAddr.platform == 'DISPATCHER'">
						<span @click="showCharge = showCharge == 'chargeAT' ? '' : 'chargeAT'">{{$t('message.assetsRechargeCurrency')}}</span>
						<span @click="showCharge = showCharge == 'mentionAT' ? '' : 'mentionAT'">{{$t('message.assetsExtractCoins')}}</span>
					</div>
					<div class="operation" v-show="currentAddr.platform != 'DISPATCHER'">
						<span>--</span>
					</div>
				</li>
				<div class="charge" v-show="showCharge == 'chargeAT' && currentAddr.platform == 'DISPATCHER'">
					<div src="" alt="" id="qrcode2"></div>
					<div class="charge-desc">
						<p>{{$t('message.assetsRechargeAddress')}}：</p>
						<div class="address"><div id="copy_text2">{{currentAddr.coinAddress}}</div>
							<span class="copy" ref="copy2" data-clipboard-action="copy" data-clipboard-target="#copy_text2" @click="copy(copyBtn2)">{{$t('message.assetsCopy')}}</span>
						</div>
						<p class="warnings">{{$t('message.assetsTipsAT')}}</p>
					</div>
				</div>
				<div class="mention" v-show="showCharge == 'mentionAT' && currentAddr.platform == 'DISPATCHER'">
					<p>{{$t('message.assetsCoinAddress')}}:</p>
					<div class="input-div">
						<input type="text" v-model="formData.destAddress">
					</div>
					<p class="available"><span>{{$t('message.assetsQuantity')}}:</span><span>{{$t('message.homeAvailable')}}{{currentAddr.at}} AT</span></p>
					<div class="input-div">
						<input type="text" v-model="formData.amount" oninput="value=value.replace(/[^0-9\.]/g,'')" onkeyup="value=value.replace(/[^0-9\.]/g,'')" onpaste="value=value.replace(/[^0-9\.]/g,'')" oncontextmenu="value=value.replace(/[^0-9\.]/g,'')">
						AT
					</div>
					<!-- 手续费 -->
					<div class="poundage" v-if="feeData">
						<div class="">
							<p>{{$t('message.assetsHandlingFee')}}</p>
							<div class="input-div">
								<input type="text" name="" :value="feeData.AT" disabled>
								AT
							</div>
						</div>
						<div class="">
							<p>{{$t('message.assetsArrivalAmount')}}</p>
							<div class="input-div">
								<input type="text" name="" :value="formData.amount - feeData.AT < 0 ? 0 : (formData.amount - feeData.AT).toFixed(8)" disabled>
								AT
							</div>
						</div>
					</div>
					<p class="attention">
						<span class="warnings">{{$t('message.assetsTips2')}}</span><span class="take-out" @click="withdrawDo('AT')">{{$t('message.assetsExtractCoins')}}</span>
					</p>
				</div>
				<li><div>AB</div><div>{{currentAddr.bet}}</div><div style="color:#FFDB5B;">--</div></li>

				<!-- ---- TRX ---- -->
				<div v-show="currentAddr.platform == 'DISPATCHER' || currentAddr.mainCoin == 'TRX'">
					<li>
						<div>TRX</div>
						<div v-if="currentAddr.assets.TRX">{{currentAddr.assets.TRX.amount}}</div>
						<!-- 平台账号开放充提 -->
						<div class="operation" v-show="currentAddr.platform == 'DISPATCHER'">
							<span @click="showCharge = showCharge == 'chargeTRX' ? '' : 'chargeTRX'">{{$t('message.assetsRechargeCurrency')}}</span>
							<span @click="showCharge = showCharge == 'mentionTRX' ? '' : 'mentionTRX'">{{$t('message.assetsExtractCoins')}}</span>
						</div>
						<div class="operation" v-show="currentAddr.platform != 'DISPATCHER'">
							<span>--</span>
						</div>
					</li>
					<div class="charge" v-show="showCharge == 'chargeTRX' && currentAddr.platform == 'DISPATCHER'">
						<div alt="" id="qrcode3" ref="qrcode3"></div>
						<div class="charge-desc">
							<p>{{$t('message.assetsRechargeAddress')}}：</p>
							<div class="address"><div id="copy_text3" v-if="currentAddr.assets.TRX">{{currentAddr.assets.TRX.coinAddress}}</div>
								<span class="copy" ref="copy3" data-clipboard-action="copy" data-clipboard-target="#copy_text3" @click="copy(copyBtn3)">{{$t('message.assetsCopy')}}</span>
							</div>
							<p class="warnings">{{$t('message.assetsTipsAT')}}</p>
						</div>
					</div>
					<div class="mention" v-show="showCharge == 'mentionTRX' && currentAddr.platform == 'DISPATCHER'">
						<p>{{$t('message.assetsCoinAddress')}}:</p>
						<div class="input-div">
							<input type="text" v-model="formData.destAddress">
						</div>
						<p class="available">
							<span>{{$t('message.assetsQuantity')}}:</span>
							<span v-if="currentAddr.assets.TRX">{{$t('message.homeAvailable')}}{{currentAddr.assets.TRX.amount}} TRX</span>
						</p>
						<div class="input-div">
							<input type="text" v-model="formData.amount" oninput="value=value.replace(/[^0-9\.]/g,'')" onkeyup="value=value.replace(/[^0-9\.]/g,'')" onpaste="value=value.replace(/[^0-9\.]/g,'')" oncontextmenu="value=value.replace(/[^0-9\.]/g,'')">
							TRX
						</div>
						<!-- 手续费 -->
						<div class="poundage" v-if="feeData">
							<div class="">
								<p>{{$t('message.assetsHandlingFee')}}</p>
								<div class="input-div">
									<input type="text" name="" :value="feeData.TRX" disabled>
									TRX
								</div>
							</div>
							<div class="">
								<p>{{$t('message.assetsArrivalAmount')}}</p>
								<div class="input-div">
									<input type="text" name="" :value="formData.amount - feeData.TRX < 0 ? 0 : (formData.amount - feeData.TRX).toFixed(8)" disabled>
									TRX
								</div>
							</div>
						</div>
						<p class="attention">
							<span class="warnings">{{$t('message.assetsTips2')}}</span><span class="take-out" @click="withdrawDo('TRX')">{{$t('message.assetsExtractCoins')}}</span>
						</p>
					</div>
				</div>

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
			formData: {
				"amount": "",
				"destAddress": "",
			},
			showCharge: "",
			copyBtn: null,
			copyBtn2: null,
			copyBtn3: null,
			feeData: null
		}
	},
    computed: {
		...mapState({
			currentAddr: state => state.user.currentAddr
		})
    },
	watch: {
		// 检测地址切换
		currentAddr() {
			document.getElementById("qrcode1").innerHTML = ''
			document.getElementById("qrcode2").innerHTML = ''
			if(document.getElementById("qrcode3")) {
				document.getElementById("qrcode3").innerHTML = ''
			}
			if(this.currentAddr.coinAddress) {
				this.makeQrCode()
			}
		},
		showCharge() {
			this.formData.amount = ""
			this.formData.destAddress = ""
		},
	},
	mounted () {
		this.copyBtn = new Clipboard(this.$refs.copy)
		this.copyBtn2 = new Clipboard(this.$refs.copy2)
		this.copyBtn3 = new Clipboard(this.$refs.copy3)
		if(this.currentAddr.coinAddress) {
			this.makeQrCode()
		}

		this.getFee()
	},
	methods: {
		makeQrCode () {
			var qrcode2 = new QRCode(document.getElementById("qrcode2"), {
				width: 100,
				height: 100,
			});
			qrcode2.makeCode(this.currentAddr.coinAddress);
			var qrcode = new QRCode(document.getElementById("qrcode1"), {
				width: 100,
				height: 100,
			});
			qrcode.makeCode(this.currentAddr.coinAddress);
			var qrcode3 = new QRCode(this.$refs.qrcode3, {
				width: 100,
				height: 100,
			});
			if(this.currentAddr.assets.TRX) {
				qrcode3.makeCode(this.currentAddr.assets.TRX.coinAddress);
			}
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
			let coinAddress = this.currentAddr.coinAddress
			if(type == "TRX") {
				coinAddress = this.currentAddr.assets[type].coinAddress
			}
			this.$http.post('/app/transfer/withdraw', {
				"amount": this.formData.amount,
				"coinAddress": coinAddress,
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
		copy(copyBtn) {
			let clipboard = copyBtn
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
		// 手续费获取
		getFee() {
			this.$http.get('/app/transfer/withdraw').then( res => {
				if (res.code == 200) {
					this.feeData = res.result
				}
			})
		},
		...mapMutations({
			alert: "alert",
		})
	},
	components: {
		HeaderBar,
		FooterBar,
	}
}
</script>

 <style lang="less">
	.my-assets {
		margin: 0 auto;
		.main {
			background-color: #22202C;
			padding: 40px 0;
			.content {
				width: 1200px;
				background-color: #49425C;
				margin: auto;
				padding-bottom: 60px;
				.title {
					position: relative;
					padding: 15px 40px;
					box-shadow:0px 0px 0px 0px rgba(0,10,86,1);
					color: #fff;
					font-size: 16px;
					overflow: hidden;
					color: #D3CDFF;
					span:last-child {
						float: right;
						color: #FFDB5B;
						font-size: 14px;
						cursor: pointer;
					}
				}
				ul {
					padding: 0 40px;
				}
				.charge {
					display: flex;
					align-items: flex-end;
					justify-content: flex-start;
					background-color: #3F3753;
					padding: 27px 0 27px 40px;
					font-size: 14px;
					color: #D3CDFF;
					border: 1px solid #2F2840;
					img {
						width:130px;
						height:130px;
						display: inline-block;
						background-color: white;
						margin-right: 19px;
						border: 1px solid white;
					}
					.address {
						font-size: 16px;
						color: #fff;
						font-weight:bold;
						margin: 13px 0;
						div {
							display: inline-block;
							// user-select: none;
						}
						.copy {
							font-size:16px;
							font-family:PingFang-SC-Medium;
							font-weight:500;
							color:#FFDB5B;
							margin-left: 20px;
							cursor: pointer;
						}
					}
					.warnings {
						font-size: 12px;
					}
				}
				.mention {
					padding: 0 20px 60px 20px;
					background:#3F3753;
					border:1px solid #2F2840;
					p {
						font-size:14px;
						font-family:PingFang-SC-Medium;
						font-weight:500;
						color:#D3CDFF;
						margin: 29px 0 10px 0;
					}
					.warnings {
						font-size: 12px;
					}
					.input-div {
						height:48px;
						background:#322A46;
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
								background: #322A46;
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
							background:#FFC425;
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
							color: #1A0D59;
						}
					}
				}
				li {
					display: flex;
					align-items: center;
					justify-content: center;
					border-bottom: 1px solid #2F2840;
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
					&.thead {
						color: #9882D0;
						background-color: #3F3753;
						    padding: 0 40px;
								border-bottom: 1px solid transparent;
								font-size: 14px;
								line-height: 2.5;
					}
				}
			}
		}

	}
	@media screen and (max-width: 800px) {
		.my-assets {
			.main {
				.content {
					width: 90%;
					// margin:
					.title {
						padding: 10px;
					}
					.thead {
						padding: 0 10px !important;
					}
					ul {
						padding: 0 10px;
						font-size: normal;
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
								font-size: 12px;
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
						p {
							font-weight: normal;
							margin: 18px 0 8px 0;
						}
						.input-div {
							input {
								width: 87%;
							}
						}
						.poundage {
							flex-direction: column;
							div {
								width: 100%;
								.input-div {
									input {
										width: 87%;
									}
								}
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
