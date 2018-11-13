<template>
    <div class="mb-headerbar">
        <a href="javascript:;" class="backarrow" @click="$router.go(-1)"></a>
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

