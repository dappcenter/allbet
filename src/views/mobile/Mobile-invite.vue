<template>
	<div class="mobile-invite-page">
    <HeaderBar></HeaderBar>
    <div class="main">
      <div class="white-div">
        <div class="" v-show="inviteCode">
	        <div class="invite-detail">
	          <div class="">
	            <p class="title">{{$t('message.invitationSuccessed')}}</p>
	            <h4>{{inviteCount}} {{$t('message.InvitePeople')}}</h4>
	          </div>
	          <div class="">
	            <p class="title">{{$t('message.tradeInvitationReward')}}</p>
	            <h4>{{inviteBonus}} AB</h4>
	          </div>
	        </div>
	        <div class="qrcode">
						<div class="qrcode-content">
							<div class="invite-div">
								<p>{{$t('message.invitationCode')}}</p>
								<div class="copy-div1">
									<span id="copy_code">{{inviteCode}}</span>
									<span class="copy" ref="copy1" data-clipboard-action="copy" data-clipboard-target="#copy_code" @click="copy1">{{$t('message.assetsCopy')}}</span>
								</div>
							</div>
							<div class="invite-div">
								<p>{{$t('message.invitationLink')}}</p>
								<div class="copy-div1 copy-div2">
									<span id="copy_text">{{inviteUrl}}</span>
									<span class="copy" ref="copy" data-clipboard-action="copy" :data-clipboard-text="$t('message.inviteText') + inviteUrl" @click="copy">{{$t('message.assetsCopy')}}</span>
								</div>
							</div>
						</div>
	        </div>
					<div class="buttom">
						<h5 class="title">{{$t('message.InvitationRules')}}</h5>
						<h5>{{$t('message.InvitationRules1')}}</h5>
						<h5>{{$t('message.InvitationRules2')}}</h5>
						<h5>{{$t('message.InvitationRules3')}}</h5>
					</div>
        </div>
				<div class="no-bind" v-show="!inviteCode">
						<p>
							{{$t('message.InviteBind')}}
							<router-link class="bind-btn" :to="{ name: 'loginselect'}">{{$t('message.hasToLogin')}}</router-link>
						</p>
						<div class="buttom">
							<h5 class="title">{{$t('message.InvitationRules')}}</h5>
							<h5>{{$t('message.InvitationRules1')}}</h5>
							<h5>{{$t('message.InvitationRules2')}}</h5>
							<h5>{{$t('message.InvitationRules3')}}</h5>
						</div>
				</div>
      </div>
    </div>
</div>

</template>

<script>
import HeaderBar from "@/components/common/header_bar"
import QRCode from 'qrcodejs2'
import Clipboard from 'clipboard';
import {mapMutations, mapState} from "vuex"

 export default {
	  data () {
		  return {
				inviteBonus: '0',
		    inviteCount: '0',
		    inviteUrl: location.origin + "/dice?inv=",
				inviteCode: "",
		    platformBonus: '',
		  }
	  },
		computed: {
			getCurrentAddr() {
				return this.$store.state.user.currentAddr
			},
			getInviteCode() {
					return this.$store.state.user.userInfo.inviteCode
			}
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
    },
		methods: {
			getInvite () {
				this.$http.get("/app/user/invite?"+this.getCurrentAddr.coinAddress,{

				}).then((res) => {
					if (res.code == 200) {
						let result = res.result || {}
						this.inviteBonus = result.inviteBonus || 0
						this.inviteCount = result.inviteCount || 0
						this.inviteCode =  this.getInviteCode
						this.inviteUrl = location.origin + "/dice?inv=" + this.inviteCode
						this.platformBonus = result.platformBonus
						// document.getElementById("qrcode1").innerHTML = ''
						// var qrcode = new QRCode(document.getElementById("qrcode1"), {
						// 	width: 108,
						// 	height: 108,
						// });
						// qrcode.makeCode(this.inviteUrl);
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
			})
		}
 };
</script>

 <style lang="less">
	.mobile-invite-page {
		margin: 0 auto;
    .main {
      margin: auto;
			text-align: center;
			background-color: #22202C;
      h3 {
        font-size:20px;
        font-family:PingFang-SC-Bold;
        font-weight:bold;
        color:#D3CDFF;
        line-height:35px;
      }
      .white-div {
				padding: 0 .4rem;
				overflow: hidden;
        .invite-detail {
          display: flex;
          align-items: center;
          justify-content: center;
					background-color: #49425C;
					padding: .3rem 0;
					margin-top: .4rem;
          div {
            width: 50%;
            .title {
              color: #D3CDFF;
              font-size:16px;
							font-weight: normal;
            }
            h4 {
              font-size: .3rem;
              color: #fff;
              font-weight:500;
            }
          }
					div:first-child {
						border-right: 1px solid #2F2840;
					}
        }
        .qrcode {
					.qrcode-content {
	          margin: auto;
						.invite-div {
							margin-top: .4rem;
						}
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
							color: #D3CDFF;
							text-align: left;
							margin-bottom: 10px;
						}
						.copy-div1 {
							height: 48px;
							background-color: #49425C;
							border-radius: 4px;
							display: flex;
							align-items: center;
							justify-content: center;
							justify-content: center;
							#copy_code {
								flex: 1;
								color: #fff;
								font-size: .24rem;
							}
							#copy_text {
								flex: 1;
								color: #fff;
								font-size: .24rem;
							}
							span {
								display: inline-block;
								text-align: center;
								&.copy {
									width: 1rem;
									font-size: .24rem;
									color: #D3CDFF;
									padding: 4px 7px;
									margin-left: 12px;
									cursor: pointer;
									border-left: 1px solid #2F2840;
								}
							}

						}
						.copy-div2 {
							height: 48px;
						}
						span {
							color: #D3CDFF;
							font-size: 18px;
							text-align: left;
							font-weight:bold;
						}
					}
        }
				.buttom {
					margin-top: .4rem;
					h5 {
						font-size: .24rem;
						color: #fff;
						text-align: left;
						margin-bottom: 10px;
						font-weight: 400;
					}
					.title {
						color: #D3CDFF;
						margin-bottom: 20px;
					}
				}
			}
			.no-bind {
				padding: 1.5rem 0 0 0;
				p {
					color: #D3CDFF;
					font-size:.24rem;
					margin-bottom: 150px;
				}
				.bind-btn {
					width: 186px;
					font-size: .24rem;
					color: #fff;
					padding: 4px 7px;
					margin: auto;
					-webkit-text-stroke:1px #1371FF;
					}
				}
    }
	}

</style>
