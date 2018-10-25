<template>
	<div class="invite-page">
    <HeaderBar></HeaderBar>
    <div class="main" :style="{minHeight: $window.innerHeight - 150 + 'px'}">
      <h3>{{$t('message.inviteRule')}}</h3>
      <p>{{$t('message.inviteTotalBill')}}{{platformBonus}} AB</p>
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
					<div alt="" id="qrcode1"></div>
          <span>{{$t('message.invitationCode')}}：<span id="copy_code">{{inviteCode}}</span>
					<span class="copy" ref="copy1" data-clipboard-action="copy" data-clipboard-target="#copy_code" @click="copy1">{{$t('message.assetsCopy')}}</span></span><br/>
					{{$t('message.invitationLink')}}：<span id="copy_text">{{inviteUrl}}</span>
					<span class="copy" ref="copy" data-clipboard-action="copy" data-clipboard-target="#copy_text" @click="copy">{{$t('message.assetsCopy')}}</span></span>
        </div>
				<h5>{{$t('message.InvitationRules')}}</h5>
				<h5>{{$t('message.InvitationRules1')}}</h5>
				<h5>{{$t('message.InvitationRules2')}}</h5>
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
				inviteBonus: 0,
		    inviteCount: 0,
		    inviteUrl: 'aaaaaaaaaa',
				inviteCode: '11111',
		    platformBonus: 0,
		  }
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
						this.inviteBonus = res.inviteBonus
						this.inviteCount = res.inviteCount
						// this.inviteUrl = res.inviteUrl
						this.platformBonus = res.platformBonus
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
      background-color: #13207A;
      padding-bottom: 79px;
      h3 {
        font-size:20px;
        font-family:PingFang-SC-Bold;
        font-weight:bold;
        color:rgba(255,255,255,1);
        line-height:35px;
      }
      .invite-title {
        padding: 10px 199px;
        font-size:16px;
        color: #FFFFFF;
        display:inline-block;
      }
      .white-div {
        width:1000px;
        height:460px;
        background:#1A439E;
        border-radius:6px;
        margin: 60px auto 0 auto;
        p {
          font-size:28px;
          font-family:PingFang-SC-Bold;
          font-weight:bold;
          color: #3963B8;
        }
        .invite-detail {
          display: flex;
          width: 560px;
          height: 150px;
          align-items: center;
          justify-content: center;
          margin: 48px auto;
          div {
            width: 50%;
            .title {
              color: #646464;
              font-size:16px;
            }
            h4 {
              font-size: 28px;
              color: #5480D9;
              font-weight:bold;
            }
          }
        }
        .qrcode {
          display: flex;
          align-items: flex-end;
          justify-content:  center;
          margin: auto;
          img {
            background-color: blue;
            height: 108px;
            width: 108px;
            display: inline-block;
            margin-right: 29px;
						border: 1px solid white;
          }
          span {
            color: #5480D9;
            font-size: 18px;
            text-align: left;
            font-weight:bold;
            .copy {
              width:42px;
              height:22px;
              background:rgba(255,255,255,1);
              border:2px solid rgba(105,149,239,1);
              border-radius:2px;
              font-size:14px;
              padding: 4px 7px;
              margin-left: 12px;
            }
          }
        }
				h5 {
					font-size: 14px;
					color: #FFFFFF;
					text-align: left;
				}
      }
    }
	}
	@media screen and (max-width: 800px) {
		.invite-page {
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
