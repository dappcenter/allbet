(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-b25c91da"],{"404a":function(t,e,s){},6676:function(t,e,s){"use strict";s.r(e);var a=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"my-assets"},[s("HeaderBar"),s("div",{staticClass:"main",style:{minHeight:t.$window.innerHeight-150+"px"}},[s("div",{staticClass:"content"},[s("p",{staticClass:"title"},[s("span",[t._v(t._s(t.$t("message.assetsOfMine")))]),s("span",{on:{click:function(e){t.$router.push("trading-record")}}},[t._v(t._s(t.$t("message.assetsTransactionRecord")))])]),s("ul",[s("li",{staticClass:"thead"},[s("div",[t._v(t._s(t.$t("message.assetsCurrency")))]),s("div",[t._v(t._s(t.$t("message.assetsQuantity")))]),s("div",[t._v(t._s(t.$t("message.homeOperation")))])]),s("div",{directives:[{name:"show",rawName:"v-show",value:"TRX"!==t.currentAddr.mainCoin,expression:"currentAddr.mainCoin !== 'TRX'"}]},[s("li",[s("div",[t._v("ETH")]),s("div",[t._v(t._s((1*t.currentAddr.eth).toFixed(3)))]),s("div",{directives:[{name:"show",rawName:"v-show",value:"DISPATCHER"==t.currentAddr.platform,expression:"currentAddr.platform == 'DISPATCHER'"}],staticClass:"operation"},[s("span",{on:{click:function(e){t.showCharge="chargeETH"==t.showCharge?"":"chargeETH"}}},[t._v(t._s(t.$t("message.assetsRechargeCurrency")))]),s("span",{directives:[{name:"show",rawName:"v-show",value:"IMPORT"!=t.currentAddr.platform,expression:"currentAddr.platform != 'IMPORT'"}],on:{click:function(e){t.showCharge="mentionETH"==t.showCharge?"":"mentionETH"}}},[t._v(t._s(t.$t("message.assetsExtractCoins")))])]),s("div",{directives:[{name:"show",rawName:"v-show",value:"DISPATCHER"!=t.currentAddr.platform,expression:"currentAddr.platform != 'DISPATCHER'"}],staticClass:"operation"},[s("span",[t._v("--")])])]),s("div",{directives:[{name:"show",rawName:"v-show",value:"chargeETH"==t.showCharge&&"DISPATCHER"==t.currentAddr.platform,expression:"showCharge == 'chargeETH' && currentAddr.platform == 'DISPATCHER'"}],staticClass:"charge"},[s("div",{attrs:{src:"",alt:"",id:"qrcode1"}}),s("div",{staticClass:"charge-desc"},[s("p",[t._v(t._s(t.$t("message.assetsRechargeAddress"))+"：")]),s("div",{staticClass:"address"},[s("div",{attrs:{id:"copy_text"}},[t._v(t._s(t.currentAddr.coinAddress))]),s("span",{ref:"copy",staticClass:"copy",attrs:{"data-clipboard-action":"copy","data-clipboard-target":"#copy_text"},on:{click:function(e){t.copy(t.copyBtn)}}},[t._v(t._s(t.$t("message.assetsCopy")))])]),s("p",[t._v(t._s(t.$t("message.assetsTips")))])])]),s("div",{directives:[{name:"show",rawName:"v-show",value:"mentionETH"==t.showCharge&&"DISPATCHER"==t.currentAddr.platform,expression:"showCharge == 'mentionETH' && currentAddr.platform == 'DISPATCHER'"}],staticClass:"mention"},[s("p",[t._v(t._s(t.$t("message.assetsCoinAddress"))+":")]),s("div",{staticClass:"input-div"},[s("input",{directives:[{name:"model",rawName:"v-model",value:t.formData.destAddress,expression:"formData.destAddress"}],attrs:{type:"text"},domProps:{value:t.formData.destAddress},on:{input:function(e){e.target.composing||t.$set(t.formData,"destAddress",e.target.value)}}})]),s("p",{staticClass:"available"},[s("span",[t._v(t._s(t.$t("message.assetsQuantity"))+":")]),s("span",[t._v(t._s(t.$t("message.homeAvailable"))+t._s(t.currentAddr.eth)+" ETH")])]),s("div",{staticClass:"input-div"},[s("input",{directives:[{name:"model",rawName:"v-model",value:t.formData.amount,expression:"formData.amount"}],attrs:{type:"text",oninput:"value=value.replace(/[^0-9\\.]/g,'')",onkeyup:"value=value.replace(/[^0-9\\.]/g,'')",onpaste:"value=value.replace(/[^0-9\\.]/g,'')",oncontextmenu:"value=value.replace(/[^0-9\\.]/g,'')"},domProps:{value:t.formData.amount},on:{input:function(e){e.target.composing||t.$set(t.formData,"amount",e.target.value)}}}),t._v("\n\t\t\t\t\t\t\tETH\n\t\t\t\t\t\t")]),t.feeData?s("div",{staticClass:"poundage"},[s("div",{},[s("p",[t._v(t._s(t.$t("message.assetsHandlingFee")))]),s("div",{staticClass:"input-div"},[s("input",{attrs:{type:"text",name:"",disabled:""},domProps:{value:t.feeData.ETH}}),t._v("\n\t\t\t\t\t\t\t\t\tETH\n\t\t\t\t\t\t\t\t")])]),s("div",{},[s("p",[t._v(t._s(t.$t("message.assetsArrivalAmount")))]),s("div",{staticClass:"input-div"},[s("input",{attrs:{type:"text",name:"",disabled:""},domProps:{value:t.formData.amount-t.feeData.ETH<0?0:(t.formData.amount-t.feeData.ETH).toFixed(8)}}),t._v("\n\t\t\t\t\t\t\t\t\tETH\n\t\t\t\t\t\t\t\t")])])]):t._e(),s("p",{staticClass:"attention"},[s("span",[t._v(t._s(t.$t("message.assetsTips2")))]),s("span",{staticClass:"take-out",on:{click:function(e){t.withdrawDo("ETH")}}},[t._v(t._s(t.$t("message.assetsExtractCoins")))])])])]),s("li",[s("div",[t._v("AT")]),s("div",[t._v(t._s(t.currentAddr.at))]),s("div",{directives:[{name:"show",rawName:"v-show",value:"DISPATCHER"==t.currentAddr.platform,expression:"currentAddr.platform == 'DISPATCHER'"}],staticClass:"operation"},[s("span",{on:{click:function(e){t.showCharge="chargeAT"==t.showCharge?"":"chargeAT"}}},[t._v(t._s(t.$t("message.assetsRechargeCurrency")))]),s("span",{on:{click:function(e){t.showCharge="mentionAT"==t.showCharge?"":"mentionAT"}}},[t._v(t._s(t.$t("message.assetsExtractCoins")))])]),s("div",{directives:[{name:"show",rawName:"v-show",value:"DISPATCHER"!=t.currentAddr.platform,expression:"currentAddr.platform != 'DISPATCHER'"}],staticClass:"operation"},[s("span",[t._v("--")])])]),s("div",{directives:[{name:"show",rawName:"v-show",value:"chargeAT"==t.showCharge&&"DISPATCHER"==t.currentAddr.platform,expression:"showCharge == 'chargeAT' && currentAddr.platform == 'DISPATCHER'"}],staticClass:"charge"},[s("div",{attrs:{src:"",alt:"",id:"qrcode2"}}),s("div",{staticClass:"charge-desc"},[s("p",[t._v(t._s(t.$t("message.assetsRechargeAddress"))+"：")]),s("div",{staticClass:"address"},[s("div",{attrs:{id:"copy_text2"}},[t._v(t._s(t.currentAddr.coinAddress))]),s("span",{ref:"copy2",staticClass:"copy",attrs:{"data-clipboard-action":"copy","data-clipboard-target":"#copy_text2"},on:{click:function(e){t.copy(t.copyBtn2)}}},[t._v(t._s(t.$t("message.assetsCopy")))])]),s("p",[t._v(t._s(t.$t("message.assetsTipsAT")))])])]),s("div",{directives:[{name:"show",rawName:"v-show",value:"mentionAT"==t.showCharge&&"DISPATCHER"==t.currentAddr.platform,expression:"showCharge == 'mentionAT' && currentAddr.platform == 'DISPATCHER'"}],staticClass:"mention"},[s("p",[t._v(t._s(t.$t("message.assetsCoinAddress"))+":")]),s("div",{staticClass:"input-div"},[s("input",{directives:[{name:"model",rawName:"v-model",value:t.formData.destAddress,expression:"formData.destAddress"}],attrs:{type:"text"},domProps:{value:t.formData.destAddress},on:{input:function(e){e.target.composing||t.$set(t.formData,"destAddress",e.target.value)}}})]),s("p",{staticClass:"available"},[s("span",[t._v(t._s(t.$t("message.assetsQuantity"))+":")]),s("span",[t._v(t._s(t.$t("message.homeAvailable"))+t._s(t.currentAddr.at)+" AT")])]),s("div",{staticClass:"input-div"},[s("input",{directives:[{name:"model",rawName:"v-model",value:t.formData.amount,expression:"formData.amount"}],attrs:{type:"text",oninput:"value=value.replace(/[^0-9\\.]/g,'')",onkeyup:"value=value.replace(/[^0-9\\.]/g,'')",onpaste:"value=value.replace(/[^0-9\\.]/g,'')",oncontextmenu:"value=value.replace(/[^0-9\\.]/g,'')"},domProps:{value:t.formData.amount},on:{input:function(e){e.target.composing||t.$set(t.formData,"amount",e.target.value)}}}),t._v("\n\t\t\t\t\t\tAT\n\t\t\t\t\t")]),t.feeData?s("div",{staticClass:"poundage"},[s("div",{},[s("p",[t._v(t._s(t.$t("message.assetsHandlingFee")))]),s("div",{staticClass:"input-div"},[s("input",{attrs:{type:"text",name:"",disabled:""},domProps:{value:t.feeData.AT}}),t._v("\n\t\t\t\t\t\t\t\tAT\n\t\t\t\t\t\t\t")])]),s("div",{},[s("p",[t._v(t._s(t.$t("message.assetsArrivalAmount")))]),s("div",{staticClass:"input-div"},[s("input",{attrs:{type:"text",name:"",disabled:""},domProps:{value:t.formData.amount-t.feeData.AT<0?0:(t.formData.amount-t.feeData.AT).toFixed(8)}}),t._v("\n\t\t\t\t\t\t\t\tAT\n\t\t\t\t\t\t\t")])])]):t._e(),s("p",{staticClass:"attention"},[s("span",[t._v(t._s(t.$t("message.assetsTips2")))]),s("span",{staticClass:"take-out",on:{click:function(e){t.withdrawDo("AT")}}},[t._v(t._s(t.$t("message.assetsExtractCoins")))])])]),s("li",[s("div",[t._v("AB")]),s("div",[t._v(t._s(t.currentAddr.bet))]),s("div",{staticStyle:{color:"#FFDB5B"}},[t._v("--")])]),s("div",{directives:[{name:"show",rawName:"v-show",value:"DISPATCHER"==t.currentAddr.platform||"TRX"==t.currentAddr.mainCoin,expression:"currentAddr.platform == 'DISPATCHER' || currentAddr.mainCoin == 'TRX'"}]},[s("li",[s("div",[t._v("TRX")]),t.currentAddr.assets.TRX?s("div",[t._v(t._s(t.currentAddr.assets.TRX.amount))]):t._e(),s("div",{directives:[{name:"show",rawName:"v-show",value:"DISPATCHER"==t.currentAddr.platform,expression:"currentAddr.platform == 'DISPATCHER'"}],staticClass:"operation"},[s("span",{on:{click:function(e){t.showCharge="chargeTRX"==t.showCharge?"":"chargeTRX"}}},[t._v(t._s(t.$t("message.assetsRechargeCurrency")))]),s("span",{on:{click:function(e){t.showCharge="mentionTRX"==t.showCharge?"":"mentionTRX"}}},[t._v(t._s(t.$t("message.assetsExtractCoins")))])]),s("div",{directives:[{name:"show",rawName:"v-show",value:"DISPATCHER"!=t.currentAddr.platform,expression:"currentAddr.platform != 'DISPATCHER'"}],staticClass:"operation"},[s("span",[t._v("--")])])]),s("div",{directives:[{name:"show",rawName:"v-show",value:"chargeTRX"==t.showCharge&&"DISPATCHER"==t.currentAddr.platform,expression:"showCharge == 'chargeTRX' && currentAddr.platform == 'DISPATCHER'"}],staticClass:"charge"},[s("div",{ref:"qrcode3",attrs:{alt:"",id:"qrcode3"}}),s("div",{staticClass:"charge-desc"},[s("p",[t._v(t._s(t.$t("message.assetsRechargeAddress"))+"：")]),s("div",{staticClass:"address"},[t.currentAddr.assets.TRX?s("div",{attrs:{id:"copy_text3"}},[t._v(t._s(t.currentAddr.assets.TRX.coinAddress))]):t._e(),s("span",{ref:"copy3",staticClass:"copy",attrs:{"data-clipboard-action":"copy","data-clipboard-target":"#copy_text3"},on:{click:function(e){t.copy(t.copyBtn3)}}},[t._v(t._s(t.$t("message.assetsCopy")))])]),s("p",[t._v(t._s(t.$t("message.assetsTipsAT")))])])]),s("div",{directives:[{name:"show",rawName:"v-show",value:"mentionTRX"==t.showCharge&&"DISPATCHER"==t.currentAddr.platform,expression:"showCharge == 'mentionTRX' && currentAddr.platform == 'DISPATCHER'"}],staticClass:"mention"},[s("p",[t._v(t._s(t.$t("message.assetsCoinAddress"))+":")]),s("div",{staticClass:"input-div"},[s("input",{directives:[{name:"model",rawName:"v-model",value:t.formData.destAddress,expression:"formData.destAddress"}],attrs:{type:"text"},domProps:{value:t.formData.destAddress},on:{input:function(e){e.target.composing||t.$set(t.formData,"destAddress",e.target.value)}}})]),s("p",{staticClass:"available"},[s("span",[t._v(t._s(t.$t("message.assetsQuantity"))+":")]),s("span",[t._v(t._s(t.$t("message.homeAvailable"))+t._s(t.currentAddr.at)+" AT")])]),s("div",{staticClass:"input-div"},[s("input",{directives:[{name:"model",rawName:"v-model",value:t.formData.amount,expression:"formData.amount"}],attrs:{type:"text",oninput:"value=value.replace(/[^0-9\\.]/g,'')",onkeyup:"value=value.replace(/[^0-9\\.]/g,'')",onpaste:"value=value.replace(/[^0-9\\.]/g,'')",oncontextmenu:"value=value.replace(/[^0-9\\.]/g,'')"},domProps:{value:t.formData.amount},on:{input:function(e){e.target.composing||t.$set(t.formData,"amount",e.target.value)}}}),t._v("\n\t\t\t\t\t\t\tTRX\n\t\t\t\t\t\t")]),t.feeData?s("div",{staticClass:"poundage"},[s("div",{},[s("p",[t._v(t._s(t.$t("message.assetsHandlingFee")))]),s("div",{staticClass:"input-div"},[s("input",{attrs:{type:"text",name:"",disabled:""},domProps:{value:t.feeData.TRX}}),t._v("\n\t\t\t\t\t\t\t\t\tTRX\n\t\t\t\t\t\t\t\t")])]),s("div",{},[s("p",[t._v(t._s(t.$t("message.assetsArrivalAmount")))]),s("div",{staticClass:"input-div"},[s("input",{attrs:{type:"text",name:"",disabled:""},domProps:{value:t.formData.amount-t.feeData.TRX<0?0:(t.formData.amount-t.feeData.TRX).toFixed(8)}}),t._v("\n\t\t\t\t\t\t\t\t\tTRX\n\t\t\t\t\t\t\t\t")])])]):t._e(),s("p",{staticClass:"attention"},[s("span",[t._v(t._s(t.$t("message.assetsTips2")))]),s("span",{staticClass:"take-out",on:{click:function(e){t.withdrawDo("TRX")}}},[t._v(t._s(t.$t("message.assetsExtractCoins")))])])])])])])]),s("FooterBar",{ref:"ft"})],1)},r=[],n=(s("c5f6"),s("be94")),o=s("d044"),i=s.n(o),d=s("b311"),c=s.n(d),m=s("fca0"),u=s("348c"),p=s("2f62"),v={data:function(){return{formData:{amount:"",destAddress:""},showCharge:"",copyBtn:null,copyBtn2:null,copyBtn3:null,feeData:null}},computed:Object(n["a"])({},Object(p["c"])({currentAddr:function(t){return t.user.currentAddr}})),watch:{currentAddr:function(){document.getElementById("qrcode1").innerHTML="",document.getElementById("qrcode2").innerHTML="",document.getElementById("qrcode3")&&(document.getElementById("qrcode3").innerHTML=""),this.currentAddr.coinAddress&&this.makeQrCode()},showCharge:function(){this.formData.amount="",this.formData.destAddress=""}},mounted:function(){this.copyBtn=new c.a(this.$refs.copy),this.copyBtn2=new c.a(this.$refs.copy2),this.copyBtn3=new c.a(this.$refs.copy3),this.currentAddr.coinAddress&&this.makeQrCode(),this.getFee()},methods:Object(n["a"])({makeQrCode:function(){var t=new i.a(document.getElementById("qrcode2"),{width:130,height:130});t.makeCode(this.currentAddr.coinAddress);var e=new i.a(document.getElementById("qrcode1"),{width:130,height:130});e.makeCode(this.currentAddr.coinAddress);var s=new i.a(this.$refs.qrcode3,{width:130,height:130});this.currentAddr.assets.TRX&&s.makeCode(this.currentAddr.assets.TRX.coinAddress)},withdrawDo:function(t){var e=this;if(""==(this.formData.destAddress+"").trim())return this.alert({type:"info",msg:this.$t("message.assetsDestAddEmpty")}),!1;if(""==(this.formData.amount+"").trim()||Number(this.formData.amount)<=0)return this.alert({type:"info",msg:this.$t("message.assetsMentionAmount")}),!1;if("ETH"==t&&Number(this.currentAddr.eth)<Number(this.formData.amount)||"AT"==t&&Number(this.currentAddr.at)<Number(this.formData.amount))return this.alert({type:"info",msg:this.$t("message.assetsNotEnough")}),!1;if(this.currentAddr.coinAddress==this.formData.destAddress)return this.alert({type:"info",msg:this.$t("message.assetsNoMe")}),!1;var s=this.currentAddr.coinAddress;"TRX"==t&&(s=this.currentAddr.assets[t].coinAddress),this.$http.post("/app/transfer/withdraw",{amount:this.formData.amount,coinAddress:s,destAddress:this.formData.destAddress,withdrawType:t}).then(function(t){200==t.code&&(e.formData.destAddress="",e.formData.amount="",e.$store.dispatch("updateProperty"),e.alert({type:"success",msg:t.msg}))})},copy:function(t){var e=this,s=t;s.on("success",function(){e.alert({type:"success",msg:e.$t("message.assetsSuccessCopy")})}),s.on("error",function(){e.alert({type:"success",msg:e.$t("message.assetsFailCopy")})})},getFee:function(){var t=this;this.$http.get("/app/transfer/withdraw").then(function(e){200==e.code&&(t.feeData=e.result)})}},Object(p["b"])({alert:"alert"})),components:{HeaderBar:m["a"],FooterBar:u["a"]}},l=v,h=(s("88ee"),s("2877")),g=Object(h["a"])(l,a,r,!1,null,null,null);g.options.__file="My-assets.vue";e["default"]=g.exports},"88ee":function(t,e,s){"use strict";var a=s("404a"),r=s.n(a);r.a}}]);