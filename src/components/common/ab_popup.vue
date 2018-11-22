<template>
    <mu-dialog :open.sync="isShow" :append-body="false" class="ab-bancor">
        <a href="javascript:;" class="close-btn" @click="isShow = false"></a>
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
        <p class="tip1 tip2 tip3">{{$t('message.abExmaple')}}</p>
        <p class="tip1 tip2 tip3">{{$t('message.abFirst')}}</p>
        <p class="tip1 tip2">{{$t('message.abLast')}}</p>
        <table>
            <tr>
            <td>{{$t('message.abEthpool')}}</td>
            <td>3000ETH</td>
            </tr>
            <tr>
            <td>{{$t('message.abPool')}}</td>
            <td>7000ETH</td>
            </tr>
        </table>
    </mu-dialog>
</template>

<script>
export default {
    props: {
        isShowABpopup: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            isShow: false
        }
    },
    watch: {
        isShow(newVal) {
            if(!newVal) {
                this.$emit("change", newVal)
            }
        },
        isShowABpopup(newVal) {
            if(newVal) {
                this.isShow = true
            }
        }
    },
    model: {
        prop: "isShowABpopup",
        event: "change"
    }
}
</script>


<style lang="less">
.ab-bancor {
    z-index: 20181248 !important;
    .mu-dialog {
        width: 40%;
        background-color: #214797;
        
    }
    .mu-dialog-body {
        position: relative;
        color: #fff;
        .close-btn {
            position: absolute;
            right: 20px;
            top: 20px;
            width: 25px;
            height: 25px;
            background: url(../../../public/img/close_icon01.png) no-repeat center;
            background-size: 100%;
        }
    table{
        border-collapse:collapse;
        width:100%;
        }

    table, td, th
        {
        border:1px solid #577AC3;
        }
        td{
        text-align:center;
        vertical-align:middle;
        height:50px;
        width: 50%;
        font-size: 14px;
        }
        th {
        height:40px;
        }
        .tip1 {
            margin-bottom: 10px;
            margin-top: 10px;
            font-size: 14px;
            text-align: center;
        }
        .tip2 {
            text-align: left;
            margin-bottom: 20px;
        }
        .tip3 {
        margin-bottom: 0;
        }
    }
}
</style>

