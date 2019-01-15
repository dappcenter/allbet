<template>
    <div class="circle-bar" :style="{'backgroundColor': color}" ref="circleBar">
        <div class="circle-bar-left" ref="circleBarLeft"></div>
        <div class="circle-bar-right" ref="circleBarRight"></div>
        <!-- 遮罩层，显示百分比 -->
        <div class="mask">
            <span class="percent">{{isNaN((value*100).toFixed()) ? 0 : (value*100).toFixed()}}%</span>
            <span>{{text}}</span>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        value: {
            type: Number,
            default: 0
        },
        color: {
            type: String,
            default: "#13F693"
        },
        text: {
            type: String,
            default: ""
        }
    },
    watch: {
        value() {
            this.init()
        }
    },
    mounted() {
        Element.prototype.css = function(property,value){
            if ( value ) {
                var index = property.indexOf('-');
                if( index != -1 ) {
                    var char = property.charAt(index+1).toUpperCase();
                    property.replace(/(-*){1}/,char);
                }
                this.style[property] = value;
            }else{
                return window.getComputedStyle(this).getPropertyValue(property);
            }
        }

        //封装一个css3函数，用来快速设置css3属性
        Element.prototype.css3 = function(property,value){
            if( value ){
                property = capitalize(property.toLowerCase());
                this.style['webkit'+property] = value;
                this.style['Moz'+property] = value;
                this.style['ms'+property] = value;
                this.style['O'+property] = value;
                this.style[property.toLowerCase()] = value;
            }else{
                return window.getComputedStyle(this).getPropertyValue(
                        ('webkit'+property)||('Moz'+property)||('ms'+property)||('O'+property)||property);
            }
            
            //首字母大写
            function capitalize(word){
                return word.charAt(0).toUpperCase() + word.slice(1);
            }
        }
        this.init()
    },
    methods: {
        init() {
            
            let circleBar = this.$refs.circleBar
            let percent      = this.value*100
            let left_circle  = this.$refs.circleBarLeft
            let right_circle = this.$refs.circleBarRight
            right_circle.css3('transform','rotate(0deg)') //初始
            left_circle.css3 ('transform','rotate(0deg)') //初始
            right_circle.css ('background-color', "#eee")
            circleBar.css ('background-color',this.color)
            if( percent <= 50 ) {
                let rotate = 'rotate('+(percent*3.6)+'deg)';
                right_circle.css3('transform',rotate);
            }else{
                let rotate = 'rotate('+((percent-50)*3.6)+'deg)'
                if(percent >= 80) {
                    right_circle.css ('background-color',"#c33")
                    circleBar.css ('background-color',"#c33");
                }else {
                    right_circle.css ('background-color',this.color);//背景色设置为进度条的颜色
                }
                right_circle.css3('transform','rotate(0deg)');//右侧不旋转
                left_circle.css3 ('transform',rotate);//左侧旋转
            }
        }
    }
}
</script>


<style lang="less">
.circle-bar {
    font-size: 38px;
    width: 1em;
    height: 1em;
    position: relative;
    border-radius: 50%;
    user-select: none;
    .circle-bar-left,
    .circle-bar-right {
        width: 1em;
        height: 1em;
        background-color: #eee;
        border-radius: 50%;
    }
    .circle-bar-right {
        clip: rect(0, auto, auto, 0.5em);
    }
    .circle-bar-left {
        clip: rect(0, 0.5em, auto, 0);
    }
    .mask {
        width: 0.9em;
        height: 0.9em;
        background-color: #000;
        text-align: center;
        line-height: 0.2em;
        color: rgba(0, 0, 0, 0.5);
        border-radius: 50%;
        span {
            font-size: 12px;
            height: 1em;
            display: block;
            color: #fff;
            &:first-child {
                margin-top: .5em;
            }
            &:last-child {
                color: #D3CDFF;
            }
        }
    }
    &>* {
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        margin: auto;
    }
}
</style>

