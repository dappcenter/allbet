<template>
		<div id="app">
				<router-view/>
				<mu-snackbar position="top" :color="alertOption.color" :open.sync="alertOption.open">
						<mu-icon left :value="alertOption.icon"></mu-icon>
						{{alertOption.msg}}
						<mu-button flat slot="action" color="#fff" @click="$store.commit('closeAlert')">关闭</mu-button>
				</mu-snackbar>
		</div>
</template>

<script>
export default {
    name: "App",
		data() {
			  return {
				    colors: ["success", "info", "error", "warning"],
				    color: {
					  		color: "success",
								message: "",
								open: true,
								timeout: 3000
						}
				}
		},
  	computed: {
    		alertOption() {
      			return this.$store.state.dialogs.alertOption;
    		},
    		// loading() {
      	// 		return this.$store.state.loading;
    		// }
  	},
  	methods: {}
};
</script>


<style lang="less">
html,
body,
div,
h1,
h2,
h3,
h4,
h5,
h6,
ul,
li,
p {
  margin: 0;
  padding: 0;
}
li {
  list-style: none;
}
body {
  min-height: 100%;
  position: relative;
  overflow-x: hidden;
  overflow-y: auto;
  &:before {
    content: "";
    display: block;
    position: absolute;
    width: 100%;
    // height: 100%;
    left: 0;
    top: 0;
    z-index: -1;

    // background-image: linear-gradient(135deg, #222c49 0%, #506ab4 100%);
  }
  &:after {
    content: "";
    display: block;
    position: absolute;
    width: 100%;
    // height: 100%;
    left: 0;
    top: 0;
    z-index: -1;
    // background-image: url(../public/img/bg_icon.png);
    opacity: 0.02;
    background-size: 10%;
    transform: rotateZ(0deg);
  }
}
#app {
  font-family: "Poppins", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #fff;
  font-size: 14px;
}
#nav {
  padding: 30px;
  a {
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
