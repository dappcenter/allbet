<template>
    <div class="threecards-page">
        <HeaderBar></HeaderBar>
        <div class="main" :style="{minHeight: $window.innerHeight - 150 + 'px'}">
            <iframe src="web-mobile/index.html" frameborder="0" :style="{minHeight: $window.innerHeight - 150 + 'px'}"></iframe>
        </div>
        <FooterBar></FooterBar>
    </div>
</template>


<script>
import HeaderBar from "@/components/common/header_bar"
import FooterBar from "@/components/common/footer_bar"
import {IsPC} from "../util/extend_methods"
export default {
    mounted() {

    },
    components: {
        HeaderBar,
        FooterBar
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

