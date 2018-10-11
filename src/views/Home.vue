<template>
    <div class="home-page">
        <vue-particles
            color="#c33"
            :particleOpacity="0.7"
            :particlesNumber="80"
            shapeType="circle"
            :particleSize="4"
            linesColor="#dedede"
            :linesWidth="1"
            :lineLinked="true"
            :lineOpacity="0.4"
            :linesDistance="150"
            :moveSpeed="3"
            :hoverEffect="true"
            hoverMode="grab"
            :clickEffect="true"
            clickMode="repulse"
          >
          </vue-particles>
    </div>
</template>

<script>
export default {
    mounted() {
    },
    components: {
    }
};
</script>
