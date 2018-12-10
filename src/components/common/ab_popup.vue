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
            <td class="no-bt-bd">{{$t('message.abGameDig')}}</td>
            <td class="no-bt-bd">70%</td>
            </tr>
        </table>
        <p class="tip1 tip2">{{$t('message.abFourYear')}}</p>
        <h4>{{$t('message.abBancorDig')}}</h4>
        <p class="tip1 tip2">{{$t('message.abGet')}}</p>
        <h4>{{$t('message.abShareTitle')}}</h4>
        <p class="tip1 tip2">{{$t('message.abShareDesc')}}</p>
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
        width: 580px;
        border-radius: 6px;
        overflow: hidden;
    }
    .mu-dialog-body {
        position: relative;
        color: #CCBCF8;
        background: #52476F url(../../../public/img/ab_popup_bg.png) no-repeat bottom right;
        background-size: 40%;
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
        background-color: #4D426A;
        border-radius: 4px;
    }

    td, th

        {
            border-bottom:1px solid #3A2F57;
            border-right: 1px solid #3A2F57;
            &:nth-child(2n) {
                border-right: none;
            }
            &.no-bt-bd {
                border-bottom: none;
            }
        }
        td{
        text-align:center;
        vertical-align:middle;
        height:80px;
        width: 50%;
        font-size: 14px;
        }
        th {
            height:80px;
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

