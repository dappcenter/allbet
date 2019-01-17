<template>
    <div class="threecards-page">
        <HeaderBar></HeaderBar>
        <div class="main" :style="{minHeight: $window.innerHeight - 150 + 'px'}">
            <iframe :src="'web-mobile/threecards.html'" frameborder="0" :style="{height: $window.innerHeight - 150 + 'px'}"></iframe>
            <!-- <iframe src="http://192.168.120.196:7456" frameborder="0" :style="{minHeight: $window.innerHeight - 150 + 'px'}" ref="threecards"></iframe> -->
            <Record />
        </div>
        <FooterBar></FooterBar>
    </div>
</template>


<script>
import HeaderBar from "@/components/common/header_bar"
import FooterBar from "@/components/common/footer_bar"
import Record from "@/components/threecards/record"
import {IsPC} from "../util/extend_methods"
import {mapMutations, mapState} from "vuex"
export default {
    mounted() {
        var that = this
        window.addEventListener('message', function(event){
            if(!event.data.target || event.data.target != 'threecards') return
            console.log("收到消息：", event.data)
            let res = event.data
            switch(res.methodName) {
                case "CHANGE_COINTYPE":
                    that.changeCoinType(res.data)
                    break
                case "ALERT":
                    that.alert({
                        type: "info",
                        msg: res.data,
                        timeout: 3000
                    })
                    break
                case "LOGIN":
                    that.$refs.threecards.contentWindow.postMessage({
                        target: "allbet",
                        methodName: "CURRENT_ADDR",
                        data: that.currentAddr 
                    }, "http://192.168.120.196:7456")
                    break
                default:
                    break
            }
            // that.$refs.threecards.contentWindow.postMessage("主页面消息6666", event.origin)
        }, false);

    },
    watch: {
        currentAddr(newVal, oldVal) {
            this.$refs.threecards && this.$refs.threecards.contentWindow.postMessage({
                target: "allbet",
                methodName: "CURRENT_ADDR",
                data: newVal
            }, "http://192.168.120.196:7456")
        }
    },
    computed: {
        ...mapState({
            currentAddr: state => state.user.currentAddr
        })
    },
    methods: {
        ...mapMutations({
			setBetInfo: "SET_ROLLER_BET_INFO",
			alert: "alert",
			openLogin: "OPEN_LOGIN",
			openWinPopup: "OPEN_WIN_POPUP",
			openConfirm: "OPEN_CONFIRM",
			closePopup: "CLOSE_POPUP",
			changeCoinType: "CHANGE_COINTYPE"
		}),
    },
    components: {
        HeaderBar,
        FooterBar,
        Record
    },
    beforeRouteEnter(to, from, next) {
        if(IsPC()) {
            next()
        }else {
            next('dice')
        }
    }
}
</script>

<style lang="less">
.threecards-page {
    .main {
        iframe {
            height: 100%;
            width: 100%;
            display: block;
        }
    }   
}
</style>

