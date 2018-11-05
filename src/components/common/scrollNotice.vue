<template>
    <div class="aef-scroll-notice" ref="scrollWrap">
        <p :style="{'left': positionL + 'px'}" ref="scrollDom">{{text}}</p>
    </div>
</template>

<script>
export default {
    props: {
        text: {
            type: String,
            default: "公告：Allbet 开启交易排名赛（北京时间 9 月 27 日 23 点整至 30 日 22:59:59），排名前十玩家会获得 ETH 返奖！"
        }
    },
    data() {
        return {
            positionL: 0,
            timer: null
        }
    },
    mounted() {
        this.run()
    },
    methods: {
        run() {
            console.log(this.$refs.scrollWrap.clientWidth)
            this.positionL = this.$refs.scrollWrap.clientWidth
            const scrollDomW = this.$refs.scrollDom.clientWidth
            this.timer = setInterval(() => {
                if(this.positionL <= -scrollDomW) {
                    this.positionL = this.$refs.scrollWrap.clientWidth
                }else {
                    this.positionL--
                }
            }, 13)
        }
    },
    destroyed() {
        clearInterval(this.timer)
        this.timer = null
    }
}
</script>

<style lang="less" scoped>
.aef-scroll-notice {
    position: relative;
    width: 100%;
    p {
        position: absolute;
        white-space: nowrap;
    }
}
</style>
