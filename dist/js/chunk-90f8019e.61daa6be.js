(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-90f8019e"],{"0da4":function(t,e,n){"use strict";var s=n("3d92"),a=n.n(s);a.a},"23c2":function(t,e,n){},"30c9":function(t,e,n){"use strict";var s=n("481b"),a=n.n(s);a.a},"3d92":function(t,e,n){},"481b":function(t,e,n){},"4f25":function(t,e,n){"use strict";var s=n("a651"),a=n.n(s);a.a},"5c72":function(t,e,n){"use strict";var s=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("section",{staticClass:"module-preview"},[n("div",{staticClass:"ctn ctn1"},[n("h4",[t._v("获胜机会")]),n("h3",[t._v(t._s(this.betInfo.odds)+"%")])]),n("div",{staticClass:"ctn ctn2"},[n("h4",[t._v("赢得投注")]),t._m(0),n("label",{},[t._v("您将赢得"),n("DigitaRoll",{attrs:{value:1.96*this.betInfo.amount}}),t._v("以太幣")],1),n("p",{staticClass:"tip"},[t._v("1% 费用，0.001以太幣累积大奖")])]),n("div",{staticClass:"ctn ctn3"},[n("h4",[t._v("大奖包括")]),n("h3",[n("DigitaRoll",{attrs:{value:888}}),n("i",[t._v("以太幣")])],1),n("label",[t._v("幸运数字是888!")])])])},a=[function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("h3",[s("img",{attrs:{src:n("6e8e")}}),t._v("1.96×")])}],i=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("span",{staticClass:"digital-roll"},[t._v(t._s(t.rollNumber))])},l=[],r=(n("c5f6"),{props:{value:{default:0,type:Number},speed:{default:30,type:Number},time:{default:1500,type:Number},decimal:{default:3,type:Number}},data:function(){return{rollNumber:0,stepSize:.01,timer:null,rollSpace:0}},mounted:function(){this.changeNumber()},watch:{value:function(){this.changeNumber()}},methods:{changeNumber:function(){var t=this;clearInterval(this.timer),this.rollSpace=Math.abs(this.value-this.rollNumber),this.stepSize=this.rollSpace/this.time*this.speed<.001?.001:this.rollSpace/this.time*this.speed,this.value>this.rollNumber?this.timer=setInterval(function(){t.rollNumber=(Number(t.rollNumber)+t.stepSize).toFixed(t.decimal),t.rollNumber>=t.value&&(clearInterval(t.timer),t.timer=null,t.rollNumber=t.value.toFixed(t.decimal))},this.speed):this.value<this.rollNumber?this.timer=setInterval(function(){t.rollNumber=(Number(t.rollNumber)-t.stepSize).toFixed(t.decimal),t.rollNumber<=t.value&&(clearInterval(t.timer),t.timer=null,t.rollNumber=t.value.toFixed(t.decimal))},this.speed):this.rollNumber=this.value}}}),o=r,c=(n("30c9"),n("2877")),u=Object(c["a"])(o,i,l,!1,null,null,null);u.options.__file="digitalRoll.vue";var d=u.exports,v={props:["betInfo"],data:function(){return{}},mounted:function(){},components:{DigitaRoll:d}},f=v,m=(n("4f25"),Object(c["a"])(f,s,a,!1,null,null,null));m.options.__file="preview.vue";e["a"]=m.exports},"6cdf":function(t,e,n){},"6e8e":function(t,e,n){t.exports=n.p+"img/gold.f85f418d.png"},7263:function(t,e,n){"use strict";n.r(e);var s=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"roller-page"},[n("HeaderBar"),n("div",{staticClass:"main"},[n("Bet"),n("Record")],1),n("FooterBar")],1)},a=[],i=(n("cadf"),n("551c"),n("097d"),n("fca0")),l=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("section",{staticClass:"module-bet"},[n("div",{staticClass:"game-content"},[n("div",{staticClass:"ctn-top"},[t._m(0),n("div",{staticClass:"slider-wrap"},[t._m(1),n("div",{ref:"slider",staticClass:"slider"},[n("div",{ref:"bar",staticClass:"bar"}),n("div",{ref:"handle",staticClass:"handle",on:{mousedown:t.onHandleTouchS}})])])]),n("ul",{staticClass:"ctn-mdl"},[n("li",[n("label",[t._v("赔率")]),n("span",[t._v(t._s(t.odds))])]),n("li",[n("label",[t._v("收益")]),n("span",[t._v(t._s(t.odds))])]),n("li",[n("label",[t._v("概率")]),n("span",[t._v(t._s(t.odds))])])]),t._m(2),n("div",{staticClass:"hotkeys"},[n("span",{on:{click:function(e){t.onHotkeys(.05)}}},[t._v("0.05")]),n("span",{on:{click:function(e){t.onHotkeys(.1)}}},[t._v("0.10")]),n("span",{on:{click:function(e){t.onHotkeys(1)}}},[t._v("1.00")]),n("span",{on:{click:function(e){t.onHotkeys("max")}}},[t._v("最大")])]),n("div",{staticClass:"input-wrap"},[n("span",{staticClass:"add",on:{click:t.onAdd}}),n("input",{directives:[{name:"model",rawName:"v-model",value:t.amount,expression:"amount"}],attrs:{type:"number"},domProps:{value:t.amount},on:{input:function(e){e.target.composing||(t.amount=e.target.value)}}}),n("span",{staticClass:"minus",on:{click:t.onMinus}})])])])},r=[function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"number-show"},[n("div",[n("h3",[t._v("49")]),n("span",[t._v("预测数")])]),n("div",[n("h3",{staticClass:"green"},[t._v("00")]),n("span",[t._v("幸运数")])])])},function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"scale"},[n("span",[t._v("1%")]),n("span",[t._v("25%")]),n("span",[t._v("50%")]),n("span",[t._v("75%")]),n("span",[t._v("97%")])])},function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"ctn-btm"},[n("h4",[t._v("竞猜数量")]),n("div",{staticClass:"flex-wrap"},[n("div",{}),n("button",[t._v("猜小于49")])])])}],o=(n("c5f6"),n("c93e")),c=n("2f62"),u={data:function(){return{amount:.12,checkedNum:1,odds:1}},mounted:function(){this.setBetInfo({diceList:this.diceList,amount:this.amount}),window.onmouseup=function(){window.onmousemove=null},this.setBetInfo({odds:1})},methods:Object(o["a"])({onHotkeys:function(t){this.amount="max"===t?888:t.toFixed(2)},onAdd:function(){this.amount=(Number(this.amount)+.01).toFixed(2)},onMinus:function(){this.amount=(Number(this.amount)-.01).toFixed(2)}},Object(c["b"])({setBetInfo:"SET_ROLLER_BET_INFO"}),{onHandleTouchS:function(t){var e=this,n=this.$refs.slider.offsetLeft,s=this.$refs.slider.clientWidth-20,a=t.offsetX,i=0;window.onmousemove=function(t){i=t.clientX-n-a,i=i<=0?0:i>=s?s:i,e.$refs.handle.style.left=i+"px",e.$refs.bar.style.width=i+"px",e.odds=(i/(s/97)).toFixed(2)<1?1:(i/(s/97)).toFixed(2),e.setBetInfo({odds:e.odds,amount:e.amount})}}}),watch:{diceList:{handler:function(t,e){this.setBetInfo({diceList:t,amount:this.amount})},deep:!0},amount:function(t,e){this.setBetInfo({odds:this.odds,amount:t})}},computed:{web3:function(){return this.$store.state.web3Handler.web3}}},d=u,v=(n("9f5d"),n("2877")),f=Object(v["a"])(d,l,r,!1,null,null,null);f.options.__file="bet.vue";var m=f.exports,_=n("5c72"),p=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("section",{staticClass:"module-record"},[t._m(0),t._m(1),n("div",{staticClass:"t-body"},t._l(10,function(e){return n("ul",{staticClass:"list-content"},[t._m(2,!0),t._m(3,!0),t._m(4,!0),t._m(5,!0),t._m(6,!0),t._m(7,!0),t._m(8,!0),t._m(9,!0)])}))])},h=[function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"nav"},[n("a",{attrs:{href:"javascript:;"}},[t._v("最新玩家")]),n("a",{attrs:{href:"javascript:;"}},[t._v("大佬榜")]),n("a",{attrs:{href:"javascript:;"}},[t._v("幸运榜")]),n("a",{attrs:{href:"javascript:;"}},[t._v("我的战绩")])])},function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"t-head"},[n("span",[t._v("时间")]),n("span",[t._v("玩家")]),n("span",[t._v("下注数量")]),n("span",[t._v("预测数")]),n("span",[t._v("幸运数")]),n("span",[t._v("赔率")]),n("span",[t._v("奖金")]),n("span",[t._v("AB")])])},function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("li",{},[n("span",[t._v("2018.09.12 17:32")])])},function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("li",{staticClass:"green"},[n("span",[t._v("0xfd……kkdsee")])])},function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("li",{},[n("span",[t._v("0.34 ETH")])])},function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("li",{},[n("span",[t._v("53")])])},function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("li",{},[n("span",[t._v("29")])])},function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("li",{},[n("span",[t._v("10.6")])])},function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("li",{},[n("span",[t._v("0.4 ETH")])])},function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("li",{},[n("span",[t._v("120 AB")])])}],b={data:function(){return{unfold:-1}}},C=b,w=(n("85b8"),Object(v["a"])(C,p,h,!1,null,null,null));w.options.__file="record.vue";var N=w.exports,E=n("348c"),$=n("1720"),x={data:function(){return{disabled:!1}},computed:{betInfo:function(){return this.$store.state.roller.betInfo}},components:{HeaderBar:i["a"],FooterBar:E["a"],Bet:m,Preview:_["a"],Record:N,AEFcountDownBtn:$["a"]}},g=x,k=(n("0da4"),Object(v["a"])(g,s,a,!1,null,null,null));k.options.__file="Roller.vue";e["default"]=k.exports},"85b8":function(t,e,n){"use strict";var s=n("23c2"),a=n.n(s);a.a},"9f5d":function(t,e,n){"use strict";var s=n("6cdf"),a=n.n(s);a.a},a651:function(t,e,n){}}]);