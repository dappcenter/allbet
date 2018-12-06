<template>
	<div class="account-security">
	<HeaderBar></HeaderBar>
	<div class="main" :style="{minHeight: $window.innerHeight - 150 + 'px'}">
		<div class="content">
			<p class="title">
				<span>{{$t('message.accountSecurity')}}</span>
			</p>
			<div class="li-div">
				<!-- <li v-if="pageData.haveTrustee"><div>{{$t('message.accountPlatform')}}：</div><div>{{pageData.userName}}</div></li>
				<li v-else-if="currentAddr.mainCoin !== 'TRX'"><div>{{$t('message.accountPlatform')}}：</div><div class="operation">{{$t('message.accountNotBound')}}<span @click="displayStatus.phoneBind = true">{{$t('message.accountToBound')}}</span></div></li> -->
				<!-- <li v-if="currentAddr.platform == 'DISPATCHER'"><div>{{$t('message.accountPlatformAddress')}}：</div><div class="dispatcher">{{currentAddr.coinAddress}}</div></li> -->
				<li v-for="item in pageData.MetaMaskAddress">
					<div v-if="item.platform == 'DISPATCHER'">{{$t('message.accountPlatformAddress')}}：</div>
					<div v-else>{{$t('message.accountMetaMaskAddress')}}：</div>
					<div>{{item.userAddress}}</div>
				</li>
				<li v-if="pageData.MetaMaskAddress.length == 0 && pageData.haveTrustee"><div>{{$t('message.accountMetaMaskAddress')}}：</div><div>{{$t('message.accountBindDesc')}}</div></li>
				<li v-if="pageData.haveTrustee"><div>{{$t('message.accountLoginPassword')}}：</div><div class="operation">********<span @click="displayStatus.resetPassDialog = true">{{$t('message.accountChange')}}</span></div></li>
				<li v-else-if="currentAddr.mainCoin !== 'TRX'"><div>{{$t('message.accountChange')}}：</div><div>{{$t('message.accountNotExist')}}</div></li>
			</div>
		</div>
	</div>
	<!-- 手机账号绑定 -->
	<mu-dialog :open.sync="displayStatus.phoneBind" :append-body="false" class="bind-accout">
		<h4>{{$t('message.PopBindAccount')}}</h4>
		<div class="input-wrap">
			<label>{{$t('message.PopAccount')}}</label>
			<div class="input-flex prefix">
				<mu-menu cover :open.sync="prefixMenu">
					<span color="primary">{{formData.prefix}}</span>
					<mu-list slot="content">
						<mu-list-item button v-for="item in prefixs" :key="item" @click="formData.prefix = item;prefixMenu = false">
							<mu-list-item-title>{{item}}</mu-list-item-title>
						</mu-list-item>
					</mu-list>
				</mu-menu>
				<input type="text" v-model.trim="formData.phone" :placeholder="$t('message.PopRegisterPhone')">
			</div>
		</div>
		<div class="input-wrap">
			<label>{{$t('message.PopGraphic')}}</label>
			<div class="input-flex">
				<input type="text" v-model="formData.picCode" :placeholder="$t('message.PopGraphicEnter')">
				<img :src="$window.SERVERPATH + '/open/pic_captcha?type=ACCOUNT_BINDING&macCode=' + macCode" alt="" @click="getImgCode('ACCOUNT_BINDING')" ref="imgcode">
			</div>
		</div>
		<div class="input-wrap">
			<label>{{$t('message.PopCaptcha')}}</label>
			<div class="input-flex">
				<input type="text" v-model="formData.captcha" :placeholder="$t('message.PopInputCaptcha')">
				<a href="javascript:;" @click="getSMScode('ACCOUNT_BINDING')">{{formData.btnText}}</a>
			</div>
		</div>
		<button class="primary-btn" @click="bindingOneDo('PHONE')">{{$t('message.PopBindBtn')}}</button>
		<p><a href="javascript:;" @click="displayStatus.phoneBind = false;displayStatus.emailBind = true;">{{$t('message.PopBindEmail')}}</a></p>
	</mu-dialog>
	<!-- 邮箱账号绑定 -->
	<mu-dialog :open.sync="displayStatus.emailBind" :append-body="false" class="bind-accout">
		<h4>{{$t('message.PopBindAccount')}}</h4>
		<div class="input-wrap">
			<label>{{$t('message.PopAccount')}}</label>
			<div class="input-flex">
				<input type="text" v-model.trim="formData.email" :placeholder="$t('message.PopRegisterEmail')">
			</div>
		</div>
		<div class="input-wrap">
			<label>{{$t('message.PopGraphic')}}</label>
			<div class="input-flex">
				<input type="text" v-model="formData.picCode" :placeholder="$t('message.PopGraphicEnter')">
				<img :src="$window.SERVERPATH + '/open/pic_captcha?type=ACCOUNT_BINDING&macCode=' + macCode" alt="" @click="getImgCode('ACCOUNT_BINDING')" ref="imgcode">
			</div>
		</div>
		<div class="input-wrap">
			<label>{{$t('message.PopCaptcha')}}</label>
			<div class="input-flex">
				<input type="text" v-model="formData.captcha" :placeholder="$t('message.PopInputCaptcha')">
				<AEFcountDownBtn v-model="captchaDisabled" @click.native="getEmailCode('ACCOUNT_BINDING')"></AEFcountDownBtn>
			</div>
		</div>
		<button class="primary-btn" @click="bindingOneDo('EMAIL')">{{$t('message.PopBindBtn')}}</button>
		<p><a href="javascript:;" @click="displayStatus.phoneBind = true;displayStatus.emailBind = false;">{{$t('message.PopBindPhone')}}</a></p>
	</mu-dialog>
	<!-- 账号不存在输入密码 -->
	<mu-dialog :open.sync="displayStatus.confirmAccountNotExist" :append-body="false" class="bind-accout">
		<h4>{{$t('message.PopBindAccount')}}</h4>

		<div class="input-wrap" style="width:338px;">
			<label>{{$t('message.PopPassword')}}</label>
			<input type="password" v-model="formData.loginPwd" :placeholder="$t('message.PopPasswordPlaceholder')">
		</div>
		<div class="input-wrap" style="width:338px;">
			<label>{{$t('message.PopPasswordConfirm')}}</label>
			<input type="password" v-model="formData.loginPwd2" :placeholder="$t('message.PopPassword2Placeholder')">
		</div>
		<div class="input-wrap">
			<label>{{$t('message.PopInviteCode')}}</label>
			<input type="text" v-model="formData.inviteCode" :placeholder="$t('message.PopInviteCodePlaceholder')">
		</div>
		<button class="primary-btn" @click="bindingTwoDo('PHONE')">{{$t('message.PopConfirm')}}</button>
	</mu-dialog>
	<!-- 重置登陆密码 -->
	<mu-dialog :open.sync="displayStatus.resetPassDialog" :append-body="false" class="bind-accout">
		<h4>{{$t('message.PopResetPass')}}</h4>
		<div class="input-wrap">
			<label>{{$t('message.PopAccount')}}:</label>
			<input type="text" :value="currentAddr.userName" :placeholder="$t('message.PopGraphicEnter')" disabled>
		</div>
		<!-- <div class="input-wrap">
			<label>{{$t('message.PopGraphic')}}</label>
			<div class="input-flex">
				<input type="text" v-model="formData.picCode" :placeholder="$t('message.PopGraphicEnter')">
				<img :src="$window.SERVERPATH + '/open/pic_captcha?type=RESET_PWD&macCode=' + macCode" alt="" @click="getImgCode('RESET_PWD')" ref="imgcode">
			</div>
		</div> -->
		<!-- <div class="input-wrap">
			<label>{{$t('message.PopCaptcha')}}</label>
			<div class="input-flex">
				<input type="text" v-model="formData.resetCaptcha" :placeholder="$t('message.PopInputCaptcha')">
				<a href="javascript:;" @click="getSMScode('RESET_PASS')">{{formData.btnText}}</a>
			</div>
		</div> -->
		<div class="input-wrap">
			<label>{{$t('message.PopOldPassword')}}</label>
			<input type="password" v-model="formData.oldLoginPwd" :placeholder="$t('message.PopPasswordPlaceholder')">
		</div>
		<div class="input-wrap">
			<label>{{$t('message.PopNewPassword')}}</label>
			<input type="password" v-model="formData.resetLoginPwd" :placeholder="$t('message.PopPasswordPlaceholder')">
		</div>
		<div class="input-wrap">
			<label>{{$t('message.PopPasswordConfirm')}}</label>
			<input type="password" v-model="formData.resetLoginPwd2" :placeholder="$t('message.PopPassword2Placeholder')">
		</div>
		<button class="primary-btn" @click="passResetDo">{{$t('message.PopConfirmChange')}}</button>
		<i class="close-btn" @click="displayStatus.resetPassDialog = false"></i>
	</mu-dialog>
	<FooterBar ref="ft"></FooterBar>
</div>

</template>

<script>
import HeaderBar from "@/components/common/header_bar"
import FooterBar from "@/components/common/footer_bar"
import AEFcountDownBtn from "@/components/common/countDownBtn"
import Md5 from "../assets/js/md5.js"
import {mapMutations, mapState} from "vuex"
export default {
	data () {
		return {
			displayStatus: {
				phoneBind: false, //绑定手机号
				emailBind: false,   //绑定邮箱
				confirmAccountNotExist: false,  //绑定的账不存在
				resetPassDialog: false,  //重置密码
			},
			prefixs: ["+86", "+852", "+853", "+886", "+8801", "+8802", "+001", "+44", "+0061"],
			prefixMenu: false,
			formData: {
				"phone": "",
				"phone2": "",
				"prefix": "+86",
				"captcha": "",
				"picCode": "",
				"loginPwdCheck": "",
				"inviteCode": sessionStorage.getItem('inviteCode') || "", //邀请码
				"loginPwd": "",
				"loginPwd2": "",

				"s": 60,
				"btnText": this.$t('message.PopGetCaptcha'),
				"timer": null,
				"email": "",
				"email2": "",

				"resetCaptcha": "", // 重置登陆密码
				"oldLoginPwd": "",
				"resetLoginPwd": "",
				"resetLoginPwd2": "",
				"bindingType": "PHONE"
			},
			pageData: {
				isBind: false,  //是否有绑定关系
				haveTrustee: false,   //是否绑定平台账号或者本身就是平台账号
				userName: "",
				MetaMaskAddress: []
			},
			captchaDisabled: false,
			macCode: new Date().getTime()
		}
	},
	watch: {
		// 检测地址切换
		currentAddr() {
			this.pageData = {
				isBind: false,
				haveTrustee: false,
				MetaMaskAddress: []
			}
			if(this.currentAddr.token) {
				this.getAssets()
			}
		},
		displayStatus: {
			handler: function() {
				this.formData = Object.assign(this.formData, {
					phone: "",
					email: "",
					picCode: "",
					captcha: "",   //短信验证码
					emailCaptcha: "",
					resetCaptcha: "",
					loginPwd: "",  //密码
					loginPwd2: "",  //2次密码
					picCode: "", //图形验证码
					resetLoginPwd: "",
					resetLoginPwd2: "",
					oldLoginPwd: '',
				})
			},
			deep: true
		},
	},
	mounted() {
		if(this.currentAddr.token) {
			this.getAssets()
		}
		if(this.$route.query.bind) {
			this.displayStatus.phoneBind = true
		}
	},
    computed: {
		...mapState({
			currentAddr: state => state.user.currentAddr,
			storeWeb3: state => state.web3Handler.web3
		})
    },
    components: {
		HeaderBar,
		FooterBar,
		AEFcountDownBtn
	},
	methods: {
		getImgCode(type) {
            this.$refs.imgcode.src = this.$window.SERVERPATH + "/open/pic_captcha?type="+ type +"&macCode="+ this.macCode +"&" + Math.random();
        },
		// 获取验证码(区分是重置登陆密码还是绑定的)
		getSMScode(type) {
			let postData = {
				'macCode': this.macCode,
				'picCode': this.formData.picCode,
			}
			if (type == 'ACCOUNT_BINDING') {
				if(!this.verifyPhone() || !this.verifyPicCode()) return
				postData.phone = this.formData.phone
				postData.prefix = this.formData.prefix
				postData.type = type

				this.registerSMScountDown()
				this.$http.post("/open/captcha", postData).then(res => {
					if(res.code != 200) {
						clearTimeout(this.formData.timer)
						this.formData.btnText = this.$t('message.PopGetCaptcha')
						this.getImgCode("ACCOUNT_BINDING")
					}
				}).catch(err => {
					clearTimeout(this.formData.timer)
					this.formData.btnText = this.$t('message.PopGetCaptcha')
				})
			} else {
				if(!this.verifyPicCode()) return
				this.registerSMScountDown()
				this.$http.get("/app/user/password/captcha", {
					params: postData
				}).then(res => {
					if(res.code != 200) {
						clearTimeout(this.formData.timer)
						this.formData.btnText = this.$t('message.PopGetCaptcha')
						this.getImgCode("RESET_PWD")
					}
				}).catch(err => {
					clearTimeout(this.formData.timer)
					this.formData.btnText = this.$t('message.PopGetCaptcha')
				})
			}
		},
		//获取邮箱验证码
        getEmailCode(type) {
            if(!this.verifyEmail() || !this.verifyPicCode()) return

            this.captchaDisabled = true  //开始倒计时
            this.$http.get("/open/email_captcha", {
                params: {
                    "email": this.formData.email,
                    "picCode": this.formData.picCode,
					"captchaType": type,
					"macCode": this.macCode
                }
            }).then(res => {
                console.log(res)
                if(res.code != 200) {
					this.captchaDisabled = false
					this.getImgCode(type)
                }
            }).catch(err => {
                this.captchaDisabled = false
            })
        },
		//短信验证码倒计时
		registerSMScountDown() {
			if(this.formData.s > 0) {
				this.formData.s--
				this.formData.btnText = this.formData.s + 's'
				this.formData.timer = setTimeout(this.registerSMScountDown, 1000);
			}else {
				this.formData.s = 60
				this.formData.btnText = this.$t('message.PopGetCaptcha')
			}
		},
		// 判定账号是否已经存在(判断是账号绑定还是邮箱绑定)
		bindingOneDo(type) {
			this.formData.bindingType = type
			let postObj = {
				"account": this.formData.phone,
				"bindingType": type,
				"captcha": this.formData.captcha
			}
			if(type == "PHONE") {
				this.formData.phone2 = this.formData.phone
				if(!this.verifyPhone() || !this.verifyCaptcha()) return
			}else {
				this.formData.email2 = this.formData.email
				if(!this.verifyEmail() || !this.verifyCaptcha()) return
				postObj.account = this.formData.email
			}
			this.$http.post("/app/user/binding", postObj).then(res => {
				if(res.code == 200) {
					this.displayStatus.phoneBind = false
					this.displayStatus.emailBind = false
					if(res.result) {  //已注册
						this.web3BindAddress(res.result)
					}else {   //未注册
						this.displayStatus.confirmAccountNotExist = true  //设置密码

					}
				}
			})
		},
		//绑定账号（账号不存在设置初始密码）
		bindingTwoDo() {
			let type = this.formData.bindingType
			let postObj = {
				"account": this.formData.phone2,
				"password": Md5(this.formData.loginPwd),
				"inviteCode": this.formData.inviteCode
			}
			if(type == "EMAIL") {
				postObj.account = this.formData.email2
			}
			if(!this.verifyPassword()) return
			this.$http.post("/app/user/binding_two", postObj).then(res => {
				this.displayStatus.phoneBind = false
				this.displayStatus.emailBind = false
				console.log(res)
				if(res.code == 200) {
					if(res.result) {
						this.displayStatus.confirmAccountNotExist = false
						this.web3BindAddress(res.result)
					}
				}
			})
		},
		// 确认重置密码
		passResetDo () {
			if(this.formData.oldLoginPwd == "") {
				this.alert({
					type: "info",
					msg: this.$t('message.PopOldPassEmpty')
				})
				return
			}
			if(this.formData.resetLoginPwd == "") {
				this.alert({
					type: "info",
					msg: this.$t('message.PopPassEmpty')
				})
				return
			}
			if(this.formData.resetLoginPwd2 == "") {
				this.alert({
					type: "info",
					msg: this.$t('message.PopPass2Empty')
				})
				return
			}
			if(this.formData.resetLoginPwd != this.formData.resetLoginPwd2) {
				this.alert({
					type: "info",
					msg: this.$t('message.PopPassDiff')
				})
				return
			}
			var regx =/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,12}$/
			if(!regx.test(this.formData.resetLoginPwd)) {
				this.alert({
					type: "info",
					msg: this.$t('message.PopPassRequest')
				})
				return false
			}
			this.$http.post("/app/user/password/reset", {
				'oldPwd': Md5(this.formData.oldLoginPwd),
				'newPwd': Md5(this.formData.resetLoginPwd)
			}).then(res => {
				if(res.code == 200) {
					this.alert({
							type: "success",
							msg: res.msg
					})
					this.displayStatus.resetPassDialog = false
				}
			})
		},
		// 获取地址相关信息
		getAssets() {
			this.$http.get("/app/user/assets", {
				params: {
					coinAddress: this.currentAddr.coinAddress
				}
			}).then(res => {
				if(res.code == 200) {
					let addressList = res.result
					if(addressList.length > 1) {   //有绑定平台账号
						this.pageData.isBind = true
					}
					this.pageData.MetaMaskAddress = addressList
					addressList.forEach(val => {
						if(val.platform == "IMPORT") {
							// this.pageData.MetaMaskAddress.push(val)
						}else {
							this.pageData.haveTrustee = true //有绑定平台账号或者本身就是平台账号
							this.pageData.userName = val.userName
						}
					})
				}
			})
		},
		//手机号验证
		verifyPhone() {
			if(this.formData.phone == "" || !/^[0-9]*$/.test(this.formData.phone) || (this.formData.prefix == '+86' && !(/^1[34578]\d{9}$/.test(this.formData.phone)))) {
                this.alert({
                    type: "info",
                    msg: this.$t('message.PopPhoneWrong')
                })
                return false
            }
            return true
		},
		//图形验证码验证
        verifyPicCode() {
            if(this.formData.picCode == "") {
                this.alert({
                    type: "info",
                    msg: this.$t('message.PopGraphicEmpty')
                })
                return false
            }
            return true
		},
		//短信验证码验证
		verifyCaptcha() {
			if(this.formData.captcha == "") {
                this.alert({
                    type: "info",
                    msg: this.$t('message.PopCaptchaEmpty')
                })
                return false
            }
            return true
		},
		// 二次密码验证
        verifyPassword() {
            var regx =/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,12}$/
            if(!regx.test(this.formData.loginPwd)) {
                this.alert({
                    type: "info",
                    msg: this.$t('message.PopPassRequest')
                })
                return false
            }
            if(this.formData.loginPwd !== this.formData.loginPwd2) {
                this.alert({
                    type: "info",
                    msg: this.$t('message.PopPassDiff')
                })
                return false
            }
            return true
		},
		//邮箱验证
        verifyEmail() {
            if(this.formData.email == "" || !/^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/.test(this.formData.email)) {
                this.alert({
                    type: "info",
                    msg: "邮箱输入有误"
                })
                return false
            }
            return true
        },
		//区块链绑定确认
		web3BindAddress(userId) {
			var that = this
			this.storeWeb3.apiHandle.methods.bindAddress(userId).send({
				from: this.currentAddr.coinAddress
			}).on("receipt", function(receipt) {
				that.alert({
					type: "success",
					msg: that.$t('message.Popsuccess')
				})
			}).on("error", function(error) {
				that.alert({
					type: "error",
					msg: that.$t('message.PopFail')
				})
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
			background-color: #22202C;
			padding: 40px 0;
			.content {
				width: 1200px;
				background-color: #49425C;
				margin: auto;
				.title {
					position: relative;
					color: #D3CDFF;
					font-size: 16px;
          			font-weight: bold;
					padding: 14px 0 14px 40px;
					border-bottom: 1px solid #2F2840;
				}
				.li-div {
					padding: 0 40px;
					li {
						display: flex;
						align-items: center;
						justify-content: center;
						border-bottom: 1px solid #2F2840;
						line-height: 3.7;
	          			font-size: 16px;
						div {
	            			text-align: left;
							font-size: 14px;
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
								cursor: pointer;
							}
						}
					}
				}
			}
		}
		&>.mu-dialog-wrapper {
			left: 50%;
			bottom: initial;
			top: 39%;
			padding: 30px;
			transform: translate(-50%,-50%);
			.mu-dialog {
				max-width: initial !important;
				background-color: #52476F;
				.mu-dialog-body {
					position: relative;
					width: 380px;
					.close-btn {
						position: absolute;
						right: 20px;
						top: 20px;
						width: 25px;
						height: 25px;
						background: url(../../public/img/close_icon01.png) no-repeat center;
						background-size: 100%;
						cursor: pointer;
					}
				}
				.primary-btn {
					display: block;
					width: 240px;
					height: 40px;
					margin-top: 20px;
					cursor: pointer;
					background:#FFC425;
					border-radius:4px;
					color: #1A0D59;
					border: none;
					&.hd {
						background:linear-gradient(90deg,rgba(84,190,202,1),rgba(61,143,242,1));
					}
				}
			}
        &.bind-accout {
            h4 {
				margin-bottom: 40px;
				color: #CCBCF8;
				font-size: 24px;
				text-align: center;
            }
            .input-wrap {
                display: flex;
                align-items: center;
                font-size: 14px;
                margin-top: 20px;
                label {
					width: 80px;
					color: #CCBCF8;
                }
                input {
                    flex: 1;
					width: 60%;
                    height:40px;
					background:#443A60;
		            color: #fff;
                    border-radius:4px;
                    padding: 0 10px;
					border: none;
					outline: none;
                }
                .input-flex {
                    flex: 1;
                    display: flex;
                    a {
                        background-color: #5AA0EE;
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
						background:#173167;
						border:1px solid #173167;
                        border-radius:4px;
                        .mu-menu {
                            line-height: 40px;
                            padding: 0 10px;
                            border-right: 1px solid #3057A8;
                            font-weight: 700;
							color: #fff;
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
            .primary-btn {
                margin: 40px auto 0;
            }
        }
    }

	}
	@media screen and (max-width: 800px) {
		.account-security {
			.main {
				.content {
					width: 90%;
					.title {
						padding-left: 10px;
					}
				.li-div {
					padding: 0 10px;
					li {
						line-height: inherit;
						font-size: 12px;
						padding: 15px 0;
						div:first-child {
							width: 40%;
						}
						div:last-child {
							flex: 1;
							text-align: left;
							word-break: break-all;
						}
					}
					li:last-child {
						div {
							text-align: left;
						}
					}
				}
				}
			}
			.mu-dialog-wrapper {
				z-index: 20191230 !important;
				left: 0;
		    bottom: 0;
		    right: 0;
		    top: 0;
				transform: translate(0, 0);
				.mu-dialog-body {
					padding: 20px;
					width: auto !important;
				}
			}
		}
	}
</style>
