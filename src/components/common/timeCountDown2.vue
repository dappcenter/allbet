<template>
    <span class="timecountdown2-com">{{hr+":"+min+":"+sec}}</span>
</template>

<script>
export default {
    props: {
        time: 0
    },
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
        const end = Date.parse(new Date(this.time))
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
.timecountdown2-com {
    font-family: initial;
}
@media screen and (max-width: 800px){
    .timecountdown2-com {
        
    }
}
</style>

