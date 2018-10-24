<template>
	<div class="invite-page">
    <HeaderBar></HeaderBar>
    <div class="main" :style="{minHeight: $window.innerHeight - 150 + 'px'}">
      <h3>{{$t('message.inviteRule')}}</h3>
      <p>{{$t('message.inviteTotalBill')}}2000000 AB</p>
      <div class="white-div">
        <p class="invite-title">{{$t('message.inviteFriend')}}</p>
        <div class="invite-detail">
          <div class="">
            <p class="title">{{$t('message.invitationSuccessed')}}</p>
            <h4>23 人</h4>
          </div>
          <div class="">
            <p class="title">{{$t('message.tradeInvitationReward')}}：</p>
            <h4>5498 AB</h4>
          </div>
        </div>
        <div class="qrcode">
          <img src="" alt="">
          <span>{{$t('message.invitationCode')}}：Bwe43lo<br/>{{$t('message.invitationLink')}}：https://allbet.io/bwe43lo<span class="copy">{{$t('message.assetsCopy')}}</span></span>
        </div>
				<p>{{$t('message.InvitationRules')}}</p>
				<p>{{$t('message.InvitationRules1')}}</p>
				<p>{{$t('message.InvitationRules2')}}</p>
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
        background:rgba(255,255,255,1);
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
