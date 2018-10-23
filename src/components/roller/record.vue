<template>
	<section class="module-record">
		<div class="nav">
			<a href="javascript:;">最新玩家</a>
			<a href="javascript:;">大佬榜</a>
			<a href="javascript:;">幸运榜</a>
			<a href="javascript:;">我的战绩</a>
		</div>
		<div class="t-head">
			<span>时间</span>
			<span>玩家</span>
			<span>下注数量</span>
			<span>预测数</span>
			<span>幸运数</span>
			<span>赔率</span>
			<span>奖金</span>
			<span>AB</span>
		</div>
		<div class="t-body">
			<ul class="list-content" v-for="item in 10">
				<li class="">
					<span>2018.09.12 17:32</span>
				</li>
				<li class="green">
					<span>0xfd……kkdsee</span>
				</li>
				<li class="">
					<span>0.34 ETH</span>
				</li>
				<li class="">
					<span>53</span>
				</li>
				<li class="">
					<span>29</span>
				</li>
				<li class="">
					<span>10.6</span>
				</li>
				<li class="">
					<span>0.4 ETH</span>
				</li>
				<li class="">
					<span>120 AB</span>
				</li>
			</ul>
		</div>
	</section>
</template>

<script>
export default {
    data() {
        return {
            unfold: -1
        }
	},
	created() {
		this.getData()
	},
	methods: {
		getData() {
			this.$http.get('/app/dice/board', {
				params: {
					page: 1,
					pageSize: 10
				}
			}).then(res => {
				console.log(res)
			})
		}
	}
}
</script>


<style lang="less">
.module-record {
	background: #303f69;
    box-shadow: 0 0 30px 0 rgba(0, 0, 0, 0.2);
    box-sizing: border-box;
    position: relative;
	.nav {
		display: flex;
		justify-content: center;
		font-size: 18px;
		height: 90px;
		border-bottom: 1px solid #1F388F;
		background-color: #2F59B7;
		a {
			color: #D2D2D2;
			line-height: 90px;
			width: 100px;
			margin: 0 60px;
			text-align: center;
		}
	}
	.t-head {
		display: flex;
		align-items: center;
		color: #D2D2D2;
		font-size: 18px;
		height: 64px;
		background-color: #2F59B7;
		padding: 0 120px;
		span {
			flex: 1;
			text-align: center;
			&:first-child {
				flex: 1;
				text-align: left;
			}
			&:last-child {
				flex: 1;
				text-align: right;
			}
			i {
				display: block;
				width: 25px;
				height: 25px;
				background: url("../../../public/img/flower.png") no-repeat center;
				background-size: 80%;
			}
		}
	}
	.t-body {
		.list-content {
			display: flex;
			font-size: 18px;
			padding: 0px 120px;
			position: relative;
			background-color: #2F59B7;
			&:nth-child(2n) {
				background-color: #1A439E;
			}
			li {
				flex: 1;
				text-align: center;
				line-height: 64px;
				&:first-child {
					flex: 1;
					text-align: left;
				}
				&:last-child {
					flex: 1;
					text-align: right;
				}
				&.white {
					text-shadow: 0px 0px 6px #FFF;
				}
				&.green {
					color: #99FF7E;
					text-shadow: 0px 0px 6px #99FF7E;
				}
			}
			&:hover {
				background: rgba(91, 116, 174);
			}
		}
	}
	.slide-fade-enter-active {
		transition: all .3s ease;
	}
	.slide-fade-leave-active {
		transition: all .2s cubic-bezier(1.0, 0.5, 0.8, 1.0);
	}
	.slide-fade-enter, .slide-fade-leave-to
		/* .slide-fade-leave-active for below version 2.1.8 */ {
		transform: translateX(10px);
		opacity: 0;
	}
}
@media screen and (max-width: 800px){
	.module-record {
		background: transparent;
    	box-shadow: initial;
		.topbar {
			padding: 0;
		}
		.t-head {
			padding: 0;
		}
		.t-body {
			padding: 0;
			overflow: hidden;
			border-bottom: 0;
			.list-content {
				width: 100%;
				padding: 4px 0;
			}
		}
	}
}
</style>