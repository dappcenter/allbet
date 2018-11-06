<template>
	<div id="app">
		<router-view/>
		<mu-snackbar position="top" :color="alertOption.color" :open.sync="alertOption.open">
			<mu-icon left :value="alertOption.icon"></mu-icon>
				{{alertOption.msg}}
			<mu-button flat slot="action" color="#fff" @click="$store.commit('closeAlert')">{{$t("message.PopClose")}}</mu-button>
		</mu-snackbar>

		<mu-dialog width="400" :open.sync="isShowConfirm" :append-body="false" class="confirm">
      <h4>{{$t("message.PopTips")}}</h4>
      <p class="content-text">{{confirmOption.content}}</p>
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
		<div class="shade" v-show="isShowWin || noMainNetwork"></div>
		<!-- 中奖弹框 -->
		<transition name="bounce">
			<div class="win-box" v-click-outside="clickoutside" v-show="isShowWin">
				<h3>{{$t("message.GameWinBox1")}}</h3>
				<h3>{{winPopupOption.eth}} ETH</h3>
				<p>（{{$t("message.GameWinBox2")}}{{winPopupOption.ab}}AB）</p>
				<button @click="isShowWin=false;$router.push('roller')">{{$t("message.GameWinBox3")}}</button>
			</div>
		</transition>

    <!-- HD钱包网络弹框提示 -->
    <div class="newwork-box" v-show="noMainNetwork">
        <div>
            <img src="../public/img/MetaMask.png" alt="">
            <span>{{$t('message.AppMainNet')}}</span>
        </div>
        <p>{{$t('message.AppMeta')}}</p>
    </div>
	</div>
</template>

<script>
import { mapState } from "vuex";
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
      isShowWin: false
    };
  },
  watch: {
    confirmOption() {
      this.isShowConfirm = true;
    },
    winPopupOption() {
      this.isShowWin = true;
    }
  },
  created() {
    // 注册web3
    this.$store.dispatch("registerWeb3");
  },
  computed: {
    ...mapState({
      alertOption: state => state.dialogs.alertOption,
      confirmOption: state => state.dialogs.confirmOption,
      loading: state => state.dialogs.loading,
      winPopupOption: state => state.dialogs.winPopupOption,
      noMainNetwork: state => state.dialogs.noMainNetwork
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
    }
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
body {
  min-height: 100%;
  position: relative;
  overflow-x: hidden;
  overflow-y: auto;
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
      background: rgba(33, 71, 151, 1);

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
  .loading-shade {
    position: fixed;
    z-index: 9999999;
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
    left: calc(50% - 180px);
    top: calc(50% - 180px);
    width: 360px;
    height: 360px;
    background: url(../public/img/win.png) no-repeat center;
    background-size: 100%;
    text-align: center;
    padding: 120px 0 0 0;
    z-index: 9999999999;

    h3 {
      font-size: 30px;
    }
    button {
      width: 180px;
      height: 48px;
      background: linear-gradient(
        45deg,
        rgba(241, 182, 40, 1),
        rgba(251, 229, 110, 1)
      );
      box-shadow: 0px 0px 0px 1px rgba(237, 215, 84, 1);
      border-radius: 6px;
      border: none;
      font-size: 20px;
      color: #e34142;
      font-weight: 700;
      cursor: pointer;
      margin-top: 30px;
    }
  }
  .newwork-box {
    position: fixed;
    left: calc(50% - 180px);
    top: calc(50% - 180px);
    background-size: 100%;
    text-align: center;
    background-color: #CCD3FF;
    z-index: 9999999999;
    color: #000;
    padding: 30px;
    border-radius: 6px;
    div {
      img {
        width: 100px;
        vertical-align: middle;
        margin-right: 30px;
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
  animation: bounce-in 0.5s reverse;
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

@media screen and (max-width: 800px) {
  #app {
    .win-box {
      position: fixed;
      left: calc(50% - 110px);
      top: calc(50% - 110px);
      width: 220px;
      height: 220px;
      background: url(../public/img/win.png) no-repeat center;
      background-size: 100%;
      text-align: center;
      padding: 60px 0 0 0;
      z-index: 9999999999;
      h3 {
        font-size: 20px;
      }
      button {
        width: 80px;
        height: 28px;
        border-radius: 4px;
        border: none;
        font-size: 14px;
        cursor: pointer;
        margin-top: 15px;
      }
    }
    .loading-shade {
      .loading-box {
        width: 20%;
      }
    }
  }
}
</style>
