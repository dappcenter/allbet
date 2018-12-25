<template>
    <div class="timecountdown-com">
        <p>
            <span>{{hr}}</span>
            <span>{{min}}</span>
            <span>{{sec}}</span>
        </p>
        <div>
            <span>{{$t('message.preHour')}}</span>
            <span>{{$t('message.preMinute')}}</span>
            <span>{{$t('message.preSecond')}}</span>
        </div>
    </div>
</template>

<script>
export default {
    data: function () {
    return {
      day: 0, hr: 0, min: 0, sec: 0
    }
  },
  mounted: function () {
    this.countdown()
  },
  methods: {
    countdown: function () {
      const end = Date.parse(new Date(1547596800000))
      const now = Date.parse(new Date())
      const msec = end - now
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
    text-align: center;
    margin: 20px 0;
    p {
        span {
            display: inline-block;
            background: rgba(72, 61, 101, 0.6);
            padding: 10px 0;
            width: 80px;
            margin: 0 20px;
            font-size: 22px;
            font-weight: bold;
            border-radius: 4px;
            color: #ffba00;
        }
    }
    div {
        span {
            display: inline-block;
            padding: 10px 0;
            width: 80px;
            font-size: 16px;
            margin: 0 20px;
            font-weight: bold;
            border-radius: 4px;
            
        }
    }
    
}
@media screen and (max-width: 800px){
    .timecountdown-com {
        text-align: center;
        margin: 10px 0;
        p {
            display: flex;
            justify-content: space-around;
            span {
                display: inline-block;
                background: rgba(72, 61, 101, 0.6);
                padding: 10px 0;
                width: 30%;
                margin: 0;
                font-weight: bold;
                border-radius: 4px;
            }
        }
        div {
            display: flex;
            justify-content: space-around;
            span {
                display: inline-block;
                padding: 10px 0;
                width: 30%;
                font-size: 14px;
                margin: 0;
                font-weight: bold;
                border-radius: 4px;
                
            }
        }
        
    }
}
</style>

