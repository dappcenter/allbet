<template>
    <div class="ab-page" :style="{minHeight: $window.innerHeight + 'px'}">
        <HeaderBar></HeaderBar>
        <div class="main">
            <h4>{{$t('message.abTitle')}}</h4>
            <p class="tip1">{{$t('message.abLittleTitle')}}</p>
            <table>
                <tr>
                <th>{{$t('message.abOwner')}}</th>
                <th>{{$t('message.abRate')}}</th>
                </tr>
                <tr>
                <td>{{$t('message.abTeam')}}</td>
                <td>30%</td>
                </tr>
                <tr class="no-bt-bd">
                    <td class="no-bt-bd">{{$t('message.abGameDig')}}</td>
                    <td class="no-bt-bd">70%</td>
                </tr>
            </table>
            <p class="tip1 tip2">{{$t('message.abFourYear')}}</p>
            <h4>{{$t('message.abBancorDig')}}</h4>
            <p class="tip1 tip2">{{$t('message.abGet')}}</p>
            <h4>{{$t('message.abShareTitle')}}</h4>
            <p class="tip1 tip2">{{$t('message.abShareDesc')}}</p>
        </div>
    </div>
</template>

<script>
import HeaderBar from "@/components/common/header_bar"
export default {
    components: {
        HeaderBar,
    }
}
</script>

<style lang="less">
.ab-page {
    background: #52476F url(../../../public/img/ab_popup_bg.png) no-repeat bottom right;
    background-size: 40%;
    .main {
        padding: .2rem;
        color: #CCBCF8;
        h4 {
            text-align: center;
            font-size: .3rem;
            margin-top: .8rem;
        }
        table{
            border-collapse:collapse;
            width:100%;
            background-color: #4D426A;
            border-radius: .06rem;
        }

        td, th{
            border-bottom:1px solid #3A2F57;
            border-right: 1px solid #3A2F57;
            &:nth-child(2n) {
                border-right: none;
            }
            &.no-bt-bd {
                border-bottom: none;
            }
        }
        td {
            text-align:center;
            vertical-align:middle;
            height: .5rem;
            width: 50%;
            font-size: 14px;
        }
        th {
            height: .4rem;
        }
        .tip1 {
            margin-bottom: .1rem;
            margin-top: .1rem;
            font-size: 14px;
            text-align: center;
        }
        .tip2 {
            text-align: left;
            margin-bottom: .2rem;
        }
        .tip3 {
            margin-bottom: 0;
        }
    }
}
</style>
