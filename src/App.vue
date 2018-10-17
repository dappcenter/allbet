<template>
		<div id="app">
				<router-view/>
				<mu-snackbar position="top" :color="alertOption.color" :open.sync="alertOption.open">
						<mu-icon left :value="alertOption.icon"></mu-icon>
						{{alertOption.msg}}
						<mu-button flat slot="action" color="#fff" @click="$store.commit('closeAlert')">关闭</mu-button>
				</mu-snackbar>

				<mu-dialog width="400" :open.sync="isShowConfirm" :append-body="false" class="confirm">
            <h4>提示</h4>    
            <p>{{confirmOption.content}}</p>
            <div class="btn-wrap">
								<button v-for="btn in confirmOption.btn" :class="btn.type" @click="onConfirmBtn(btn.cb)">{{btn.text}}</button>
						</div>
        </mu-dialog>
		</div>
</template>

<script>
import {mapState} from 'vuex'
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
						isShowConfirm: false
				}
		},
		watch: {
				confirmOption() {
						this.isShowConfirm = true
				}
		},
		created() {
				// 注册web3
        this.$store.dispatch("registerWeb3")
		},
  	computed: {
				...mapState({
						alertOption: state => state.dialogs.alertOption,
						confirmOption: state => state.dialogs.confirmOption
				})
  	},
  	methods: {
				onConfirmBtn(cb) {
						this.isShowConfirm = false
						if(cb) {
								cb()
						}
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
		font-family: "Poppins",sans-serif;
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
										background:linear-gradient(90deg,rgba(100,180,239,1),rgba(57,94,236,1));
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

</style>
