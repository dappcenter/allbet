
<template>
    <span class="digital-roll">{{rollNumber}}</span>
</template>

<script>
/**
 * 滚动数字组件
 * @author shanks
 * @date 2018/9/30
 * @version 1.0.0
 * @param {Number} value - 需显示的值
 * @param {Number} speed - 数字变化的速度
 * @param {Number} time - 总时长(变化区间过小将失效)
 * @param {Number} decimal - 显示数字小数位
 */
export default {
    props: {
        value: {
            default: 0,
            type: Number
        },
        speed: {
            default: 30,
            type: Number
        },
        time: {
            default: 1500,
            type: Number
        },
        decimal: {
            default: 3,
            type: Number
        }
    },
    data() {
        return {
            rollNumber: 0,
            stepSize: 0.01,
            timer: null,
            rollSpace: 0
        }
    },
    mounted() {
        this.changeNumber()
    },
    watch: {
        value() {
            this.changeNumber()
        }
    },
    methods: {
        changeNumber() {
            clearInterval(this.timer)
            this.rollSpace = Math.abs(this.value - this.rollNumber)
            this.stepSize = this.rollSpace / this.time * this.speed < 0.001 ? 0.001 : this.rollSpace / this.time * this.speed
            if(this.value > this.rollNumber) {
                this.timer = setInterval(() => {
                    this.rollNumber =(Number(this.rollNumber) + this.stepSize).toFixed(this.decimal)
                    if(this.rollNumber >= this.value) {
                        clearInterval(this.timer)
                        this.timer = null
                        this.rollNumber = this.value.toFixed(this.decimal)
                    }
                }, this.speed)
            }else if(this.value < this.rollNumber){
                this.timer = setInterval(() => {
                    this.rollNumber = (Number(this.rollNumber) - this.stepSize).toFixed(this.decimal)
                    if(this.rollNumber <= this.value) {
                        clearInterval(this.timer)
                        this.timer = null
                        this.rollNumber = this.value.toFixed(this.decimal)
                    }
                }, this.speed)
            }else {
                this.rollNumber = this.value
            }
        }
    }
}
</script>


<style>

</style>
