(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-5e5f12aa"],{"9de7":function(t,a,e){"use strict";e.r(a);var s=function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("div",{staticClass:"account-security"},[e("HeaderBar"),e("div",{staticClass:"main",style:{minHeight:t.$window.innerHeight-150+"px"}},[e("div",{staticClass:"content"},[e("p",{staticClass:"title"},[e("span",[t._v(t._s(t.$t("message.accountSecurity")))]),e("span")]),t.pageData.haveTrustee?e("li",[e("div",[t._v(t._s(t.$t("message.accountPlatform"))+"：")]),e("div",[t._v(t._s(t.currentAddr.userName))])]):e("li",[e("div",[t._v(t._s(t.$t("message.accountPlatform"))+"：")]),e("div",{staticClass:"operation"},[t._v(t._s(t.$t("message.accountNotBound"))),e("span",{on:{click:function(a){t.displayStatus.phoneBind=!0}}},[t._v(t._s(t.$t("message.accountToBound")))])])]),t._l(t.pageData.MetaMaskAddress,function(a){return e("li",[e("div",[t._v(t._s(t.$t("message.accountMetaMaskAddress"))+"：")]),e("div",[t._v(t._s(a.coinAddress))])])}),0==t.pageData.MetaMaskAddress.length&&t.pageData.haveTrustee?e("li",[e("div",[t._v(t._s(t.$t("message.accountMetaMaskAddress"))+"：")]),e("div",[t._v(t._s(t.$t("message.accountBindDesc")))])]):t._e(),t.pageData.haveTrustee?e("li",[e("div",[t._v(t._s(t.$t("message.accountLoginPassword"))+"：")]),e("div",{staticClass:"operation"},[t._v("********"),e("span",{on:{click:function(a){t.displayStatus.resetPassDialog=!0}}},[t._v(t._s(t.$t("message.accountChange")))])])]):e("li",[e("div",[t._v(t._s(t.$t("message.accountChange"))+"：")]),e("div",[t._v(t._s(t.$t("message.accountNotExist")))])])],2)]),e("mu-dialog",{staticClass:"register-accout",attrs:{open:t.displayStatus.phoneBind,"append-body":!1},on:{"update:open":function(a){t.$set(t.displayStatus,"phoneBind",a)}}},[e("h4",[t._v(t._s(t.$t("message.PopBindAccount")))]),e("div",{staticClass:"input-wrap"},[e("label",[t._v(t._s(t.$t("message.PopAccount")))]),e("div",{staticClass:"input-flex prefix"},[e("mu-menu",{attrs:{cover:"",open:t.prefixMenu},on:{"update:open":function(a){t.prefixMenu=a}}},[e("span",{attrs:{color:"primary"}},[t._v(t._s(t.formData.prefix))]),e("mu-list",{attrs:{slot:"content"},slot:"content"},t._l(t.prefixs,function(a){return e("mu-list-item",{key:a,attrs:{button:""},on:{click:function(e){t.formData.prefix=a,t.prefixMenu=!1}}},[e("mu-list-item-title",[t._v(t._s(a))])],1)}))],1),e("input",{directives:[{name:"model",rawName:"v-model.trim",value:t.formData.phone,expression:"formData.phone",modifiers:{trim:!0}}],attrs:{type:"text",placeholder:t.$t("message.PopRegisterPhone")},domProps:{value:t.formData.phone},on:{input:function(a){a.target.composing||t.$set(t.formData,"phone",a.target.value.trim())},blur:function(a){t.$forceUpdate()}}})],1)]),e("div",{staticClass:"input-wrap"},[e("label",[t._v(t._s(t.$t("message.PopGraphic")))]),e("div",{staticClass:"input-flex"},[e("input",{directives:[{name:"model",rawName:"v-model",value:t.formData.picCode,expression:"formData.picCode"}],attrs:{type:"text",placeholder:t.$t("message.PopGraphicEnter")},domProps:{value:t.formData.picCode},on:{input:function(a){a.target.composing||t.$set(t.formData,"picCode",a.target.value)}}}),e("img",{ref:"imgcode",attrs:{src:t.$window.SERVERPATH+"/open/pic_captcha?type=ACCOUNT_BINDING&macCode=macCode",alt:""},on:{click:function(a){t.getImgCode("ACCOUNT_BINDING")}}})])]),e("div",{staticClass:"input-wrap"},[e("label",[t._v(t._s(t.$t("message.PopCaptcha")))]),e("div",{staticClass:"input-flex"},[e("input",{directives:[{name:"model",rawName:"v-model",value:t.formData.captcha,expression:"formData.captcha"}],attrs:{type:"text",placeholder:t.$t("message.PopInputCaptcha")},domProps:{value:t.formData.captcha},on:{input:function(a){a.target.composing||t.$set(t.formData,"captcha",a.target.value)}}}),e("a",{attrs:{href:"javascript:;"},on:{click:function(a){t.getSMScode("ACCOUNT_BINDING")}}},[t._v(t._s(t.formData.btnText))])])]),e("button",{staticClass:"primary-btn",on:{click:function(a){t.bindingOneDo("PHONE")}}},[t._v(t._s(t.$t("message.PopBindBtn")))]),e("p",[e("a",{attrs:{href:"javascript:;"},on:{click:function(a){t.displayStatus.phoneBind=!1,t.displayStatus.emailBind=!0}}},[t._v(t._s(t.$t("message.PopBindEmail")))])])]),e("mu-dialog",{staticClass:"register-accout",attrs:{open:t.displayStatus.emailBind,"append-body":!1},on:{"update:open":function(a){t.$set(t.displayStatus,"emailBind",a)}}},[e("h4",[t._v(t._s(t.$t("message.PopBindAccount")))]),e("div",{staticClass:"input-wrap"},[e("label",[t._v(t._s(t.$t("message.PopAccount")))]),e("div",{staticClass:"input-flex"},[e("input",{directives:[{name:"model",rawName:"v-model.trim",value:t.formData.email,expression:"formData.email",modifiers:{trim:!0}}],attrs:{type:"text",placeholder:t.$t("message.PopRegisterEmail")},domProps:{value:t.formData.email},on:{input:function(a){a.target.composing||t.$set(t.formData,"email",a.target.value.trim())},blur:function(a){t.$forceUpdate()}}})])]),e("div",{staticClass:"input-wrap"},[e("label",[t._v(t._s(t.$t("message.PopGraphic")))]),e("div",{staticClass:"input-flex"},[e("input",{directives:[{name:"model",rawName:"v-model",value:t.formData.picCode,expression:"formData.picCode"}],attrs:{type:"text",placeholder:t.$t("message.PopGraphicEnter")},domProps:{value:t.formData.picCode},on:{input:function(a){a.target.composing||t.$set(t.formData,"picCode",a.target.value)}}}),e("img",{ref:"imgcode",attrs:{src:t.$window.SERVERPATH+"/open/pic_captcha?type=ACCOUNT_BINDING&macCode=macCode",alt:""},on:{click:function(a){t.getImgCode("ACCOUNT_BINDING")}}})])]),e("div",{staticClass:"input-wrap"},[e("label",[t._v(t._s(t.$t("message.PopCaptcha")))]),e("div",{staticClass:"input-flex"},[e("input",{directives:[{name:"model",rawName:"v-model",value:t.formData.captcha,expression:"formData.captcha"}],attrs:{type:"text",placeholder:t.$t("message.PopInputCaptcha")},domProps:{value:t.formData.captcha},on:{input:function(a){a.target.composing||t.$set(t.formData,"captcha",a.target.value)}}}),e("AEFcountDownBtn",{nativeOn:{click:function(a){t.getEmailCode("ACCOUNT_BINDING")}},model:{value:t.captchaDisabled,callback:function(a){t.captchaDisabled=a},expression:"captchaDisabled"}})],1)]),e("button",{staticClass:"primary-btn",on:{click:function(a){t.bindingOneDo("EMAIL")}}},[t._v(t._s(t.$t("message.PopBindBtn")))]),e("p",[e("a",{attrs:{href:"javascript:;"},on:{click:function(a){t.displayStatus.phoneBind=!0,t.displayStatus.emailBind=!1}}},[t._v(t._s(t.$t("message.PopBindPhone")))])])]),e("mu-dialog",{staticClass:"register-accout",attrs:{open:t.displayStatus.confirmAccountNotExist,"append-body":!1},on:{"update:open":function(a){t.$set(t.displayStatus,"confirmAccountNotExist",a)}}},[e("h4",[t._v(t._s(t.$t("message.PopBindAccount")))]),e("div",{staticClass:"input-wrap",staticStyle:{width:"338px"}},[e("label",[t._v(t._s(t.$t("message.PopPassword")))]),e("input",{directives:[{name:"model",rawName:"v-model",value:t.formData.loginPwd,expression:"formData.loginPwd"}],attrs:{type:"password",placeholder:t.$t("message.PopPasswordPlaceholder")},domProps:{value:t.formData.loginPwd},on:{input:function(a){a.target.composing||t.$set(t.formData,"loginPwd",a.target.value)}}})]),e("div",{staticClass:"input-wrap",staticStyle:{width:"338px"}},[e("label",[t._v(t._s(t.$t("message.PopPasswordConfirm")))]),e("input",{directives:[{name:"model",rawName:"v-model",value:t.formData.loginPwd2,expression:"formData.loginPwd2"}],attrs:{type:"password",placeholder:t.$t("message.PopPassword2Placeholder")},domProps:{value:t.formData.loginPwd2},on:{input:function(a){a.target.composing||t.$set(t.formData,"loginPwd2",a.target.value)}}})]),e("button",{staticClass:"primary-btn",on:{click:function(a){t.bindingTwoDo("PHONE")}}},[t._v(t._s(t.$t("message.PopConfirm")))])]),e("mu-dialog",{staticClass:"register-accout",attrs:{open:t.displayStatus.resetPassDialog,"append-body":!1},on:{"update:open":function(a){t.$set(t.displayStatus,"resetPassDialog",a)}}},[e("h4",[t._v(t._s(t.$t("message.PopResetPass")))]),e("div",{staticClass:"input-wrap"},[e("p",[t._v(t._s(t.$t("message.PopAccount"))+": "+t._s(t.currentAddr.userName))])]),e("div",{staticClass:"input-wrap"},[e("label",[t._v(t._s(t.$t("message.PopGraphic")))]),e("div",{staticClass:"input-flex"},[e("input",{directives:[{name:"model",rawName:"v-model",value:t.formData.picCode,expression:"formData.picCode"}],attrs:{type:"text",placeholder:t.$t("message.PopGraphicEnter")},domProps:{value:t.formData.picCode},on:{input:function(a){a.target.composing||t.$set(t.formData,"picCode",a.target.value)}}}),e("img",{ref:"imgcode",attrs:{src:t.$window.SERVERPATH+"/open/pic_captcha?type=RESET_PWD&macCode=macCode",alt:""},on:{click:function(a){t.getImgCode("RESET_PWD")}}})])]),e("div",{staticClass:"input-wrap"},[e("label",[t._v(t._s(t.$t("message.PopCaptcha")))]),e("div",{staticClass:"input-flex"},[e("input",{directives:[{name:"model",rawName:"v-model",value:t.formData.resetCaptcha,expression:"formData.resetCaptcha"}],attrs:{type:"text",placeholder:t.$t("message.PopInputCaptcha")},domProps:{value:t.formData.resetCaptcha},on:{input:function(a){a.target.composing||t.$set(t.formData,"resetCaptcha",a.target.value)}}}),e("a",{attrs:{href:"javascript:;"},on:{click:function(a){t.getSMScode("RESET_PASS")}}},[t._v(t._s(t.formData.btnText))])])]),e("div",{staticClass:"input-wrap"},[e("label",[t._v(t._s(t.$t("message.PopNewPassword")))]),e("input",{directives:[{name:"model",rawName:"v-model",value:t.formData.resetLoginPwd,expression:"formData.resetLoginPwd"}],attrs:{type:"password",placeholder:t.$t("message.PopPasswordPlaceholder")},domProps:{value:t.formData.resetLoginPwd},on:{input:function(a){a.target.composing||t.$set(t.formData,"resetLoginPwd",a.target.value)}}})]),e("div",{staticClass:"input-wrap"},[e("label",[t._v(t._s(t.$t("message.PopPasswordConfirm")))]),e("input",{directives:[{name:"model",rawName:"v-model",value:t.formData.resetLoginPwd2,expression:"formData.resetLoginPwd2"}],attrs:{type:"password",placeholder:t.$t("message.PopPassword2Placeholder")},domProps:{value:t.formData.resetLoginPwd2},on:{input:function(a){a.target.composing||t.$set(t.formData,"resetLoginPwd2",a.target.value)}}})]),e("button",{staticClass:"primary-btn",on:{click:t.passResetDo}},[t._v(t._s(t.$t("message.PopConfirmChange")))])]),e("FooterBar",{ref:"ft"})],1)},i=[],o=(e("ac6a"),e("c93e")),n=e("a322"),r=(e("f751"),e("fca0")),c=e("348c"),p=e("1720"),d=e("052d"),m=e("2f62"),l={data:function(){return{displayStatus:{phoneBind:!1,emailBind:!1,confirmAccountNotExist:!1,resetPassDialog:!1},prefixs:["+86","+852","+853","+886","+8801","+8802","+001","+44","+0061"],prefixMenu:!1,formData:{phone:"",prefix:"+86",captcha:"",picCode:"",loginPwdCheck:"",loginPwd:"",loginPwd2:"",s:60,btnText:this.$t("message.PopGetCaptcha"),timer:null,email:"",resetCaptcha:"",resetLoginPwd:"",resetLoginPwd2:"",bindingType:"PHONE"},pageData:{isBind:!1,haveTrustee:!1,MetaMaskAddress:[]},captchaDisabled:!1}},watch:{currentAddr:function(){this.pageData={isBind:!1,haveTrustee:!1,MetaMaskAddress:[]},this.getAssets()},displayStatus:{handler:function(){var t;this.formData=Object.assign(this.formData,(t={phone:"",picCode:"",captcha:"",emailCaptcha:"",resetCaptcha:"",loginPwd:"",loginPwd2:"",email:""},Object(n["a"])(t,"picCode",""),Object(n["a"])(t,"resetLoginPwd",""),Object(n["a"])(t,"resetLoginPwd2",""),t))},deep:!0}},mounted:function(){this.getAssets()},computed:Object(o["a"])({},Object(m["c"])({currentAddr:function(t){return t.user.currentAddr},storeWeb3:function(t){return t.web3Handler.web3}})),components:{HeaderBar:r["a"],FooterBar:c["a"],AEFcountDownBtn:p["a"]},methods:Object(o["a"])({getImgCode:function(t){this.$refs.imgcode.src=this.$window.SERVERPATH+"/open/pic_captcha?type="+t+"&macCode=macCode&"+Math.random()},getSMScode:function(t){var a=this,e={macCode:"macCode",picCode:this.formData.picCode};if("ACCOUNT_BINDING"==t){if(!this.verifyPhone()||!this.verifyPicCode())return;e.phone=this.formData.phone,e.prefix=this.formData.prefix,e.type=t,this.registerSMScountDown(),this.$http.post("/open/captcha",e).then(function(t){console.log(t),200!=t.code&&(clearTimeout(a.formData.timer),a.formData.btnText=a.$t("message.PopGetCaptcha"))}).catch(function(t){clearTimeout(a.formData.timer),a.formData.btnText=a.$t("message.PopGetCaptcha")})}else{if(!this.verifyPicCode())return;this.registerSMScountDown(),this.$http.get("/app/user/password/captcha",{params:e}).then(function(t){console.log(t),200!=t.code&&(clearTimeout(a.formData.timer),a.formData.btnText=a.$t("message.PopGetCaptcha"))}).catch(function(t){clearTimeout(a.formData.timer),a.formData.btnText=a.$t("message.PopGetCaptcha")})}},getEmailCode:function(t){var a=this;this.verifyEmail()&&this.verifyPicCode()&&(this.captchaDisabled=!0,this.$http.get("/open/email_captcha",{params:{email:this.formData.email,picCode:this.formData.picCode,captchaType:t}}).then(function(t){console.log(t),200!=t.code&&(a.captchaDisabled=!1)}).catch(function(t){a.captchaDisabled=!1}))},registerSMScountDown:function(){this.formData.s>0?(this.formData.s--,this.formData.btnText=this.formData.s+"s",this.formData.timer=setTimeout(this.registerSMScountDown,1e3)):(this.formData.s=60,this.formData.btnText=this.$t("message.PopGetCaptcha"))},bindingOneDo:function(t){var a=this;this.formData.bindingType=t;var e={account:this.formData.phone,bindingType:t,captcha:this.formData.captcha};if("PHONE"==t){if(!this.verifyPhone()||!this.verifyCaptcha())return}else{if(!this.verifyEmail()||!this.verifyCaptcha())return;e.account=this.formData.email}this.$http.post("/app/user/binding",e).then(function(t){200==t.code&&(a.displayStatus.phoneBind=!1,a.displayStatus.emailBind=!1,t.result?a.web3BindAddress(t.result):a.displayStatus.confirmAccountNotExist=!0)})},bindingTwoDo:function(){var t=this,a=this.formData.bindingType,e={account:this.formData.phone,password:Object(d["a"])(this.formData.loginPwd)};if("PHONE"==a){if(!this.verifyPhone()||!this.verifyCaptcha())return}else if(!this.verifyEmail()||!this.verifyCaptcha())return;this.verifyPassword()&&this.$http.post("/app/user/binding_two",e).then(function(a){t.displayStatus.phoneBind=!1,t.displayStatus.emailBind=!1,console.log(a),200==a.code&&a.result&&(t.displayStatus.confirmAccountNotExist=!1,t.web3BindAddress(a.result))})},passResetDo:function(){var t=this;if(""!=this.formData.resetCaptcha)if(""!=this.formData.resetLoginPwd)if(""!=this.formData.resetLoginPwd2)if(this.formData.resetLoginPwd==this.formData.resetLoginPwd2){var a=/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,12}$/;if(!a.test(this.formData.resetLoginPwd))return this.alert({type:"info",msg:this.$t("message.PopPassRequest")}),!1;this.$http.post("/app/user/password/reset",{captcha:this.formData.resetCaptcha,pwd:Object(d["a"])(this.formData.resetLoginPwd)}).then(function(a){console.log(a),200==a.code&&(t.alert({type:"success",msg:a.msg}),t.displayStatus.resetPassDialog=!1)})}else this.alert({type:"info",msg:this.$t("message.PopPassDiff")});else this.alert({type:"info",msg:this.$t("message.PopPass2Empty")});else this.alert({type:"info",msg:this.$t("message.PopPassEmpty")});else this.alert({type:"info",msg:this.$t("message.PopCaptchaEmpty")})},getAssets:function(){var t=this;this.$http.get("/app/user/assets").then(function(a){if(200==a.code){var e=a.result.assets;e.length>1&&(t.pageData.isBind=!0),t.pageData.MetaMaskAddress=[],e.forEach(function(a){"IMPORT"==a.platform?t.pageData.MetaMaskAddress.push(a):t.pageData.haveTrustee=!0})}})},verifyPhone:function(){return!(""==this.formData.phone||!/^[0-9]*$/.test(this.formData.phone))||(this.alert({type:"info",msg:this.$t("message.PopPhoneWrong")}),!1)},verifyPicCode:function(){return""!=this.formData.picCode||(this.alert({type:"info",msg:this.$t("message.PopGraphicEmpty")}),!1)},verifyCaptcha:function(){return""!=this.formData.captcha||(this.alert({type:"info",msg:this.$t("message.PopCaptchaEmpty")}),!1)},verifyPassword:function(){var t=/^[a-zA-Z0-9]{8,12}$/;return t.test(this.formData.loginPwd)?this.formData.loginPwd===this.formData.loginPwd2||(this.alert({type:"info",msg:this.$t("message.PopPassDiff")}),!1):(this.alert({type:"info",msg:this.$t("message.PopPassRequest")}),!1)},verifyEmail:function(){return!(""==this.formData.email||!/^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/.test(this.formData.email))||(this.alert({type:"info",msg:"邮箱输入有误"}),!1)},web3BindAddress:function(t){var a=this;this.storeWeb3.apiHandle.methods.bindAddress(t).send({from:this.currentAddr.coinAddress}).on("receipt",function(t){a.alert({type:"success",msg:this.$t("message.Popsuccess")})}).on("error",function(t){a.alert({type:"error",msg:this.$t("message.PopFail")})})}},Object(m["b"])({changeLanguage:"CHANGE_LANGUAGE",alert:"alert"}))},u=l,f=(e("d384"),e("2877")),h=Object(f["a"])(u,s,i,!1,null,null,null);h.options.__file="Account-security.vue";a["default"]=h.exports},d384:function(t,a,e){"use strict";var s=e("f9fa"),i=e.n(s);i.a},f9fa:function(t,a,e){}}]);