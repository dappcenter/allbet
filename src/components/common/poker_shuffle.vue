<template>
    <div class="poker-shuffle-cpt" :class="{'open' : open}">
        <div class="p-s-wrap" :class="{'stop' : !loading}">
            <img :class="classArr[0]" src="../../../public/img/poker/kj_poker.png" alt="">
            <img :class="classArr[1]" src="../../../public/img/poker/kj_poker.png" alt="">
            <img :class="classArr[2]" src="../../../public/img/poker/kj_poker.png" alt="">
            <img :class="classArr[3]" src="../../../public/img/poker/kj_poker.png" alt="">
            <img :class="classArr[4]" src="../../../public/img/poker/kj_poker.png" alt="">
        </div>
        <div class="front">
            <img class="hide" :src="'img/poker/full/p' + luckyNum + '.png'" alt="">
        </div>
        <div class="preload-img">
            <img v-for="item in 52" :src="'img/poker/full/p' + item + '.png'">
        </div>
    </div>
</template>


<script>
export default {
    props: {
        loading: {
            default: false,
            type: Boolean
        },
        open: {
            default: false,
            type: Boolean
        },
        luckyNum: {
            default: 1
        }
    },
    data() {
        return {
            classArr: ["p1","p2","p3","p4","p5"],
        }
    },
    mounted() {
    },
    watch: {
        loading(newVal, oldVal) {
            newVal && this.run()
        }
    },
    methods: {
        run() {
            let idx1 = this.classArr[0]
            this.classArr.push(idx1)
            this.classArr.shift()
            if(this.loading) {
                setTimeout(() => {
                    this.run()
                }, 400)
            }
        }
    }
}
</script>


<style lang="less">
.poker-shuffle-cpt {
    position: relative;
    width: 140px;
    height: 198px;
    .p-s-wrap {
        position: absolute;
        width: 100%;
        height: 100%;
        
        img {
            position: absolute;
            width: 100%;
            height: 100%;
             backface-visibility: hidden;
            transform-style: preserve-3d;
            transition: all 1s;
            &.p1 {
                z-index: 5;
                transform: scale(1) translate(0, 0);
            }
            &.p2 {
                z-index: 4;
                transform: scale(0.85) translate(40%, 0%);
            }
            &.p3 {
                transform: scale(0.75) translate(86%, 0%);
                z-index: 3;
            }
            &.p4 {
                transform: scale(0.85) translate(-40%, 0%);
                z-index: 2;
            }
            &.p5 {
                transform: scale(0.75) translate(-86%, 0%);
                z-index: 1;
            }
        }
        &.stop {
            img {
                transform: rotateY(0deg) scale(1) translate(0, 0) !important;
            }
        }
    }
    .front {
        position: absolute;
        z-index: 12;
        width: 100%;
        height: 100%;
        
        img {
            width: 100%;
            height: 100%;
            backface-visibility: hidden;
            transform-style: preserve-3d;
            transform: rotateY(-180deg);
            transition: all 1s;
            &.hide {
            }
        }
    }
    &.open {
        .p-s-wrap {
            img {
                transform: rotateY(180deg) scale(1) translate(0, 0) !important;
            }
        }
        .front {
            img {
                transform: rotateY(0deg);
            }
        }
    }
    .preload-img {
        display: none;
        width: 0;
        height: 0;
        overflow: hidden;
    }
}
@media screen and (max-width: 800px){
    .poker-shuffle-cpt {
        height: 1.98rem;
		width: 1.4rem;
    }
}
</style>
