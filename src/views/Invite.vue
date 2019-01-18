<template>
	<div class="invite-page">
    <HeaderBar></HeaderBar>
    <div class="main" :style="{minHeight: $window.innerHeight - 150 + 'px'}">
      <div class="top nominscreen">
				<div class="left-bg"></div>
				<div class="right-bg"></div>
				<h3><span>{{$t('message.inviteTotalBill')}}</span>{{platformBonus.toFixed(2)}} AB</h3>
				<p>{{$t('message.inviteRule')}}</p>
      </div>
      <div class="white-div">
				<p class="invite-title">{{$t('message.inviteFriend')}}</p>
        <div class="" v-show="inviteCode">
					<div class="invite-detail1">
						<div class="my-prize">{{$t('message.InviteFight')}}</div>
						<div class="account-grade">
							<span>{{$t('message.InviteName')}}：{{getCurrentAddr.coinAddress}}</span>
						</div>
						<table border="1" cellspacing="0">
							<tr>
								<th>{{$t('message.inviteAccountLevel')}}</th>
								<th>{{$t('message.inviteDigRatio')}}</th>
								<th>{{$t('message.invitePeopleNum1')}}</th>
								<th>{{$t('message.inviteCourage')}}（AB）</th>
							</tr>
							<tr>
								<td v-if="userInfo.userLevel == 0">{{$t('message.InviteCommon')}}</td>
								<td v-if="userInfo.userLevel == 1">{{$t('message.inviteLevel1')}}</td>
								<td v-if="userInfo.userLevel == 2">{{$t('message.inviteLevel2')}}</td>
								<td v-if="userInfo.userLevel == 3">{{$t('message.inviteLevel3')}}</td>
								<td>{{result.digRatio*100}}%</td>
								<td>{{inviteCount}}</td>
								<td>{{inviteBonus}}</td>
							</tr>
						</table>
					</div>
	        <div class="qrcode">
						<!-- <p class="invite-code minscreen">{{$t('message.InviteQrcode')}}：</p> -->
						<div class="qrcode-content">
							<div class="nominscreen" alt="" id="qrcode1"></div>
							<div class="invite-div">
								<p>{{$t('message.invitationCode')}}</p>
								<div class="copy-div1">
									<span id="copy_code">{{inviteCode}}</span>
									<span class="copy" ref="copy1" data-clipboard-action="copy" :data-clipboard-text="inviteCode" @click="copy1">{{$t('message.assetsCopy')}}</span>
								</div>
							</div>
							<div class="invite-div">
								<p>{{$t('message.invitationLink')}}</p>
								<div class="copy-div1 copy-div2">
									<span id="copy_text">{{inviteUrl}}</span>
									<span class="copy" ref="copy" data-clipboard-action="copy" :data-clipboard-text="inviteUrl" @click="copy">{{$t('message.assetsCopy')}}</span>
								</div>
							</div>
						</div>
	        </div>
					<div class="buttom">
						<h5 class="title">{{$t('message.InvitationRules')}}</h5>
						<h5>{{$t('message.InviteDesc')}}</h5>
						<h5 class="title" style="margin-top: 35px;">{{$t('message.InviteReward')}}</h5>
						<!-- <h5>{{$t('message.InvitationRules1')}}</h5> -->
						<h5>{{$t('message.InvitationRules2')}}</h5>
						<h5>{{$t('message.InvitationRules3')}}</h5>
					</div>
        </div>
				<div class="no-bind" v-show="!inviteCode">
						<p>
							{{$t('message.InviteBind')}}
							<span class="bind-btn" @click="login">{{$t('message.hasToLogin')}}</span>
						</p>
						<div class="buttom">
							<h5 class="title">{{$t('message.InvitationRules')}}</h5>
							<h5>{{$t('message.InviteDesc')}}</h5>
							<h5 class="title" style="margin-top: 35px;">{{$t('message.InviteReward')}}</h5>
							<!-- <h5>{{$t('message.InvitationRules1')}}</h5> -->
							<h5>{{$t('message.InvitationRules2')}}</h5>
							<h5>{{$t('message.InvitationRules3')}}</h5>
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
import QRCode from 'qrcodejs2'
import Clipboard from 'clipboard';
import {mapMutations, mapState} from "vuex"

 export default {
	  data () {
		  return {
				result: {},
				inviteBonus: '0',
		    inviteCount: '0',
		    inviteUrl: location.origin + "/dice?inv=",
				inviteCode: "",
		    platformBonus: 0,
		  }
	  },
		computed: {
			...mapState({
				userInfo: state => state.user.userInfo,
				getCurrentAddr: state => state.user.currentAddr,
				getInviteCode: state => state.user.userInfo.inviteCode,
			}),
		},
		watch: {
			getCurrentAddr(newVal) {
				this.makeQRcode()
				this.getInvite()
			}
		},
		mounted () {
			this.copyBtn = new Clipboard(this.$refs.copy)
			this.copyBtn1 = new Clipboard(this.$refs.copy1)
			this.getInvite()
		},
		watch: {
			// 检测地址切换
			getCurrentAddr() {
				this.getInvite()
			},
		},
    components: {
	    HeaderBar,
	    FooterBar,
    },
		methods: {
			getInvite () {
				this.$http.get("/app/user/invite?"+this.getCurrentAddr.coinAddress,{

				}).then((res) => {
					if (res.code == 200) {
						let result = res.result || {}
						this.result = res.result || {}
						this.inviteBonus = result.inviteBonus || 0
						this.inviteCount = result.inviteCount || 0
						this.inviteCode =  this.getInviteCode
						this.inviteUrl = location.origin + "/dice?inv=" + this.inviteCode
						this.platformBonus = result.platformBonus
						document.getElementById("qrcode1").innerHTML = ''
						var qrcode = new QRCode(document.getElementById("qrcode1"), {
							width: 108,
							height: 108,
						});
						qrcode.makeCode(this.inviteUrl);
					}
				})
			},
			copy1 () {
				let clipboard = this.copyBtn1
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
			...mapMutations({
				alert: "alert",
				login: "OPEN_LOGIN",
			})
		}
 };
</script>

 <style lang="less">
	.invite-page {
		margin: 0 auto;
    .main {
      margin: auto;
      text-align: center;
      background-color: #22202C;
      padding: 40px 0 79px 0;
			.top {
				width: 1200px;
				height: 130px;
				background-color: #51456E;
				margin: 0px auto 30px auto;
				position: relative;
				padding-top: 33px;
				.left-bg {
					background: url(../../public/img/left-bg.png) repeat left;
					background-size: 240px 130px;
					width: 240px;
					height: 130px;
					position: absolute;
					left: 0;
					top: 0;
				}
				.right-bg {
					background: url(../../public/img/right-bg.png) repeat right;
					background-size: 240px 130px;
					width: 240px;
					height: 130px;
					position: absolute;
					right: 0;
					top: 0;
				}
			}
      h3 {
        font-size:30px;
        font-family:PingFang-SC-Bold;
        font-weight:bold;
        color:#D3CDFF;
        line-height:35px;
				span {
					font-size: 16px;
					font-weight: normal;

				}
      }
			p {
				color:#D3CDFF;
			}
      .white-div {
        width:1200px;
        background:#49425C;
        margin: 60px auto 0 auto;
				color: #D3CDFF;
				.invite-title {
	        // padding: 10px 199px;
	        font-size:16px;
					text-align: left;
					width:100%;
					height:48px;
					// background:rgba(25,53,112,1);
					// box-shadow:0px 0px 0px 0px rgba(16,40,90,0.75);
					border-bottom: 1px solid #2F2840;
					padding: 0 40px;
					font-weight:bold;
					line-height: 48px;
	      }
        p {
          font-size:28px;
          font-family:PingFang-SC-Bold;
          font-weight:bold;
        }
				.invite-detail1 {
					padding: 0px 40px;
					.my-prize {
						width:90px;
						height:24px;
						background:#322A46;
						border-radius:12px;
						margin: 30px auto 16px auto;
						height: 24px;
						line-height: 24px;

					}
					.account-grade {
						display: flex;
						align-items: center;
						justify-content: center;
						img {
                height: 27px;
                vertical-align: middle;
            }

					}
					table{
						border:1;
						 cellspacing:0;
	            border-collapse:collapse;
	            width:100%;
	            border-radius: .06rem;
	            margin: .2rem 0;
	        }
					td, th{
							border-color: #322A46;
							width: 25%;
					}
					td {
							text-align:center;
							vertical-align:middle;
							height: 45px;
							font-size: 14px;
					}
					th {
							height: 45px;
					}

				}
        .invite-detail {
          display: flex;
          align-items: center;
          justify-content: center;
          margin: auto;
					width: 1120px;
					border-bottom: 1px solid #2F2840;
					height: 132px;
          div {
            width: 50%;
            .title {
              font-size:16px;
							font-weight: normal;
            }
            h4 {
              font-size: 32px;
              font-weight:500;
            }
          }
					div:first-child {
						border-right: 1px solid #2F2840;
					}
        }
        .qrcode {
					padding: 0px 40px;
					#qrcode1 {
						margin-right: 20px;
					}
					.qrcode-content {
						border-bottom: 1px solid #2F2840;
						display: flex;
	          align-items: center;
	          margin: auto;
						justify-content: flex-start;
						padding: 22px 0;
						img {
							background-color: blue;
							height: 108px;
							width: 108px;
							display: inline-block;
							margin-right: 29px;
							border: 1px solid white;
						}
						p {
							font-size:14px;
							text-align: left;
							margin-bottom: 10px;
						}
						.copy-div1 {
							width: 380px;
							height: 48px;
							background-color: #322A46;
							// border: 1px solid #1C3B7C;
							border-radius: 4px;
							display: flex;
							align-items: center;
							justify-content: center;
							margin-right: 40px;
							justify-content: center;
							#copy_code {
								flex: 1;
							}
							#copy_text {
								flex: 1;
								font-size: 14px;
							}
							span {
								display: inline-block;
								text-align: center;


							}
						.copy {
							width: 100px;
							// height:22px;
							font-size:16px;
							padding: 4px 7px;
							margin-left: 12px;
							cursor: pointer;
							border-left: 1px solid #534671;
						}
						}
						.copy-div2 {
							width: 540px;
							height: 48px;
						}
						span {
							font-size: 18px;
							text-align: left;
							font-weight:bold;
						}
					}
        }
				.buttom {
					padding: 40px;
					h5 {
						font-size: 14px;
						text-align: left;
						margin-bottom: 10px;
					}
					.title {
						margin-bottom: 20px;
					}
				}
			}
			.no-bind {
				padding: 150px 0 0 0;
				p {
					font-weight: 500;
					font-size:18px;
					margin-bottom: 150px;
				}
				.bind-btn {
					width: 186px;
					font-size: 18px;
					padding: 4px 7px;
					margin: auto;
					cursor: pointer;
					-webkit-text-stroke:1px #1371FF;
					}
				}
    }
	}
	@media screen and (max-width: 800px) {
		.invite-page {
			.main {
				.white-div {
					width: 100%;
					margin: 20px auto 0 auto;
					.invite-title {
						 padding: 0 10px;

					}
					.invite-detail {
						width: 100%;
						div {
							h4 {
								font-size: .36rem;
							}
						}
					}
					.qrcode {
						padding: 0 10px;
						.invite-code {
							font-size: 14px;
					    // color: #A0ADFF;
					    text-align: left;
							margin-top: 50px;
						}
						.qrcode-content {
							flex-direction: column;
						}
						.invite-div {
							width: 100%;
							margin-top: 59px;
							.copy-div1 {
						    width: 100%;
								.copy {
											width: 26%;

								}
							}
						}
					}
					.buttom {
					    padding: 40px 20px;
					}
				}
			}
		}
	}
</style>
