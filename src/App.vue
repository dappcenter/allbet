<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<style lang="less">
html,body,div,h1,h2,h3,h4,h5,h6,ul,li,p {
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
	&:before {
	content: "";
	display: block;
	position: absolute;
	width: 100%;
	height: 100%;
	left: 0;
	top: 0;
	z-index: -1;
	background-image: linear-gradient(135deg, #222c49 0%, #506ab4 100%);
	}
	&:after {
	content: "";
	display: block;
	position: absolute;
	width: 100%;
	height: 100%;
	left: 0;
	top: 0;
	z-index: -1;
	background-image: url(../public/img/bg_icon.png);
	opacity: 0.02;
	background-size: 10%;
	transform: rotateZ(0deg);
	}
}
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #fff;
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
