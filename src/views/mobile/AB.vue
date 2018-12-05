<template>
    <div class="ab-page">
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
                <tr>
                <td>{{$t('message.abGameDig')}}</td>
                <td>70%</td>
                </tr>
            </table>
            <p class="tip1 tip2">{{$t('message.abFourYear')}}</p>
            <h4>{{$t('message.abBancorDig')}}</h4>
            <p class="tip1 tip2">{{$t('message.abGet')}}</p>
            <h4>{{$t('message.abShareTitle')}}</h4>
            <p class="tip1 tip2">{{$t('message.abShareDesc')}}</p>
        </div>
        <FooterBar ref="ft"></FooterBar>
    </div>
</template>

<script>
import HeaderBar from "@/components/common/header_bar"
import FooterBar from "@/components/common/footer_bar"
export default {
    components: {
        HeaderBar,
        FooterBar
    }
}
</script>

<style lang="less">
.ab-page {
    .main {
        padding: .2rem;
        background-color: #52476F;
        color: #CCBCF8;
        h4 {
            text-align: center;
            font-size: .3rem;
        }
        table{
            border-collapse:collapse;
            width:100%;
            background-color: #4D426A;
        }

        table, td, th{
            border:1px solid #3A2F57;
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
