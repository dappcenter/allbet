<template>
	<div class="invite-page">
    <HeaderBar></HeaderBar>
    <div class="main" :style="{minHeight: $window.innerHeight - 150 + 'px'}">
      <div class="top nominscreen">
				<h3>{{$t('message.inviteRule')}}</h3>
	      <p>{{$t('message.inviteTotalBill')}}{{platformBonus}} AB</p>
      </div>
      <div class="white-div">
        <p class="invite-title">{{$t('message.inviteFriend')}}</p>
        <div class="invite-detail">
          <div class="">
            <p class="title">{{$t('message.invitationSuccessed')}}</p>
            <h4>{{inviteCount}} {{$t('message.InvitePeople')}}</h4>
          </div>
          <div class="">
            <p class="title">{{$t('message.tradeInvitationReward')}}：</p>
            <h4>{{inviteBonus}} AB</h4>
          </div>
        </div>
        <div class="qrcode">
					<p class="invite-code minscreen">专属邀请二维码：</p>
					<div class="qrcode-content">
						<div alt="" id="qrcode1"></div>
						<div class="invite-div">
							<p>{{$t('message.invitationCode')}}</p>
							<div class="copy-div1">
								<span id="copy_code">{{getCurrentAddr.inviteCode}}</span>
								<span class="copy" ref="copy1" data-clipboard-action="copy" data-clipboard-target="#copy_code" @click="copy1">{{$t('message.assetsCopy')}}</span>
							</div>
						</div>
						<div class="invite-div">
							<p>{{$t('message.invitationLink')}}</p>
							<div class="copy-div1 copy-div2">
								<span id="copy_text">{{inviteUrl}}</span>
								<span class="copy" ref="copy" data-clipboard-action="copy" data-clipboard-target="#copy_text" @click="copy">{{$t('message.assetsCopy')}}</span>
							</div>
						</div>
					</div>
        </div>
				<div class="buttom">
					<h5 class="title">{{$t('message.InvitationRules')}}</h5>
					<h5>{{$t('message.InvitationRules1')}}</h5>
					<h5>{{$t('message.InvitationRules2')}}</h5>
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
				inviteBonus: '',
		    inviteCount: '',
		    inviteUrl: 'aaaaaaaaaa',
		    platformBonus: '',
		  }
	  },
		computed: {
			getCurrentAddr() {
				return this.$store.state.user.currentAddr
			},
		},
    created () {
			this.getInvite()
    },
		mounted () {
			this.copyBtn = new Clipboard(this.$refs.copy)
			this.copyBtn1 = new Clipboard(this.$refs.copy1)
		},
    components: {
	    HeaderBar,
	    FooterBar,
    },
		methods: {
			getInvite () {
				this.$http.get("/app/user/invite",{

				}).then((res) => {
					if (res.code == 200) {
						let result = res.result || {}
						this.inviteBonus = result.inviteBonus || 0
						this.inviteCount = result.inviteCount || 0
						// this.inviteUrl = result.inviteUrl
						this.platformBonus = result.platformBonus
						var qrcode = new QRCode(document.getElementById("qrcode1"), {
							width: 108,
							height: 108,
						});
						qrcode.makeCode(this.inviteUrl);
					}
				})
			},
			copy1 () {
				console.log('getCurrentAddr', this.getCurrentAddr);
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
      background-color: #040810;
      padding: 40px 0 79px 0;
			.top {
				width: 1200px;
				height: 120px;
				background: url(../../public/img/bg.jpg) repeat left;
				background-size: 200px;
				margin: 0px auto 30px auto;
				padding-top: 33px;
			}
      h3 {
        font-size:20px;
        font-family:PingFang-SC-Bold;
        font-weight:bold;
        color:rgba(255,255,255,1);
        line-height:35px;
      }
      .white-div {
        width:1200px;
        background:#172F61;
        border-radius:6px;
        margin: 60px auto 0 auto;
				.invite-title {
	        // padding: 10px 199px;
	        font-size:16px;
	        color: #FFFFFF;
					text-align: left;
					width:100%;
					height:48px;
					background:rgba(25,53,112,1);
					box-shadow:0px 0px 0px 0px rgba(16,40,90,0.75);
					padding: 0 40px;
					font-weight:bold;
					line-height: 48px;
	      }
        p {
          font-size:28px;
          font-family:PingFang-SC-Bold;
          font-weight:bold;
          color: #3963B8;
        }
        .invite-detail {
          display: flex;
          align-items: center;
          justify-content: center;
          margin: auto;
					width: 1120px;
					border-bottom: 1px solid #1C3B7C;
					height: 132px;
          div {
            width: 50%;
            .title {
              color: #A0ADFF;
              font-size:16px;
							font-weight: normal;
            }
            h4 {
              font-size: 32px;
              color: #fff;
              font-weight:500;
            }
          }
					div:first-child {
						border-right: 1px solid #1C3B7C;
					}
        }
        .qrcode {
					padding: 0px 40px;
					#qrcode1 {
						margin-right: 20px;
					}
					.qrcode-content {
						border-bottom: 1px solid #1C3B7C;
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
							color: #A0ADFF;
							text-align: left;
							margin-bottom: 10px;
						}
						.copy-div1 {
							width: 380px;
							height: 48px;
							border: 1px solid #1C3B7C;
							border-radius: 4px;
							display: flex;
							align-items: center;
							justify-content: center;
							margin-right: 40px;
							justify-content: center;
							#copy_code {
								flex: 1;
								color: #fff;
							}
							#copy_text {
								flex: 1;
								color: #fff;
							}
							span {
								display: inline-block;
								text-align: center;
								border-left: 1px solid #1C3B7C;
							}
						.copy {
							width:186px;
							// height:22px;
							font-size:16px;
							color: #708FFF;
							padding: 4px 7px;
							margin-left: 12px;

						}
						}
						.copy-div2 {
							width: 540px;
							height: 48px;
						}
						span {
							color: #5480D9;
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
						color: #FFFFFF;
						text-align: left;
						margin-bottom: 10px;
					}
					.title {
						color: #A0ADFF;
						margin-bottom: 20px;
					}
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
					}
					.qrcode {
						padding: 0 10px;
						.invite-code {
							font-size: 14px;
					    color: #A0ADFF;
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
