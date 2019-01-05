<template>
	<div id="app">
		<router-view/>
		<mu-snackbar position="top" class="alert" :color="alertOption.color" :open.sync="alertOption.open" :timeout="300000">
			<mu-icon left :value="alertOption.icon"></mu-icon>
				{{alertOption.msg}}
      <i class="close" slot="action" @click="$store.commit('closeAlert')"></i>
		</mu-snackbar>

		<mu-dialog width="400" :open.sync="isShowConfirm" :append-body="false" class="confirm">
      <h4>{{confirmOption.title || $t("message.PopTips")}}</h4>
      <p class="content-text" v-html="confirmOption.content"></p>
      <p class="other">{{confirmOption.other}}</p>
      <div class="btn-wrap">
				<button v-for="btn in confirmOption.btn" :class="btn.type" @click="onConfirmBtn(btn.cb)">{{btn.text}}</button>
			</div>
    </mu-dialog>

		<div class="loading-shade" v-show="loading">
			<div class="loading-box">
				<img src="../public/svg/loading.svg" alt="">
			</div>
		</div>
		<div class="shade" v-show="noMainNetwork"></div>
		<!-- 中奖弹框 -->
		<transition name="bounce">
      <div class="win-box" :class="{'pokerPage' : $route.name == 'poker'}" v-click-outside="clickoutside" v-show="isShowWin">
        <div class="centent" :class="{'win': winPopupOption.winFlag == 'WIN'}">
          <h3 v-if="winPopupOption.winFlag == 'WIN'" class="">Congratulations, you bet  {{winPopupOption.amount}} {{winPopupOption.coinType}}</h3>
          <h3 v-else class="">Unfortunately, you bet  {{winPopupOption.amount}} {{winPopupOption.coinType}}</h3>
          <p v-if="winPopupOption.winFlag == 'WIN'"><span>Roll result </span>
						<img v-show="winPopupOption.cardType" :src="'/img/poker/cardtype'+ winPopupOption.cardType +'.png'" alt="">
						<span>{{winPopupOption.luckyNum}}, win {{Math.floor(winPopupOption.rewards*10000)/10000}} {{winPopupOption.coinType}}</span>
					</p>
          <p v-else><span>Roll result </span>
						<img v-show="winPopupOption.cardType" :src="'/img/poker/cardtype'+ winPopupOption.cardType +'.png'" alt="">
						<span>{{winPopupOption.luckyNum}}, lost {{winPopupOption.amount}} {{winPopupOption.coinType}}</span>
					</p>
        </div>
      </div>

		</transition>

    <!-- HD钱包网络弹框提示 -->
    <div class="newwork-box" v-show="noMainNetwork">
        <div>
            <img src="../public/img/MetaMask.png" alt="" v-show="coinType == 'ETH'">
            <img src="../public/img/TRX_plugin.png" alt="" v-show="coinType == 'TRX'">
            <span>{{$t('message.AppMainNet')}}</span>
        </div>
        <p v-show="coinType == 'ETH'">{{$t('message.AppMeta')}}</p>
        <p v-show="coinType == 'TRX'">{{$t('message.AppTron')}}</p>
    </div>

    <!-- 密码验证弹框 -->
    <mu-dialog width="400" :open.sync="isShowPsdVer" :append-body="false" class="password-verify" :overlay-close="false">
      <h4>密码校验</h4>
      <input type="password" v-model.trim="password" placeholder="请输入密码" @keyup.enter="verifyPassword">
      <div class="btn-wrap">
        <button @click="isShowPsdVer = false">取消</button>
				<button class="high" @click="verifyPassword">确定</button>
			</div>
    </mu-dialog>
	</div>

</template>

<script>
import { mapState, mapMutations } from "vuex";
import {getBonusPools} from "./util/im_getData"
import Md5 from "./assets/js/md5.js"
export default {
  name: "App",
  data() {
    return {
      colors: ["success", "info", "error", "warning"],
      color: {
        color: "success",
        message: "",
        open: true,
        timeout: 3000
      },
      isShowConfirm: false,
      isShowWin: false,
      isShowPsdVer: false,
      password: ""
    };
  },
  watch: {
    confirmOption() {
      this.isShowConfirm = true
    },
    winPopupOption() {
      this.isShowWin = true
    },
    popupStatus() {
      this.isShowConfirm = false
      this.isShowWin = false
    },
    storeIsShowPsdVer(newVal) {
      this.isShowPsdVer = newVal
      this.password = ""
    },
    isShowPsdVer(newVal) {
      if(!newVal) {
        this.$store.commit("CHANGE_PSDVER", false)
      }
    }
  },
  mounted() {
    switch(this.coinType) {
      case "ETH":
        // 注册web3
        this.$store.dispatch("registerWeb3")
        break;
      case "TRX":
        // 注册tron
        this.$store.dispatch("registerTron")
        break;
      default:
        break;
    }
    // this.$store.dispatch("registerEOS")
    // getBonusPools()
  },
  computed: {
    ...mapState({
      alertOption: state => state.dialogs.alertOption,
      confirmOption: state => state.dialogs.confirmOption,
      loading: state => state.dialogs.loading,
      winPopupOption: state => state.dialogs.winPopupOption,
      noMainNetwork: state => state.dialogs.noMainNetwork,
      popupStatus: state => state.dialogs.popupStatus,
      storeIsShowPsdVer: state => state.dialogs.isShowPsdVer,
      currentAddr: state => state.user.currentAddr,
      coinType: state => state.user.coinType,
      locale: state => state.locale
    })
  },
  methods: {
    onConfirmBtn(cb) {
      this.isShowConfirm = false;
      if (cb) {
        cb();
      }
    },
    clickoutside() {
      this.isShowWin = false;
    },
    // 校验密码
    verifyPassword() {
      if(this.password == "") {
        this.alert({
            type: "info",
            msg: this.$t('message.PopAccountPassEmpty')
        })
        return
      }
      this.$http.post("/app/user/password/verify", {
        address: this.currentAddr.coinAddress,
        password: Md5(this.password)
      }).then(res => {
        if(res.code == 200) {
          this.isShowPsdVer = false
        }
      })
    },
    ...mapMutations({
      alert: "alert"
    })
  }
};
</script>


<style lang="less">
html,
body,
div,
h1,
h2,
h3,
h4,
h5,
h6,
ul,
li,
p {
  margin: 0;
  padding: 0;
}
li {
  list-style: none;
}
html {
  min-height: 100%;
  background-color: #22202C;
}
body {
  min-height: 100%;
  position: relative;
  overflow-x: hidden;
  overflow-y: auto;
  background-color: #191A2A !important;
}
#app {
  font-family: "Poppins", sans-serif;
  color: #fff;
  font-size: 14px;
  .confirm {
    text-align: center;
    .mu-dialog {
      border-radius: 4px;
      overflow: hidden;
    }
    .mu-dialog-body {
      background: #52476F;

      h4 {
        font-size: 20px;
        color: #fff;
      }
      .content-text {
        margin: 40px 0;
        font-size: 16px;
        text-align: center;
        color: #fff;
      }
      .other {
        color: #C8C8C8;
        font-size: 14px;
        margin-bottom: 10px;
      }
    }
    .btn-wrap {
      display: flex;
      justify-content: space-around;
      button {
        width: 40%;
        height: 40px;
        text-align: center;
        border-radius: 6px;
        border: none;
        background-color: #FFC425;
        color: #1A0D59;
      }
    }
  }
  .loading-shade {
    position: fixed;
    z-index: 99999999999;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    .loading-box {
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      width: 8%;
    }
  }
  .shade {
    position: fixed;
    z-index: 9999999998;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(000, 000, 000, 0.5);
  }
  .win-box {
      position: fixed;
      left: calc(50% - 200px);
      top: 3%;
      width: 400px;
      z-index: 9999999999;
      &.pokerPage {
        top: 320px;
      }
      .centent {
        position: relative;
        z-index: 2;
        width: 100%;
        height: 100%;
        text-align: center;
        background-color: #555073;
        border-radius: 12px;
        overflow: hidden;
        &.win {
          h3 {
            color: #13F693;
          }
          &:before {
            background-color: #13F693;
          }
        }
        h3 {
          font-size: 16px;
          color: #FE0E4E;
          margin-top: 12px;
          &.rewards {
            font-size: 50px;
            margin-top: 15px;
          }
          &.cointype {
            font-size: 25px;
          }
        }
        p {
          position: relative;
          font-size: 14px;
          margin: 5px 0 12px;
          color: #fff;

        }
        &:before {
          content: "";
          display: block;
          height: 4px;
          background-color: #FE0E4E;
          width: 100%;
        }
				img {
					width: 15px;
					// height: 15px;
					margin: 0 3px;
					display: inline-block;
					vertical-align: bottom;
				}
      }
  }
  .newwork-box {
    position: fixed;
    left: calc(50% - 250px);
    width: 500px;
    top: calc(50% - 200px);
    background-size: 100%;
    text-align: center;
    background-color: #716AA1;
    z-index: 9999999999;
    color: #D7D1FF;
    padding: 30px;
    border-radius: 6px;
    div {
      display: flex;
      align-items: center;
      justify-content: center;
      img {
        width: 80px;
        margin-right: 10px;
      }
      span {
        font-size: 36px;
        vertical-align: middle;
      }
    }
    p {
      margin-top: 20px;
      font-size: 16px;
    }
  }
  .password-verify {
    text-align: center;
    .mu-dialog {
      border-radius: 4px;
      overflow: hidden;
    }
    .mu-dialog-body {
      background: rgba(33, 71, 151, 1);

      h4 {
        font-size: 20px;
        color: #fff;
      }
      input {
        width: 100%;
        background-color: #173167;
        border: none;
        color: #fff;
        text-align: center;
        height: 40px;
        border-radius: 4px;
        margin: 20px auto;
      }
    }
    .btn-wrap {
      display: flex;
      justify-content: space-between;
      button {
        width: 40%;
        height: 40px;
        text-align: center;
        border-radius: 6px;
        border: none;
        background-color: #458ad8;
        color: #fff;
        &.high {
          background: linear-gradient(
            90deg,
            rgba(100, 180, 239, 1),
            rgba(57, 94, 236, 1)
          );
          color: #fff;
          border: none;
        }
      }
    }
  }
}
#nav {
  padding: 30px;
  a {
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
.bounce-enter-active {
  animation: bounce-in 0.5s;
}
.bounce-leave-active {
  // animation: bounce-in 0.5s reverse;
}
@keyframes bounce-in {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.5);
  }
  100% {
    transform: scale(1);
  }
}
@-webkit-keyframes spin {
    from {
        -webkit-transform: rotate(0deg);
    }
    to {
        -webkit-transform: rotate(360deg);
    }
}

@keyframes spin {
    from {
        transform: rotate(0deg);
    }
    to {
        transform: rotate(360deg);
    }
}

@media screen and (max-width: 800px) {
  #app {
    .confirm {
      .btn-wrap {
        button {
          width: 45%;
          height: 40px;
          text-align: center;
          font-size: 10px;
        }
      }
    }
    .win-box {
      left: 5%;
      width: 90%;
      &.pokerPage {
        top: 39%;
      }
      .centent {
        border-radius: 12px;
        h3 {
          font-size: .3rem;
          color: #FE0E4E;
          margin-top: .12rem;
        }
        p {
          font-size: .12rem;
          margin: 5px 0 12px;
        }
        &:before {
          height: .1rem;
        }
      }
    }
    .loading-shade {
      .loading-box {
        width: 20%;
      }
    }
    .newwork-box {
      left: 50%;
      width: 80%;
      top: 50%;
      transform: translate(-50%, -50%);
      background-size: 100%;
      text-align: center;
      background-color: #CCD3FF;
      z-index: 9999999999;
      color: #000;
      padding: 30px;
      border-radius: 6px;
      div {
        display: flex;
        align-items: center;
        justify-content: center;
        img {
          width: 50px;
        }
        span {
          font-size: .3rem;
          vertical-align: middle;
          font-weight: 700;
        }
      }
      p {
        margin-top: .2rem;
        font-size: .12rem;
      }
    }
  }
}
</style>
