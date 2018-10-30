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
            <p>{{confirmOption.content}}</p>
            <div class="btn-wrap">
				<button v-for="btn in confirmOption.btn" :class="btn.type" @click="onConfirmBtn(btn.cb)">{{btn.text}}</button>
			</div>
    </mu-dialog>

		<div class="loading-shade" v-show="loading">
			<div class="loading-box">
				<img src="../public/svg/loading.svg" alt="">
			</div>
		</div>
		<div class="shade" v-show="isShowWin"></div>
		<!-- 中奖弹框 -->
		<transition name="bounce">
			<div class="win-box" v-click-outside="clickoutside" v-show="isShowWin">
				<h3>恭喜您</h3>
				<h3>{{winPopupOption.eth}} ETH</h3>
				<p>（获得AB数： {{winPopupOption.ab}}AB）</p>
				<button @click="isShowWin=false;$router.push('roller')">再玩一次</button>
			</div>
		</transition>
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
      this.isShowConfirm = true
	},
	winPopupOption() {
	  this.isShowWin = true
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
	  winPopupOption: state => state.dialogs.winPopupOption
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
		this.isShowWin = false
	}
  }
};
</script>


<style lang="less">
html,body,div,h1,h2,h3,h4,h5,h6,ul,li,p {
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
    h4 {
      font-size: 20px;
    }
    p {
      margin: 40px 0;
      font-size: 16px;
    }
    .btn-wrap {
      display: flex;
      justify-content: space-around;
      button {
        width: 40%;
        height: 40px;
        text-align: center;
        border: 1px solid #686d6d;
        border-radius: 6px;
        background-color: #fff;
        color: #686d6d;
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
	background-color: rgba(000, 000, 000, .5);
    
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
		width:180px;
		height:48px;
		background:linear-gradient(45deg,rgba(241,182,40,1),rgba(251,229,110,1));
		box-shadow:0px 0px 0px 1px rgba(237,215,84,1);
		border-radius:6px;
		border: none;
		font-size: 20px;
		color: #E34142;
		font-weight: 700;
		cursor: pointer;
		margin-top: 30px;
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
  animation: bounce-in .5s;
}
.bounce-leave-active {
  animation: bounce-in .5s reverse;
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
</style>
