<template>
  <div class="bonusPool-page">
      <HeaderBar></HeaderBar>
    <div class="content">
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
      isShow: false
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
}
</style>
