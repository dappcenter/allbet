<template>
  <div class="bonusPool-page">
      <MBheaderBar :title="$t('message.BPbonusPools')"></MBheaderBar>
    <div class="content">
        <div class="top-btn">
          <div :class="[topBtnIndex == 0 ? 'select' : '']" @click="selectBtn(0)">{{$t('message.bonusPool')}}</div>
          <div :class="[topBtnIndex == 1 ? 'select' : '']" @click="selectBtn(1)">{{$t('message.BPDig')}}</div>
        </div>
        <div class="part1" v-show="topBtnIndex == 0">
          <p class="tip1">{{$t('message.BPtip')}}</p>
          <div class="coin-wrap eth">
              <div class="coin-logo">
                  <img src="../../../public/img/coin/ETH.png" />
                  <span>{{$t('message.BPcurrentAmount')}}</span>
              </div>
              <h3>{{Number(bonusPoolsData.ethPool) > 0 ? Number(bonusPoolsData.ethPool).toFixed(8) : 0}} ETH</h3>
          </div>
          <div class="coin-wrap eth">
              <div class="coin-logo">
                  <img src="../../../public/img/coin/TRX.png" />
                  <span>{{$t('message.BPcurrentAmount')}}</span>
              </div>
              <h3>{{Number(bonusPoolsData.trxPool) > 0 ? Number(bonusPoolsData.trxPool).toFixed(8) : 0}} TRX</h3>
          </div>
          <ul>
              <li>
                  <img src="../../../public/img/coin/EOS.png" />
                  <span>{{$t("message.BPSoon")}}</span>
              </li>
              <li>
                  <img src="../../../public/img/coin/AB.png" />
                  <span>{{$t("message.BPSoon")}}</span>
              </li>
          </ul>
          <div class="tip2">
          <p class="">{{$t("message.BPtip2")}}</p>
          </div>
          <div class="tip3" v-if="storeCurrentAddr.bet">
              <p>{{$t("message.BPab")}}：{{storeCurrentAddr.bet || 0}} AB</p>
              <!-- <p>{{$t('message.BPTotal')}}100000000 AB</p> -->
          </div>
        </div>
        <div class="part2" v-show="topBtnIndex == 1">
          <div class="progress-wrap">
              <h4>{{$t("message.BP3stage")}}（{{$t("message.BPmost")}} 100TRX：50AB）</h4>
              <div class="progress-bar"><i>896589/500,000,000</i><span style="width: 30%"></span></div>
              <p>{{$t("message.BPnext")}}（{{$t("message.BPmost")}} 100TRX：45AB）</p>
          </div>
          <div class="ctn-area area1">
              <label>{{$t("message.BPgame")}}</label>
              <h4>1,343,354,555 AB</h4>
          </div>
          <div class="ctn-area area2">
              <div class="cell">
                  <label>{{$t("message.BPreceived")}}</label>
                  <h4>4589.54</h4>
              </div>
              <div class="cell">
                  <label>{{$t("message.BPtoReceive")}}</label>
                  <h4>4589.54</h4>
              </div>
          </div>
          <p class="tips">{{$t("message.BPhandleFee")}}</p>
          <a href="javascript:;" class="get">{{$t("message.BPbtnGet")}}</a>
          <p class="tips tips-spec">{{$t('message.BPtip')}}</p>
        </div>
    </div>
    </div>
</template>

<script>
import { mapState } from "vuex";
import HeaderBar from "@/components/common/header_bar"
export default {
  props: {
    isShowBPpopup: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      bonusPoolsData: {},
      isShow: false,
      topBtnIndex: 0,
    };
  },
  watch: {
    isShow(newVal) {
      if (!newVal) {
        this.$emit("change", newVal);
      }
    },
    isShowBPpopup(newVal) {
      if (newVal) {
        this.isShow = true;
      }
    }
  },
  model: {
    prop: "isShowBPpopup",
    event: "change"
  },
  mounted() {
    this.getBonusPools();
  },
  computed: {
    ...mapState({
      storeCurrentAddr: state => state.user.currentAddr
    })
  },
  methods: {
    selectBtn(i) {
      this.topBtnIndex = i
    },
    //获取分红池信息
    getBonusPools() {
      this.$http.get("/app/profit/profit").then(res => {
        if (res.code == 200) {
          this.bonusPoolsData = res.result;
        }
      });
    }
  },
  components: {
      HeaderBar
  }
};
</script>

<style lang="less">
.bonusPool-page {
  background-color: #22202c;
  .content {
    .top-btn {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      border-bottom: 1px solid #49425C;
      div {
        width: 50%;
        text-align: center;
        padding: 0.33rem 0;
        font-size: 0.32rem;
        color: #D3CDFF;
      }
      .select {
        border-bottom: 1px solid #fff;
        color: #fff;
      }
    }
    .part1{
      .tip1 {
        color: #d3cdff;
        margin: 0.6rem 0;
        font-size: 0.32rem;
        text-align: center;
        padding: 0 0.4rem;
      }
      .tip2 {
        color: #d3cdff;
        margin-bottom: 0.3rem;
        margin-top: 0.4rem;
        font-size: 0.24rem;
        text-align: center;

        padding: 0 0.4rem;
        p {
          padding-bottom: 0.6rem;
          border-bottom: 1px solid #49425c;
        }
      }
      .tip3 {
        text-align: center;
        font-size: 0.32rem;
        color: #d3cdff;
        margin: 0.4rem;
        border: 1px solid #49425c;
        padding: 0.44rem 0;
      }
      .coin-wrap {
        display: flex;
        align-items: center;
        justify-content: space-around;
        padding: 0.1rem 0.4rem;
        border-radius: 4px;
        background: rgba(233, 86, 120, 0.8);
        width: 6.7rem;
        height: 1.5rem;
        margin: auto;
        margin-top: 0.1rem;
        margin-bottom: 0.2rem;
        .coin-logo {
          text-align: center;
          img {
            width: 0.8rem;
            height: 0.8rem;
            display: block;
            margin: 0 auto 0.1rem;
            background-color: #cd3a5a;
            border-radius: 50%;
          }
          span {
            font-size: 0.18rem;
          }
        }
        h3 {
          flex: 1;
          text-align: right;
          font-size: 0.36rem;
          font-weight: normal;
        }
      }
      ul {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        padding: 0.2rem 0.4rem 0.4rem;
        li {
          display: flex;
          align-items: center;
          justify-content: space-between;
          background-color: #e97552;
          width: 3.15rem;
          margin-top: 0.1rem;
          padding: 0.2rem 0.4rem;
          border-radius: 4px;
          img {
            width: 0.6rem;
            background-color: #c54537;
            border-radius: 50%;
          }
          span {
            font-size: 0.3rem;
            color: #fff;
          }
        }
      }
    }
    .part2 {
          padding: 0.79rem 0.4rem 0 0.4rem;
          .progress-wrap {
              margin-bottom: 0.4rem;
              h4 {
                  font-size: 0.28rem;
                  font-weight: 400;
                  text-align: center;
              }
              .progress-bar {
                  position: relative;
                  height: 0.4rem;
                  background-color: #58516D;
                  border-radius: 0.2rem;
                  overflow: hidden;
                  margin: 0.2rem 0 0.2rem;
                  text-align: center;
                  span {
                      position: absolute;
                      left: 0;
                      top: 0;
                      background-color: #13F693;
                      height: 100%;
                      box-shadow: 0 0 10px #13F693;
                  }
                  i {
                      font-size: 0.18rem;
                      color: #EAC1FF;
                      font-style: normal;
                      line-height: 0.3rem;
                      font-weight: 300;
                  }
              }
              p {
                  color: #D3CDFF;
                  text-align: center;
                  font-size: 0.24rem;
              }
          }
          .ctn-area {
              text-align: center;
              background:#49425C;
              margin-top: 0.2rem;
              border-radius:4px;
              height: 1.5rem;
              label {
                  display: inline-block;
                  font-size: 0.24rem;
                  color: #EDCFFF;
              }
              h4 {
                  font-size: 0.42rem;
                  color: #13F693;
              }
              &.area1 {
                margin-top: 1rem;
                  label {
                      margin-top: 0.24rem;
                  }
              }
              &.area2 {
                  display: flex;
                  align-items: center;
                  .cell {
                      flex: 1;
                      &:first-child {
                          border-right: 1px solid #CCBCF8;
                      }
                  }
              }
          }
          .tips {
              text-align: center;
              color: #D3CDFF;
              font-size: 0.2rem;
              margin-top: 0.2rem;
          }
          .tips-spec {
            margin-top: 1.4rem;
            color: #635A7C;
            font-size: 0.24rem;
          }
          .get {
              display: block;
              margin: 0 auto;
              height: 0.8rem;
              width: 4.8rem;
              background:linear-gradient(90deg,#7A71BD,#925EC7);
              // box-shadow:0px 2px 12px 0px rgba(126,79,181,0.75);
              border-radius:0.4rem;
              color: #fff;
              font-size: 0.3rem;
              line-height: 0.8rem;
              text-align: center;
              margin-top: 0.4rem;
              &:hover {
                  background:linear-gradient(90deg,rgba(219,167,255,1),rgba(190,180,255,1));
              }
          }
      }
  }
}
</style>
