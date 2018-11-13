<template>
    <div class="mb-headerbar">
        <a href="javascript:;" class="backarrow" @click="back"></a>
        <h2>{{title}}</h2>
    </div>
</template>

<script>
export default {
    props: {
        title: {
            type: String,
            default: ""
        }
    },
    methods: {
        back(){
            if (window.history.length <= 1) {
                this.$router.push({path:'/'})
                return false
            } else {
                this.$router.go(-1)
            }
            //上面都没执行就说明卡在当前页不是最后一条， histroy记录数量大于1，又没有回退记录，只能返回首页，
         //如果上面都执行了 页面都跳走了，这个也就不用管了   
            setTimeout(() => {
                this.$router.push({path:'/'})      
            },500)
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

