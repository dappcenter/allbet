<template>
    <div class="mb-header-nav">
        <ul>
            <router-link to="dice" tag="li">Dice</router-link>
            <router-link to="index" tag="li">{{$t("message.atDeal")}}</router-link>
            <li @click="switchBonusPools">{{$t("message.bonusPool")}}</li>
            <router-link to="invite" tag="li" v-show="addressList.length > 0">{{$t("message.invitation")}}</router-link>
            <li @click="openWhiteBook">{{$t("message.course")}}</li>
        </ul>
    </div>
</template>

<script>
export default {
    props: {
        openWhiteBook: {
            type: Function,
            default: ()=>{}
        },
        switchBonusPools: {
            type: Function,
            default: ()=>{}
        },
        addressList: {
            type: Array
        },
    }
}
</script>


<style lang="less">
.mb-header-nav {
    background-color: #10101A;
    ul {
        white-space: nowrap;
        overflow-x: scroll;
        /*定义滚动条高宽及背景 高宽分别对应横竖滚动条的尺寸*/  
        &::-webkit-scrollbar  
        {  
            width: 1px;  /*滚动条宽度*/
            height: 1px;  /*滚动条高度*/
        } 
        /*定义滚动条轨道 内阴影+圆角*/  
        &::-webkit-scrollbar-track  
        {  
            -webkit-box-shadow: inset 0 0 6px #10101A;  
            background-color: #10101A;/*滚动条的背景颜色*/  
        }  
        
        /*定义滑块 内阴影+圆角*/  
        &::-webkit-scrollbar-thumb  
        {  
            -webkit-box-shadow: inset 0 0 6px #10101A;  
            background-color: #10101A;  /*滚动条的背景颜色*/
        }
        li {
            display: inline-block;
            line-height: .72rem;
            margin: 0 .4rem;
            color: #63647F;
            font-size: .3rem;
            &.router-link-active {
                color: #fff;
                font-weight: bold;
            }
        }
    }
}
</style>

