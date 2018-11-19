<template>
    <div class="mb-headerbar">
        <a href="javascript:;" class="backarrow" @click="$goBack"></a>
        <h2>{{title}}</h2>
    </div>
</template>

<script>
import {mapMutations, mapState} from "vuex"
export default {
    props: {
        title: {
            type: String,
            default: ""
        }
    },
    watch: {
        addressList(newVal) {
            let v = null
            if(newVal.length > 0) {
                let b = false
                newVal.forEach((val, idx) => {
                    if(val.coinAddress == this.storeCurrentAddr.coinAddress) {
                        b = true
                        this.setCurrentAddr(val)
                    }
                    if(val.coinAddress == this.storeWeb3.coinbase) {
                        v = val
                    }

                })
                if(!b) {
                    if(v) {
                        this.setCurrentAddr(v)
                    }else {
                        this.setCurrentAddr(newVal[0])
                    }
                }

            }
        },
    },
    methods: {
        ...mapMutations({
            setCurrentAddr: "SET_CURRENTADDR",
        })
    },
    computed: {
        ...mapState({
            storeCurrentAddr: state => state.user.currentAddr,
            storeWeb3: state => state.web3Handler.web3
        }),
        addressList() {
            return this.$store.getters.getUserAddress
        }
    }
}
</script>


<style lang="less">
.mb-headerbar {
    line-height: .9rem;
    height: .9rem;
    background-color: #010110;
    position: relative;
    overflow: hidden;
    .backarrow {
        position: absolute;
        height: .5rem;
        width: .5rem;
        background: url(../../../../public/img/arrow_back01.png) no-repeat center;
        background-size: 80%;
        top: .2rem;
        left: .2rem;
    }
    h2 {
        text-align: center;
        font-size: .36rem;
        font-weight: 400;
    }
}
</style>

