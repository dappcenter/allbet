<template>
	<div class="account-security">
	<HeaderBar></HeaderBar>
	<div class="main">
		<div class="content">
			<p class="title">
				<span>账户安全</span>
				<span>
				</span>
		</p>
			<li><div>账号：</div><div>165****7845</div></li>
      <li><div>账号：</div><div class="operation">暂未绑定<span @click="registerAccount = true">去绑定</span></div></li>
			<li><div>MetaMask地址：</div><div>0xFBb1b73C4f0BDa4f67dcA266ce6Ef42f520fBB98</div></li>
      <li><div>MetaMask地址：</div><div>暂未绑定，请登录MetaMask将自动绑定，若已登录请刷新页面</div></li>
			<li><div>登录密码：</div><div class="operation">********<span @click="resetPassDialog = true">修改</span></div></li>
      <li><div>登录密码：</div><div>暂无</div></li>
		</div>
	</div>
	<!-- 手机账号绑定 -->
	<mu-dialog :open.sync="registerAccount" :append-body="false" class="register-accout">
			<h4>绑定手机账号</h4>
			<div class="input-wrap">
					<label>账号</label>
					<div class="input-flex prefix">
							<mu-menu cover :open.sync="prefixMenu">
									<span color="primary">{{registerForm.prefix}}</span>
									<mu-list slot="content">
											<mu-list-item button v-for="item in prefixs" :key="item" @click="registerForm.prefix = item;prefixMenu = false">
													<mu-list-item-title>{{item}}</mu-list-item-title>
											</mu-list-item>
									</mu-list>
							</mu-menu>
							<input type="text" v-model.trim="registerForm.phone" placeholder="请输入您的手机号码">
					</div>
			</div>
			<div class="input-wrap">
					<label>验证码</label>
					<div class="input-flex">
							<input type="text" v-model="registerForm.captcha" placeholder="请输入短信验证码">
							<a href="javascript:;" @click="getSMScode">{{registerForm.btnText}}</a>
					</div>
			</div>
			<button @click="registerDo">绑定</button>
			<p><a href="javascript:;" @click="registerAccount = false;registerEmailAccount = true;">绑定邮箱</a></p>
	</mu-dialog>
	<!-- 邮箱账号绑定 -->
	<mu-dialog :open.sync="registerEmailAccount" :append-body="false" class="register-accout">
			<h4>绑定邮箱账号</h4>
			<div class="input-wrap">
					<label>邮箱</label>
					<div class="input-flex">
							<input type="text" v-model.trim="registerForm.email" placeholder="请输入您的邮箱账号">
					</div>
			</div>
			<div class="input-wrap">
					<label>验证码</label>
					<div class="input-flex">
							<input type="text" v-model="registerForm.emailCaptcha" placeholder="请输入短信验证码">
							<a href="javascript:;" @click="getSMScode">{{registerForm.btnText}}</a>
					</div>
			</div>
			<button @click="registerDo">绑定</button>
			<p><a href="javascript:;" @click="registerAccount = true;registerEmailAccount = false;">绑定手机号</a></p>
	</mu-dialog>
	<!-- 账号已存在输入密码 -->
	<mu-dialog :open.sync="confirmAccountExist" :append-body="false" class="register-accout">
			<h4>绑定账号</h4>
			<div class="input-wrap"  style="width:338px;">
					<label>密码</label>
					<input type="password" v-model="registerForm.loginPwdCheck" placeholder="字母数字组成，不超过12位">
			</div>
			<button @click="confirmPass1">确认</button>
	</mu-dialog>
	<!-- 账号不存在输入密码 -->
	<mu-dialog :open.sync="confirmAccountNotExist" :append-body="false" class="register-accout">
			<h4>绑定账号</h4>
			<div class="input-wrap" style="width:338px;">
					<label>密码</label>
					<input type="password" v-model="registerForm.loginPwd" placeholder="字母数字组成，不超过12位">
			</div>
			<div class="input-wrap" style="width:338px;">
					<label>确认密码</label>
					<input type="text" v-model="registerForm.loginPwd2" placeholder="请再次输入您的密码">
			</div>
			<button @click="confirmPass2">确认</button>
	</mu-dialog>
	<!-- 重置登陆密码 -->
	<mu-dialog :open.sync="resetPassDialog" :append-body="false" class="register-accout">
			<h4>重置登陆密码</h4>
			<div class="input-wrap">
					<p>手机号码：176****2325</p>
			</div>
			<div class="input-wrap">
					<label>验证码</label>
					<div class="input-flex">
							<input type="text" v-model="registerForm.resetCaptcha" placeholder="请输入短信验证码">
							<a href="javascript:;" @click="getSMScode">{{registerForm.btnText}}</a>
					</div>
			</div>
			<div class="input-wrap">
					<label>新的密码</label>
					<input type="password" v-model="registerForm.resetLoginPwd" placeholder="字母数字组成，不超过12位">
			</div>
			<div class="input-wrap">
					<label>确认密码</label>
					<input type="text" v-model="registerForm.resetLoginPwd2" placeholder="请再次输入您的密码">
			</div>
			<button @click="passResetDo">确认修改</button>
	</mu-dialog>
	<FooterBar ref="ft"></FooterBar>
</div>

</template>

<script>
import HeaderBar from "@/components/common/header_bar"
import FooterBar from "@/components/common/footer_bar"
import Md5 from "../../public/js/md5.js"
import {mapMutations} from "vuex"
 export default {
	 data () {
		 return {
			 ethPrice: 15.3,
			 registerAccount: false,
			 registerEmailAccount: false,
			 confirmAccountExist: false,
			 confirmAccountNotExist: false,
			 resetPassDialog: false,
			 prefixs: ["+86", "+96", "+1234"],
			 prefixMenu: false,
			 registerForm: {
					 "phone": "",
					 "prefix": "+86",
					 "captcha": "",

					 "loginPwdCheck": "",

					 "loginPwd": "",
					 "loginPwd2": "",

					 "s": 60,
					 "btnText": "获取验证码",
					 "timer": null,
					 "email": "",
					 "emailCaptcha": "",

					 "resetCaptcha": "", // 重置登陆密码
					 "resetLoginPwd": "",
					 "resetLoginPwd2": "",
			 }
		 }
	 },
    computed: {

     },
     components: {
	    HeaderBar,
	    FooterBar,
		},
		 methods: {
			 // 获取验证码(区分是重置登陆密码还是绑定的)
			 getSMScode() {
					 if(this.registerForm.phone == "") {
							 this.alert({
									 type: "info",
									 msg: "手机号码不能为空"
							 })
							 return
					 }
					 this.registerSMScountDown()
					 this.$http.post("/open/captcha", {
							 "macCode": "macCode",
							 "phone": this.registerForm.phone,
							 "prefix": this.registerForm.prefix,
							 "type": "REGISTER"
					 }).then(res => {
							 console.log(res)
							 if(res.code != 200) {
									 clearTimeout(this.registerForm.timer)
									 this.registerForm.btnText = '获取验证码'
							 }
					 }).catch(err => {
							 clearTimeout(this.registerForm.timer)
							 this.registerForm.btnText = '获取验证码'
					 })
			 },
			 //短信验证码倒计时
			 registerSMScountDown() {
					 if(this.registerForm.s > 0) {
							 this.registerForm.s--
							 this.registerForm.btnText = this.registerForm.s + 's'
							 this.registerForm.timer = setTimeout(this.registerSMScountDown, 1000);
					 }else {
							 this.registerForm.s = 60
							 this.registerForm.btnText = '获取验证码'
					 }
			 },
			 // 判定账号是否已经存在(判断是账号绑定还是邮箱绑定)
			 registerDo() {
					 if(this.registerForm.phone == "") {
							 this.alert({
									 type: "info",
									 msg: "手机号码不能为空"
							 })
							 return
					 }
					 if(this.registerForm.captcha == "") {
							 this.alert({
									 type: "info",
									 msg: "短信验证码不能为空"
							 })
							 return
					 }
					 this.registerAccount = false
					 // this.confirmAccountExist = true
					 this.confirmAccountNotExist = true
					 // this.$http.post("/open/register/phone", this.registerForm).then(res => {
						// 	 console.log(res)
						// 	 if(res.code == 200) {
						// 			 this.alert({
						// 					 type: "success",
						// 					 msg: res.msg
						// 			 })
						// 			 this.registerAccount = false
						// 			 if (res.code) {
						// 				 // 如果账号已经存在
						// 				 this.confirmAccountExist = true
						// 			 } else {
						// 				 // 如果账号不存在
						// 				 this.confirmAccountNotExist = true
						// 			 }
						// 	 }
					 // })
			 },
			 // 账号已存在确认密码
			 confirmPass1 () {
				 if(this.registerForm.loginPwd == "") {
						 this.alert({
								 type: "info",
								 msg: "密码不能为空"
						 })
						 return
				 }
				 this.$http.post("/open/register/phone", this.registerForm).then(res => {
						 console.log(res)
						 if(res.code == 200) {
								 this.alert({
										 type: "success",
										 msg: res.msg
								 })
							this.confirmAccountExist = false
							// 已登陆上平台账号，跟hearder组建通信
						 }
				 })
			 },
			 // 账号不存在设置密码
			 confirmPass2() {
				 if(this.registerForm.loginPwd == "") {
						 this.alert({
								 type: "info",
								 msg: "密码不能为空"
						 })
						 return
				 }
				 if(this.registerForm.loginPwd2 == "") {
						 this.alert({
								 type: "info",
								 msg: "再次确认密码不能为空"
						 })
						 return
				 }
				 this.$http.post("/open/register/phone", this.registerForm).then(res => {
						 console.log(res)
						 if(res.code == 200) {
								 this.alert({
										 type: "success",
										 msg: res.msg
								 })
								 this.confirmAccountNotExist = false
							// 已登陆上平台账号，跟hearder组建通信
						 }
				 })
			 },
			 // 确认重置密码
			 passResetDo () {
				 if(this.registerForm.resetCaptcha == "") {
						 this.alert({
								 type: "info",
								 msg: "短信验证码不能为空"
						 })
						 return
				 }
				 if(this.registerForm.resetLoginPwd == "") {
						 this.alert({
								 type: "info",
								 msg: "密码不能为空"
						 })
						 return
				 }
				 if(this.registerForm.resetLoginPwd2 == "") {
						this.alert({
								type: "info",
								msg: "再次确认密码不能为空"
						})
						return
				}
				if(this.registerForm.resetLoginPwd != this.registerForm.resetLoginPwd2) {
						this.alert({
								type: "info",
								msg: "两次输入的密码不一致"
						})
						return
				}
				 this.$http.post("/app/user/password", {
					 'captcha': this.registerForm.resetCaptcha,
					 'pwd': Md5(this.registerForm.resetLoginPwd)
				 }).then(res => {
						 console.log(res)
						 if(res.code == 200) {
								 this.alert({
										 type: "success",
										 msg: res.msg
								 })
								 this.resetPassDialog = false
						 }
				 })
			 },
			 ...mapMutations({
					 changeLanguage: "CHANGE_LANGUAGE",
					 alert: "alert"
			 })
		 }
 };
</script>

 <style lang="less">
	.account-security {
		margin: 0 auto;
		.main {
			background-color: #2F59B7;
			padding: 40px 0;
			min-height: 821px;
			.content {
				width: 1200px;
				background-color: #1A439E;
				margin: auto;
				padding: 0 40px;
				.title {
					position: relative;
					padding: 15px 0;
					box-shadow:0px 0px 0px 0px rgba(0,10,86,1);
					color: #fff;
					font-size: 16px;
          font-weight: bold;
				}
				li {
					display: flex;
					align-items: center;
					justify-content: center;
					border-bottom: 1px solid #123990;
					line-height: 3.5;
          font-size: 16px;
					div {
            text-align: left;
					}
					div:first-child {
						width: 30%;
					}
					div:last-child {
            width: 70%;
					}
					 .operation {
					 	position: relative;
						span {
							margin-left: 10px;
              color: #FFDB5B;
              position: absolute;
              right: 0;
						}
					 }
				}
			}
		}
		.mu-dialog-wrapper {
			left: 50%;
			bottom: initial;
			top: 39%;
			padding: 30px;
			transform: translate(-50%,-50%);
        h4 {
            text-align: center;
            color: #646464;
            font-size: 20px;
        }
        .mu-dialog {
            max-width: initial !important;
            button {
                display: block;
                width: 240px;
                height: 40px;
                margin-top: 20px;
                cursor: pointer;
                background:linear-gradient(90deg,rgba(100,180,239,1),rgba(57,94,236,1));
                box-shadow:0px 0px 0px 0px rgba(199,218,255,0.75);
                border-radius:4px;
                color: #fff;
                border: none;
                &.hd {
                    background:linear-gradient(90deg,rgba(84,190,202,1),rgba(61,143,242,1));
                }
            }
        }

        &.login-select {
            .mu-dialog {
                img {
                    display: block;
                    margin: 50px auto;
                    height: 100px;
                }

                p {
                    text-align: center;
                    margin-top: 40px;
                    a {
                        color: #5480D9;
                    }
                }
            }
        }
        &.login-accout {
            h4 {
                margin-bottom: 60px;
            }
            input {
                display: block;
                width: 100%;
                border:1px solid rgba(220,220,220,1);
                border-radius:4px;
                height: 40px;
                margin-top: 20px;
                text-align: center;
                font-size: 14px;
            }
            .flex-wrap {
                display: flex;
                justify-content: space-between;
                font-size: 14px;
                margin-top: 40px;
                p {
                    color: #969696;
                    a {
                        color: #5480D9;
                    }
                }
            }
            button {
                margin-top: 40px;
            }
        }
        &.register-accout {
            h4 {
                margin-bottom: 40px;
            }
            .input-wrap {
                display: flex;
                align-items: center;
                font-size: 14px;
                margin-top: 20px;
                label {
                    width: 60px;
                }
                input {
                    flex: 1;
                    height:40px;
                    background:rgba(255,255,255,1);
                    border:1px solid rgba(220,220,220,1);
                    border-radius:4px;
                    padding: 0 10px;
                }
                .input-flex {
                    flex: 1;
                    display: flex;
                    input {

                    }
                    a {
                        background:linear-gradient(90deg,rgba(100,180,239,1),rgba(57,94,236,1));
                        box-shadow:0px 0px 0px 0px rgba(199,218,255,0.75);
                        line-height: 40px;
                        margin-left: 10px;
                        width: 90px;
                        text-align: center;
                        font-size: 14px;
                        color: #fff;
                        border-radius: 4px;
                    }
                    img {
                        height: 40px;
                        width: 90px;
                        margin-left: 10px;
                    }
                    &.prefix {
                        background:rgba(255,255,255,1);
                        border:1px solid rgba(220,220,220,1);
                        border-radius:4px;
                        .mu-menu {
                            line-height: 40px;
                            padding: 0 10px;
                            border-right: 1px solid rgba(220,220,220,1);
                            font-weight: 700;
                        }
                        input {
                            border: none;

                        }
                    }

                }

            }
            p {
                font-size: 14px;
                text-align: center;
                margin-top: 10px;
                a {
                    color: #5480D9;
                }
            }
            button {
                margin: 40px auto 0;
            }
        }
    }

	}
	@media screen and (max-width: 800px) {
		.account-security {
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
