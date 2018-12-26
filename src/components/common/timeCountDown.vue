<template>
    <div class="timecountdown-com">
        <div class="cell">
            <div class="time-num">
                <span v-for="(item,index) in (hr+'').split('')" :key="index"><i>{{item}}</i></span>
            </div>
            <label>{{$t('message.preHour')}}</label>
        </div>
        <div class="cell">
            <div class="time-num">
                <span v-for="(item,index) in (min+'').split('')" :key="index"><i>{{item}}</i></span>
            </div>
            <label>{{$t('message.preMinute')}}</label>
        </div>
        <div class="cell">
            <div class="time-num">
                <span v-for="(item,index) in (sec+'').split('')" :key="index"><i>{{item}}</i></span>
            </div>
            <label>{{$t('message.preSecond')}}</label>
        </div>
    </div>
</template>

<script>
export default {
    data: function () {
    return {
      day: "00", hr: "00", min: "00", sec: "00"
    }
  },
  mounted: function () {
    this.countdown()
  },
  methods: {
    countdown: function () {
      const end = Date.parse(new Date(1547179200000))
      const now = Date.parse(new Date())
      const msec = end - now
      if(msec < 0) return
      let day = parseInt(msec / 1000 / 60 / 60 / 24)
      let hr = parseInt(msec / 1000 / 60 / 60)
      let min = parseInt(msec / 1000 / 60 % 60)
      let sec = parseInt(msec / 1000 % 60)
      this.day = day
      this.hr = hr > 9 ? hr : '0' + hr
      this.min = min > 9 ? min : '0' + min
      this.sec = sec > 9 ? sec : '0' + sec
      const that = this
      setTimeout(function () {
        that.countdown()
      }, 1000)
    }
  }
}
</script>

<style lang="less">
.timecountdown-com {
    display: flex;
    justify-content: center;
    text-align: center;
    margin: 20px 0;
    .cell {
        .time-num {
            span {
                position: relative;
                display: inline-block;
                height: 60px;
                line-height: 60px;
                width: 36px;
                color: #FFC425;
                font-size: 30px;
                margin-right: 8px;
                border-radius: 2px;
                overflow: hidden;
                &:last-child {
                    margin-right: 0;
                }
                i {
                    position: relative;
                    z-index: 2;
                    font-style: normal;
                }
                &::before {
                    content: "";
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 50%;
                    background-color: #483D65;
                }
                &:after {
                    content: "";
                    position: absolute;
                    bottom: 0;
                    left: 0;
                    width: 100%;
                    height: 50%;
                    background-color: #3E345A;
                }
            }
            
        }
        label {
            font-size: 16px;
            color: #AB97E2;
        }
        &:nth-child(2) {
            margin: 0 30px;
        }
    }
    
}
@media screen and (max-width: 800px){
    .timecountdown-com {
        justify-content: center;
        margin: .2rem 0;
        .cell {
            .time-num {
                span {
                    position: relative;
                    display: inline-block;
                    height: .8rem;
                    line-height: .8rem;
                    width: .5rem;
                    color: #FFC425;
                    font-size: .4rem;
                    margin-right: .08rem;
                    border-radius: 2px;
                    overflow: hidden;
                }
                
            }
            label {
                font-size: 12px;
                color: #AB97E2;
            }
            &:nth-child(2) {
                margin: 0 .3rem;
            }
        }
        
    }
}
</style>

