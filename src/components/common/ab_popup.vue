<template>
    <mu-dialog :open.sync="isShow" :append-body="false" class="ab-bancor">
        <a href="javascript:;" class="close-btn" @click="isShow = false"></a>
        <h4>{{$t('message.abTitle')}}</h4>
        <p class="tip1">{{$t('message.abLittleTitle')}}{{$window.TRONABTOKEN}}</p>
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
        <h6>{{$t('message.abReferRate')}}</h6>
        <table class="referRate">
            <tr>
            <th></th>
            <th>{{$t('message.abWin')}}</th>
            <th>{{$t('message.abLose')}}</th>
            <th></th>
            <th></th>
            </tr>
            <tr>
            <th>{{$t('message.abStage')}}</th>
            <th>TRX:AB</th>
            <th>TRX:AB</th>
            <th>{{$t('message.abAmount')}}</th>
            <th>{{$t('message.abProportion')}}</th>
            </tr>
            <tr>
            <td>{{$t('message.abStage1')}}</td>
            <td>100:45</td>
            <td>100:50</td>
            <td>{{$t('message.ab1000M')}}</td>
            <td>10%</td>
            </tr>
            <tr>
            <td>{{$t('message.abStage2')}}</td>
            <td>100:40</td>
            <td>100:45</td>
            <td>{{$t('message.ab700M')}}</td>
            <td>7%</td>
            </tr>
            <tr>
            <td>{{$t('message.abStage3')}}</td>
            <td>100:35</td>
            <td>100:40</td>
            <td>{{$t('message.ab600M')}}</td>
            <td>6%</td>
            </tr>
            <tr>
            <td>{{$t('message.abStage4')}}</td>
            <td>100:30</td>
            <td>100:35</td>
            <td>{{$t('message.ab500M')}}</td>
            <td>5%</td>
            </tr>
            <tr>
            <td>{{$t('message.abStage5')}}</td>
            <td>100:25</td>
            <td>100:30</td>
            <td>{{$t('message.ab500M')}}</td>
            <td>5%</td>
            </tr>
            <tr>
            <td>{{$t('message.abStage6')}}</td>
            <td>100:20</td>
            <td>100:35</td>
            <td>{{$t('message.ab400M')}}</td>
            <td>4%</td>
            </tr>
            <tr>
            <td>{{$t('message.abStage7')}}</td>
            <td>100:15</td>
            <td>100:20</td>
            <td>{{$t('message.ab400M')}}</td>
            <td>4%</td>
            </tr>
            <tr>
            <td>{{$t('message.abStage8')}}</td>
            <td>100:10</td>
            <td>100:15</td>
            <td>{{$t('message.ab300M')}}</td>
            <td>3%</td>
            </tr>
            <tr>
            <td>{{$t('message.abStage9')}}</td>
            <td>100:5</td>
            <td>100:10</td>
            <td>{{$t('message.ab300M')}}</td>
            <td>3%</td>
            </tr>
            <tr>
            <td class="no-bt-bd">{{$t('message.abStage10')}}</td>
            <td class="no-bt-bd">100:0</td>
            <td class="no-bt-bd">100:5</td>
            <td class="no-bt-bd">{{$t('message.ab300M')}}</td>
            <td class="no-bt-bd">3%</td>
            </tr>
        </table>
        <h4>{{$t('message.abDivid')}}</h4>
        <p class="tip1 tip2">{{$t('message.abDividDesc')}}</p>
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
    overflow-y: scroll;
    .mu-dialog {
        position: absolute;
        top: 10%;
        width: 580px;
        border-radius: 6px;
        overflow: auto!important;
        background-color: #52476F;
        // height: 80%;
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
            &:last-child {
                border-right: none;
            }
            &.no-bt-bd {
                border-bottom: none;
            }
        }
        td{
        text-align:center;
        vertical-align:middle;
        height:55px;
        width: 50%;
        font-size: 14px;
        }
        th {
            height:55px;
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
        h6 {
          text-align: center;
          margin: -10px auto 8px auto;
        }
        .referRate {
              table-layout: fixed;
                  margin-bottom: 17px;
              td{
              height:35px;
              font-weight: normal;
              }
              th {
                  height:40px;
              }
        }
    }
}
</style>
