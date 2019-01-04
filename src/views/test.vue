<template>
    <div class="test-page">
        <PS></PS>
    </div>
</template>

<script>
import PS from "../components/common/poker_shuffle.vue"
export default {
    components: {
        PS
    }
}
</script>

<style lang="less">
.test-page {
    padding: 100px 200px;
}
</style>
