(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-e78f7700"],{"0341":function(t,s,e){"use strict";e.r(s);var i,n=function(){var t=this,s=t.$createElement,e=t._self._c||s;return e("div",{staticClass:"mobile-invite-page"},[e("HeaderBar"),e("div",{staticClass:"main"},[e("div",{staticClass:"white-div"},[e("div",{directives:[{name:"show",rawName:"v-show",value:t.inviteCode,expression:"inviteCode"}]},[e("div",{staticClass:"invite-detail"},[e("div",{},[e("p",{staticClass:"title"},[t._v(t._s(t.$t("message.invitationSuccessed")))]),e("h4",[t._v(t._s(t.inviteCount)+" "+t._s(t.$t("message.InvitePeople")))])]),e("div",{},[e("p",{staticClass:"title"},[t._v(t._s(t.$t("message.tradeInvitationReward")))]),e("h4",[t._v(t._s(t.inviteBonus)+" AB")])])]),e("div",{staticClass:"qrcode"},[e("div",{staticClass:"qrcode-content"},[e("div",{staticClass:"invite-div"},[e("p",[t._v(t._s(t.$t("message.invitationCode")))]),e("div",{staticClass:"copy-div1"},[e("span",{attrs:{id:"copy_code"}},[t._v(t._s(t.inviteCode))]),e("span",{ref:"copy1",staticClass:"copy",attrs:{"data-clipboard-action":"copy","data-clipboard-target":"#copy_code"},on:{click:t.copy1}},[t._v(t._s(t.$t("message.assetsCopy")))])])]),e("div",{staticClass:"invite-div"},[e("p",[t._v(t._s(t.$t("message.invitationLink")))]),e("div",{staticClass:"copy-div1 copy-div2"},[e("span",{attrs:{id:"copy_text"}},[t._v(t._s(t.inviteUrl))]),e("span",{ref:"copy",staticClass:"copy",attrs:{"data-clipboard-action":"copy","data-clipboard-text":t.$t("message.inviteText")+t.inviteUrl},on:{click:t.copy}},[t._v(t._s(t.$t("message.assetsCopy")))])])])])]),e("div",{staticClass:"buttom"},[e("h5",{staticClass:"title"},[t._v(t._s(t.$t("message.InvitationRules")))]),e("h5",[t._v(t._s(t.$t("message.InviteDesc")))]),e("h5",{staticClass:"title",staticStyle:{"margin-top":"0.35rem"}},[t._v(t._s(t.$t("message.InviteReward")))]),e("h5",[t._v(t._s(t.$t("message.InvitationRules1")))]),e("h5",[t._v(t._s(t.$t("message.InvitationRules2")))]),e("h5",[t._v(t._s(t.$t("message.InvitationRules3")))])])]),e("div",{directives:[{name:"show",rawName:"v-show",value:!t.inviteCode,expression:"!inviteCode"}],staticClass:"no-bind"},[e("p",[t._v("\n\t\t\t\t\t\t\t"+t._s(t.$t("message.InviteBind"))+"\n\t\t\t\t\t\t\t"),e("router-link",{staticClass:"bind-btn",attrs:{to:{name:"loginselect"}}},[t._v(t._s(t.$t("message.hasToLogin")))])],1),e("div",{staticClass:"buttom"},[e("h5",{staticClass:"title"},[t._v(t._s(t.$t("message.InvitationRules")))]),e("h5",[t._v(t._s(t.$t("message.InviteDesc")))]),e("h5",{staticClass:"title",staticStyle:{"margin-top":"0.35rem"}},[t._v(t._s(t.$t("message.InviteReward")))]),e("h5",[t._v(t._s(t.$t("message.InvitationRules1")))]),e("h5",[t._v(t._s(t.$t("message.InvitationRules2")))]),e("h5",[t._v(t._s(t.$t("message.InvitationRules3")))])])])])])],1)},a=[],o=e("ade3"),c=e("be94"),v=e("fca0"),r=(e("d044"),e("b311")),d=e.n(r),l=e("2f62"),u=(i={data:function(){return{inviteBonus:"0",inviteCount:"0",inviteUrl:location.origin+"/dice?inv=",inviteCode:"",platformBonus:""}},computed:{getCurrentAddr:function(){return this.$store.state.user.currentAddr},getInviteCode:function(){return this.$store.state.user.userInfo.inviteCode}},watch:{getCurrentAddr:function(t){this.makeQRcode(),this.getInvite()}},mounted:function(){this.copyBtn=new d.a(this.$refs.copy),this.copyBtn1=new d.a(this.$refs.copy1),this.getInvite()}},Object(o["a"])(i,"watch",{getCurrentAddr:function(){this.getInvite()}}),Object(o["a"])(i,"components",{HeaderBar:v["a"]}),Object(o["a"])(i,"methods",Object(c["a"])({getInvite:function(){var t=this;this.$http.get("/app/user/invite?"+this.getCurrentAddr.coinAddress,{}).then(function(s){if(200==s.code){var e=s.result||{};t.inviteBonus=e.inviteBonus||0,t.inviteCount=e.inviteCount||0,t.inviteCode=t.getInviteCode,t.inviteUrl=location.origin+"/dice?inv="+t.inviteCode,t.platformBonus=e.platformBonus}})},copy1:function(){var t=this,s=this.copyBtn1;s.on("success",function(){t.alert({type:"success",msg:t.$t("message.assetsSuccessCopy")})}),s.on("error",function(){t.alert({type:"success",msg:t.$t("message.assetsFailCopy")})})},copy:function(){var t=this,s=this.copyBtn;s.on("success",function(){t.alert({type:"success",msg:t.$t("message.assetsSuccessCopy")})}),s.on("error",function(){t.alert({type:"success",msg:t.$t("message.assetsFailCopy")})})}},Object(l["b"])({alert:"alert"}))),i),p=u,_=(e("d499"),e("2877")),m=Object(_["a"])(p,n,a,!1,null,null,null);m.options.__file="Mobile-invite.vue";s["default"]=m.exports},7927:function(t,s,e){},d499:function(t,s,e){"use strict";var i=e("7927"),n=e.n(i);n.a}}]);